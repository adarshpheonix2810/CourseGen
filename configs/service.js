// API Base URL
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// API Endpoints
export const ENDPOINTS = {
  COURSES: '/courses',
  CHAPTERS: (courseId) => `/courses/${courseId}/chapters`,
  CHAPTER_CONTENT: (courseId, chapterId) => `/courses/${courseId}/chapters/${chapterId}`,
  GENERATE_COURSE: '/ai/generate-course',
  GENERATE_CHAPTER: '/ai/generate-chapter',
};

// Default headers for API requests
const defaultHeaders = {
  'Content-Type': 'application/json',
};

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

// API Service methods
export const apiService = {
  // GET request
  get: async (url, options = {}) => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'GET',
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      ...options,
    });
    return handleResponse(response);
  },

  // POST request
  post: async (url, data = {}, options = {}) => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'POST',
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      body: JSON.stringify(data),
      ...options,
    });
    return handleResponse(response);
  },

  // PUT request
  put: async (url, data = {}, options = {}) => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'PUT',
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      body: JSON.stringify(data),
      ...options,
    });
    return handleResponse(response);
  },

  // DELETE request
  delete: async (url, options = {}) => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'DELETE',
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      ...options,
    });
    return handleResponse(response);
  },
};

// Default export for backward compatibility
const service = {
  ...apiService,
  endpoints: ENDPOINTS,
};

export default service;
