import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiCall from '../services/api';
import Navbar from '../components/Navbar';
import './Tasks.css';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError('');
      
      try {
        const data = await apiCall('/tasks', 'GET');
        console.log('Tasks fetched:', data);
        setTasks(data || []);
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setError(err.message || 'Could not load tasks.');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await apiCall(`/tasks/${taskId}`, 'DELETE');
      console.log('Task deleted:', taskId);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (err) {
      console.error('Error deleting task:', err);
      setError(err.message || 'Could not delete task.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="tasks-container">
        <div className="tasks-header">
          <h2>Your Tasks</h2>
          <Link to="/tasks/new" className="add-btn">
            Add Task
          </Link>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        {loading ? (
          <p>Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p>No tasks found. Create your first task!</p>
        ) : (
          <ul className="tasks-list">
            {tasks.map((task) => (
              <li key={task.id} className="task-item">
                <div className="task-content">
                  <h4>{task.title}</h4>
                  {task.description && <p>{task.description}</p>}
                </div>
                <div className="task-actions">
                  <Link 
                    to={`/tasks/${task.id}/edit`} 
                    className="edit-btn"
                  >
                    Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(task.id)} 
                    className="delete-btn"
                  >
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

export default Tasks;

