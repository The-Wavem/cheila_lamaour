import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LoadingScreen from "./components/ui/guards/LoadingScreen";
import ProtectedRoute from "./components/ui/guards/ProtectedRoute";
import PublicOnlyRoute from "./components/ui/guards/PublicOnlyRoute";

// Importações Lazy
const Home = lazy(() => import("@pages/public/Home"));
const Blog = lazy(() => import("@pages/public/Blog"));
const Servicos = lazy(() => import("@pages/public/Servicos"));
const Dashboard = lazy(() => import("@pages/admin/dashboard"));
const BlogManager = lazy(() => import("@pages/admin/BlogManager"));
const AdminLayout = lazy(() => import("@components/layout/AdminLayout"));
const BlogEditorPage = lazy(() => import("@pages/admin/BlogEditorPage"));
const LeadsManager = lazy(() => import("@pages/admin/LeadsManager"));
const SiteEditor = lazy(() => import("@pages/admin/SiteEditor"));
const LoginPage = lazy(() => import("@pages/admin/LoginPage"));

export default function Router() {
  return (
    /** Suspense apenas como tapa-burado para carregamento assíncrono,
     mais para frente iremos melhorar isso e colocar um componente de loading específico */
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/servicos" element={<Servicos />} />

        <Route
          path="/admin/login"
          element={
            <PublicOnlyRoute>
              <Suspense fallback={<LoadingScreen />}>
                <LoginPage />
              </Suspense>
            </PublicOnlyRoute>
          }
        />

        {/* Rotas Admin */}
        <Route element={<ProtectedRoute />}>
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
        </Route>
      </Routes>
    </Suspense>
  );
}