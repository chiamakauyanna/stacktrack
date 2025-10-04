# 🧠 StackTrack Backend

This is the backend API for StackTrack, a project management and tracking platform built with Django and Django REST Framework (DRF).

It provides RESTful endpoints for managing projects, stages, and tasks, along with analytics for project progress and task statistics. The API is structured for modular scalability and upcoming features such as user performance insights, notifications, and enhanced task management.

🚀 Features (so far)

✅ Django REST Framework setup

✅ Project, Stage, and Task models with proper relationships

✅ Automatic slug generation for Projects

✅ Owner field for user association

✅ ViewSets with CRUD endpoints for Projects, Stages, and Tasks

✅ Nested routers for hierarchical endpoints:

/projects/{id}/stages/

/projects/{project_id}/stages/{stage_id}/tasks/

✅ Analytics endpoints for project progress and task statistics

✅ Filtering, search, and ordering enabled

🔜 Pagination support

🔜 JWT Authentication and user endpoints

🧰 Tech Stack
Component	Description
Framework	Django 5 + Django REST Framework
Language	Python 3.13
Database	SQLite (development)
Version Control	Git + GitHub
Environment	Virtualenv
Architecture	RESTful API (Modular apps for scalability)

⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/chiamakauyanna/stacktrack.git
cd stacktrack/backend/stacktrack

2️⃣ Create a Virtual Environment
python -m venv venv
venv\Scripts\activate     # On Windows
# OR
source venv/bin/activate  # On macOS/Linux

3️⃣ Apply Migrations
python manage.py makemigrations
python manage.py migrate

4️⃣ Run the Server
python manage.py runserver


Your API will be live at:
👉 http://127.0.0.1:8000/api/projects/

🧩 Current API Endpoints
Method	Endpoint	Description
GET	/api/projects/	List all projects (owned by user)
POST	/api/projects/	Create a new project
GET	/api/projects/<id>/	Retrieve a single project
PUT/PATCH	/api/projects/<id>/	Update a project
DELETE	/api/projects/<id>/	Delete a project
GET	/api/projects/<id>/progress/	Get project completion %
GET	/api/projects/<id>/stats/	Get project task statistics
GET	/api/projects/<id>/stages/	List stages for a project
POST	/api/projects/<id>/stages/	Create stage for a project
GET	/api/projects/<project_id>/stages/<stage_id>/tasks/	List tasks for a stage
POST	/api/projects/<project_id>/stages/<stage_id>/tasks/	Create task for a stage

🧑‍💻 Developer Notes

The slug field is automatically generated from the project title.

The owner field links each project to the authenticated user.

Nested routers enforce hierarchical endpoints and ensure proper parent-child associations.

Analytics endpoints provide project progress and task stats dynamically.

📜 License
This project is open-source under the MIT License.
[GitHub] https://github.com/chiamakauyanna/stacktrack
[LinkedIn] https://linkedin.com/in/chiamakauyanna