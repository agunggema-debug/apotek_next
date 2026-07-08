"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";

// Dynamic imports for components below the fold
const Categories = dynamic(() => import("@/components/Categories"), {
  loading: () => <div className="container" style={{ height: "200px" }} />,
});

const Products = dynamic(() => import("@/components/Products"), {
  loading: () => <div className="container" style={{ height: "200px" }} />,
});

const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  loading: () => <div className="container" style={{ height: "200px" }} />,
});

const Contact = dynamic(() => import("@/components/Contact"), {
  loading: () => <div className="container" style={{ height: "200px" }} />,
});

const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <div style={{ height: "200px" }} />,
});

const LoginModal = dynamic(() => import("@/components/LoginModal"));

const Chatbot = dynamic(() => import("@/components/Chatbot"));

const ScrollToTop = dynamic(() => import("@/components/ScrollToTop"));

export default function Home() {
  const [loginOpen, setLoginOpen] = useState(false);

  const openLogin = useCallback(() => setLoginOpen(true), []);
  const closeLogin = useCallback(() => setLoginOpen(false), []);

  return (
    <>
      <Header onLoginClick={openLogin} />
      <main>
        <Hero />
        <Services />
        <Categories />
        <Products />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <LoginModal isOpen={loginOpen} onClose={closeLogin} />
      <Chatbot />
      <ScrollToTop />
    </>
  );
}