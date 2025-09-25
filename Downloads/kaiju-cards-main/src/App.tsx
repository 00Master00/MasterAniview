import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";
import Dashboard from "@/pages/Dashboard";
import AnimeList from "@/pages/AnimeList";
import AnimeForm from "@/pages/AnimeForm";
import AnimeDetail from "@/pages/AnimeDetail";
import GenreManagement from "@/pages/GenreManagement";
import GenreAnimeList from "@/pages/GenreAnimeList";
import Login from "@/pages/Login";
import NotFound from "./pages/NotFound";
import { AnimeProvider } from "@/contexts/AnimeContext";
import { AuthProvider } from "@/contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={
              <ProtectedRoute>
                <AnimeProvider>
                  <Layout>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/anime" element={<AnimeList />} />
                      <Route path="/anime/add" element={<AnimeForm />} />
                      <Route path="/anime/edit/:id" element={<AnimeForm />} />
                      <Route path="/anime/:id" element={<AnimeDetail />} />
                      <Route path="/genres" element={<GenreManagement />} />
                      <Route path="/genres/:genreName/anime" element={<GenreAnimeList />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Layout>
                </AnimeProvider>
              </ProtectedRoute>
            } />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
