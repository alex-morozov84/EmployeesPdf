import { Select } from 'antd'
import React, { useCallback } from 'react'
import { classNames } from '@renderer/shared/lib/classNames/classNames'
import cls from './TextOffset.module.scss'

interface TextOffsetProps {
  textOffset: number
  setTextOffset: React.Dispatch<React.SetStateAction<number>>
}

export const TextOffset = ({ textOffset, setTextOffset }: TextOffsetProps) => {
  const textOffsets: number[] = []
  for (let i = -20; i <= 20; i++) {
    textOffsets.push(i)
  }
  const textOffsetsOptions = textOffsets.map((size) => ({ value: size, label: size }))

  const textOffsetChangeHandler = useCallback(
    (value: string) => {
      setTextOffset(+value)
    },
    [setTextOffset]
  )

  return (
    <div className={classNames(cls.Wrapper)}>
      <span>Смещение текста: </span>
      <Select
        value={textOffset.toString()}
        options={textOffsetsOptions}
        onChange={textOffsetChangeHandler}
        style={{ width: '70px' }}
      />
    </div>
  )
}
