
import api from './api';

interface LoginCredentials {
  username: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  user_type: 'admin' | 'principal' | 'faculty' | 'student';
}

interface TokenResponse {
  token: string;
  refresh_token?: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'principal' | 'faculty' | 'student';
    avatar?: string;
  };
}

export const authService = {
  login: async (credentials: LoginCredentials) => {
    const response = await api.post<TokenResponse>('/token/', credentials);
    // Store token and user data
    if (response.data.token) {
      localStorage.setItem('pharm_learn_token', response.data.token);
      if (response.data.refresh_token) {
        localStorage.setItem('pharm_learn_refresh_token', response.data.refresh_token);
      }
      localStorage.setItem('pharm_learn_user', JSON.stringify(response.data.user));
    }
    return response.data;
  },
  
  register: async (data: RegisterData) => {
    const response = await api.post<TokenResponse>('/user-management/', data);
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem('pharm_learn_token');
    localStorage.removeItem('pharm_learn_refresh_token');
    localStorage.removeItem('pharm_learn_user');
  },
  
  refreshToken: async () => {
    const refreshToken = localStorage.getItem('pharm_learn_refresh_token');
    if (refreshToken) {
      const response = await api.post<{token: string}>('/token/refresh/', {
        token: refreshToken,
      });
      
      if (response.data.token) {
        localStorage.setItem('pharm_learn_token', response.data.token);
        return response.data.token;
      }
    }
    throw new Error('No refresh token available');
  },
  
  getCurrentUser: () => {
    const user = localStorage.getItem('pharm_learn_user');
    return user ? JSON.parse(user) : null;
  }
};
