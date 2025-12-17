import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Profile } from './profile.entity'

@Entity('profile_types')
export class ProfileType {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToMany(() => Profile, (profile) => profile.profileType)
  profiles: Profile[]
}
