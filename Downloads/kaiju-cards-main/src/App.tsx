import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom"; // ใช้ HashRouter
import Layout from "@/components/Layout";
import Dashboard from "@/pages/Dashboard";
import AnimeList from "@/pages/AnimeList";
import AnimeForm from "@/pages/AnimeForm";
import GenreManagement from "@/pages/GenreManagement";
import NotFound from "@/pages/NotFound";
import { AnimeProvider } from "@/contexts/AnimeContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <AnimeProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/anime" element={<AnimeList />} />
              <Route path="/anime/add" element={<AnimeForm />} />
              <Route path="/anime/edit/:id" element={<AnimeForm />} />
              <Route path="/genres" element={<GenreManagement />} />
              {/* ตัวจับทุก route ที่ไม่ตรง */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </AnimeProvider>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
