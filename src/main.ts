import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { swaggerConfig } from '@config/swagger.config';
import { json, urlencoded } from 'express';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
  });

  app.use(json({ limit: '128mb' }));
  app.use(urlencoded({ limit: '128mb' }));

  app.enableCors({ origin: '*', methods: 'GET,HEAD,POST,PUT,PATCH,DELETE' });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await swaggerConfig(app, []);

  const port = process.env.PORT || 3000;

  await app.listen(port).then(() => {
    console.log('');
    console.log(`Application listening on port ${port}`);
  });
}

bootstrap().then(() => {});
