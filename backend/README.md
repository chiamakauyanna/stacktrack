# 🧭 StackTrack Backend

StackTrack is a personal project management platform that allows users to manage projects, stages, and tasks efficiently. With built-in analytics and progress tracking, it provides a clear overview of project status, helping you stay organized and productive.

Currently, it’s a single-user platform, designed to scale for future team collaboration.

---

## 🚀 Features

* User authentication and profile management

* Create, update, and delete projects, stages, and tasks

* Track task completion and project progress

* Analytics dashboard with visual progress indicators

* Responsive design for desktop and tablet

---

## 🧱 Tech Stack

| **Frontend**  | React, Tailwind CSS, Framer Motion, React Router              |
| **Backend** | Django REST Framework, PostgreSQL, JWT Authentication      |

---

## 🧩 API Endpoints Overview

### 🔐 Authentication

| Method    | Endpoint              | Description                      |
| --------- | --------------------- | -------------------------------- |
| `POST`    | `/api/auth/register/` | Register new user                |
| `POST`    | `/api/auth/login/`    | Login (get access/refresh token) |
| `POST`    | `/api/auth/refresh/`  | Refresh access token             |
| `GET/PUT` | `/api/auth/profile/`  | Get or update user profile       |

---

### 📁 Projects

| Method | Endpoint              | Description              |
| ------ | --------------------- | ------------------------ |
| `GET`  | `/api/projects/`      | List all projects        |
| `POST` | `/api/projects/`      | Create a new project     |
| `GET`  | `/api/projects/{id}/` | Retrieve project details |

---

### 🧱 Stages

| Method | Endpoint            | Description            |
| ------ | ------------------- | ---------------------- |
| `GET`  | `/api/stages/`      | List all stages        |
| `POST` | `/api/stages/`      | Create a new stage     |
| `GET`  | `/api/stages/{id}/` | Retrieve stage details |

---

### ✅ Tasks

| Method  | Endpoint           | Description        |
| ------- | ------------------ | ------------------ |
| `GET`   | `/api/tasks/`      | List all tasks     |
| `POST`  | `/api/tasks/`      | Create a new task  |
| `PATCH` | `/api/tasks/{id}/` | Update task status |

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/chiamakauyanna/stacktrack.git
cd backend
```

### 2️⃣ Create a Virtual Environment and Install Dependencies

```bash
python -m venv venv
venv\Scripts\activate  # On Windows
source venv/bin/activate  # On macOS/Linux
pip install -r requirements.txt
```

### 3️⃣ Apply Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 4️⃣ Create a .env file

```bash
DEBUG=True
DATABASE_URL=postgres://username:password@localhost:5432/stacktrack
SECRET_KEY=your_secret_key

```

### 5️⃣ Run the Development Server

```bash
python manage.py runserver
```

Your API will be live at:
👉 `http://127.0.0.1:8000/api/`

---

## 🧠 Example: Register & Login

**Register**

```
POST /api/auth/register/
{
  "username": "your username",
  "email": "your email",
  "password": "your password"
}
```

**Login**

```
POST /api/auth/login/
{
  "username": "your username",
  "password": "your password"
}
```

**Response**

```
{
  "refresh": "<refresh_token>",
  "access": "<access_token>"
}
```

Use the access token for all authenticated requests:

```
Authorization: Bearer <access_token>
```

---

## 🧾 License

This project is developed as part of the **ALX Capstone Project** — for educational and portfolio use.
© 2025 Chiamaka Uyanna. All rights reserved.