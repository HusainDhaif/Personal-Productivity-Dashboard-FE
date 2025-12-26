import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import TaskForm from './pages/TaskForm';
import Notes from './pages/Notes';
import NoteForm from './pages/NoteForm';
import Habits from './pages/Habits';
import HabitForm from './pages/HabitForm';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/login" 
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Login />
              )
            } 
          />
          <Route 
            path="/register" 
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Register />
              )
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              isAuthenticated ? (
                <Dashboard />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/tasks" 
            element={
              isAuthenticated ? (
                <Tasks />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/tasks/new" 
            element={
              isAuthenticated ? (
                <TaskForm />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/tasks/:id/edit" 
            element={
              isAuthenticated ? (
                <TaskForm />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/notes" 
            element={
              isAuthenticated ? (
                <Notes />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/notes/new" 
            element={
              isAuthenticated ? (
                <NoteForm />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/notes/:id/edit" 
            element={
              isAuthenticated ? (
                <NoteForm />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/habits" 
            element={
              isAuthenticated ? (
                <Habits />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/habits/new" 
            element={
              isAuthenticated ? (
                <HabitForm />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/habits/:id/edit" 
            element={
              isAuthenticated ? (
                <HabitForm />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

