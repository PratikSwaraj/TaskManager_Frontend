# MERN Task Manager

## 🚀 Overview
This is a **Task Manager Web App** built using the **MERN (MongoDB, Express, React, Node.js) stack**. It allows users to **register, log in, create, edit, delete, and manage tasks** with categories and statuses.

## ✨ Features
- **User Authentication** (Register/Login/Logout)
- **Task CRUD Operations** (Create, Read, Update, Delete)
- **Task Categorization** (Work, Personal, Urgent)
- **Task Status Management** (To-Do, In Progress, Completed)
- **Protected Routes for Dashboard**
- **Responsive UI with Tailwind CSS**
- **Token-based authentication with JWT**

## 🛠️ Tech Stack
### Frontend
- React.js
- Axios
- React Router
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Token (JWT)

## 🏗️ Installation & Setup
### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/task-manager.git
cd task-manager
```

### 2️⃣ Install Dependencies
#### **Backend**
```bash
cd backend
npm install
```
#### **Frontend**
```bash
cd frontend
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the backend folder and add:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=8080
```

### 4️⃣ Run the App
#### **Backend**
```bash
cd backend
npm start
```
#### **Frontend**
```bash
cd frontend
npm start
```

## 🔑 API Endpoints
### **Authentication**
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get token
- `POST /api/auth/logout` - Logout user

### **Tasks**
- `GET /api/tasks` - Get all tasks (Authenticated)
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## 🚀 Deployment
You can deploy the **frontend on Vercel/Netlify** and the **backend on Render/Railway/EC2**.

---
💡 **Contributions are welcome!** Feel free to submit a pull request. 🎉

