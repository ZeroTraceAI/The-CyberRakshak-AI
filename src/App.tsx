import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import FileScan from "./pages/FileScan";
import UrlScan from "./pages/UrlScan";
import DnsScan from "./pages/DnsScan";
import IpScan from "./pages/IpScan";
import DomainScan from "./pages/DomainScan";
import Contact from "./pages/Contact";
import About from "./pages/About";
import EmailScan from "./pages/EmailScan";
import { Layout } from "./components/layout/Layout";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/file-scan" element={<FileScan />} />
                <Route path="/url-scan" element={<UrlScan />} />
                <Route path="/dns-scan" element={<DnsScan />} />
                <Route path="/ip-scan" element={<IpScan />} />
                <Route path="/domain-scan" element={<DomainScan />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/email-scan" element={<EmailScan />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </HelmetProvider>
);

export default App;
