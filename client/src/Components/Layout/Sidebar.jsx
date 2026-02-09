import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Home, 
  Code, 
  Trophy, 
  Users, 
  Briefcase, 
  BarChart3, 
  Settings,
  History,
  FileText,
  Target,
  Calendar,
  Star,
  BookOpen,
  Zap,
  Layout,
  PlayCircle,
  Award,
  TrendingUp
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const candidateMenuItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard', description: 'Overview & Stats' },
    { path: '/domains', icon: Target, label: 'My Domains', description: 'Domain Performance' },
    { path: '/domain-selection', icon: BookOpen, label: 'Select Domains', description: 'Choose New Domains' },
    { path: '/problems', icon: Code, label: 'Practice Problems', description: 'Coding Challenges' },
    { path: '/exams', icon: FileText, label: 'Exams', description: 'Assessment Tests' },
    { path: '/contests', icon: Trophy, label: 'Contests', description: 'Compete & Rank' },
    { path: '/performance', icon: History, label: 'Performance', description: 'Past Results' },
    { path: '/code-runner', icon: PlayCircle, label: 'Code Runner', description: 'Test Code Live' },
    { path: '/sql-runner', icon: Zap, label: 'SQL Runner', description: 'Test SQL Queries' },
    { path: '/profile', icon: Settings, label: 'Profile', description: 'Edit Profile' }
  ];

  const recruiterMenuItems = [
    { path: '/recruiter/dashboard', icon: Home, label: 'Dashboard', description: 'Overview' },
    { path: '/recruiter/candidates', icon: Users, label: 'Candidates', description: 'Browse Talent' },
    { path: '/profile', icon: Settings, label: 'Profile', description: 'Account Settings' }
  ];

  const menuItems = user?.role === 'RECRUITER' ? recruiterMenuItems : candidateMenuItems;

  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <div className="sidebar-header">
          <h3 className="sidebar-title">
            {user?.role === 'RECRUITER' ? 'Recruiter Panel' : 'Candidate Panel'}
          </h3>
        </div>

        <nav className="sidebar-nav">
          <ul className="sidebar-menu">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path} className="sidebar-item">
                  <Link
                    to={item.path}
                    className={`sidebar-link ${isActive(item.path) ? 'active' : ''}`}
                    title={item.description}
                  >
                    <Icon size={20} className="sidebar-icon" />
                    <div className="sidebar-link-content">
                      <span className="sidebar-label">{item.label}</span>
                      {item.description && (
                        <span className="sidebar-description">{item.description}</span>
                      )}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
