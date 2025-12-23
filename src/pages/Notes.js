import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import apiCall from '../services/api';
import './Notes.css';

function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await apiCall('/notes', 'GET');
        setNotes(data || []);
      } catch (err) {
        setError(err.message || 'Could not load notes.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const handleDelete = async (noteId) => {
    try {
      await apiCall(`/notes/${noteId}`, 'DELETE');
      setNotes((prev) => prev.filter((note) => note.id !== noteId));
    } catch (err) {
      setError(err.message || 'Could not delete note.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="notes-container">
        <div className="notes-header">
          <h2>Your Notes</h2>
          <Link to="/notes/new" className="primary-btn">
            Add Note
          </Link>
        </div>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <p>Loading notes...</p>
        ) : notes.length === 0 ? (
          <p>No notes found.</p>
        ) : (
          <ul className="notes-list">
            {notes.map((note) => (
              <li key={note.id} className="note-item">
                <div>
                  <h4>{note.title}</h4>
                  <p>{note.content}</p>
                </div>
                <div className="note-actions">
                  <Link to={`/notes/${note.id}/edit`} className="secondary-btn">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(note.id)} className="delete-btn">
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

export default Notes;

