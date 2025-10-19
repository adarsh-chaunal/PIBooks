# PiBooks Web UI

React frontend for the PiBooks book management system.

## Features

- Browse and search books
- Add new books
- Edit existing books
- Delete books
- Responsive Material-UI design
- TypeScript support

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```
REACT_APP_API_URL=http://localhost:3000/api/v1
```

3. Start the development server:
```bash
npm start
```

## Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm run dev` - Alias for `npm start`

## API Integration

The app connects to the PiBooks API running on `http://localhost:3000` by default. Make sure the API server is running before starting the frontend.
