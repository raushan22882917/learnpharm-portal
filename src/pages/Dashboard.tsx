
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import { secureContent } from '@/utils/security';
import { cn } from '@/lib/utils';

const Dashboard: React.FC = () => {
  const { isAuthenticated, role } = useAuth();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }

    // Apply security measures to protected content
    const cleanupSecurity = secureContent('.secure-content');
    
    return () => {
      // Clean up security measures when component unmounts
      cleanupSecurity();
    };
  }, [isAuthenticated, navigate]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
      
      <div className={cn(
        "flex flex-col flex-1 transition-all duration-300", 
        sidebarCollapsed ? "app-main sidebar-collapsed" : "app-main"
      )}>
        <Header toggleSidebar={toggleSidebar} sidebarCollapsed={sidebarCollapsed} />
        
        <main className="flex-1 px-4 py-6 md:px-6 lg:px-8">
          <Outlet />
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
