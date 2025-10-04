# 🧠 StackTrack Backend

This is the **backend API** for **StackTrack**, a project management and tracking platform built with **Django** and **Django REST Framework (DRF)**.  

It currently provides RESTful endpoints for managing projects and serves as the foundation for upcoming modules such as task tracking, user performance insights, and notifications.

---

## 🚀 Features (so far)

- ✅ Django REST Framework setup  
- ✅ Project model with automatic slug generation  
- ✅ Owner field for user association  
- ✅ ViewSets and routers with working endpoints  
- ✅ Clean API structure with modular apps  
- 🔜 Pagination, filtering, and search  
- 🔜 Authentication and user endpoints  
- 🔜 Task and progress tracking

---

## 🧰 Tech Stack

| Component | Description |
|------------|-------------|
| **Framework** | Django 5 + Django REST Framework |
| **Language** | Python 3.13 |
| **Database** | SQLite (development) |
| **Version Control** | Git + GitHub |
| **Environment** | Virtualenv |
| **Architecture** | RESTful API (Modular apps for scalability) |

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/chiamakauyanna/stacktrack.git
cd stacktrack/backend/stacktrack
2️⃣ Create a Virtual Environment
bash
Copy code
python -m venv venv
venv\Scripts\activate     # On Windows
# OR
source venv/bin/activate  # On macOS/Linux

3️⃣ Apply Migrations
bash
Copy code
python manage.py makemigrations
python manage.py migrate
4️⃣ Run the Server
bash
Copy code
python manage.py runserver

Your API will be live at:
👉 http://127.0.0.1:8000/api/projects/

🧩 Current API Endpoints
Method	Endpoint	Description
GET	/api/projects/	List all projects
POST	/api/projects/	Create a new project
GET	/api/projects/<id>/	Retrieve a single project
PUT/PATCH	/api/projects/<id>/	Update a project
DELETE	/api/projects/<id>/	Delete a project

🧑‍💻 Developer Notes
The slug field is automatically generated from the project title.

The owner field associates each project with a registered user.

ViewSets and DefaultRouter are used for clean, RESTful routing.

More models (Tasks, Teams, and Progress tracking) will be added next.

📜 License
This project is open-source under the MIT License.

[GitHub] https://github.com/chiamakauyanna/stacktrack
 [LinkedIn] https://linkedin.com/in/chiamakauyanna