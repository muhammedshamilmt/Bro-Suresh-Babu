import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";

const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Ministry = lazy(() => import("./pages/Ministry"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Events = lazy(() => import("./pages/Events"));
const EventDetail = lazy(() => import("./pages/EventDetail"));
const EventRegister = lazy(() => import("./pages/EventRegister"));
const Contact = lazy(() => import("./pages/Contact"));
const GraceCommunity = lazy(() => import("./pages/GraceCommunity"));
const SajithJourney = lazy(() => import("./pages/SajithJourney"));
const TetelestaiCentre = lazy(() => import("./pages/TetelestaiCentre"));
const ChristCentre = lazy(() => import("./pages/ChristCentre"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const BlogEditor = lazy(() => import("./pages/BlogEditor"));
const AdminEventEditor = lazy(() => import("./pages/AdminEventEditor"));
const AdminEventDetail = lazy(() => import("./pages/AdminEventDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/ministry" element={<Ministry />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/events/:id/register" element={<EventRegister />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/grace-community" element={<GraceCommunity />} />
            <Route path="/sajith-journey" element={<SajithJourney />} />
            <Route path="/tetelestai-centre" element={<TetelestaiCentre />} />
            <Route path="/christ-centre" element={<ChristCentre />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/dashboard/blog/new" element={<ProtectedRoute><BlogEditor /></ProtectedRoute>} />
            <Route path="/dashboard/blog/:id/edit" element={<ProtectedRoute><BlogEditor /></ProtectedRoute>} />
            <Route path="/dashboard/events" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/dashboard/events/new" element={<ProtectedRoute><AdminEventEditor /></ProtectedRoute>} />
            <Route path="/dashboard/events/:id" element={<ProtectedRoute><AdminEventDetail /></ProtectedRoute>} />
            <Route path="/dashboard/events/:id/edit" element={<ProtectedRoute><AdminEventEditor /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
