import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Features from "./pages/Features";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ScamCases from "./pages/ScamCases";
import GPSTracking from "./pages/features/GPSTracking";
import CallLogs from "./pages/features/CallLogs";
import ScreenTime from "./pages/features/ScreenTime";
import SuperAdminDashboard from "./pages/dashboard/SuperAdminDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import EmployeeDashboard from "./pages/dashboard/EmployeeDashboard";
import UserDashboard from "./pages/dashboard/UserDashboard";
import MarketingDashboard from "./pages/dashboard/MarketingDashboard";
import SupportDashboard from "./pages/dashboard/SupportDashboard";
import AccountingDashboard from "./pages/dashboard/AccountingDashboard";
import HRDashboard from "./pages/dashboard/HRDashboard";
import Demo from "./pages/Demo";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Refund from "./pages/Refund";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/features" component={Features} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/scam-cases" component={ScamCases} />
      <Route path="/features/gps-tracking" component={GPSTracking} />
      <Route path="/features/call-logs" component={CallLogs} />
      <Route path="/features/screen-time" component={ScreenTime} />
      <Route path="/dashboard/super-admin" component={SuperAdminDashboard} />
      <Route path="/dashboard/admin" component={AdminDashboard} />
      <Route path="/dashboard/employee" component={EmployeeDashboard} />
      <Route path="/dashboard/user" component={UserDashboard} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/terms" component={Terms} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/refund" component={Refund} />
      
      {/* Dashboard routes (without /dashboard prefix) */}
      <Route path="/dashboard" component={UserDashboard} />
      <Route path="/super-admin" component={SuperAdminDashboard} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/employee" component={EmployeeDashboard} />
      <Route path="/marketing" component={MarketingDashboard} />
      <Route path="/support" component={SupportDashboard} />
      <Route path="/accounting" component={AccountingDashboard} />
        <Route path="/hr" component={HRDashboard} />
        <Route path="/demo" component={Demo} />
        <Route path="/try" component={Demo} />
      
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <WhatsAppWidget />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

