import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ProfileType } from './entities/profile-type.entity'

@Injectable()
export class ProfileTypeService {
  constructor(
    @InjectRepository(ProfileType)
    private profileTypeRepository: Repository<ProfileType>,
  ) {}

  findAll() {
    return this.profileTypeRepository.find()
  }
}
