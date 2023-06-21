import { EmployeesList } from '@renderer/features/EmployeesList'
import { Layout } from '@renderer/shared/ui/Layout'
import { AddEmployee } from '@renderer/features/AddEmployee'
import { classNames } from '@renderer/shared/lib/classNames/classNames'
import cls from './EmployeesPage.module.scss'

export const EmployeesPage = () => {
  return (
    <Layout title="Сотрудники">
      <div className={classNames(cls.Wrapper)}>
        <EmployeesList />
        <AddEmployee />
      </div>
    </Layout>
  )
}
