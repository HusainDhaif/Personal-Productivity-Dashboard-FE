import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import apiCall from '../services/api';
import './TaskForm.css';

function TaskForm() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTask = async () => {
      if (!isEditing) return;
      
      setLoading(true);
      setError('');
      
      try {
        const data = await apiCall(`/tasks/${id}`, 'GET');
        console.log('Task loaded for editing:', data);
        setTitle(data.title || '');
        setDescription(data.description || '');
      } catch (err) {
        console.error('Error loading task:', err);
        setError(err.message || 'Could not load task.');
      } finally {
        setLoading(false);
      }
    };

    loadTask();
  }, [id, isEditing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isEditing) {
        await apiCall(`/tasks/${id}`, 'PUT', { title, description });
        console.log('Task updated:', id);
      } else {
        await apiCall('/tasks', 'POST', { title, description });
        console.log('Task created successfully');
      }
      
      navigate('/tasks');
    } catch (err) {
      console.error('Error saving task:', err);
      setError(err.message || 'Could not save task.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="taskform-container">
        <div className="taskform-header">
          <h2>{isEditing ? 'Edit Task' : 'Add New Task'}</h2>
          <Link to="/tasks" className="secondary-btn">
            Back to Tasks
          </Link>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="taskform">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              required
            ></textarea>
          </div>

          <button type="submit" className="primary-btn" disabled={loading}>
            {loading ? 'Saving...' : isEditing ? 'Update Task' : 'Add Task'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;

