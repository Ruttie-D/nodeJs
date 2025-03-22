📜 Project Overview
This Node.js project provides a robust API for managing users and business cards. The application starts with three initial users and three cards, featuring authentication, authorization, and admin functionalities. Additionally, the project includes three bonus features:

Admins can change business numbers.
A file logger captures errors.
Users are locked for 24 hours after three failed login attempts.
🧑‍💻 Admin's Info
Admin details are included in the initial users data.

API overview can be found at:
http://localhost:8080/

This page offers a brief description of the available API endpoints for users and cards, along with links to the full documentation.

⚙️ Features
🔑 User authentication and authorization
🔄 CRUD operations for users
🔄 CRUD operations for cards
🛡️ Middleware-based authentication and role management
🧑‍💼 Admin privileges for changing business numbers
📜 Logging system for failed requests
🚫 Account lockout after multiple failed login attempts
🛠️ Installation
⚡ Prerequisites

Ensure you have the following installed:

Node.js
npm
MongoDB

📋 Steps
Clone the repository: git clone URL or download the folder.
Install dependencies: npm install.
Set up environment variables:
Create a .env file in the root directory.
Add the necessary variables (e.g., database URI, JWT secret, etc.).
Start the server: npm run dev.

🔗 URL Interceptions


Technologies Used
Node.js: The JavaScript runtime environment used to build the API.
Express.js: A web framework for building the API.
MongoDB: A NoSQL database used to store user and card data.
Mongoose: An ODM (Object Data Modeling) library for MongoDB and Node.js.
JWT (JSON Web Tokens): For secure user authentication and session management.
Lodash: A utility library for simplifying JavaScript operations like object manipulation.
License
This project is licensed under the MIT License