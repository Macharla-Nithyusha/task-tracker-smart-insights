# task-tracker-smart-insights
Mini Task Tracker with Smart Insights
This repository contains a full-stack web application (Node.js + SQLite backend, React frontend) that allows users to create, update, view, and analyze tasks with smart insights.

🚀 Features

🖥 Backend (Node.js + Express + Knex + SQLite)
RESTful API for managing tasks:
 POST /tasks → Create a task
 GET /tasks → Retrieve all tasks with filters/sorting
 PATCH /tasks/:id → Update task details (status, priority, etc.)
 GET /insights → Compute analytical summary
Input validation using Ajv
Data stored in SQLite (configurable to PostgreSQL)


💻 Frontend (React)
Simple UI for adding and managing tasks
Filtering by status and priority
Insights panel showing summaries
Fetches data from backend REST APIs

🧱 Tech Stack
Backend: Node.js, Express, Knex, SQLite
Frontend: React (CRA), Fetch API
Database: SQLite (local), can switch to PostgreSQL easily
