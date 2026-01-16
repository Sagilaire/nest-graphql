import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  const PORT = 3000;
  await app.listen(PORT, '0.0.0.0');

  console.log(`✅ Servidor NestJS corriendo en http://0.0.0.0:${PORT}`);
  console.log(`📡 Intenta acceder desde otro PC a: http://192.168.1.49:${PORT}/graphql`);

  logger.log(`✅ Servidor NestJS corriendo en http://0.0.0.0:${PORT}`);
  logger.log(`📡 Intenta acceder desde otro PC a: http://192.168.1.49:${PORT}/graphql`);
}
bootstrap();