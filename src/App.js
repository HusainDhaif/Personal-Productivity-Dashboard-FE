import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import TaskForm from './pages/TaskForm';
import Notes from './pages/Notes';
import NoteForm from './pages/NoteForm';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/tasks/new"
            element={isAuthenticated ? <TaskForm /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/tasks/:id/edit"
            element={isAuthenticated ? <TaskForm /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/notes"
            element={isAuthenticated ? <Notes /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/notes/new"
            element={isAuthenticated ? <NoteForm /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/notes/:id/edit"
            element={isAuthenticated ? <NoteForm /> : <Navigate to="/login" replace />}
          />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

