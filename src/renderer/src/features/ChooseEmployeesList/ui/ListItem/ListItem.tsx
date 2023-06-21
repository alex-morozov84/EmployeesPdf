import { List, Checkbox } from 'antd'
import { Employee } from '@renderer/entities/Employee'
import { classNames } from '@renderer/shared/lib/classNames/classNames'
import cls from './ListItem.module.scss'
import { CheckboxChangeEvent } from 'antd/es/checkbox'

interface ListItemProps {
  index: number
  employee: Employee
  checked: boolean
  onChange: (e: CheckboxChangeEvent) => void
}

export const ListItem = ({ index, employee, checked = true, onChange }: ListItemProps) => {
  return (
    <List.Item>
      <div className={classNames(cls.wrapper)}>
        <Checkbox
          checked={checked}
          onChange={onChange}
        />
        <div>{`${index + 1}`}</div>
        {`${employee.lastname} ${employee.firstname} ${employee.patronymic}`}
      </div>
    </List.Item>
  )
}
