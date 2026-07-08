"use client";

import React, { createContext, useContext, useState, useCallback, useRef } from "react";
import Icon from "@/components/Icon";

interface ToastContextValue {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<{ message: string; id: number } | null>(null);
  const idRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const showToast = useCallback((message: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const id = ++idRef.current;
    setToast({ message, id });

    timerRef.current = setTimeout(() => {
      setToast((prev) => (prev?.id === id ? null : prev));
    }, 4000);
  }, []);

  const dismiss = useCallback(() => setToast(null), []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div className={`toast-alert ${toast ? "show" : ""}`}>
          <div className="toast-content" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Icon name="info-circle" size={18} color="#0d9488" />
            <span>{toast.message}</span>
          </div>
          <button className="toast-close" onClick={dismiss}>&times;</button>
        </div>
      )}
    </ToastContext.Provider>
  );
}