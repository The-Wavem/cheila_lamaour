import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

// Importações Lazy
const Home = lazy(() => import("@pages/public/Home"));
const About = lazy(() => import("@pages/public/About"));
const Contact = lazy(() => import("@pages/public/Contact"));
const Training = lazy(() => import("@pages/public/Training"));
const Dashboard = lazy(() => import("@pages/admin/dashboard"));
const AdminLayout = lazy(() => import("@components/layout/AdminLayout"));

export default function Router() {
  return (
    /** Suspense apenas como tapa-burado para carregamento assíncrono,
     mais para frente iremos melhorar isso e colocar um componente de loading específico */
    <Suspense fallback={<div>Carregando...</div>}>
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/contact" element={<Contact />} /> */}
        <Route path="/training" element={<Training />} />

        {/* Rotas Admin */}
        <Route path="/admin" element={<AdminLayout />}>

          {/* O "index" significa que é a rota padrão /admin */}
          <Route index element={<Dashboard />} />

          {/* Futuras rotas (apenas placeholders por enquanto) */}
          <Route path="blog" element={<h1>Gerenciar Blog Aqui</h1>} />
          <Route path="leads" element={<h1>Lista de Leads Aqui</h1>} />
        </Route>
      </Routes>
    </Suspense>
  );
}
