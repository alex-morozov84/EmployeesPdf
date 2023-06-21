import { Employee } from '@renderer/entities/Employee'
import { Button, DatePicker, Form, Input, Select } from 'antd'
import { useMemo } from 'react'
import { useAppDispatch } from '@renderer/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { updateEmployee } from '@renderer/entities/Employee/model/services/updateEmployee/updateEmployee'
import dayjs, { Dayjs } from 'dayjs'

interface EmployeeFormProps {
  employee: Employee
}

export interface UpdateEmployeeFormData {
  name?: string
  rank?: string
  position?: string
  birthDay?: Dayjs
  timeOffset?: number
}

export const EmployeeFrom = ({ employee }: EmployeeFormProps) => {
  const dispatch = useAppDispatch()
  console.log(employee)

  const onChangeEmployeeData = (fieldsValue: UpdateEmployeeFormData) => {
    const updatedEmployeeData = {
      ...fieldsValue,
      id: employee.id,
      birthDay: fieldsValue.birthDay?.format('DD.MM.YYYY')
    }

    dispatch(updateEmployee(updatedEmployeeData))
  }

  const initialData = useMemo(() => {
    return [
      { name: ['sex'], value: employee.sex },
      { name: ['firstname'], value: employee.firstname },
      { name: ['lastname'], value: employee.lastname },
      { name: ['patronymic'], value: employee.patronymic },
      { name: ['rank'], value: employee.rank },
      { name: ['position'], value: employee.position },
      {
        name: ['birthDay'],
        value: employee.birthDay ? dayjs(employee.birthDay, 'DD.MM.YYYY') : dayjs()
      }
    ]
  }, [
    employee.birthDay,
    employee.firstname,
    employee.lastname,
    employee.patronymic,
    employee.position,
    employee.rank,
    employee.sex
  ])

  return (
    <Form
      layout="vertical"
      onFinish={onChangeEmployeeData}
      fields={initialData}
    >
      <Form.Item
        label="Пол"
        name="sex"
        rules={[{ required: true, message: 'Выберите пол сотрудника!' }]}
      >
        <Select>
          <Select.Option value="male">М</Select.Option>
          <Select.Option value="female">Ж</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Фамилия"
        name="lastname"
        rules={[{ required: true, message: 'Введите фамилию сотрудника!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Имя"
        name="firstname"
        rules={[{ required: true, message: 'Введите имя сотрудника!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Отчество"
        name="patronymic"
        rules={[{ required: true, message: 'Введите отчество сотрудника!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Звание"
        name="rank"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Должность"
        name="position"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="birthDay"
        label="Дата рождения"
      >
        <DatePicker />
      </Form.Item>
      <Button
        htmlType="submit"
        type="primary"
      >
        Применить
      </Button>
    </Form>
  )
}
