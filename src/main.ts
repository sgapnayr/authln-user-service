import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', // ⚠️ Allow all origins (change this in production)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  });

  app.use(
    '/users',
    rateLimit({
      windowMs: 1 * 60 * 1000,
      max: 100,
      message: 'Too many requests, please try again later.',
    }),
  );

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
