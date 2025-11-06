import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PromotionalGifts from "./pages/PromotionalGifts";
import CorporateGifts from "./pages/CorporateGifts";
import OccasionalGifts from "./pages/OccasionalGifts";
import Blog from "./pages/Blog";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import SignIn from "./pages/SignIn";
import BulkOrder from "./pages/BulkOrder";
import Profile from "./pages/Profile";
import Terms from "./pages/Terms";
import NavBar from "./components/site/NavBar";
import Footer from "./components/site/Footer";
import Privacy from "./pages/Privacy";
import ScrollToTop from "./components/site/ScrollToTop";

const queryClient = new QueryClient();

import { CartProvider } from "./context/cart";
import { AuthProvider } from "./context/auth";
function Layout() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-background text-foreground">
          <NavBar />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/bulk-order" element={<BulkOrder />} />
            <Route path="/promotional-gifts" element={<PromotionalGifts />} />
            <Route path="/corporate-gifts" element={<CorporateGifts />} />
            <Route path="/occasional-gifts" element={<OccasionalGifts />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
