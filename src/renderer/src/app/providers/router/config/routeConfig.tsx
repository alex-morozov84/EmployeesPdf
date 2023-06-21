import { AppRoutes } from '@renderer/shared/const/router'
import { AppRouteProps } from '@renderer/shared/types/router'
import { getRouteMain, getRoutePdf } from '@renderer/shared/const/router'
import { EmployeesPage } from '@renderer/pages/EmployeesPage'
import { MakePdfPage } from '@renderer/pages/MakePdfPage'

export const routeConfig: Record<AppRoutes, AppRouteProps> = {
  [AppRoutes.MAIN]: {
    path: getRouteMain(),
    element: <EmployeesPage />
  },
  [AppRoutes.PDF]: {
    path: getRoutePdf(),
    element: <MakePdfPage />
  }
}
