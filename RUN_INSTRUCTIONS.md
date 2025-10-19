# How to Run PiBooks Project

## Prerequisites

Before running the project, make sure you have:

1. **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
2. **MongoDB** - [Download here](https://www.mongodb.com/try/download/community)
3. **Git** (optional, for version control)

## Quick Start

### 1. Install Dependencies

From the root directory (`D:\Webdev2025\PiBooks`), run:

```bash
npm install
```

This will install dependencies for all projects (Shared, PiBooksAPI, PiBooksWebUI).

### 2. Set Up Environment Variables

#### For the API (PiBooksAPI):
Create a `.env` file in the `PiBooksAPI` folder:

```bash
# Create .env file in PiBooksAPI folder
echo MONGODB_URI=mongodb://localhost:27017/pibooks > PiBooksAPI\.env
echo PORT=3000 >> PiBooksAPI\.env
```

Or manually create `PiBooksAPI\.env` with:
```
MONGODB_URI=mongodb://localhost:27017/pibooks
PORT=3000
```

#### For the Web UI (PiBooksWebUI):
Create a `.env` file in the `PiBooksWebUI` folder:

```bash
# Create .env file in PiBooksWebUI folder
echo REACT_APP_API_URL=http://localhost:3000/api/v1 > PiBooksWebUI\.env
```

Or manually create `PiBooksWebUI\.env` with:
```
REACT_APP_API_URL=http://localhost:3000/api/v1
```

### 3. Start MongoDB

Make sure MongoDB is running on your system:

**Windows:**
```bash
# If MongoDB is installed as a service, it should start automatically
# Or start manually:
mongod
```

**macOS:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

### 4. Run the Project

#### Option 1: Run Both API and Web UI Together
```bash
npm run dev
```

This will start:
- API server on `http://localhost:3000`
- React app on `http://localhost:3001`

#### Option 2: Run Separately

**Start API only:**
```bash
npm run dev:api
```

**Start Web UI only:**
```bash
npm run dev:web
```

## Accessing the Application

1. **API**: http://localhost:3000
   - API endpoints: http://localhost:3000/api/v1/books
   - Health check: http://localhost:3000

2. **Web UI**: http://localhost:3001
   - Main application interface
   - Book management features

## API Endpoints

- `GET /api/v1/books` - Get all books
- `GET /api/v1/books/:id` - Get book by ID
- `POST /api/v1/books` - Create new book
- `PUT /api/v1/books/:id` - Update book
- `DELETE /api/v1/books/:id` - Delete book

## Troubleshooting

### Common Issues:

1. **MongoDB Connection Error**
   - Make sure MongoDB is running
   - Check the connection string in `PiBooksAPI\.env`
   - Default: `mongodb://localhost:27017/pibooks`

2. **Port Already in Use**
   - Change the PORT in `PiBooksAPI\.env` to a different port (e.g., 3001)
   - Update `REACT_APP_API_URL` in `PiBooksWebUI\.env` accordingly

3. **Dependencies Issues**
   - Delete `node_modules` folders and `package-lock.json` files
   - Run `npm install` again

4. **React App Not Loading**
   - Check if the API server is running
   - Verify the `REACT_APP_API_URL` in the Web UI `.env` file

### Reset Everything:
```bash
# Stop all processes (Ctrl+C)
# Delete node_modules and reinstall
rm -rf node_modules PiBooksAPI/node_modules PiBooksWebUI/node_modules Shared/node_modules
rm -f package-lock.json PiBooksAPI/package-lock.json PiBooksWebUI/package-lock.json Shared/package-lock.json
npm install
```

## Development Workflow

1. **Make changes to API**: Files in `PiBooksAPI/`
2. **Make changes to Web UI**: Files in `PiBooksWebUI/`
3. **Make changes to shared types**: Files in `Shared/`
4. **Test changes**: Both servers will auto-reload on file changes

## Production Build

```bash
# Build all projects
npm run build

# Build API only
npm run build:api

# Build Web UI only
npm run build:web
```

## Project Structure

```
PiBooks/
├── PiBooksAPI/          # Backend (Node.js + Express)
├── PiBooksWebUI/        # Frontend (React + Material-UI)
├── Shared/              # Shared TypeScript library
└── package.json         # Workspace configuration
```

## Need Help?

If you encounter any issues:
1. Check the console output for error messages
2. Verify all environment variables are set correctly
3. Ensure MongoDB is running
4. Check that all dependencies are installed
