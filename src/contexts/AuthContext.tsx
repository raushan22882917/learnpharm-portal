
import React, { createContext, useContext, useState, useEffect } from 'react';

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
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration
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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  const login = async (email: string, password: string, role: UserRole): Promise<void> => {
    // This is a mock implementation - in a real app, you would call an API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (role && MOCK_USERS[role]) {
          const mockUser = MOCK_USERS[role];
          setUser(mockUser);
          localStorage.setItem('pharm_learn_user', JSON.stringify(mockUser));
          resolve();
        } else {
          reject(new Error('Invalid credentials or role'));
        }
      }, 800); // Simulate API delay
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pharm_learn_user');
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
        logout
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
