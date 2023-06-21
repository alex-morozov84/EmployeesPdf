import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Workday {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  date: string

  @Column({ nullable: true })
  dateFormat: string

  @Column()
  attribute: 'onWork' | 'disease' | 'watch' | 'vacation' | 'dayOff'

  @Column({ nullable: true })
  weekDay: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'
}
