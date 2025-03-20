
import api from './api';

export interface Subject {
  id: number;
  name: string;
  code: string;
  semester: number;
  year: string;
  topics: number;
}

export interface Topic {
  id: number;
  name: string;
  subject: number;
  description?: string;
  is_active: boolean;
}

export interface StudyMaterial {
  id: number;
  title: string;
  material_type: 'theory' | 'practical' | 'interactive';
  content?: string;
  file?: string;
  subtopic: number;
  topic: number;
  content_tab?: number;
  date: string;
  size: string;
}

export const contentService = {
  // Subjects
  getAllSubjects: async () => {
    const response = await api.get<Subject[]>('/subjects/');
    return response.data;
  },
  
  getSubjectById: async (id: number) => {
    const response = await api.get<Subject>(`/subjects/${id}/`);
    return response.data;
  },
  
  createSubject: async (data: Partial<Subject>) => {
    const response = await api.post<Subject>('/subjects/', data);
    return response.data;
  },
  
  updateSubject: async (id: number, data: Partial<Subject>) => {
    const response = await api.put<Subject>(`/subjects/${id}/`, data);
    return response.data;
  },
  
  deleteSubject: async (id: number) => {
    await api.delete(`/subjects/${id}/`);
  },
  
  // Topics
  getAllTopics: async (subjectId?: number) => {
    const url = subjectId ? `/topics/?subject=${subjectId}` : '/topics/';
    const response = await api.get<Topic[]>(url);
    return response.data;
  },
  
  getTopicById: async (id: number) => {
    const response = await api.get<Topic>(`/topics/${id}/`);
    return response.data;
  },
  
  createTopic: async (data: Partial<Topic>) => {
    const response = await api.post<Topic>('/topics/', data);
    return response.data;
  },
  
  updateTopic: async (id: number, data: Partial<Topic>) => {
    const response = await api.put<Topic>(`/topics/${id}/`, data);
    return response.data;
  },
  
  deleteTopic: async (id: number) => {
    await api.delete(`/topics/${id}/`);
  },
  
  // Study Materials
  getAllStudyMaterials: async (params?: {
    search?: string;
    material_type?: 'theory' | 'practical' | 'interactive';
    topic?: number;
    subtopic?: number;
  }) => {
    const response = await api.get<StudyMaterial[]>('/study-materials/', { params });
    return response.data;
  },
  
  getStudyMaterialById: async (id: number) => {
    const response = await api.get<StudyMaterial>(`/study-materials/${id}/`);
    return response.data;
  },
  
  createStudyMaterial: async (data: FormData) => {
    const response = await api.post<StudyMaterial>('/study-materials/', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  updateStudyMaterial: async (id: number, data: FormData) => {
    const response = await api.put<StudyMaterial>(`/study-materials/${id}/`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  deleteStudyMaterial: async (id: number) => {
    await api.delete(`/study-materials/${id}/`);
  }
};
