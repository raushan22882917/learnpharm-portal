import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import EnhancedFooter from '@/components/layout/EnhancedFooter';
import { Check, ArrowRight, BookOpen, Users, School, Award, BarChart, BookOpenCheck, Brain, Layers } from 'lucide-react';

const Index: React.FC = () => {
  const { isAuthenticated, role } = useAuth();
  const navigate = useNavigate();

  // If user is already authenticated, redirect to appropriate dashboard
  React.useEffect(() => {
    if (isAuthenticated && role) {
      navigate(`/${role}`);
    }
  }, [isAuthenticated, role, navigate]);

  const testimonials = [
    {
      quote: "PharmLearn has completely transformed how we deliver our pharmacy curriculum. The interactive tools and content security features are game-changers.",
      author: "Dr. Sarah Johnson",
      role: "Principal, National College of Pharmacy",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
    },
    {
      quote: "As a faculty member, I appreciate how easy it is to upload content and track student progress. The CSV upload feature saves me hours of work.",
      author: "Prof. Michael Chen",
      role: "Senior Faculty, Westside Pharmacy Institute",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
    },
    {
      quote: "The interactive compiler has helped me understand complex concepts much better than traditional learning methods. I'm more confident in my practical skills now.",
      author: "Priya Sharma",
      role: "3rd Year Student, Eastern Pharmacy College",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900 transition-colors duration-300">
      <Navbar />

      <main className="flex-1 relative overflow-hidden">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-[10%] left-[5%] w-72 h-72 bg-primary/10 dark:bg-primary/5 rounded-full filter blur-3xl opacity-70 animate-pulse-slow"></div>
            <div className="absolute bottom-[10%] right-[5%] w-80 h-80 bg-blue-400/10 dark:bg-blue-400/5 rounded-full filter blur-3xl opacity-70 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="container mx-auto px-4 py-20 md:py-28">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="order-2 md:order-1 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <h1 className="heading-large text-gradient mb-6">
                  Pharmacy Learning Platform
                </h1>
                <p className="text-lg mb-8 text-muted-foreground">
                  A comprehensive learning solution designed for pharmacy students, faculty, and administrators. Access study materials, practical content, and interactive tools to enhance your educational journey.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" onClick={() => navigate('/login')}>
                    Get Started
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => navigate('/signup')}>
                    Sign Up Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="order-1 md:order-2 flex justify-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-400/20 rounded-2xl filter blur-xl opacity-70"></div>
                  <div className="glass-card relative overflow-hidden rounded-2xl p-3 shadow-xl animate-float">
                    <img 
                      src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                      alt="Pharmacy Education" 
                      className="rounded-lg shadow-sm w-full max-w-md object-cover"
                      width={500}
                      height={300}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/30 dark:bg-gray-800/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fade-in">
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
                  icon: <Layers className="h-6 w-6" />,
                },
                {
                  title: "Interactive Learning",
                  description: "Engage with interactive content and practical exercises.",
                  icon: <Brain className="h-6 w-6" />,
                },
                {
                  title: "Secure Platform",
                  description: "Your educational content is protected with advanced security features.",
                  icon: <BookOpenCheck className="h-6 w-6" />,
                },
              ].map((feature, index) => (
                <div key={index} className="glass-panel p-6 transition-all duration-300 hover:shadow-lg animate-fade-in" style={{ animationDelay: `${0.1 * index}s` }}>
                  <div className="mb-4 text-primary">{feature.icon}</div>
                  <h3 className="heading-small mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* For Each Role Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fade-in">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Tailored for Everyone
              </div>
              <h2 className="heading-medium mb-4">
                Specialized Features for Every Role
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                PharmLearn offers dedicated tools and workflows designed for each user type.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="glass-card p-6 border border-primary/10 hover:border-primary/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">For Faculty</h3>
                <ul className="space-y-3">
                  {[
                    "Map students to semesters via CSV uploads",
                    "Track student progress and engagement",
                    "Upload and manage course content",
                    "Provide feedback on curriculum",
                    "Create interactive learning materials"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass-card p-6 border border-primary/10 hover:border-primary/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">For Students</h3>
                <ul className="space-y-3">
                  {[
                    "Access semester-specific content",
                    "Engage with interactive learning tools",
                    "View theory and practical materials",
                    "Use integrated compiler for scripts",
                    "Track your learning progress",
                    "Submit feedback on course material"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass-card p-6 border border-primary/10 hover:border-primary/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <School className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">For Principals</h3>
                <ul className="space-y-3">
                  {[
                    "Set up and customize college profiles",
                    "Assign faculty to manage students",
                    "Track student payments and access",
                    "View analytics and performance data",
                    "Submit institutional feedback",
                    "Manage college-wide settings"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-muted/30 dark:bg-gray-800/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Testimonials
              </div>
              <h2 className="heading-medium mb-4">
                What Our Users Say
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Hear from pharmacy educators and students who have transformed their learning experience.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="glass-card p-6 border dark:border-gray-800">
                  <div className="flex flex-col h-full">
                    <div className="mb-6">
                      <blockquote className="text-muted-foreground italic">"{testimonial.quote}"</blockquote>
                    </div>
                    <div className="mt-auto flex items-center">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.author} 
                        className="w-12 h-12 rounded-full object-cover mr-4" 
                      />
                      <div>
                        <h4 className="font-medium">{testimonial.author}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="glass-card p-12 dark:bg-gray-800/50 rounded-2xl">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {[
                  { value: "50+", label: "Colleges", icon: <School className="h-6 w-6 mb-2 mx-auto text-primary" /> },
                  { value: "5,000+", label: "Students", icon: <Users className="h-6 w-6 mb-2 mx-auto text-primary" /> },
                  { value: "500+", label: "Courses", icon: <BookOpen className="h-6 w-6 mb-2 mx-auto text-primary" /> },
                  { value: "97%", label: "Satisfaction", icon: <Award className="h-6 w-6 mb-2 mx-auto text-primary" /> }
                ].map((stat, index) => (
                  <div key={index} className="flex flex-col items-center">
                    {stat.icon}
                    <div className="text-3xl font-bold">{stat.value}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary/10 to-blue-500/10 dark:from-primary/5 dark:to-blue-500/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="heading-medium mb-6">Ready to Transform Pharmacy Education?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join PharmLearn today and experience a new way of learning and teaching pharmacy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigate('/signup')}>
                Sign Up Now
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate('/login')}>
                Sign In
              </Button>
            </div>
          </div>
        </section>
      </main>

      <EnhancedFooter />
    </div>
  );
};

export default Index;
