# DSMS Mini Project

A full-stack web application for managing student, payment, exam, medical, and renewal data, built with a modern MERN stack architecture.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Core Values](#core-values)
- [Gallery](#gallery)
- [License](#license)

---

## Overview

This project is a **Driving School Management System (DSMS)** designed to streamline and digitize the process of managing students, payments, medical records, exam schedules/results, and renewals for a driving school or a similar institution. It includes both backend (API, database) and frontend (web UI) components.

---

## Features

- **Student Management:** Add, update, delete, and list students with details like name, contact, and status.
- **Payment Tracking:** Record, update, and manage payments with slip upload and deletion support.
- **Exam Management:** Schedule and record exam results for students.
- **Medical Records:** Track and manage medical documents and renewals.
- **Renewals:** Track license or document renewals and notifications.
- **Admin/Staff Views:** Table-based UI for different roles to view and manage data efficiently.
- **Gallery:** Visual gallery section on homepage.
- **Modern UI:** Built with Tailwind CSS, lucid-react icons, and TanStack Table for advanced table features.

---

## Tech Stack

- **Frontend:** React, Tailwind CSS, Lucide React Icons, TanStack Table
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose ORM)
- **Other:** Axios (API requests), SweetAlert2 (UI alerts)

---

## Project Structure

```
backend/
  controller/
    payController.js
    userController.js
    ...
  models/
  ...
frontend/
  src/
    components/
      StudentTable.jsx
      ExamTable.jsx
      MedicalTable.jsx
      RenewTable.jsx
      PaymentTable.jsx
      homepage/
        CoreValues.jsx
        Gallery.jsx
      ...
    pages/
      Student.jsx
      Payment.jsx
      ...
  tailwind.config.js
  ...
```

---

## Setup & Installation

### Prerequisites

- Node.js >= 16.x
- npm or yarn
- MongoDB instance

### Backend

1. Navigate to the `backend` directory:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure your MongoDB URI and environment variables if needed.
4. Start the backend server:
   ```sh
   npm start
   ```

### Frontend

1. Navigate to the `frontend` directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend development server:
   ```sh
   npm run dev
   ```
4. The app will be available at `http://localhost:5173` (or your configured port).

---

## Core Values

- **Innovation:** Embrace change and encourage creativity to push the boundaries of online learning.
- **Integrity:** Commitment to transparency and honesty in all dealings.
- **Community:** Foster a strong, supportive network for learners and educators.

---

## Gallery

The homepage features a photo gallery carousel to visually showcase the institution or activities.

---

## License

This project is for educational and demonstration purposes.
