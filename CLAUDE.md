# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm run dev` (uses nodemon for auto-reload)
- **Start production server**: `npm start`
- **Install dependencies**: `npm install`

## Architecture Overview

This is a simple Express.js API server that acts as a proxy/middleware between a frontend client and an external API.

### Key Components

- **`server.js`**: Main Express server entry point. Configures CORS for `http://127.0.0.1:5500`, sets up JSON parsing, and mounts the users routes.
- **`routes/usersRoutes.js`**: Contains a single GET route that fetches user data from `${process.env.API_BASE_URL}/users` and proxies it to the client.
- **`javascript/app.js`**: Frontend client code that fetches from `https://zuplo-test.onrender.com/users` and displays user data in a table.

### Environment Variables

- `PORT`: Server port (defaults to 5000)
- `API_BASE_URL`: Base URL for the external API that the server proxies requests to

### Project Structure

- Uses ES modules (`"type": "module"` in package.json)
- Simple Express.js setup with minimal dependencies (express, cors, dotenv)
- Frontend and backend are in the same repository but separate concerns