# MGF-WebDeveloper-Exercise

Contacts Application – Setup Instructions

This repository contains a full-stack Contacts application built with:
-----------------------------------------------------------------------
Backend: Laravel (PHP-FPM + Nginx)

Frontend: Angular (Node 18)

Database: MariaDB

Containerization: Docker & Docker Compose


Prerequisites
--------------
Ensure the following are installed:

Docker

Docker Compose

Git

No local PHP, Node, or MySQL installation is required.


Setup Instructions
-------------------
1. Clone the Repository
git clone https://github.com/mohams86/MGF-WebDeveloper-Exercise.git
cd MGF-WebDeveloper-Exercise

2. Backend Environment Configuration (Laravel)

Create the environment file:

cp backend/.env.example backend/.env


Ensure the database configuration in backend/.env matches Docker:
------------------------------------------------------------------
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=password


3. Start the Application
--------------------------------
Build and start all containers:
docker-compose up -d --build


4. Install Backend Dependencies
--------------------------------
docker-compose exec php composer install


Generate the Laravel application key:
--------------------------------------
docker-compose exec php php artisan key:generate


Run database migrations:
------------------------
docker-compose exec php php artisan migrate


5. Install Frontend Dependencies
docker-compose exec node npm install


Angular will automatically start via:
-------------------------------------
npx ng serve --host 0.0.0.0 --port 4200


Frontend (Angular UI):
-----------------------
http://localhost:4200/


Backend API (Laravel via Nginx):
---------------------------------
http://localhost/api/contacts


Running Backend Test
---------------------
docker-compose exec php php artisan test


Notes
------
Database files, .env, node_modules, and IDE files are excluded via .gitignore

MariaDB data persists via Docker volume (./db/mysql)

Angular runs in development mode using ng serve
