# StackTrack 🗂️

[![License: MIT](https://img.shields.io/badge/License-MIT-green)](LICENSE) [![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/) [![Django](https://img.shields.io/badge/Django-4.3.2-green)](https://www.djangoproject.com/) [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16.2-blue)](https://www.postgresql.org/)

**StackTrack** is a personal project management platform that allows users to manage projects, stages, and tasks efficiently. With built-in analytics and progress tracking, it provides a clear overview of project status, making it easy to stay organized and productive.

This is a single-user platform currently, designed to scale for future team collaboration.

---

## 🚀 Features

* User authentication and profile management
* Create, update, and delete projects, stages, and tasks
* Track task completion and project progress
* Analytics dashboard with visual progress indicators
* Responsive design for desktop and tablet

---

## 🛠 Tech Stack

**Front-End:**

* React
* Tailwind CSS
* Framer Motion
* React Router

**Back-End:**

* Django REST Framework
* PostgreSQL
* JWT Authentication
* Docker-ready configuration (optional)

---

## 📂 Screenshots

![Dashboard](docs/screenshots/dashboard.png)
![Analytics](docs/screenshots/analytics.png)

---

## ⚡ Quick Start

### Prerequisites

* Node.js v18+ and npm/yarn
* Python 3.11+ and pip
* PostgreSQL 16+

---

### Back-End Setup

1. Clone the repository:

   ```bash
   git clone <repo-url>
   cd backend
   ```

2. Create and activate a virtual environment:

   ```bash
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Set environment variables:
   Create a `.env` file:

   ```bash
   DATABASE_URL=postgres://username:password@localhost:5432/stacktrack
   SECRET_KEY=your_secret_key
   ```

5. Run migrations:

   ```bash
   python manage.py migrate
   ```

6. Start the server:

   ```bash
   python manage.py runserver
   ```

---

### Front-End Setup

1. Navigate to the front-end folder:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the React app:

   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📝 Usage

1. Sign up or log in to your account.
2. Create a project, then add stages and tasks.
3. Track project progress via the dashboard analytics.
4. Edit or delete tasks/stages/projects as needed.

---

## 🌟 Future Enhancements

* Multi-user support and team collaboration
* Role-based access control
* Notifications and task reminders
* File attachments and project notes

---

## 📜 License

This project is licensed under the MIT License.

---

## 💻 Contact

**Author:** Chiamaka Uyanna

* GitHub: [https://github.com/chiamakauyanna](https://github.com/chiamakauyanna)
* LinkedIn: [https://linkedin.com/in/chiamakauyanna](https://linkedin.com/in/chiamakauyanna)


