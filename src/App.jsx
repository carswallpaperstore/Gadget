import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/not-found";
import SEOHead from "./components/SEOHead";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        {/* Changed id → slug */}
        <Route path="/blog/:slug" component={BlogPost} />
        {/* keep NotFound last */}
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          {/* Default SEO for site */}
          <SEOHead
            title="TechGuru India – Latest Tech, Mobile & Gadget Reviews"
            description="Read the latest mobile launches, gadget reviews, and trending technology news on TechGuru India."
            canonical="https://techguruindia.co.in/"
          />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
