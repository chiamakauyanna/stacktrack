# 🧭 StackTrack Backend

A **project and task management API** built with Django REST Framework (DRF) for the StackTrack capstone project.
It supports **user authentication**, **project/task management**, **progress tracking**, and **custom dashboards** — following modern backend best practices.

---

## 🚀 Features

✅ **User Management**

* JWT authentication (login/logout/refresh)
* User registration endpoint
* Auto profile creation with role, avatar & bio
* Profile update endpoint

✅ **Project Management**

* Create, update, delete, and list projects
* Auto slug generation
* Track project progress dynamically
* Compute project task statistics (completed vs pending)

✅ **Stage & Task Management**

* Full CRUD for stages and tasks
* Track task status and due dates
* Stage progress auto-calculated based on tasks

✅ **Dashboard & Analytics**

* `/api/projects/` and `/api/tasks/` for user dashboard
* Summary of all projects and tasks
* Progress percentage for each project

✅ **Advanced API Features**

* Pagination (page-based)
* Search and filtering
* Ordering (by date, status, etc.)

---

## 🧱 Tech Stack

| Component     | Description                                    |
| ------------- | ---------------------------------------------- |
| **Language**  | Python 3.13                                    |
| **Framework** | Django 5 + Django REST Framework               |
| **Auth**      | JWT (SimpleJWT)                                |
| **Database**  | SQLite (default), easy to switch to PostgreSQL |
| **Tools**     | Thunder Client / Postman for API testing       |

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

### 2️⃣ Create a Virtual Environment

```bash
python -m venv venv
venv\Scripts\activate  # On Windows
source venv/bin/activate  # On macOS/Linux
```

### 3️⃣ Install Dependencies

```bash
pip install -r requirements.txt
```

### 4️⃣ Apply Migrations

```bash
python manage.py makemigrations
python manage.py migrate
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

## 🧭 Folder Structure

```
backend/
│
├── tracker/
│   ├── models/
│   │   ├── project.py        # Project model
│   │   ├── stage.py          # Stage model
│   │   ├── task.py           # Task model
│   │   └── profile.py        # User profile model
│   │
│   ├── views/
│   │   ├── project_views.py  # Project API views
│   │   ├── stage_views.py    # Stage API views
│   │   ├── task_views.py     # Task API views
│   │   └── auth_views.py     # Authentication & profile views
│   │
│   ├── serializers.py        # DRF serializers
│   ├── urls.py               # API routes
│   ├── signals.py            # Auto profile creation
│   └── apps.py               # App configuration
│
├── stacktrack-api/
│   ├── settings.py           # Django + DRF configuration
│   ├── urls.py               # Root router
│   └── wsgi.py
│
└── manage.py
```

---

## 🧾 License

This project is developed as part of the **ALX Capstone Project** — for educational and portfolio use.
© 2025 Chiamaka Uyanna. All rights reserved.

