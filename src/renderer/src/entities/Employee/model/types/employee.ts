export type Sex = 'male' | 'female'

export interface Employee {
  id: number
  sex: Sex
  firstname: string
  lastname: string
  patronymic: string
  rank?: string
  position?: string
  birthDay?: string
}

export interface EmployeeSchema {
  employees: Employee[]
  error?: string
  isLoading: boolean
}
