import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Profile } from './entities/profile.entity'
import { ProfileType } from './entities/profile-type.entity'
import { CreateProfileDto } from './dto/create-profile.dto'

@Injectable()
export class ProfileService {
  constructor(
      @InjectRepository(Profile)
      private readonly profileRepository: Repository<Profile>,
      @InjectRepository(ProfileType)
      private readonly profileTypeRepository: Repository<ProfileType>,
  ) {}

  async findAll() {
    return this.profileRepository.find({
      relations: ['profileType'],
    })
  }

  async create(dto: CreateProfileDto, photoUrl: string) {
    const profileType = await this.profileTypeRepository.findOneBy({
      id: dto.profileTypeId,
    })

    if (!profileType) {
      throw new Error('Invalid profileTypeId')
    }

    const profile = this.profileRepository.create({
      username: dto.username,
      email: dto.email,
      password: dto.password,
      profileType,
      photo: photoUrl,
    })

    return this.profileRepository.save(profile)
  }
}

