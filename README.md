1. Install dependencies
   npm install

   ```

   ```

2. `.env.` file sample

   ```
    PORT = port number

    DB_PORT = db port
    DB_USERNAME = db username
    DB_PASSWORD = db password
    DB_NAME = db name
    DB_HOST = host
    DB_DIALECT = dialect

    JWT_SECRET = JWT secret
   ```

## Run the server

```bash
npm run dev

```

## Project structure

├── /node_modules
├── /src  
│ ├── /config # DB sequelize configuration
│ ├── /app
│ ├── /interfaces # user and profile intefraces
│ ├── /middleware # JWT token and auth middlewares
│ |── /models # DB model fo user and profile
│ ├── /modules # Main modles of app
│ │ ├── /auth #  
│ │ ├\_\_ /user # Contains repo, service, controller, routes, and validator files.
│ ├── /routes # Contains all module routes
│ ├── /utils # Utils eg error handlers
│── server.js # Entry point of the app
├── .env # Environment variables
├── package.json # Dependencies and scripts
└── README.md # Project documentation

````

---

## The example of API Request

```bash
curl --request POST   --url http://localhost:5000/api/register
````

Response:

```json
{
  "statusCode": 201,
  "message": "Registration successful.",
  "error": false,
  "data": {}
}
```
