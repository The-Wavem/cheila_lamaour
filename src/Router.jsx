import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

// Importações Lazy
const Home = lazy(() => import("@pages/public/Home"));
const Blog = lazy(() => import("@pages/public/Blog"));
const About = lazy(() => import("@pages/public/About"));
const Contact = lazy(() => import("@pages/public/Contact"));
const Training = lazy(() => import("@pages/public/Training"));
const Agenda = lazy(() => import("@sections/contact/agenda"));
const Dashboard = lazy(() => import("@pages/admin/dashboard"));

export default function Router() {
  return (
    /** Suspense apenas como tapa-burado para carregamento assíncrono,
     mais para frente iremos melhorar isso e colocar um componente de loading específico */
    <Suspense fallback={<div>Carregando...</div>}>
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />*/}
        <Route path="/training" element={<Training />} />

        {/* Rotas Admin */}
        {/* <Route path="/admin/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </Suspense>
  );
}