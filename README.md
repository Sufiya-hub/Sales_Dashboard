# Admin Dashboard with Analytics & Reporting

## Project Overview

This project is a full-stack Admin Dashboard with responsiveness built using the **MEAN stack (MongoDB, Express.js, Angular, Node.js)**.
It provides analytics, reporting, and admin control features such as user management, real-time metrics visualization, and secure authentication.

The application simulates a real-world admin panel used in CRM and analytics platforms where administrators can monitor user activity, sales data, and engagement metrics through interactive charts and dashboards.

---

## Tech Stack

### Frontend

- Angular 21 (Standalone Components)
- Tailwind CSS (UI Styling)
- Chart.js (Data Visualization)
- RxJS

### Backend

- Node.js
- Express.js
- MongoDB (Mongoose ORM)
- JWT Authentication
- bcrypt.js (Password Hashing)

---

## Key Features

### Authentication & Authorization

- Secure login & registration
- JWT-based authentication
- Role-based authorization (Admin/User)
- Protected routes using Angular guards

### Dashboard Analytics

- Total Revenue (aggregated from user sales data)
- Total Users
- Active Users
- New Sign-ups (last 7 days)
- Real-time charts (monthly sales & user engagement)

### Admin Controls

- View all users in paginated table
- Update user status (Active / Inactive)
- Delete users (Admin restricted)
- Add new users via admin settings form

### UI & UX

- Fully responsive UI
- Sidebar navigation with active route highlighting
- Modern glassmorphism dashboard design
- Pagination for large datasets (1000+ users)

---

## Folder Structure

```
dashboard/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── frontend/
│   ├── src/app/components/
│   │   ├── dashboard-home/
│   │   ├── stats-cards/
│   │   ├── charts-section/
│   │   ├── users-table/
│   │   ├── settings-page/
│   │   └── login/register
│   └── services/
│
└── README.md
```

---

## Installation & Setup Guide

### Prerequisites

## Version Details

- Angular: 21.x
- Node.js: 18.x
- Express: 4.x
- MongoDB: 6.x
- npm: 9.x
- Chart.js: 4.x
- Tailwind CSS: 3.x

---

### Step 1: Clone Repository

```bash
git clone https://github.com/Sufiya-hub/Sales_Dashboard.git
cd dashboard
```

---

### Step 2: Backend Setup

```bash
cd backend
npm install
```

Run backend server:

```bash
npm start
```

Server will run at:

```
http://localhost:3000
```

---

### Step 3: Frontend Setup

```bash
cd frontend
npm install
ng serve
```

Frontend runs at:

```
http://localhost:4200
```

---

## Default Admin Credentials

You can register an admin manually or insert in DB:

```json
{
  "email": "admin@dashboard.com",
  "password": "admin123",
  "role": "admin",
  "status": "Active"
}
```

## After logging in into the dashboard click on refresh data to see the changes in charts and donut.

---

## API Endpoints

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Users

- `GET /api/users` – Get all users
- `POST /api/users` – Create user (Admin)
- `PUT /api/users/:id` – Update user
- `DELETE /api/users/:id` – Delete user

### Metrics

- `GET /api/metrics/dashboard` – Dashboard analytics data

---

## Screenshots (Attach in Email)

Please include screenshots of:

1. Login Page
2. Dashboard Analytics Page
3. Charts Visualization Section
4. Users Management Table
5. Settings Page (Add User Form)

---

## How the Dashboard Works

1. Admin logs in securely via JWT authentication.
2. Dashboard fetches aggregated data from MongoDB.
3. Metrics displayed:

   - Revenue = Sum of all users’ sales_amount
   - Active Users = Users with status “Active”
   - New Sign-ups = Users created in last 7 days

4. Charts visualize monthly sales and user engagement trends.

---

## Real-World Relevance

This dashboard replicates features used in:

- CRM Admin Panels
- SaaS Analytics Platforms
- User Management Systems
- Business Intelligence Dashboards

---

## Future Enhancements

- SSO Integration (OAuth / Google Login)
- Export reports (PDF/CSV)
- Real-time websocket updates
- Advanced filtering & search

---

## Important Notes

- Only Admin users can access dashboard analytics and manage users.
- JWT authentication secures all protected API routes.
- Pagination implemented for large datasets (10 users per page).
- SSR hydration issues handled using platform browser checks.

---

## Conclusion

This project demonstrates a complete MEAN stack implementation of an Admin Dashboard with analytics, reporting, secure authentication, and role-based access control.
It reflects real-world enterprise dashboard functionality used in modern SaaS platforms.

**Submitted By:**
Sufiya Lalbi Pattan
Admin Dashboard Assignment – SalesWinnr Technology Solutions
