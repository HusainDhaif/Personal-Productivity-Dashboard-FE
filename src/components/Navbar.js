import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const handleLogout = () => {
    // Logout logic will be added later
    console.log('Logout clicked');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/dashboard">Productivity Dashboard</Link>
      </div>
      <div className="navbar-links">
        <Link to="/dashboard">Dashboard</Link>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

