
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import SignupForm from '@/components/auth/SignupForm';
import Footer from '@/components/layout/Footer';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';

const Signup: React.FC = () => {
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
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-border z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <a href="/" className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
              PharmLearn
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              <span>Sign In</span>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-[10%] left-[5%] w-72 h-72 bg-primary/10 dark:bg-primary/5 rounded-full filter blur-3xl opacity-70 animate-pulse-slow"></div>
          <div className="absolute bottom-[10%] right-[5%] w-80 h-80 bg-blue-400/10 dark:bg-blue-400/5 rounded-full filter blur-3xl opacity-70 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-center mb-8 text-gradient">Create Your PharmLearn Account</h1>
            <SignupForm />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Signup;
