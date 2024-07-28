# Todo App - Server

This is the server-side code for the Todo App. It provides the API endpoints and handles database operations for managing todos.

## Architecture Followed

MVC (Model View Controller) Architecture </br>

The architecture followed is an mvc architecture where models and controllers are in server whereas view are in our client app.

## API Endpoints
The server provides the following API endpoints:

<ul>
    <li><strong>`POST /api/users/register`</strong> : Register a new user.</li>
    <li><strong>`POST /api/users/login`</strong> : Login an existing user.</li>
    <li><strong>`GET /api/todos`</strong> : Get all todos for the logged in user.</li>
    <li><strong>`POST /api/todos`</strong> : Create a new todo.</li>
    <li><strong>`PUT /api/todos/:id`</strong> : Update a todo.</li>
    <li><strong>`DELETE /api/todos/:id`</strong> : Delete a todo.</li>
    <li><strong>`DELETE /api/todos`</strong> : Delete all todos.</li>
     <li><strong>`POST /api/users/logout`</strong> :Updates session Table</li>
</ul>

## Technologies Used

<ul>
    <li>Node.js with Express.js for building the server</li>
    <li>MongoDB for the database</li>
    <li>JWT for authentication</li>
    <li>bcrypt for password hashing</li>
    <li>mongoose for database operations</li>
    <li>dotenv for environment variables</li>
    <li>cors for cross origin resource sharing</li>
    <li>nodemon for hot reloading</li>
    <li>postman for testing the api endpoints</li>
</ul>

## Folder Structure

The server code is organized into the following directories:

<ul>
<li><strong>`controllers:`</strong> Contains the request handlers for each API endpoint except for the Session table</li>
<li><strong>`models:`</strong> Contains the mongoose models for the database.</li>
<li><strong>`routes:`</strong> Contains the API routes.</li>
<li><strong>`middleware:`</strong> Contains the auth middleware function.</li>
<li><strong>`index.js:`</strong> Entry point of the application.</li>
</ul>

# Database Schema


<li>
<strong>User Model</strong><br>
The `User` model represents the users of the application. Each user has personal information, login credentials, and an optional authentication token.
<strong>Fields:</strong>
<ul>
<li><code>first_name</code>: String, optional, default is <code>null</code>.</li>
<li><code>last_name</code>: String, optional, default is <code>null</code>.</li>
<li><code>email</code>: String, required, unique.</li>
<li><code>password</code>: String, required.</li>
<li><code>token</code>: String, optional.</li>
</ul>
</li>

<li>
<strong>Todo Model</strong><br>
The Todo model represents the tasks created by users. Each task is associated with a user and contains details about the task's status and timestamps.

<strong>Fields:</strong>
<ul>
<li><code>task</code>: String, required.</li>
<li><code>userId</code>: ObjectId, required, references <code>User</code>.</li>
<li><code>completed</code>: Boolean, default is <code>false</code>.</li>
<li><code>completed_time</code>: Date, default is <code>null</code>.</li>
<li><code>created_at</code>: Date, default is the current date and time.</li>
</ul>
</li>

<li>
<strong>Session Model</strong><br>
The Session model represents user sessions in the application. It tracks when users log in and out, as well as their IP addresses during these sessions.
<strong>Fields:</strong>
<ul>
<li><code>userId</code>: ObjectId, required, references <code>User</code>.</li>
<li><code>loginTime</code>: Date, default is the current date and time.</li>
<li><code>logoutTime</code>: Date, default is <code>null</code>.</li>
<li><code>ipAddress</code>: String, optional.</li>
</ul>
</li>

</ul>