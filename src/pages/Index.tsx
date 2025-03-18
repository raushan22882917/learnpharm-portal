
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/auth/LoginForm';
import { Button } from '@/components/ui/button';
import Footer from '@/components/layout/Footer';

const Index: React.FC = () => {
  const { isAuthenticated, role } = useAuth();
  const navigate = useNavigate();

  // If user is already authenticated, redirect to appropriate dashboard
  React.useEffect(() => {
    if (isAuthenticated && role) {
      navigate(`/${role}`);
    }
  }, [isAuthenticated, role, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white/80 backdrop-blur-md border-b border-border z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
              PharmLearn
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-[10%] left-[5%] w-72 h-72 bg-primary/10 rounded-full filter blur-3xl opacity-70 animate-pulse-slow"></div>
          <div className="absolute bottom-[10%] right-[5%] w-80 h-80 bg-blue-400/10 rounded-full filter blur-3xl opacity-70 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto px-4 py-12 md:py-24">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <h1 className="heading-large text-gradient mb-6">
                Pharmacy Learning Platform
              </h1>
              <p className="text-lg mb-8 text-muted-foreground">
                A comprehensive learning solution designed for pharmacy students, faculty, and administrators. Access study materials, practical content, and interactive tools to enhance your educational journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" onClick={() => document.getElementById('login-section')?.scrollIntoView({ behavior: 'smooth' })}>
                  Get Started
                </Button>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </div>
            </div>

            <div className="order-1 md:order-2 flex justify-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-400/20 rounded-2xl filter blur-xl opacity-70"></div>
                <div className="glass-card relative overflow-hidden rounded-2xl p-6 shadow-xl animate-float">
                  <img 
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                    alt="Pharmacy Education" 
                    className="rounded-lg shadow-sm"
                    width={500}
                    height={300}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="py-20">
            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Features
              </div>
              <h2 className="heading-medium mb-4">
                A Complete Learning Experience
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our platform provides everything you need to excel in your pharmacy education.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Structured Content",
                  description: "Access organized study materials arranged by semester, subject, and topic.",
                  icon: "📚",
                },
                {
                  title: "Interactive Learning",
                  description: "Engage with interactive content and practical exercises.",
                  icon: "🧪",
                },
                {
                  title: "Secure Platform",
                  description: "Your educational content is protected with advanced security features.",
                  icon: "🔒",
                },
              ].map((feature, index) => (
                <div key={index} className="glass-panel p-6 transition-all duration-300 hover:shadow-lg animate-fade-in" style={{ animationDelay: `${0.1 * index}s` }}>
                  <div className="mb-4 text-3xl">{feature.icon}</div>
                  <h3 className="heading-small mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div id="login-section" className="py-16">
            <div className="text-center mb-10">
              <h2 className="heading-medium mb-4">Sign In to Your Account</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Access your personalized dashboard based on your role.
              </p>
            </div>
            
            <LoginForm />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
