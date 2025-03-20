
import api from './api';

export interface College {
  id: number;
  name: string;
  description: string;
  logo?: string;
  website?: string;
  social_media_links?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
  principal?: number;
  status: string;
  students_count?: number;
  faculty_count?: number;
}

export const collegeService = {
  getAll: async () => {
    const response = await api.get<College[]>('/colleges/');
    return response.data;
  },
  
  getById: async (id: number) => {
    const response = await api.get<College>(`/colleges/${id}/`);
    return response.data;
  },
  
  create: async (collegeData: FormData) => {
    const response = await api.post<College>('/colleges/', collegeData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  update: async (id: number, collegeData: FormData) => {
    const response = await api.put<College>(`/colleges/${id}/`, collegeData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  delete: async (id: number) => {
    await api.delete(`/colleges/${id}/`);
  },
  
  toggleActive: async (id: number) => {
    const response = await api.patch(`/colleges/${id}/toggle-active/`);
    return response.data;
  }
};
