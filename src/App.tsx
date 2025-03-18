
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminColleges from "./pages/admin/AdminColleges";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminContent from "./pages/admin/AdminContent";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminSettings from "./pages/admin/AdminSettings";

// Principal pages
import PrincipalDashboard from "./pages/principal/PrincipalDashboard";
import PrincipalCollege from "./pages/principal/PrincipalCollege";
import PrincipalFaculty from "./pages/principal/PrincipalFaculty";
import PrincipalStudents from "./pages/principal/PrincipalStudents";
import PrincipalFeedback from "./pages/principal/PrincipalFeedback";

// Faculty pages
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import FacultyStudents from "./pages/faculty/FacultyStudents";
import FacultyContent from "./pages/faculty/FacultyContent";
import FacultyFeedback from "./pages/faculty/FacultyFeedback";

// Student pages
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentCourses from "./pages/student/StudentCourses";
import StudentPractical from "./pages/student/StudentPractical";
import StudentFeedback from "./pages/student/StudentFeedback";

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
              <Route path="admin/colleges" element={<AdminColleges />} />
              <Route path="admin/users" element={<AdminUsers />} />
              <Route path="admin/content" element={<AdminContent />} />
              <Route path="admin/analytics" element={<AdminAnalytics />} />
              <Route path="admin/settings" element={<AdminSettings />} />
              <Route path="admin/*" element={<Navigate to="/admin" />} />
              
              {/* Principal routes */}
              <Route path="principal" element={<PrincipalDashboard />} />
              <Route path="principal/college" element={<PrincipalCollege />} />
              <Route path="principal/faculty" element={<PrincipalFaculty />} />
              <Route path="principal/students" element={<PrincipalStudents />} />
              <Route path="principal/feedback" element={<PrincipalFeedback />} />
              <Route path="principal/*" element={<Navigate to="/principal" />} />
              
              {/* Faculty routes */}
              <Route path="faculty" element={<FacultyDashboard />} />
              <Route path="faculty/students" element={<FacultyStudents />} />
              <Route path="faculty/content" element={<FacultyContent />} />
              <Route path="faculty/feedback" element={<FacultyFeedback />} />
              <Route path="faculty/*" element={<Navigate to="/faculty" />} />
              
              {/* Student routes */}
              <Route path="student" element={<StudentDashboard />} />
              <Route path="student/courses" element={<StudentCourses />} />
              <Route path="student/practical" element={<StudentPractical />} />
              <Route path="student/feedback" element={<StudentFeedback />} />
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
