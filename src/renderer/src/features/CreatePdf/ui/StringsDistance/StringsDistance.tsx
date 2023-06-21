import { Select } from 'antd'
import React, { useCallback } from 'react'
import { classNames } from '@renderer/shared/lib/classNames/classNames'
import cls from './StringsDistances.module.scss'

interface StringsDistanceProps {
  stringsDistance: number
  setStringsDistance: React.Dispatch<React.SetStateAction<number>>
}

export const StringsDistance = ({ stringsDistance, setStringsDistance }: StringsDistanceProps) => {
  const stringsDistances: number[] = []
  for (let i = 10; i <= 50; i++) {
    stringsDistances.push(i)
  }
  const stringsDistancesOptions = stringsDistances.map((size) => ({ value: size, label: size }))

  const stringDistanceChangeHandler = useCallback(
    (value: string) => {
      setStringsDistance(+value)
    },
    [setStringsDistance]
  )

  return (
    <div className={classNames(cls.Wrapper)}>
      <span>Расстояние между строками: </span>
      <Select
        value={stringsDistance.toString()}
        options={stringsDistancesOptions}
        onChange={stringDistanceChangeHandler}
      />
    </div>
  )
}
