import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProfileService } from './profile.service'
import { ProfileController } from './profile.controller'
import { Profile } from './entities/profile.entity'
import { ProfileType } from './entities/profile-type.entity'
import { ProfileTypeService } from './profile-type.service'
import { ProfileTypeController } from './profile-type.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Profile, ProfileType])],
  controllers: [ProfileController, ProfileTypeController],
  providers: [ProfileService, ProfileTypeService],
})
export class ProfileModule {}

