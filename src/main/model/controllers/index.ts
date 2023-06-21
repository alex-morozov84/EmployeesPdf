import { employeeController } from './employee.controller'
import { filesController } from './files.controller'
import { testController } from './test.controller'

const setControllers = () => {
  employeeController()
  filesController()
  testController()
}

export { setControllers }
