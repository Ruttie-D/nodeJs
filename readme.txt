📜 Project Overview
This Node.js project provides a robust API for managing users and business cards. The application starts with three initial users and three cards, featuring authentication, authorization, and admin functionalities. Additionally, the project includes three bonus features:

Admins can change business numbers.
A file logger captures errors.
Users are locked for 24 hours after three failed login attempts.
🧑‍💻 Admin's Info
Admin details are included in the initial users data.

API overview can be found at:
http://localhost:8080/

⚙️ Features
🔑 User authentication and authorization
🔄 CRUD operations for users
🔄 CRUD operations for cards
🛡️ Middleware-based authentication and role management
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

users:
🔗 **URL Interceptions**

| **Endpoint**           | **HTTP Method** | **Authorization**        | **Action**                     | **Response Status**       | **Response Body**                                             |
|------------------------|-----------------|--------------------------|--------------------------------|---------------------------|---------------------------------------------------------------|
| `/register`            | `POST`          | All                      | Register new user              | `201 Created`, `400 Bad Request` | Success message with user data, or error message.            |
| `/login`               | `POST`          | All                      | User login                     | `200 OK`, `401 Unauthorized`, `404 Not Found` | JWT token on successful login, or error message.             |
| `/`                    | `GET`           | Admin                    | Get all users                   | `200 OK`, `500 Internal Server Error` | Array of users, or error message.                            |
| `/users/:id`           | `GET`           | Registered user or Admin  | Get user by ID                 | `200 OK`, `404 Not Found`  | User object in JSON format, or error message.                |
| `/users/:id`           | `PUT`           | Registered user           | Edit user data                 | `200 OK`, `400 Bad Request` | Updated user object in JSON format, or error message.        |
| `/users/:id`           | `PATCH`         | Registered user           | Change isBusiness status       | `200 OK`, `400 Bad Request` | Success message with updated user data, or error message.    |
| `/users/:id`           | `DELETE`        | Registered user or Admin  | Delete user                    | `200 OK`, `404 Not Found`  | Success message with deleted user data, or error message.    |

cards:
🔗 **URL Interceptions**

| **Endpoint**           | **HTTP Method** | **Authorization**        | **Action**                     | **Response Status**       | **Response Body**                                             |
|------------------------|-----------------|--------------------------|--------------------------------|---------------------------|---------------------------------------------------------------|
| `/`                    | `GET`           | All                      | Get all cards                  | `200 OK`, `500 Internal Server Error` | Array of cards, or error message.                            |
| `/my-cards`            | `GET`           | Registered user (auth)   | Get user's cards               | `200 OK`, `404 Not Found`  | Array of user's cards, or error message.                     |
| `/cards/:id`           | `GET`           | All                      | Get card by ID                 | `200 OK`, `404 Not Found`  | Card object in JSON format, or error message.                |
| `/`                    | `POST`          | Business user (auth)     | Create new card                | `201 Created`, `400 Bad Request` | Created card object in JSON format, or error message.        |
| `/cards/:id`           | `PUT`           | Card owner (auth, isRegistered) | Edit card                    | `200 OK`, `400 Bad Request`, `404 Not Found` | Updated card object in JSON format, or error message.        |
| `/cards/:id`           | `PATCH`         | Registered user (auth)   | Like or unlike card            | `200 OK`, `400 Bad Request`, `404 Not Found` | Updated card object with like status, or error message.      |
| `/cards/:id`           | `DELETE`        | Card owner or admin (auth) | Delete card                   | `200 OK`, `404 Not Found`  | Success message with deleted card, or error message.         |


💻 Technologies Used

Node.js: The JavaScript runtime environment used to build the API.

Express.js: A web framework for building the API.

MongoDB: A NoSQL database used to store user and card data.

Mongoose: An ODM (Object Data Modeling) library for MongoDB and Node.js.

JWT (JSON Web Tokens): For secure user authentication and session management.

Lodash: A utility library for simplifying JavaScript operations like object manipulation.

🔖 License
This project is licensed under the MIT License.
