import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import LoadingScreen from "./components/ui/LoadingScreen";

// Importações Lazy
const Home = lazy(() => import("@pages/public/Home"));
const About = lazy(() => import("@pages/public/About"));
const Contact = lazy(() => import("@pages/public/Contact"));
const Training = lazy(() => import("@pages/public/Training"));
const Dashboard = lazy(() => import("@pages/admin/dashboard"));
const BlogManager = lazy(() => import("@pages/admin/BlogManager"));
const AdminLayout = lazy(() => import("@components/layout/AdminLayout"));
const BlogEditorPage = lazy(() => import("@pages/admin/BlogEditorPage"));
const LeadsManager = lazy(() => import("@pages/admin/LeadsManager"));
const SiteEditor = lazy(() => import("@pages/admin/SiteEditor"));

export default function Router() {
  return (
    /** Suspense apenas como tapa-burado para carregamento assíncrono,
     mais para frente iremos melhorar isso e colocar um componente de loading específico */
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/contact" element={<Contact />} /> */}
        <Route path="/training" element={<Training />} />

        {/* Rotas Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* O "index" significa que é a rota padrão /admin */}
          <Route
            index
            element={
              <Suspense fallback={<LoadingScreen />}>
                <Dashboard />
              </Suspense>
            }
          />

          {/* Admin - Blog (Visão Geral) */}
          <Route
            path="blog"
            element={
              <Suspense fallback={<LoadingScreen />}>
                <BlogManager />
              </Suspense>
            }
          />

          {/* Admin - Leads */}
          <Route
            path="leads"
            element={
              <Suspense fallback={<LoadingScreen />}>
                <LeadsManager />
              </Suspense>
            }
          />

          {/* admin - Site Editor */}
          <Route
            path="editor"
            element={
              <Suspense fallback={<LoadingScreen />}>
                <SiteEditor />
              </Suspense>
            }
          />
        </Route>

        {/* Admin - Blog (Editor) */}
        <Route
          path="/admin/blog/novo"
          element={
            <Suspense fallback={<LoadingScreen />}>
              <BlogEditorPage />
            </Suspense>
          }
        />
        <Route
          path="/admin/blog/editar/:id"
          element={
            <Suspense fallback={<LoadingScreen />}>
              <BlogEditorPage />
            </Suspense>
          }
        />
      </Routes>
    </Suspense>
  );
}
