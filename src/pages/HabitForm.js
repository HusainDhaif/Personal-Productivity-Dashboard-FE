import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import apiCall from '../services/api';
import './HabitForm.css';

function HabitForm() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadHabit = async () => {
      if (!isEditing) return;
      
      setLoading(true);
      setError('');
      
      try {
        const data = await apiCall(`/habits/${id}`, 'GET');
        console.log('Habit loaded for editing:', data);
        setName(data.name || '');
        setDescription(data.description || '');
        setFrequency(data.frequency || '');
      } catch (err) {
        console.error('Error loading habit:', err);
        setError(err.message || 'Could not load habit.');
      } finally {
        setLoading(false);
      }
    };

    loadHabit();
  }, [id, isEditing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = { name, description, frequency };
      
      if (isEditing) {
        await apiCall(`/habits/${id}`, 'PUT', payload);
        console.log('Habit updated:', id);
      } else {
        await apiCall('/habits', 'POST', payload);
        console.log('Habit created successfully');
      }
      
      navigate('/habits');
    } catch (err) {
      console.error('Error saving habit:', err);
      setError(err.message || 'Could not save habit.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="habitform-container">
        <div className="habitform-header">
          <h2>{isEditing ? 'Edit Habit' : 'Add New Habit'}</h2>
          <Link to="/habits" className="secondary-btn">
            Back to Habits
          </Link>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="habitform">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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

          <div className="form-group">
            <label htmlFor="frequency">Frequency</label>
            <input
              id="frequency"
              type="text"
              placeholder="e.g., Daily, Weekly"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
            />
          </div>

          <button type="submit" className="primary-btn" disabled={loading}>
            {loading ? 'Saving...' : isEditing ? 'Update Habit' : 'Add Habit'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default HabitForm;

