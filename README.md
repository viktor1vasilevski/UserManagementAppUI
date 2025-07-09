# User Management Frontend (Angular)

A role-based user management frontend built with Angular. This app connects to the .NET 9 Web API backend and allows administrators to manage users and regular users to view home(welcome) page.

## Tech Stack

- **Angular 19**
- **TypeScript**
- **RxJS**
- **Angular Forms**
- **Angular Router**
- **HttpClient** (for API communication)
- **ngx-toastr** (for user notifications)
- **Bootstrap** (for styling)
- **JWT-based Authentication**
- **Role-Based Routing with Route Guards**

## Features

- User authentication and authorization with JWT tokens  
- Role-based access control for administrators and regular users  
- Administrators can create, edit, deactivate/reactivate, and delete users 
- Real-time notifications using ngx-toastr  
- Secure route guarding to restrict access based on roles and active status  

## Architecture Overview

This project highlights:

- **HTTP Interceptor:** Injects JWT tokens into all outgoing API requests and handles errors globally.
- **Route Guards:** Secure routes based on user roles and active status, preventing unauthorized access.
- **Models:** Strongly typed interfaces representing users and other entities.
- **Data Service:** Implements a Unit of Work pattern managing all CRUD operations through a centralized service for cleaner and maintainable code.

## Usage

- **Admin users** can:
  - View the list of all users
  - Create new users
  - Edit existing users’ details, including role and active status
  - Deactivate/reactivate or delete users

- **Regular users** can:
  - View home page

- **Authentication flow:**
  - Users must log in with valid credentials
  - JWT tokens are stored securely and used for authenticated API requests

- **Route Guards:**
  - Prevent unauthorized access to admin-only routes
  - Redirect inactive and unauthorized users to dedicated pages
