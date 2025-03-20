
import api from './api';

export interface Subject {
  id: number;
  name: string;
  code: string;
  semester: number;
  year: string;
  topics: number;
  description?: string;
  is_active: boolean;
}

export interface Topic {
  id: number;
  name: string;
  subject: number;
  description?: string;
  is_active: boolean;
}

export interface Subtopic {
  id: number;
  name: string;
  topic: number;
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

export interface InteractiveScript {
  id: number;
  study_material: number;
  script_type: 'html' | 'javascript' | 'python';
  script_content: string;
  is_active: boolean;
}

export interface Feedback {
  id: number;
  user: number;
  content: string;
  study_material?: number;
  practical?: number;
}

export interface SecuritySetting {
  id: number;
  disable_text_selection: boolean;
  disable_right_click: boolean;
  disable_keyboard_shortcuts: boolean;
  disable_inspect_element: boolean;
  secure_pdf_viewer: boolean;
  secure_image_viewer: boolean;
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
  
  // Subtopics
  getAllSubtopics: async (topicId?: number) => {
    const url = topicId ? `/subtopics/?topic=${topicId}` : '/subtopics/';
    const response = await api.get<Subtopic[]>(url);
    return response.data;
  },
  
  getSubtopicById: async (id: number) => {
    const response = await api.get<Subtopic>(`/subtopics/${id}/`);
    return response.data;
  },
  
  createSubtopic: async (data: Partial<Subtopic>) => {
    const response = await api.post<Subtopic>('/subtopics/', data);
    return response.data;
  },
  
  updateSubtopic: async (id: number, data: Partial<Subtopic>) => {
    const response = await api.put<Subtopic>(`/subtopics/${id}/`, data);
    return response.data;
  },
  
  deleteSubtopic: async (id: number) => {
    await api.delete(`/subtopics/${id}/`);
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
  },
  
  // Interactive Scripts
  getAllInteractiveScripts: async () => {
    const response = await api.get<InteractiveScript[]>('/interactive-scripts/');
    return response.data;
  },
  
  getInteractiveScriptById: async (id: number) => {
    const response = await api.get<InteractiveScript>(`/interactive-scripts/${id}/`);
    return response.data;
  },
  
  createInteractiveScript: async (data: Partial<InteractiveScript>) => {
    const response = await api.post<InteractiveScript>('/interactive-scripts/', data);
    return response.data;
  },
  
  updateInteractiveScript: async (id: number, data: Partial<InteractiveScript>) => {
    const response = await api.put<InteractiveScript>(`/interactive-scripts/${id}/`, data);
    return response.data;
  },
  
  deleteInteractiveScript: async (id: number) => {
    await api.delete(`/interactive-scripts/${id}/`);
  },
  
  // Feedback
  getAllFeedback: async () => {
    const response = await api.get<Feedback[]>('/feedback/');
    return response.data;
  },
  
  getFeedbackById: async (id: number) => {
    const response = await api.get<Feedback>(`/feedback/${id}/`);
    return response.data;
  },
  
  createFeedback: async (data: Partial<Feedback>) => {
    const response = await api.post<Feedback>('/feedback/', data);
    return response.data;
  },
  
  // Security Settings
  getSecuritySettings: async () => {
    const response = await api.get<SecuritySetting[]>('/security-settings/');
    return response.data;
  },
  
  updateSecuritySettings: async (id: number, data: Partial<SecuritySetting>) => {
    const response = await api.put<SecuritySetting>(`/security-settings/${id}/`, data);
    return response.data;
  }
};
