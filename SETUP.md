# TierHire - Setup Guide

## Overview
TierHire is a tier-based hiring platform that connects candidates with recruiters through skill-based assessments and rankings.

## Prerequisites
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Installation Steps

### 1. Clone the Repository
```bash
git clone <repository-url>
cd TierHire-main
```

### 2. Database Setup
1. Install PostgreSQL if not already installed
2. Create a new database:
```sql
CREATE DATABASE tier_hiring_platform;
```

### 3. Server Setup
1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the `.env` file with your database credentials and other settings

4. Run database migrations:
```bash
npx sequelize-cli db:migrate
```

5. Start the server:
```bash
npm start
```

Server will run on: http://localhost:5000

### 4. Client Setup
1. Open a new terminal and navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

Client will run on: http://localhost:5173

## Application Structure

### Main Routes

#### Public Routes (No Authentication Required)
- `/` - Home page with platform overview
- `/login` - Candidate login
- `/register` - Candidate registration
- `/recruiter/login` - Recruiter login
- `/recruiter/register` - Recruiter registration
- `/adminlogin` - Admin login

#### Protected Routes (Authentication Required)

**Candidate Routes:**
- `/dashboard` - Candidate dashboard with overview
- `/domains` - View and select domains
- `/domain/:domainId` - Detailed domain dashboard
- `/problems` - Practice coding problems
- `/problem/:problemId` - Solve specific problem
- `/exams` - View available exams
- `/exam/:examId` - Take an exam
- `/contests` - View contests
- `/contest/:contestId` - Participate in contest
- `/performance` - View past performance metrics
- `/profile` - Update candidate profile

**Recruiter Routes:**
- `/recruiter/dashboard` - Recruiter dashboard
- `/recruiter/candidates` - View and filter candidates

**Admin Routes:**
- `/admin` - Create and manage exams/contests

## Navigation Structure

### Navbar (Top)
- **Unauthenticated Users:**
  - Logo (links to home)
  - Home
  - Login
  - Sign Up
  - Recruiter
  - Theme toggle

- **Authenticated Users:**
  - Logo (links to home)
  - Theme toggle
  - Profile dropdown (Profile, Settings, Logout)

### Sidebar (Left - for authenticated users)
- **Candidates:**
  - Dashboard
  - My Domains
  - Practice Problems
  - Exams
  - Contests
  - Performance
  - Profile

- **Recruiters:**
  - Dashboard
  - Candidates

## Features

### For Candidates
1. **Domain Selection**: Choose specialized domains (Web Dev, Data Science, etc.)
2. **Tier System**: Get ranked in tiers based on performance
3. **Assessments**: Take DSA, SQL, and React exams
4. **Contests**: Participate in timed coding contests
5. **Performance Tracking**: View historical performance and rankings

### For Recruiters
1. **Candidate Search**: Find candidates by domain and tier
2. **Job Postings**: Create and manage job listings
3. **Applications**: Review candidate applications

### For Admins
1. **Exam Management**: Create and configure exams
2. **Contest Creation**: Set up timed contests
3. **Problem Management**: Add coding problems

## API Endpoints

### Authentication
- `POST /api/users/register` - Register new candidate
- `POST /api/users/login` - Login
- `POST /api/users/logout` - Logout
- `GET /api/users/me` - Get current user

### Domains
- `GET /api/domains/domains` - Get candidate's domains
- `GET /api/domains/:domainId` - Get domain details

### Problems
- `GET /api/problems` - List all problems
- `GET /api/problems/:id` - Get problem details
- `POST /api/run` - Run code
- `POST /api/submit` - Submit solution

### Exams
- `GET /api/exams` - List exams
- `POST /api/exams/:examId/start` - Start exam

### Contests
- `GET /api/contests` - List contests
- `GET /api/contests/:contestId` - Get contest details

## Troubleshooting

### Server won't start
- Ensure PostgreSQL is running
- Check DATABASE_URL in .env
- Verify port 5000 is available

### Client won't start
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check if port 5173 is available
- Ensure server is running first

### Database errors
- Run migrations: `npx sequelize-cli db:migrate`
- Check database credentials in .env
- Ensure database exists

## Development

### Running in Development Mode
```bash
# Terminal 1 - Server
cd server
npm start

# Terminal 2 - Client
cd client
npm run dev
```

### Building for Production
```bash
cd client
npm run build
```

## Security Notes
- Change JWT secrets in production
- Use strong database passwords
- Enable HTTPS in production
- Keep dependencies updated

## Support
For issues or questions, please check the documentation or contact support.
