# Job Portal Backend (Node.js + Express + MongoDB)

## 📌 Overview

This is the backend service for the Job Portal application built using Node.js, Express.js, and MongoDB. It provides RESTful APIs for authentication, job management, and job applications with secure JWT-based authorization.

## ✨ Features
## 🔐 Authentication
1. User Registration
2. User Login (JWT Token)
3. Password Hashing using Bcrypt
4. Forgot Password (Email-based reset link)
5. Reset Password with token validation

## 👤 User Functionalities
1. Apply for Jobs
2. View My Applications
3. Track Application Status

## 🛠️ Admin Functionalities
1. Create Job Listings
2. Update Job Details
3. Delete Jobs
4. View All Jobs
5. Manage Applications

## 🧱 Tech Stack
1. 🟢 Node.js
2. 🚀 Express.js
3. 🍃 MongoDB (Mongoose ODM)
4. 🔐 JSON Web Token (JWT)
5. 🔑 Bcrypt.js
6. 📧 Nodemailer
7. 🌐 CORS

## 🔐 Authentication & Authorization
1. JWT token is generated during login
2. Token must be sent in headers:
      >> Protected routes use authMiddleware
      >> Admin-only routes use roleMiddleware

## 🔄 Application Flow
1. User registers or logs in
2. JWT token is generated
3. User browses jobs
4. User applies for a job
5. Application stored in database
6. Admin reviews applications
7. Status updated (Pending / Accepted / Rejected)

## 🛡️ Security Features
1. Password hashing with Bcrypt
2. JWT authentication
3. Protected routes
4. Token expiration handling
5. Secure password reset via email token

Demo Link: https://careeratextraatech.netlify.app/
