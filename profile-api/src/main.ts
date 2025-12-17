import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    // Enable CORS so frontend can talk to backend
    app.enableCors();

    // Global validation pipe for DTOs
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );

    // ✅ Create uploads folder at startup
    const uploadsFolder = join(process.cwd(), 'uploads');
    if (!existsSync(uploadsFolder)) {
        mkdirSync(uploadsFolder, { recursive: true });
        console.log('Uploads folder created at:', uploadsFolder);
    } else {
        console.log('Uploads folder exists at:', uploadsFolder);
    }

    // ✅ Serve static files from uploads folder
    app.useStaticAssets(uploadsFolder, {
        prefix: '/uploads',
    });
    console.log('Serving uploads from:', uploadsFolder);

    // Start the server
    await app.listen(3000);
    console.log('App started on http://localhost:3000');
}

bootstrap();
