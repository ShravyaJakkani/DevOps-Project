// src/api/blogs.js
import api from './axios';

export const getBlogs = () => api.get('/blogs');
export const getBlog = (id) => api.get(`/blogs/${id}`);
export const createBlog = (formData) => api.post('/blogs', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
export const deleteBlog = (id) => api.delete(`/blogs/${id}`);