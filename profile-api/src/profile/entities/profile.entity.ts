import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { ProfileType } from './profile-type.entity'

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  email: string

  @Column()
  password: string

  @ManyToOne(() => ProfileType, profileType => profileType.profiles)
  profileType: ProfileType

  @Column({ nullable: true })  // <-- add this line
  photo?: string  // or Buffer if you want to store the file itself
}
