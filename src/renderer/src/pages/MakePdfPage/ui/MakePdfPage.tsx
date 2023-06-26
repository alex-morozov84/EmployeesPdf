import { Layout } from '@renderer/shared/ui/Layout'
import { CreatePdf } from '@renderer/features/CreatePdf'
import { useState } from 'react'
import { ChooseEmployeesList } from '@renderer/features/ChooseEmployeesList'
import { Employee } from '@renderer/entities/Employee'
import { classNames } from '@renderer/shared/lib/classNames/classNames'
import cls from './MakePdfPage.module.scss'

export const MakePdfPage = () => {
  const [chosenEmployees, setChosenEmployees] = useState<Employee[]>([])

  return (
    <Layout title="Создание открытки">
      <div className={classNames(cls.Wrapper)}>
        <ChooseEmployeesList
          chosenEmployees={chosenEmployees}
          setChosenEmployees={setChosenEmployees}
        />
        <CreatePdf employees={chosenEmployees} />
      </div>
    </Layout>
  )
}
