
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import EnhancedFooter from '@/components/layout/EnhancedFooter';
import LoginForm from '@/components/auth/LoginForm';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { isAuthenticated, role } = useAuth();
  const navigate = useNavigate();

  // If user is already authenticated, redirect to appropriate dashboard
  React.useEffect(() => {
    if (isAuthenticated && role) {
      navigate(`/${role}`);
    }
  }, [isAuthenticated, role, navigate]);

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-[10%] left-[5%] w-72 h-72 bg-primary/10 dark:bg-primary/5 rounded-full filter blur-3xl opacity-70 animate-pulse-slow"></div>
          <div className="absolute bottom-[10%] right-[5%] w-80 h-80 bg-blue-400/10 dark:bg-blue-400/5 rounded-full filter blur-3xl opacity-70 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        </div>
      
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="heading-large mb-4">Sign In</h1>
            <p className="text-muted-foreground">
              Access your PharmLearn dashboard to continue your learning journey.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Don't have an account? <a href="/signup" className="text-primary hover:underline">Sign up here</a>
            </p>
          </div>

          <LoginForm />
        </div>
      </main>
      
      <EnhancedFooter />
    </div>
  );
};

export default Login;
