
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PrincipalDashboard from "./pages/principal/PrincipalDashboard";
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            
            {/* Dashboard layout wrapper */}
            <Route path="/" element={<Dashboard />}>
              {/* Admin routes */}
              <Route path="admin" element={<AdminDashboard />} />
              <Route path="admin/*" element={<Navigate to="/admin" />} />
              
              {/* Principal routes */}
              <Route path="principal" element={<PrincipalDashboard />} />
              <Route path="principal/*" element={<Navigate to="/principal" />} />
              
              {/* Faculty routes */}
              <Route path="faculty" element={<FacultyDashboard />} />
              <Route path="faculty/*" element={<Navigate to="/faculty" />} />
              
              {/* Student routes */}
              <Route path="student" element={<StudentDashboard />} />
              <Route path="student/*" element={<Navigate to="/student" />} />
            </Route>
            
            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
