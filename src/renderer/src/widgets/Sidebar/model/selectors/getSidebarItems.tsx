import { SidebarItemType } from '../types/sidebar'
import { getRouteMain, getRoutePdf } from '@renderer/shared/const/router'
import { TeamOutlined, FormOutlined } from '@ant-design/icons'
import { createSelector } from '@reduxjs/toolkit'
import { getUser } from '@renderer/entities/User'

export const getSidebarItems = createSelector(getUser, () => {
  const sidebarItemsList: SidebarItemType[] = [
    {
      path: getRouteMain(),
      Icon: <TeamOutlined rev={undefined} />,
      text: 'Сотрудники'
    },
    {
      path: getRoutePdf(),
      Icon: <FormOutlined rev={undefined} />,
      text: 'Создание открытки'
    }
  ]

  return sidebarItemsList
})
