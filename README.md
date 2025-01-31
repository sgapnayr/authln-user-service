# AuthLN User Service

The **AuthLN User Service** is a backend microservice for managing user data and authentication with secure data storage and seamless integration capabilities.

## Features

- CRUD operations for user management.
- Secure data storage with Azure SQL.
- Centralized secrets management using Azure Key Vault.
- Built with scalable and modular NestJS architecture.
- Authentication support for OAuth, SAML, and SSO workflows.

## Technologies

- **NestJS** - Scalable backend framework.
- **Azure SQL** - Cloud-based relational database.
- **Azure Key Vault** - Secure secrets management.
- **TypeScript** - Typed JavaScript for robust development.

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/authln-user-service.git
   cd authln-user-service
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Configure Azure Key Vault**:

   - Set up a Key Vault instance and add required secrets (e.g., database credentials).
   - Assign proper access permissions to the application using a managed identity or service principal.

4. **Start the Service**:
   ```bash
   npm run start:dev
   ```

## Key Vault Integration

The application dynamically retrieves secrets from Azure Key Vault. Secrets are loaded into `process.env` at runtime, eliminating the need for a `.env` file.

To integrate secrets management:

- Use `DefaultAzureCredential` for authentication.
- Dynamically fetch secrets during application startup.

## API Endpoints

| Method | Endpoint     | Description              |
| ------ | ------------ | ------------------------ |
| GET    | `/users`     | Retrieve all users       |
| GET    | `/users/:id` | Retrieve a specific user |
| POST   | `/users`     | Create a new user        |
| PATCH  | `/users/:id` | Update a user            |
| DELETE | `/users/:id` | Delete a user            |

## Testing

Run tests:

```bash
npm run test
```

Check coverage:

```bash
npm run test:cov
```

## CI/CD

Secrets from Azure Key Vault can be accessed securely in CI/CD pipelines using GitHub Actions:

## Build

Build the application:

```bash
npm run build
```

Artifacts are stored in the `dist/` directory.

## License

Licensed under the MIT License. See the `LICENSE` file for details.
