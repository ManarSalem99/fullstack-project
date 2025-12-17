import {
  Controller,
  Post,
  Get,
  Body,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  findAll() {
    return this.profileService.findAll();
  }

  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  async createProfile(
      @UploadedFile() photo?: Express.Multer.File,
      @Body() body?: any,
  ) {
    console.log('Request body received:', body); // Debug: check request body
    console.log('Uploaded file object:', photo); // Debug: check file object

    const dto = plainToInstance(CreateProfileDto, body);
    const errors = await validate(dto);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    if (!photo) {
      throw new BadRequestException('Photo is required');
    }

    const photoUrl = photo.filename;
    console.log('Photo filename to save:', photoUrl); // Debug: filename being saved

    return this.profileService.create(dto, photoUrl);
  }
}
