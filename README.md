# Movies API

REST API for managing movies, actors and movie formats.
The application is containerized with Docker and fully configurable via environment variables.

---

## DockerHub Image

[https://hub.docker.com/repository/docker/asameliuk/movies](https://hub.docker.com/repository/docker/asameliuk/movies)

---

## Configuration (Environment Variables)

All application configuration is handled via environment variables.


 `APP_PORT` - Port the application listens on   
 `DB_PATH` - Path to SQLite database file   
 `JWT_SECRET` - Secret key for JWT authentication      
 `SESSION_SECRET` - Secret key for signing and verifying JWT tokens   

> JWT_SECRET=your_super_secret_key  
SESSION_SECRET=your_super_secret_key   
APP_PORT=8000  
DB_PATH=database.sqlite  

---

## Run Application (with Docker)

The application can be started with **a single docker command**, as required:

>docker run --name movies -p 8000:8050 -e APP_PORT=8050 your_super_account/movies

Build Docker Image Locally

To build the Docker image locally, run:

>docker build -t your_super_account/movies .


Run Without Docker (Optional)
Install dependencies:

>npm install
>
Create .env file:

> JWT_SECRET=your_super_secret_key  
SESSION_SECRET=your_super_secret_key   
APP_PORT=8000  
DB_PATH=database.sqlite


Start the server:

>npm start


The application uses SQLite as the database.  
Database schema is created automatically on startup.  
All sensitive configuration is injected via environment variables.  
.env file is intentionally excluded from the repository.  

 ---
 
### Tech Stack
- Node.js  
- Express.js  
- Sequelize ORM  
- SQLite  
- Docker  
