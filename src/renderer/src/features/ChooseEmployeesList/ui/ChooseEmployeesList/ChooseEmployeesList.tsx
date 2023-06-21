import { Checkbox, List } from 'antd'
import { Widget } from '@renderer/shared/ui/Widget'
import React, { useCallback, useEffect, useState } from 'react'
import { Employee, useEmployees } from '@renderer/entities/Employee'
import { useAppDispatch } from '@renderer/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { fetchEmployees } from '@renderer/entities/Employee'
import { ListItem } from '../ListItem/ListItem'
import { classNames } from '@renderer/shared/lib/classNames/classNames'
import cls from './ChosenEmployeesList.module.scss'
import { CheckboxChangeEvent } from 'antd/es/checkbox'

interface ChooseEmployeesListProps {
  chosenEmployees: Employee[]
  setChosenEmployees: React.Dispatch<React.SetStateAction<Employee[]>>
}

export const ChooseEmployeesList = ({
  chosenEmployees,
  setChosenEmployees
}: ChooseEmployeesListProps) => {
  const dispatch = useAppDispatch()
  const employees = useEmployees()
  const [checkedAll, setCheckedAll] = useState(true)

  useEffect(() => {
    dispatch(fetchEmployees())
  }, [dispatch])

  useEffect(() => {
    setChosenEmployees(employees)
    // eslint-disable-next-line
  }, [employees])

  const employeeCheckChange = useCallback(
    (e: CheckboxChangeEvent, employee: Employee) => {
      const checked = e.target.checked

      if (checked) {
        const updatedArray = [...chosenEmployees, employee].sort((a, b) => {
          return a.id - b.id
        })
        setChosenEmployees(updatedArray)
      } else {
        const filteredEmployees = chosenEmployees.filter((item) => item.id !== employee.id)
        setChosenEmployees(filteredEmployees)
      }
    },
    [chosenEmployees, setChosenEmployees]
  )

  const renderItem = useCallback(
    (item: Employee, i: number) => {
      const employeeInList = chosenEmployees.findIndex((employee) => employee.id === item.id) !== -1
      return (
        <ListItem
          index={i}
          employee={item}
          checked={employeeInList}
          onChange={(e) => employeeCheckChange(e, item)}
        />
      )
    },
    [chosenEmployees, employeeCheckChange]
  )

  const checkedAllChangeHandler = useCallback(
    (e: CheckboxChangeEvent) => {
      const checked = e.target.checked
      if (checked) {
        setCheckedAll(true)
        setChosenEmployees(employees)
      } else {
        setCheckedAll(false)
        setChosenEmployees([])
      }
    },
    [employees, setChosenEmployees]
  )

  return (
    <div className={classNames(cls.Wrapper)}>
      <Widget title="Список сотрудников">
        <div className={classNames(cls.CheckAllWrapper)}>
          <Checkbox
            checked={checkedAll}
            onChange={checkedAllChangeHandler}
          />
          <span>{checkedAll ? 'Удалить всех' : 'Добавить всех'}</span>
        </div>

        <List
          size="small"
          bordered
          dataSource={employees}
          renderItem={renderItem}
        />
      </Widget>
    </div>
  )
}
