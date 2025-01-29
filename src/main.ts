/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RateLimitMiddleware } from '../common/middleware/rate-limit.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use((req, res, next) => new RateLimitMiddleware().use(req, res, next));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
