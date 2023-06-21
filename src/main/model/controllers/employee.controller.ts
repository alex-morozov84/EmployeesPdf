import { ipcMain } from 'electron'
import {
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployees
} from '../services/employee.services'

export interface EmployeeDTO {
  name: string
  birthDay: string
  rank: string
  position: string
}

export interface UpdateEmployeeDTO {
  id: number
  sex?: string
  firstname?: string
  lastname?: string
  patronymic?: string
  rank?: string
  position?: string
  birthDay?: string
}

export const employeeController = () => {
  ipcMain.handle('getEmployees', async (_) => {
    return await getEmployees()
  })

  ipcMain.handle('postEmployee', async (_, newEmployeeData: EmployeeDTO) => {
    return await addEmployee(newEmployeeData)
  })

  ipcMain.handle('deleteEmployee', async (_m, id: number) => {
    return await deleteEmployee(id)
  })

  ipcMain.handle('updateEmployee', async (_, updateEmployeeData: UpdateEmployeeDTO) => {
    return await updateEmployee(updateEmployeeData)
  })
}
