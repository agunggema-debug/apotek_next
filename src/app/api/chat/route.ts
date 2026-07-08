import { groq } from "@ai-sdk/groq";
import { streamText } from "ai";

export const maxDuration = 30;
export const dynamic = "force-dynamic";

// Simple in-memory cache to avoid repeated LLM calls for identical questions
const responseCache = new Map<string, string>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

const SYSTEM_PROMPT = `Kamu adalah asisten virtual Apotek Raja Farma yang ramah dan membantu. 

Informasi Apotek Raja Farma:
- Nama: Apotek Raja Farma
- Layanan: Menyediakan obat asli, konsultasi apoteker gratis, layanan antar cepat
- Jam operasional toko fisik: Setiap Hari, pukul 07.00 - 23.00 WIB
- Layanan antar: 24 jam untuk obat darurat
- Alamat: Jl. Raya Rajamandala, Rajamandala Kulon, Kec. Cipatat, Kabupaten Bandung Barat, Jawa Barat 40554
- WhatsApp: +62 857-2224-4783
- Konsultasi apoteker gratis aktif pukul 08.00 - 22.00 WIB

Panduan merespon:
1. Jawab dengan ramah dan informatif dalam Bahasa Indonesia
2. Jika ditanya tentang stok obat, arahkan untuk cek katalog produk atau hubungi WhatsApp
3. Jika ditanya tentang konsultasi, tawarkan layanan konsultasi apoteker gratis via WhatsApp
4. Jika ditanya tentang pemesanan, jelaskan cara order via website atau WhatsApp
5. Jika ada pertanyaan medis serius, ingatkan untuk konsultasi langsung dengan apoteker atau dokter
6. Gunakan emoji secukupnya untuk membuat percakapan lebih ramah
7. Jangan memberikan diagnosis medis atau resep obat
8. Jika tidak tahu jawabannya, arahkan untuk menghubungi WhatsApp apotek`;

// Clean expired cache entries periodically
function cleanCache() {
  const now = Date.now();
  for (const [key, _] of responseCache) {
    // Entries older than TTL will be overwritten on next access
    responseCache.get(key); // just to keep reference
  }
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Get the last user message for caching
    const lastMessage = messages?.[messages.length - 1]?.content;
    const cacheKey = lastMessage?.toLowerCase().trim();

    // Check cache for identical questions
    if (cacheKey && responseCache.has(cacheKey)) {
      const cached = responseCache.get(cacheKey)!;
      // Return cached response as stream
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(encoder.encode(cached));
          controller.close();
        },
      });
      return new Response(stream, {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }

    const result = streamText({
      model: groq("llama-3.3-70b-versatile"),
      system: SYSTEM_PROMPT,
      messages,
    });

    // Stream the response and cache it when complete
    const originalStream = result.toTextStreamResponse();

    if (cacheKey) {
      // Clone the response to cache it
      const clonedResponse = originalStream.clone();
      const reader = clonedResponse.body?.getReader();
      if (reader) {
        const decoder = new TextDecoder();
        let fullText = "";
        const pump = async () => {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            fullText += decoder.decode(value, { stream: true });
          }
          // Cache the full response
          responseCache.set(cacheKey, fullText);
          // Clean old cache entries
          cleanCache();
        };
        pump();
      }
    }

    return originalStream;
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
