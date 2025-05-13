# Process-flow-manager

## Introduction

The **Process Flow Manager** is a web-based application that allows users to design, execute, and monitor process workflows in real time. Using a drag-and-drop interface, users can add an unlimited number of nodes (representing tasks), connect them with conditional transitions, and save the workflow for persistent storage and dynamic dashboard updates. This tool is ideal for applications such as logistics optimization, project management, or any scenario where visual process design is needed.

## Technology Stack

### Frontend
- **React:** For building a dynamic, component-based user interface.
- **React Flow:** For providing the drag-and-drop workflow editor.
- **Socket.io Client:** For receiving real-time workflow and task updates.
- **Axios:** For making REST API calls to the backend.

### Backend
- **Node.js & Express:** For serving RESTful API endpoints and handling business logic.
- **Mongoose & MongoDB:** For data persistence and schema validation.
- **Socket.io:** For enabling real-time communication between the server and client.
- **JWT (JSON Web Tokens):** For securing API endpoints via token-based authentication.


## Installation Procedures

### Prerequisites
Ensure that you have installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- npm (included with Node.js)
- [MongoDB](https://www.mongodb.com/) (either local or as a service)
- Git

### Clone the Repository
```bash
git clone https://github.com/yourusername/process-flow-creator.git
cd process-flow-creator
```

### Setting up the backend
1. Navigate to the backend directory
```bash
cd backend
```
2. Install the dependencies
```bash
npm install
```
3. Start the backend server
```bash
node server.js
```

### Setting up the frontend
1. Open a new terminal and navigate to the frontend directory:
```bash
cd ../frontend
```

2. Install dependencies
```bash
npm install
```

3. Ensure that any API URLs in the source code point to your backend (default is http://localhost:5000).

4. Start the frontend development server
```bash
npm start
```
The application will run at http://localhost:3000.


### How to Run the Application
1. Start MongoDB: Make sure your MongoDB instance is running locally
2. Run the Backend: In the backend folder, run:
```bash
node server.js
```
3. Run the Frontend: In the frontend folder, run:
```bash
npm start
```