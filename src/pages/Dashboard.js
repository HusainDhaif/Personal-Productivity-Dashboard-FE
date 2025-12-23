import { useEffect, useState } from 'react';
import apiCall from '../services/api';
import Navbar from '../components/Navbar';
import './Dashboard.css';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await apiCall('/tasks', 'GET');
        setTasks(data || []);
      } catch (err) {
        setError(err.message || 'Could not load tasks.');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (taskId) => {
    try {
      await apiCall(`/tasks/${taskId}`, 'DELETE');
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (err) {
      setError(err.message || 'Could not delete task.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="dashboard-container">
        <h2>Your Tasks</h2>
        <div className="dashboard-actions">
          <Link to="/tasks/new" className="primary-btn">
            Add Task
          </Link>
        </div>
        {error && <div className="error-message">{error}</div>}
        {loading ? (
          <p>Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task.id} className="task-item">
                <div>
                  <h4>{task.title}</h4>
                  <p>{task.description}</p>
                </div>
                <div className="task-actions">
                  <Link to={`/tasks/${task.id}/edit`} className="secondary-btn">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(task.id)} className="delete-btn">
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

export default Dashboard;

