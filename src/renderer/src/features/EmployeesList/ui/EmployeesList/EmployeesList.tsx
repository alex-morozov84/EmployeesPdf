import { Employee, fetchEmployees, useEmployees } from '@renderer/entities/Employee'
import { useAppDispatch } from '@renderer/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useCallback, useEffect, useState } from 'react'
import { List } from 'antd'
import cls from './EmployeesList.module.scss'
import { classNames } from '@renderer/shared/lib/classNames/classNames'
import { Widget } from '@renderer/shared/ui/Widget'
import { ChangeEmployeeData } from '../ChangeEmployeeData/ChangeEmployeeData'
import { EmployeesListItem } from '../EmployeesListItem/EmployeesListItem'

export const EmployeesList = () => {
  const dispatch = useAppDispatch()
  const employees = useEmployees()
  const [employeeDrawerOpen, setEmployeeDrawerOpen] = useState(false)
  const [employee, setEmployee] = useState<Employee>({} as Employee)

  const sortedEmployees = [...employees]?.sort((a, b) => {
    const lastnameA = a.lastname.toLowerCase() ?? ''
    const lastnameB = b.lastname.toLowerCase() ?? ''
    return lastnameA.localeCompare(lastnameB)
  })

  useEffect(() => {
    dispatch(fetchEmployees())
  }, [dispatch])

  const onCloseEmployeeDrawer = useCallback(() => {
    setEmployeeDrawerOpen(false)
  }, [])

  const renderItem = useCallback(
    (item: Employee, i) => (
      <EmployeesListItem
        index={i}
        employee={item}
        setEmployee={setEmployee}
        setEmployeeDrawerOpen={setEmployeeDrawerOpen}
      />
    ),
    []
  )

  // Можно использовать для загрзки данных из файла
  // const documentUploadHandler = useCallback(
  //   async (data: UploadChangeParam<UploadFile<unknown>>) => {
  //     if (data.file) {
  //       const newFile = data.file as RcFile
  //       const fileBuffer = await newFile.arrayBuffer()
  //       const readData = await read(fileBuffer)
  //       const dataText = utils.sheet_to_json(readData.Sheets[readData.SheetNames[0]])
  //
  //       for await (const data of dataText) {
  //         const fio = data.__EMPTY.split(' ')
  //         const lastname = fio[0]
  //         const firstname = fio[1]
  //         const patronymic = fio[2]
  //         if (lastname && firstname && patronymic) {
  //           const newEmployeeData = { sex: 'male' as Sex, lastname, firstname, patronymic }
  //           await dispatch(addEmployee(newEmployeeData))
  //         }
  //       }
  //     }
  //   },
  //   [dispatch]
  // )

  return (
    <div className={classNames(cls.Wrapper)}>
      <Widget title="Список сотрудников">
        <List
          size="small"
          bordered
          dataSource={sortedEmployees}
          renderItem={renderItem}
        />
        <ChangeEmployeeData
          open={employeeDrawerOpen}
          close={onCloseEmployeeDrawer}
          employee={employee}
        />
      </Widget>
      {/*<Upload*/}
      {/*  beforeUpload={() => false}*/}
      {/*  onChange={documentUploadHandler}*/}
      {/*  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"*/}
      {/*  multiple={false}*/}
      {/*  maxCount={1}*/}
      {/*  // fileList={file ? [file] : undefined}*/}
      {/*>*/}
      {/*  <Button>Загрузить</Button>*/}
      {/*</Upload>*/}
    </div>
  )
}
