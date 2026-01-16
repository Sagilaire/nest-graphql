import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔥 CORS PERMISIVO PARA DESARROLLO
  app.enableCors({
    origin: '*', // Permite TODO en desarrollo
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'apollographql-client-name'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  // 🔥 ESCUCHA EN TODAS LAS INTERFACES
  await app.listen(3000, '0.0.0.0');
  
  console.log('✅ Servidor NestJS corriendo en http://0.0.0.0:3000');
  console.log('📡 Acceso desde red local: http://192.168.1.49/graphql');
}
bootstrap();