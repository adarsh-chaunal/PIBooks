# PiBooks - Book Management System

A comprehensive book management system built with Node.js, Express, React, and Material-UI.

## Project Structure

```
PiBooks/
├── Shared/              # Shared TypeScript library
│   ├── src/
│   │   ├── entities/    # Domain entities
│   │   ├── dtos/        # Data Transfer Objects
│   │   ├── mappers/     # Entity-DTO mappers
│   │   ├── types/       # TypeScript types
│   │   └── utils/       # Utility functions
│   └── package.json
├── PiBooksAPI/          # Backend API (Node.js + Express)
│   ├── config/          # Database configuration
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── server.js        # Main server file
│   └── package.json
├── PiBooksWebUI/        # Frontend (React + Material-UI)
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API services
│   │   └── types/       # TypeScript types
│   └── package.json
└── package.json         # Workspace configuration
```

## Features

### Current Features
- ✅ Book CRUD operations
- ✅ RESTful API with Express.js
- ✅ MongoDB integration with Mongoose
- ✅ React frontend with Material-UI
- ✅ TypeScript support
- ✅ Input validation
- ✅ Error handling
- ✅ CORS support

### Planned Features
- 🔄 User authentication (Admin, Author, Reader roles)
- 🔄 Author management
- 🔄 Reader profiles and preferences
- 🔄 Email notifications
- 🔄 Advanced search and filtering
- 🔄 Book reviews and ratings
- 🔄 Reading lists and bookmarks
- 🔄 Admin dashboard

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd PiBooks
```

2. Install all dependencies:
```bash
npm install
```

3. Set up environment variables:

Create `.env` file in `PiBooksAPI/`:
```
MONGODB_URI=mongodb://localhost:27017/pibooks
PORT=3000
```

Create `.env` file in `PiBooksWebUI/`:
```
REACT_APP_API_URL=http://localhost:3000/api/v1
```

4. Start the development servers:

```bash
# Start both API and Web UI
npm run dev

# Or start individually
npm run dev:api    # API only
npm run dev:web    # Web UI only
```

## Development

### Available Scripts

- `npm run dev` - Start both API and Web UI in development mode
- `npm run dev:api` - Start API server only
- `npm run dev:web` - Start Web UI only
- `npm run build` - Build all projects
- `npm run build:api` - Build API
- `npm run build:web` - Build Web UI
- `npm install:all` - Install dependencies for all projects

### API Endpoints

- `GET /api/v1/books` - Get all books
- `GET /api/v1/books/:id` - Get book by ID
- `POST /api/v1/books` - Create new book
- `PUT /api/v1/books/:id` - Update book
- `DELETE /api/v1/books/:id` - Delete book

### Technology Stack

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- TypeScript (Shared library)
- CORS
- dotenv

**Frontend:**
- React 18
- TypeScript
- Material-UI (MUI)
- React Router
- Axios
- Emotion

**Shared:**
- TypeScript
- class-validator
- class-transformer

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Future Roadmap

- [ ] User authentication and authorization
- [ ] Author management system
- [ ] Reader profiles and preferences
- [ ] Email notification system
- [ ] Advanced search and filtering
- [ ] Book reviews and ratings
- [ ] Reading lists and bookmarks
- [ ] Admin dashboard
- [ ] Mobile app (React Native)
- [ ] API documentation (Swagger)
- [ ] Unit and integration tests
- [ ] CI/CD pipeline
