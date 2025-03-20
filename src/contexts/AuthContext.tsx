
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { useToast } from '@/hooks/use-toast';

type UserRole = 'admin' | 'principal' | 'faculty' | 'student' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Used for demo/development purposes when API is not available
const MOCK_USERS = {
  admin: {
    id: 'admin-001',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin' as UserRole,
    avatar: '/admin-avatar.png'
  },
  principal: {
    id: 'principal-001',
    name: 'Principal User',
    email: 'principal@example.com',
    role: 'principal' as UserRole,
    avatar: '/principal-avatar.png'
  },
  faculty: {
    id: 'faculty-001',
    name: 'Faculty User',
    email: 'faculty@example.com',
    role: 'faculty' as UserRole,
    avatar: '/faculty-avatar.png'
  },
  student: {
    id: 'student-001',
    name: 'Student User',
    email: 'student@example.com',
    role: 'student' as UserRole,
    avatar: '/student-avatar.png'
  }
};

// Flag to toggle between mock and real API
const USE_MOCK_API = false; // Set to false to use the real API

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for stored authentication
    const storedUser = localStorage.getItem('pharm_learn_user');
    
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('pharm_learn_user');
      }
    }
    
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      if (USE_MOCK_API) {
        // Mock implementation for development
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            // For testing, use email as username and determine role
            const role = username.includes('admin') ? 'admin' : 
                        username.includes('principal') ? 'principal' : 
                        username.includes('faculty') ? 'faculty' : 'student';
                        
            if (MOCK_USERS[role]) {
              const mockUser = MOCK_USERS[role];
              setUser(mockUser);
              localStorage.setItem('pharm_learn_user', JSON.stringify(mockUser));
              resolve();
            } else {
              reject(new Error('Invalid credentials or role'));
            }
            setIsLoading(false);
          }, 800); // Simulate API delay
        });
      } else {
        // Real API implementation
        const response = await authService.login({ 
          username, 
          password 
        });
        
        setUser(response.user);
        toast({
          title: "Login successful",
          description: `Welcome back, ${response.user.name}`,
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    if (!USE_MOCK_API) {
      authService.logout();
    }
    setUser(null);
    localStorage.removeItem('pharm_learn_user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || null,
        isAuthenticated: !!user,
        login,
        logout,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
