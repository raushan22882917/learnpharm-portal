
import api from './api';

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  user_type: 'admin' | 'principal' | 'faculty' | 'student';
  is_active: boolean;
}

export const userService = {
  getAll: async () => {
    const response = await api.get<User[]>('/user-management/');
    return response.data;
  },
  
  create: async (userData: Partial<User> & { password: string }) => {
    const response = await api.post<User>('/user-management/', userData);
    return response.data;
  },
  
  update: async (id: number, userData: Partial<User>) => {
    const response = await api.put<User>(`/user-management/${id}/`, userData);
    return response.data;
  },
  
  delete: async (id: number) => {
    await api.delete(`/user-management/${id}/`);
  },
  
  toggleActive: async (id: number) => {
    const response = await api.patch(`/user-management/${id}/toggle-active/`);
    return response.data;
  }
};
