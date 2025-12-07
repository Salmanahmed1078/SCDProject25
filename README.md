# NodeVault - Record Management System

A simple Node.js-based record management system with CRUD operations, search, sort, export, and automatic backup features.

## Features

- ✅ CRUD Operations (Create, Read, Update, Delete)
- 🔍 Search Records (by name or ID, case-insensitive)
- 📊 Sort Records (by Name or Creation Date, Ascending/Descending)
- 📤 Export Data (to human-readable .txt file)
- 💾 Automatic Backup System (JSON files with timestamps)
- 📈 Vault Statistics (total records, last modified, longest name, etc.)
- 🗄️ MongoDB Integration (MongoDB Atlas or local MongoDB)

## Prerequisites

- Node.js 16+ 
- MongoDB (Atlas or local instance)
- Docker and Docker Compose (for containerized deployment)

## Installation

### Local Development

1. Clone the repository:
```bash
git clone <repository-url>
cd "Project-SCD task 2"
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB connection string:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/nodevault?retryWrites=true&w=majority
```

5. Run the application:
```bash
npm start
```

## Docker Deployment

### Using Docker Compose (Recommended)

1. Create `.env` file:
```bash
cp .env.example .env
```

2. Update `.env` for local MongoDB container:
```env
MONGO_ROOT_USERNAME=admin
MONGO_ROOT_PASSWORD=password
MONGO_DATABASE=nodevault
NODE_ENV=production
MONGODB_URI=mongodb://admin:password@mongodb:27017/nodevault?authSource=admin
```

3. Build and start services:
```bash
docker-compose up --build
```

4. Services will be available:
   - MongoDB: Running in container (private network)
   - Backend: Running in container (private network)

### Docker Compose Commands

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs

# Stop services
docker-compose down

# Rebuild and start
docker-compose up --build
```

## Project Structure

```
Project-SCD task 2/
├── SCDProject25/
│   ├── main.js              # Main application entry point
│   ├── db/
│   │   ├── index.js         # Database operations
│   │   ├── mongodb.js       # MongoDB connection
│   │   └── models/
│   │       └── Record.js    # Mongoose schema
│   └── events/
│       ├── index.js         # Event emitter
│       └── logger.js        # Event logger
├── Dockerfile               # Docker image definition
├── docker-compose.yml       # Docker Compose configuration
├── .env.example            # Environment variables template
└── package.json            # Project dependencies
```

## Usage

Once the application is running, you'll see a menu:

```
===== NodeVault =====
1. Add Record
2. List Records
3. Update Record
4. Delete Record
5. Search Records
6. Sort Records
7. Export Data
8. View Vault Statistics
9. Exit
=====================
```

## Environment Variables

- `MONGODB_URI` - MongoDB connection string
- `NODE_ENV` - Environment (development/production)
- `MONGO_ROOT_USERNAME` - MongoDB admin username (for Docker)
- `MONGO_ROOT_PASSWORD` - MongoDB admin password (for Docker)
- `MONGO_DATABASE` - Database name (for Docker)

## Docker Images

- Backend: Built from `Dockerfile` in project root
- MongoDB: Uses `mongo:latest` from Docker Hub

## License

ISC

## Author

Project SCD Task 2

