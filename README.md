# Help Desk Management System

A modern Help Desk Management System built with Laravel, React Starter Kit, Inertia.js, TailwindCSS, and MySQL.

---

# Overview

This project is designed to manage support tickets, workflows, approvals, and communication between users and support staff.

The system supports dynamic ticket forms, ticket assignments, status tracking, file uploads, and role-based access control.

---

# Features

## Authentication & Authorization

- Login / Logout
- Role & Permission Management
- Protected Routes
- User Access Control

---

## Ticket Management

- Create Ticket
- Update Ticket
- Assign Ticket
- Ticket Priority
- Ticket Status Tracking

### Ticket Workflow

```text
Open
→ In Progress
→ Pending
→ Resolved
→ Closed
```

---

## Dynamic Form Builder

Dynamic database-driven ticket forms.

### Supported Fields

- Text
- Textarea
- Select
- Checkbox
- Radio
- Date
- File Upload

---

## File Upload System

Supports:

- Images
- PDF
- Documents
- Screenshots

---

## Comment System

Communication between users and support staff.

---

## Notifications

- Ticket Created
- Ticket Updated
- Ticket Assigned
- Ticket Resolved

---

## Dashboard & Reports

- Open Tickets
- Closed Tickets
- Pending Tickets
- Ticket Statistics

---

# Tech Stack

| Technology | Usage |
|---|---|
| Laravel | Backend Framework |
| React Starter Kit | Frontend |
| Inertia.js | SPA Architecture |
| TailwindCSS | UI Design |
| MySQL | Database |
| Spatie Permission | Roles & Permissions |

---

# System Flow

```text
User
 ↓
Create Ticket
 ↓
Dynamic Form Render
 ↓
Store Ticket
 ↓
Assign Staff
 ↓
Process Ticket
 ↓
Resolve Ticket
 ↓
Close Ticket
```

---

# Database Structure

## Main Tables

- users
- tickets
- ticket_comments
- ticket_attachments
- ticket_forms
- ticket_form_fields
- ticket_answers

---

# Installation

## Clone Repository

```bash
git clone https://github.com/your-username/helpdesk-management-system.git
```

---

## Enter Project

```bash
cd helpdesk-management-system
```

---

## Install Backend Dependencies

```bash
composer install
```

---

## Install Frontend Dependencies

```bash
npm install
```

---

## Setup Environment File

```bash
cp .env.example .env
```

---

## Generate Application Key

```bash
php artisan key:generate
```

---

## Configure Database

Update `.env`

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=helpdesk_management
DB_USERNAME=root
DB_PASSWORD=
```

---

## Run Migration

```bash
php artisan migrate
```

---

## Run Seeder

```bash
php artisan db:seed
```

---

## Start Laravel Server

```bash
php artisan serve
```

---

## Start Frontend

```bash
npm run dev
```

---

# Folder Structure

```text
app/
database/
resources/
routes/
public/
```

---

# Project Modules

## Authentication Module

- Login
- Register
- Forgot Password

---

## Ticket Module

- Create Ticket
- Assign Ticket
- Ticket Status
- Ticket Priority

---

## Dynamic Form Module

- Dynamic Fields
- Dynamic Validation
- Dynamic Rendering
- Store Answers

---

## Notification Module

- Email Notifications
- In-App Notifications

---

# Roles & Permissions

| Role | Access |
|---|---|
| Admin | Full Access |
| Staff | Manage Tickets |
| User | Create & View Tickets |

---

# Future Features

- Drag & Drop Form Builder
- SLA Management
- Real-time Notifications
- Analytics Dashboard
- Mobile Responsive Enhancements

---

# Development Roadmap

## Phase 1

- Authentication
- Basic Ticket CRUD
- Ticket Status

---

## Phase 2

- Dynamic Form Builder
- File Upload
- Comments

---

## Phase 3

- Workflow System
- Notifications
- Assignments

---

## Phase 4

- Reports
- SLA
- Analytics

---

# Contributing

Pull requests are welcome.

---

# License

MIT License

---

# Author

Your Name

GitHub:
https://github.com/kyawzinsoedev
