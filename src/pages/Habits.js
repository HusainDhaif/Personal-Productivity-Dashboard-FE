import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import apiCall from '../services/api';
import './Habits.css';

function Habits() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHabits = async () => {
      setLoading(true);
      setError('');
      
      try {
        const data = await apiCall('/habits', 'GET');
        console.log('Habits fetched:', data);
        setHabits(data || []);
      } catch (err) {
        console.error('Error fetching habits:', err);
        setError(err.message || 'Could not load habits.');
      } finally {
        setLoading(false);
      }
    };

    fetchHabits();
  }, []);

  const handleDelete = async (habitId) => {
    if (!window.confirm('Are you sure you want to delete this habit?')) {
      return;
    }

    try {
      await apiCall(`/habits/${habitId}`, 'DELETE');
      console.log('Habit deleted:', habitId);
      setHabits((prev) => prev.filter((habit) => habit.id !== habitId));
    } catch (err) {
      console.error('Error deleting habit:', err);
      setError(err.message || 'Could not delete habit.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="habits-container">
        <div className="habits-header">
          <h2>Your Habits</h2>
          <Link to="/habits/new" className="primary-btn">
            Add Habit
          </Link>
        </div>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <p>Loading habits...</p>
        ) : habits.length === 0 ? (
          <p>No habits found. Create your first habit!</p>
        ) : (
          <ul className="habits-list">
            {habits.map((habit) => (
              <li key={habit.id} className="habit-item">
                <div>
                  <h4>{habit.name}</h4>
                  <p>{habit.description}</p>
                  {habit.frequency && <small>Frequency: {habit.frequency}</small>}
                </div>
                <div className="habit-actions">
                  <Link to={`/habits/${habit.id}/edit`} className="secondary-btn">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(habit.id)} className="delete-btn">
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Habits;

