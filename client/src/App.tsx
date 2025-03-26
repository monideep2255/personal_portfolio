import { Suspense, lazy } from "react";
import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import LoadingFallback from "@/components/LoadingFallback";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useAnalytics } from "@/hooks/useAnalytics";

// Lazy load route components
const Home = lazy(() => import("@/pages/Home"));
const Projects = lazy(() => import("@/pages/Projects"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const AdminLogin = lazy(() => import("@/pages/admin/Login"));
const AdminProjects = lazy(() => import("@/pages/admin/Projects"));
const AdminProjectEdit = lazy(() => import("@/pages/admin/ProjectEdit"));
const NotFound = lazy(() => import("@/pages/not-found"));
const AdminAnalytics = lazy(() => import("@/pages/admin/Analytics"));

function Router() {
  // Initialize analytics tracking
  useAnalytics();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/projects" component={Projects} />
              <Route path="/contact" component={Contact} />
              <Route path="/admin/login" component={AdminLogin} />
              <Route path="/admin/projects">
                {() => (
                  <ProtectedRoute>
                    <AdminProjects />
                  </ProtectedRoute>
                )}
              </Route>
              <Route path="/admin/analytics">
                {() => (
                  <ProtectedRoute>
                    <AdminAnalytics />
                  </ProtectedRoute>
                )}
              </Route>
              <Route path="/admin/projects/:id">
                {(params) => (
                  <ProtectedRoute>
                    <AdminProjectEdit params={params} />
                  </ProtectedRoute>
                )}
              </Route>
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <QueryClientProvider client={queryClient}>
        <Router />
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;