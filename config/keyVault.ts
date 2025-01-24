import { DefaultAzureCredential } from '@azure/identity';
import { SecretClient } from '@azure/keyvault-secrets';

const keyVaultName = 'authln-keys-and-secrets';
const keyVaultUrl = `https://${keyVaultName}.vault.azure.net`;

const credential = new DefaultAzureCredential();
const client = new SecretClient(keyVaultUrl, credential);

/**
 * Fetch all secrets from Azure Key Vault
 * and set them as environment variables.
 */
export async function loadAllSecrets() {
  try {
    const secretProperties = client.listPropertiesOfSecrets();
    for await (const secretProperty of secretProperties) {
      const secretName = secretProperty.name;
      const secretValue = await getSecret(secretName);

      console.log(`Loaded secret: ${secretName}`);
      process.env[secretName.replace('-', '_')] = secretValue;
    }
    console.log('All secrets have been loaded into process.env');
  } catch (error) {
    console.error('Error loading secrets:', error);
  }
}

/**
 * Fetch a specific secret value.
 * @param secretName - The name of the secret.
 */
export async function getSecret(secretName: string): Promise<string> {
  const secret = await client.getSecret(secretName);
  return secret.value!;
}
