# React-Admin-Panel-with-Material-UI-Redux

React, Vite, Redux Toolkit, and Material UI were used to create this trendy admin panel. Features include a dashboard that can be customized, authentication pages (Login, Register, Forgot Password), and complete CRUD functionality for estimates and projects using a JSON ServerAPI.

## Contents

- [Quick Start](#quick-start)
- [Core Features](#core-features)
- [API Setup (Mock)](#api-setup-mock)
- [Technical Highlights](#technical-highlights)
- [Additional Notes](#additional-notes)
- [Delivery Checklist](#delivery-checklist)

## Quick Start

### Requirements:

- Node.js v20.18.0 (use nvm recommended)

- `npm install or yarn`
- json-server for the mock backend

```sh
# Clone this repository
git clone <repository-url>
cd <repository-folder>

# Switch to the required Node version
nvm use 20.18.0

# Install dependencies
npm install  # or yarn install

# Start the React development server
npm run dev  # or yarn dev

# Run the mock API server
npx json-server mock/db.json --port 8080
```

The app will be available on `http://localhost:5173` and the mock API on `http://localhost:8080`.

## Core Features

#### Authentication System

User-friendly login, register, and forgot password workflows with validation and mock logic.

#### Dashboard

A clean overview of key metrics and visual insights using data cards and charts.

#### Project Management

Create, read, update, and delete projects. Includes smart filtering and table views powered by mock API integration.

#### Estimation Management

Add/remove dynamic sections and items for estimations, with automatic calculation of totals based on user inputs.

## API Setup (Mock)

- The backend API is simulated via json-server, running on port 8080.
- Data is stored in mock/db.json and served via RESTful endpoints.

#### Example Endpoints:

- GET `/users`
- POST `/users?email={login_email}&password={password}`(login)
- POST `/users`
- GET `/projects`
- POST `/projects`
- PUT `/projects/:id`
- GET `/estimations`
- PUT `/estimations/:id`
- DELETE `/projects/:id`

#### To start:

```sh
# Using In-built Command
yarn server

# Direct Run JSON Server
npx json-server mock/db.json --port 8080
```

## Technical Highlights

- React + Vite:- The project uses React for building UI and Vite to make the app load and build quickly.

- Redux Toolkit:- We use Redux Toolkit to manage the app's data in one central place, making it easy to track and update.

- Material UI:- The design uses Material UI to create a clean, modern, and responsive look across all devices.

- Modular Components:- The app is built using small, reusable parts (components), so it’s easy to add new features or make updates without breaking things.

## Additional Notes

- The project is designed to be easily extended with additional modules or API integration.
- Follows industry best practices for folder structure and code modularity.
- Ready for deployment with minor adjustments (e.g., connecting to a live backend).

### Delivery Checklist

- ✅ Complete source code
- ✅ Mock API (mock/db.json)
- ✅ Professional UI/UX with Material UI
- ✅ Fully functional CRUD in Projects & Estimations
- ✅ Documentation (this README)
