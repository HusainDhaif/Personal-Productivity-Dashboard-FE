import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import apiCall from '../services/api';
import './NoteForm.css';

function NoteForm() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadNote = async () => {
      if (!isEditing) return;
      setLoading(true);
      setError('');
      try {
        const data = await apiCall(`/notes/${id}`, 'GET');
        setTitle(data.title || '');
        setContent(data.content || '');
      } catch (err) {
        setError(err.message || 'Could not load note.');
      } finally {
        setLoading(false);
      }
    };

    loadNote();
  }, [id, isEditing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isEditing) {
        await apiCall(`/notes/${id}`, 'PUT', { title, content });
      } else {
        await apiCall('/notes', 'POST', { title, content });
      }
      navigate('/notes');
    } catch (err) {
      setError(err.message || 'Could not save note.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="noteform-container">
        <div className="noteform-header">
          <h2>{isEditing ? 'Edit Note' : 'Add Note'}</h2>
          <Link to="/notes" className="secondary-btn">
            Back to Notes
          </Link>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="noteform">
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
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="5"
              required
            ></textarea>
          </div>

          <button type="submit" className="primary-btn" disabled={loading}>
            {loading ? 'Saving...' : isEditing ? 'Update Note' : 'Add Note'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default NoteForm;

