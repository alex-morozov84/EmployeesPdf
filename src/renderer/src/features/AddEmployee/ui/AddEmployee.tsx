import { Button, DatePicker, Form, Input, Select } from 'antd'
import { useCallback } from 'react'
import { addEmployee } from '@renderer/entities/Employee'
import { useAppDispatch } from '@renderer/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Widget } from '@renderer/shared/ui/Widget'
import cls from './AddEmployee.module.scss'
import { classNames } from '@renderer/shared/lib/classNames/classNames'
import { Dayjs } from 'dayjs'
import { useForm } from 'antd/es/form/Form'
import { Employee } from '@renderer/entities/Employee'

type NewEmployeeFormData = Omit<Employee, 'id' | 'birthDay'> & { birthDay: Dayjs }

export const AddEmployee = () => {
  const dispatch = useAppDispatch()
  const [form] = useForm()

  const addNewEmployee = useCallback(
    (fieldsValue: NewEmployeeFormData) => {
      const newEmployeeData = {
        ...fieldsValue,
        birthDay: fieldsValue.birthDay?.format('DD.MM.YYYY')
      }

      dispatch(addEmployee(newEmployeeData))

      form.resetFields()
    },
    [dispatch, form]
  )

  return (
    <div className={classNames(cls.Wrapper)}>
      <Widget title={'Добавить сотрудника'}>
        <Form
          form={form}
          size="small"
          name="addEmployee"
          onFinish={addNewEmployee}
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
            // rules={[{ required: true, message: 'Выберите дату рождения сотрудника!' }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
            >
              Добавить
            </Button>
          </Form.Item>
        </Form>
      </Widget>
    </div>
  )
}
