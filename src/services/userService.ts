
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

export interface Student {
  id: number;
  user: number;
  college: number;
  semester: number;
  registration_number: string;
  payment_status: boolean;
}

export interface Faculty {
  id: number;
  user: number;
  college: number;
  subjects: number[];
}

export const userService = {
  // User management endpoints
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
  },
  
  // Student management endpoints
  getAllStudents: async (filters?: { college?: number; principal?: number; faculty?: number }) => {
    const response = await api.get<Student[]>('/students/', { params: filters });
    return response.data;
  },
  
  getStudentById: async (id: number) => {
    const response = await api.get<Student>(`/students/${id}/`);
    return response.data;
  },
  
  createStudent: async (studentData: Partial<Student>) => {
    const response = await api.post<Student>('/students/', studentData);
    return response.data;
  },
  
  updateStudent: async (id: number, studentData: Partial<Student>) => {
    const response = await api.put<Student>(`/students/${id}/`, studentData);
    return response.data;
  },
  
  deleteStudent: async (id: number) => {
    await api.delete(`/students/${id}/`);
  },
  
  approveStudentPayment: async (id: number) => {
    const response = await api.post(`/students/${id}/approve-payment/`);
    return response.data;
  },
  
  bulkCreateStudents: async (csvFile: File) => {
    const formData = new FormData();
    formData.append('file', csvFile);
    const response = await api.post('/students/bulk-create/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  // Faculty management endpoints
  getAllFaculty: async () => {
    const response = await api.get<Faculty[]>('/faculty/');
    return response.data;
  },
  
  getFacultyById: async (id: number) => {
    const response = await api.get<Faculty>(`/faculty/${id}/`);
    return response.data;
  },
  
  createFaculty: async (facultyData: Partial<Faculty>) => {
    const response = await api.post<Faculty>('/faculty/', facultyData);
    return response.data;
  },
  
  updateFaculty: async (id: number, facultyData: Partial<Faculty>) => {
    const response = await api.put<Faculty>(`/faculty/${id}/`, facultyData);
    return response.data;
  },
  
  deleteFaculty: async (id: number) => {
    await api.delete(`/faculty/${id}/`);
  },
  
  assignSubjectsToFaculty: async (id: number, subjects: number[]) => {
    const response = await api.post(`/faculty/${id}/assign-subjects/`, { subjects });
    return response.data;
  },
  
  // Admin dashboard statistics
  getDashboardStats: async () => {
    const response = await api.get('/admin/dashboard-stats/');
    return response.data;
  },
  
  filterStudents: async (filters: { college?: number; principal?: number; faculty?: number }) => {
    const response = await api.get('/admin/filter-students/', { params: filters });
    return response.data;
  }
};
