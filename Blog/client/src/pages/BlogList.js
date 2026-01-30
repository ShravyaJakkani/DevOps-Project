// src/pages/BlogList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as blogService from '../api/blogs';
import { useAuth } from '../context/AuthContext';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await blogService.getBlogs();
        setBlogs(response.data.data||[]);
      } catch (err) {
        setError('Failed to fetch blogs');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    
    try {
      await blogService.deleteBlog(id);
      setBlogs(blogs.filter(blog => blog._id !== id));
    } catch (err) {
      console.error('Failed to delete blog:', err);
      alert('Failed to delete blog');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="blog-container">
      <h1>Latest Blog Posts</h1>
      {blogs.length === 0 ? (
        <p>No blog posts yet. Be the first to create one!</p>
      ) : (
        <div className="blog-grid">
          {blogs.map((blog) => (
            <div key={blog._id} className="blog-card">
              {blog.image && (
                <img 
                    src={`${process.env.REACT_APP_API_URL}${blog.image}`} // full backend URL
                    alt={blog.title} 
                    className="blog-image"
  />
              )}
              <h2>{blog.title}</h2>
              <p>{blog.content.substring(0, 150)}...</p>
              <div className="blog-meta">
                <span>By {blog.user?.username || 'Unknown'}</span>
                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
              </div>
              {user && user.id === blog.user?._id && (
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              )}
              {/* <Link to={`/blog/${blog._id}`} className="btn">
                Read More
              </Link> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;