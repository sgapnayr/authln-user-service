# AuthLN User Service

The **AuthLN User Service** is a backend microservice for managing user data and authentication. It provides CRUD operations for users, supports secure storage of user information, and integrates seamlessly with other AuthLN ecosystem services.

## Features

- Manage user accounts with full CRUD functionality.
- Securely store and retrieve user data with Azure SQL.
- Modular and scalable architecture built with NestJS.
- Provides user-specific attributes for authentication workflows (e.g., OAuth, SAML).
- Seamless integration with other services in the AuthLN ecosystem.

## Technologies

- [NestJS](https://nestjs.com/) - Framework for building efficient and scalable server-side applications.
- [Azure SQL](https://azure.microsoft.com/en-us/products/sql-database/) - Cloud database for secure data storage.
- [TypeScript](https://www.typescriptlang.org/) - Static typing for JavaScript.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/authln-user-service.git
   cd authln-user-service
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:

   - Create a `.env` file in the root of the project with the following variables:
     ```dotenv
     DB_HOST=localhost
     DB_PORT=5432
     DB_USER=your-username
     DB_PASSWORD=your-password
     DB_DATABASE=authln_user_service
     JWT_SECRET=your-secret-key
     PORT=3000
     ```

4. Start the service:
   ```bash
   npm run start:dev
   ```

## Usage

- **Base URL**: `/users`

| Method | Endpoint     | Description             |
| ------ | ------------ | ----------------------- |
| GET    | `/users`     | Fetch all users         |
| GET    | `/users/:id` | Fetch a specific user   |
| POST   | `/users`     | Create a new user       |
| PATCH  | `/users/:id` | Update an existing user |
| DELETE | `/users/:id` | Delete a user           |

## Testing

Run the tests using Jest:

```bash
npm run test
```

To check test coverage:

```bash
npm run test:cov
```

## Build

To build the application for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
