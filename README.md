# 100x_School_01 Assingment Submission 
# 📝 To-Do List App with JWT Authentication

A secure and user-specific task management API built using **Node.js**, **Express.js**, **MongoDB**, and **JWT** authentication. Each user can sign up, log in, and perform full **CRUD operations** on their personal tasks.

---

## 🔧 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT (JSON Web Token)
- **Password Hashing**: bcrypt

---

## 📦 Features

- ✅ User Signup & Login (with JWT)
- ✅ Protected Routes for Task Operations
- ✅ Create, Read, Update, Delete Tasks
- ✅ Only Authenticated Users can access their own tasks
- ✅ Query Filtering (`isCompleted`, `limit`, `page`)

---

## 🚀 API Endpoints

### 🔐 Auth Routes

#### 📌 Signup

- **POST** `/api/auth/signup`
- **Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
