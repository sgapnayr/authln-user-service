# AuthLN User Service

The **AuthLN User Service** is a backend microservice for managing user data and authentication. It provides CRUD operations for users, supports secure storage of user information, and integrates seamlessly with other AuthLN ecosystem services.

## Features

- Manage user accounts with full CRUD functionality.
- Securely store and retrieve user data with Azure SQL.
- Centralized secrets management with Azure Key Vault.
- Modular and scalable architecture built with NestJS.
- Provides user-specific attributes for authentication workflows (e.g., OAuth, SAML).
- Seamless integration with other services in the AuthLN ecosystem.

## Technologies

- [NestJS](https://nestjs.com/) - Framework for building efficient and scalable server-side applications.
- [Azure SQL](https://azure.microsoft.com/en-us/products/sql-database/) - Cloud database for secure data storage.
- [Azure Key Vault](https://azure.microsoft.com/en-us/products/key-vault/) - Centralized secrets management solution.
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

3. Configure Azure Key Vault for secrets management:

   - Create an Azure Key Vault instance in the Azure portal.
   - Add your secrets (e.g., database credentials) to the Key Vault.
   - Example secrets:
     ```
     DB_HOST=authln-user-db.postgres.database.azure.com
     DB_PORT=5432
     DB_USER=your-username
     DB_PASSWORD=your-password
     DB_DATABASE=authln_user_service
     ```
   - Grant your application managed identity or service principal access to the Key Vault with the necessary permissions.

4. Load secrets dynamically:

   The application uses Azure Key Vault to fetch secrets dynamically. During startup, secrets are retrieved and loaded into `process.env`. No `.env` file is required if Azure Key Vault is properly configured.

   Example in `src/config/secrets.ts`:

   ```typescript
   import { DefaultAzureCredential } from '@azure/identity';
   import { SecretClient } from '@azure/keyvault-secrets';

   const keyVaultName = 'your-key-vault-name';
   const keyVaultUrl = `https://${keyVaultName}.vault.azure.net`;

   const credential = new DefaultAzureCredential();
   const client = new SecretClient(keyVaultUrl, credential);

   export async function loadAllSecrets() {
     const secretProperties = client.listPropertiesOfSecrets();
     for await (const secretProperty of secretProperties) {
       const secretName = secretProperty.name;
       const secretValue = (await client.getSecret(secretName)).value!;
       process.env[secretName.replace('-', '_')] = secretValue;
     }
   }
   ```

   Call `loadAllSecrets()` at application startup to load secrets.

5. Start the service:
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

## CI/CD with GitHub Actions

The project includes a GitHub Actions pipeline for CI/CD. Secrets are securely fetched from Azure Key Vault during the pipeline execution.

Example pipeline snippet:

```yaml
- name: Authenticate with Azure
  uses: azure/login@v1
  with:
    client-id: ${{ secrets.AZURE_CLIENT_ID }}
    tenant-id: ${{ secrets.AZURE_TENANT_ID }}
    subscription-id: ${{ secrets.AZURE_SUBSCRIPTION_ID }}

- name: Fetch secrets from Azure Key Vault
  run: |
    az keyvault secret show --vault-name your-key-vault-name --name DB-HOST
```

## Build

To build the application for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
