import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  User, 
  LogOut, 
  Settings,
  Bell,
  Search
} from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setIsProfileOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">
            <span className="logo-text">TierHire</span>
          </div>
        </Link>

        {/* Navigation Links */}
        {!isAuthenticated && (
          <div className="navbar-links">
            <Link to="/" className="navbar-link">Home</Link>
            <Link to="/login" className="navbar-link">Login</Link>
            <Link to="/register" className="navbar-link">Sign Up</Link>
            <Link to="/recruiter/login" className="navbar-link">Recruiter</Link>
          </div>
        )}
        {/* Right side actions */}
        <div className="navbar-actions">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="navbar-action-btn"
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {isAuthenticated && (
            <>

              {/* Profile Dropdown */}
              <div className="profile-dropdown">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="profile-btn"
                >
                  <div className="profile-avatar">
                    {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="profile-name">{user?.fullName || user?.username}</span>
                </button>

                {isProfileOpen && (
                  <div className="profile-menu">
                    <Link 
                      to="/profile" 
                      className="profile-menu-item"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <User size={16} />
                      Profile
                    </Link>
                    <Link 
                      to="/settings" 
                      className="profile-menu-item"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Settings size={16} />
                      Settings
                    </Link>
                    <hr className="profile-menu-divider" />
                    <button 
                      onClick={handleLogout}
                      className="profile-menu-item logout-btn"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="navbar-action-btn mobile-menu-toggle"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-content">
            {!isAuthenticated ? (
              <>
                <Link to="/" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
                <Link to="/login" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>Login</Link>
                <Link to="/register" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                <Link to="/recruiter/login" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>Recruiter Login</Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                <Link to="/profile" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>Profile</Link>
                <button onClick={handleLogout} className="mobile-menu-link logout-btn">Logout</button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
