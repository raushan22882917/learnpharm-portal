
import api from './api';

export interface Semester {
  id: number;
  name: string;
  startDate?: string;
  endDate?: string;
  year: string;
  description?: string;
  status: 'active' | 'upcoming' | 'archived';
  subjects?: number;
}

export const semesterService = {
  getAll: async () => {
    const response = await api.get<Semester[]>('/semesters/');
    return response.data;
  },
  
  getById: async (id: number) => {
    const response = await api.get<Semester>(`/semesters/${id}/`);
    return response.data;
  },
  
  create: async (data: Partial<Semester>) => {
    const response = await api.post<Semester>('/semesters/', data);
    return response.data;
  },
  
  update: async (id: number, data: Partial<Semester>) => {
    const response = await api.put<Semester>(`/semesters/${id}/`, data);
    return response.data;
  },
  
  delete: async (id: number) => {
    await api.delete(`/semesters/${id}/`);
  }
};
