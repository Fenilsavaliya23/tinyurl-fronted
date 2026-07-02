# 🔗 TinyURL - React Frontend

A modern and responsive URL Shortener frontend built with **React.js** that integrates seamlessly with the TinyURL Spring Boot backend. The application provides secure authentication, URL management, analytics dashboard, QR code generation, and an intuitive user experience with light and dark mode support.

> 🚀 Built as a production-ready frontend following modern React development practices.

---

## 🌐 Live Demo

| Service | URL |
|---------|-----|
| 🌍 Live Application | https://tinyurl-fronted.onrender.com |
| ⚙️ Backend API | https://tinyurl-backend-nv4d.onrender.com |

---

## 🔗 Related Repository

Backend Repository

https://github.com/Fenilsavaliya23/tinyurl-springboot

---

![React](https://img.shields.io/badge/React-19-blue)

![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)

![Axios](https://img.shields.io/badge/API-Axios-orange)

![React Router](https://img.shields.io/badge/React_Router-v7-red)

![Render](https://img.shields.io/badge/Deployment-Render-purple)

![Responsive](https://img.shields.io/badge/Responsive-Yes-success)

![Dark Mode](https://img.shields.io/badge/Dark_Mode-Supported-black)

![License](https://img.shields.io/badge/License-MIT-green)

---

# 📖 Project Overview

TinyURL Frontend is a modern React application that provides a clean and responsive interface for managing shortened URLs.

The application communicates with a Spring Boot REST API using Axios and JWT authentication. Users can create short URLs, manage aliases, view analytics, generate QR codes, and securely manage their accounts.

The project follows a modular component-based architecture and is optimized for desktop, tablet, and mobile devices.

---

# ✨ Features

## 🔐 Authentication

- User Registration
- Secure Login
- JWT Authentication
- Session Management
- Protected Routes

---

## 🔗 URL Management

- Create Short URL
- Custom Alias
- Edit Alias
- Delete URL
- Copy URL
- Open URL
- URL Details Modal

---

## 📊 Dashboard

- Dashboard Overview
- Analytics Cards
- URL Statistics
- Search URLs
- Dashboard Navigation

---

## 📱 QR Code

- Preview QR Code
- Download QR Code
- QR Popup Modal

---

## 🎨 User Experience

- Light Theme
- Dark Theme
- Responsive Design
- Sidebar Navigation
- Toast Notifications
- Smooth Animations
- Loading States
- Confirmation Dialogs

---

## 👨‍💼 Admin Features

- Admin Dashboard
- User Management
- URL Management
- Dashboard Statistics

---

# 🛠️ Tech Stack

## Frontend

- React 19
- JavaScript (ES6)
- React Router DOM
- Axios
- React Toastify
- Iconsax React

---

## Deployment

- Render Static Site
- GitHub

---

## Backend Integration

- Spring Boot REST API
- JWT Authentication
- Railway MySQL Database

---

# 🏗️ Application Architecture

```
                    React Application
                           │
             ┌─────────────┼─────────────┐
             │             │             │
        Authentication   Dashboard    Admin Panel
             │             │             │
             └─────────────┼─────────────┘
                           │
                      Axios API Layer
                           │
                           ▼
                Spring Boot REST Backend
                           │
                           ▼
                   Railway MySQL Database
```

---

# 📂 Project Structure

```
src
│
├── Api
│   ├── AuthApi.js
│   ├── urlApi.js
│   └── adminApi.js
│
├── components
│   ├── Dashboard
│   ├── Layout
│   ├── Modal
│   └── Common
│
├── Pages
│   ├── Login
│   ├── Signup
│   ├── Dashboard
│   └── Admin
│
├── Utils
│   └── axiosConfig.js
│
├── Assets
│
├── CSS
│
├── App.js
└── index.js
```

---

# 🔄 Application Flow

```
User

↓

Login / Signup

↓

JWT Token Stored

↓

Protected Dashboard

↓

Create Short URL

↓

View Analytics

↓

Manage URLs

↓

Generate QR Code

↓

Logout
```

---

### Login Page

```
/screenshots/login.png
```

---

### Signup Page

```
/screenshots/signup.png
```

---

### Dashboard

```
/screenshots/dashboard.png
```

---

### Analytics

```
/screenshots/analytics.png
```

---

### My URLs

```
/screenshots/myurls.png
```

---

### QR Code

```
/screenshots/qrcode.png
```

---

### Admin Dashboard

```
/screenshots/admin.png
```

---

# 🚀 Local Installation

Clone the repository

```bash
git clone https://github.com/Fenilsavaliya23/tinyurl-fronted.git
```

Move into the project

```bash
cd tinyurl-fronted
```

Install dependencies

```bash
npm install
```

Start development server

```bash
npm start
```

Build production

```bash
npm run build
```

---

# ⚙️ Environment Variables

Create a `.env` file:

```env
REACT_APP_API_BASE_URL=https://tinyurl-backend-nv4d.onrender.com
```

---

# 🌐 Live Deployment

Frontend

https://tinyurl-fronted.onrender.com

Backend

https://tinyurl-backend-nv4d.onrender.com

---

# 📱 Responsive Design

The application is fully responsive and optimized for:

- 💻 Desktop
- 💼 Laptop
- 📱 Mobile
- 📲 Tablet

---

# 🎯 UI Highlights

- Modern Dashboard
- Responsive Sidebar
- Dynamic Active Navigation
- Light/Dark Mode
- Animated Cards
- Reusable Components
- Professional Color Palette
- Toast Notifications

---

# 🔮 Future Improvements

- Google OAuth Login
- GitHub OAuth Login
- User Profile Page
- Forgot Password
- Email Verification
- Multi-language Support
- PWA Support
- Offline Mode
- Better Charts
- Drag & Drop Dashboard
- Export Analytics
- Custom Themes

---

# 🤝 Contributing

Contributions are welcome.

Feel free to fork this repository and submit a Pull Request.

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Developer

**Fenil Savaliya**

Frontend Repository

https://github.com/Fenilsavaliya23/tinyurl-fronted

Backend Repository



https://github.com/Fenilsavaliya23/tinyurl-springboot

If you found this project helpful, don't forget to ⭐ the repositories.
