import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loadAllSecrets } from '../config/keyVault';

async function bootstrap() {
  // Load secrets from Azure Key Vault
  await loadAllSecrets();

  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
