import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';

// Import Layout Components
import Layout from './Components/Layout/Layout';

// Import Public Pages
import Home from './Pages/Home/Home';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import RecruiterRegister from './Pages/Auth/RecruiterRegister';
import RecruiterLogin from './Pages/Auth/RecruiterLogin';
import AdminLogin from './Pages/Auth/AdminLogin';

// Import Dashboard Pages
import Dashboard from './Pages/Dashboard/Dashboard';
import PastPerformance from './Pages/Dashboard/PastPerformance';
import UpdateDashboard from './Pages/UpdateDashboard';

// Import Domain Pages
import DomainsList from './CandidateDomainDashboard';
import DomainSelection from './Pages/DomainSelection';
import DomainDash from './DomainDash';
import DomainDashboard from './Pages/DomainDashboard';
import TierDashboard from './Pages/TierDashboard';

// Import Problem Pages (from root src)
import ProblemLobby from './Pages/Problem/ProblemLobby';
import ProblemView from './Pages/Problem/ProblemView';

// Import Exam Pages
import ExamLobby from './Exam/ExamLobby';
import ExamView from './Exam/ExamView';
import ExamSystem from './Pages/ExamSystem';
import DsaExam from './Exam/DsaExam';
import SqlExam from './Exam/SqlExam';
import ReactExam from './Exam/ReactExam';
import AdminAccess from './Exam/AdminAcess';

// Import Contest Pages
import ContestLobby from './Contests/ContestLobby';
import ContestView from './Contests/ContestView';

// Import Recruiter Pages
import RecruiterDashboard from './Pages/Recruiter/RecruiterDashboard';
import RecCandidates from './Pages/Recruiter/RecCandidates';

// Import Utility Pages
import CodeRunner from './Pages/CodeRunner';
import SQLRunner from './Pages/SQLRunner';
import ProtectedRoute from './Pages/Auth/ProtectedRoute';

import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/recruiter/login" element={<RecruiterLogin />} />
              <Route path="/recruiter/register" element={<RecruiterRegister />} />
              <Route path="/adminlogin" element={<AdminLogin />} />

            <Route element={<ProtectedRoute/>}>
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminAccess />} />
              
              <Route element={<Layout />}>
                {/* Dashboard Routes */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/performance" element={<PastPerformance />} />
                <Route path="/profile" element={<UpdateDashboard />} />
                
                {/* Domain Routes */}
                <Route path="/domains" element={<DomainsList />} />
                <Route path="/domain-selection" element={<DomainSelection />} />
                <Route path="/domain/:domainId" element={<DomainDash />} />
                <Route path="/domain/:domainId/dashboard" element={<DomainDashboard />} />
                <Route path="/domain/:domainId/tier" element={<TierDashboard />} />
                
                {/* Problem/Practice Routes */}
                <Route path="/problems" element={<ProblemLobby />} />
                <Route path="/problem/:problemId" element={<ProblemView />} />
                
                {/* Exam Routes */}
                <Route path="/exams" element={<ExamLobby />} />
                <Route path="/exam/:examId" element={<ExamView />} />
                <Route path="/exam/:examId/take" element={<ExamSystem />} />
                <Route path="/exam/dsa/:examId" element={<DsaExam />} />
                <Route path="/exam/sql/:examId" element={<SqlExam />} />
                <Route path="/exam/react/:examId" element={<ReactExam />} />
                
                {/* Contest Routes */}
                <Route path="/contests" element={<ContestLobby />} />
                <Route path="/contest/:contestId" element={<ContestView />} />
                
                {/* Utility Routes */}
                <Route path="/code-runner" element={<CodeRunner />} />
                <Route path="/sql-runner" element={<SQLRunner />} />
                
                {/* Recruiter Routes */}
                <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
                <Route path="/recruiter/candidates" element={<RecCandidates />} />
              </Route>
            </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;