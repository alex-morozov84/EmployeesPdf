import { DeleteOutlined } from '@ant-design/icons'
import React from 'react'
import cls from './DelteEmployee.module.scss'
import { classNames } from '@renderer/shared/lib/classNames/classNames'
import { Employee } from '@renderer/entities/Employee'
import { useAppDispatch } from '@renderer/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { deleteEmployee } from '@renderer/entities/Employee'

interface DeleteEmployeeProps {
  employee: Employee
}

export const DeleteEmployee = ({ employee }: DeleteEmployeeProps) => {
  const dispatch = useAppDispatch()

  const onDeleteEmployee = async (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    item: Employee
  ) => {
    e.stopPropagation()
    await dispatch(deleteEmployee(item.id))
  }

  return (
    <DeleteOutlined
      className={classNames(cls.deleteIcon)}
      onClick={(e) => onDeleteEmployee(e, employee)}
      key="delete"
      rev={undefined}
    />
  )
}
