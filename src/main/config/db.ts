import { DataSource } from 'typeorm'
import { Employee } from '../model/entities/employee.entity'
import path from 'path'

export const dataSource = new DataSource({
  type: 'sqlite',
  database:
    process.env.NODE_ENV === 'development'
      ? './db.sql'
      : path.join(process.env.PORTABLE_EXECUTABLE_DIR || '', 'data', 'db.sql'),
  synchronize: true,
  entities: [Employee]
})

export const connectToDb = async () => {
  try {
    await dataSource.initialize()
    console.log('Connection to database established successfully')
  } catch (e) {
    console.log(e)
    console.log('Connection to database failed')
  }
}
