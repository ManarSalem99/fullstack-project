import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from './profile/profile.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

function makeRandomFileName(originalName: string): string {
  return (
      Array.from({ length: 32 }, () =>
          Math.floor(Math.random() * 16).toString(16),
      ).join('') + extname(originalName)
  );
}

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'profiles.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
          console.log('Multer destination called! File:', file.originalname); // Debug
          const uploadPath = join(process.cwd(), 'uploads');
          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath, { recursive: true });
          }
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          cb(null, makeRandomFileName(file.originalname));
        },
      }),
    }),
    ProfileModule,
  ],
})
export class AppModule {}
