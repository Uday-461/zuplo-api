
# Demo Implementation

This document outlines the implementation of a simple web application that fetches and displays user data. The application is composed of a frontend, a backend, and an API route that communicates with an external API.

## Frontend (`javascript/app.js`)

The frontend is responsible for fetching data from the backend and displaying it in a table.

- **Data Fetching**: It uses the `fetch` API to make a GET request to `https://zuplo-test.onrender.com/users`.
- **Data Display**: The fetched user data is dynamically inserted into an HTML table.
- **Error Handling**: If the data fails to load, an error message is displayed in the table.

## Backend (`server.js`)

The backend is an Express server that handles incoming requests.

- **CORS**: It uses the `cors` middleware to allow cross-origin requests from `http://127.0.0.1:5500`.
- **Routing**: It uses an Express router to handle routes for `/users`.
- **Server**: The server listens for incoming requests on the port specified by the `PORT` environment variable, or `5000` by default.

## API Route (`routes/usersRoutes.js`)

The API route is responsible for fetching data from an external API and returning it to the frontend.

- **Route**: It defines a GET route for `/`.
- **External API**: It fetches user data from an external API located at `${process.env.API_BASE_URL}/users`.
- **Response**: The fetched data is returned as a JSON response to the client.

## How It Works

1.  The frontend initiates a `fetch` request to `https://zuplo-test.onrender.com/users`.
2.  The backend receives the request and, through the `/users` route, triggers the route handler in `routes/usersRoutes.js`.
3.  The route handler makes a `fetch` request to the external API (`${process.env.API_BASE_URL}/users`).
4.  The external API returns user data to the backend.
5.  The backend sends the user data as a JSON response to the frontend.
6.  The frontend parses the JSON data and displays it in the HTML table.
