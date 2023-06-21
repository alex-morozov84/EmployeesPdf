import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  sex: string

  @Column()
  firstname: string

  @Column()
  lastname: string

  @Column()
  patronymic: string

  @Column({ nullable: true })
  rank: string

  @Column({ nullable: true })
  position: string

  @Column({ nullable: true })
  birthDay: string
}
