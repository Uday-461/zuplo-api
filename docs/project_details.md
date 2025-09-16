# Project Documentation

This document provides a detailed overview of the project, its architecture, and instructions for setup and local development.

## 1. Overview

This project consists of two main parts:

1.  A simple frontend web page to display user data.
2.  A backend proxy service, designed to be deployed as a route on a Zuplo API Gateway.

The backend service acts as a middleware, forwarding requests from the frontend to a downstream API.

## 2. Architecture

The application follows a decoupled architecture where the frontend client communicates with the backend service through an API gateway.

### 2.1. Frontend

-   **Files**: `javascript/index.html`, `javascript/app.js`
-   **Description**: The frontend is a single static HTML page that uses vanilla JavaScript to fetch user data from the API gateway and render it in a table. It uses Bootstrap for basic styling.
-   **API Communication**: The `app.js` script makes a `fetch` request to the `/users` endpoint of the deployed Zuplo gateway.

### 2.2. API Gateway (Backend Logic)

-   **Files**: `server.js`, `routes/usersRoutes.js`
-   **Description**: The backend logic is written using Node.js and Express.js. This code is intended to be deployed as a route handler within a Zuplo API Gateway. It defines a `/users` route that proxies requests.
-   **Local Development Server**: The `server.js` file also serves as a local development server to mimic the behavior of the Zuplo gateway. It uses `cors` to allow requests from the local frontend (`http://127.0.0.1:5500`).
-   **Proxy Logic**: The `routes/usersRoutes.js` file contains the core logic. It receives a request on the `/` path (mounted under `/users`) and makes a `fetch` request to a downstream service defined by the `API_BASE_URL` environment variable.

### 2.3. Request Flow

1.  A user opens `javascript/index.html` in their browser.
2.  The JavaScript in `app.js` sends a GET request to the Zuplo API Gateway's `/users` endpoint.
3.  The Zuplo gateway executes the backend logic defined in `routes/usersRoutes.js`.
4.  The gateway handler sends a new GET request to the backend service at `${process.env.API_BASE_URL}/users`.
5.  The backend service responds with user data in JSON format.
6.  The gateway handler receives the response and forwards it back to the frontend.
7.  The frontend's `app.js` parses the JSON and dynamically populates the HTML table.

## 3. Setup and Development

### 3.1. Prerequisites

-   Node.js and npm installed.

### 3.2. Installation

Clone the repository and install the required dependencies:

```bash
npm install
```

This will install the following:
-   **Dependencies**: `express`, `cors`, `dotenv`
-   **Dev Dependencies**: `nodemon`

### 3.3. Environment Variables

This project uses a `.env` file to manage environment variables. Create a file named `.env` in the root of the project with the following variables:

-   `API_BASE_URL`: The base URL of the downstream API that provides the user data. (e.g., `https://api.example.com`)
-   `PORT`: (Optional) The port for the local development server to run on. Defaults to `5000`.

Example `.env` file:
```
API_BASE_URL=https://jsonplaceholder.typicode.com
PORT=5000
```

### 3.4. Running Locally

1.  **Start the backend server**:
    ```bash
    npm run dev
    ```
    This command uses `nodemon` to start the local Express server, which will automatically restart on file changes. The server will be available at `http://localhost:5000` (or the port you specified).

2.  **Run the frontend**:
    Open the `javascript/index.html` file directly in your web browser. The page will load and attempt to fetch data from the local server.

    **Note**: For the local setup to work, the `fetch` URL in `javascript/app.js` should be pointed to your local server, for example: `http://localhost:5000/users`. Currently, it is hardcoded to a production URL.

## 4. Dependencies

### Production Dependencies

-   `express`: A web application framework for Node.js, used to create the server and routes.
-   `cors`: A Node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
-   `dotenv`: A zero-dependency module that loads environment variables from a `.env` file into `process.env`.

### Development Dependencies

-   `nodemon`: A tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.
