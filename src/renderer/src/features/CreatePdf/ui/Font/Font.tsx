import { Button, Select, Upload, UploadFile } from 'antd'
import React, { useCallback } from 'react'
import { RcFile, UploadChangeParam } from 'antd/es/upload'
import { classNames } from '@renderer/shared/lib/classNames/classNames'
import cls from './Font.module.scss'

interface FontProps {
  fontSize: number
  setFontSize: React.Dispatch<React.SetStateAction<number>>
  setFont: React.Dispatch<React.SetStateAction<string | Uint8Array | ArrayBuffer | undefined>>
}

export const Font = ({ fontSize, setFontSize, setFont }: FontProps) => {
  const fontSizes: number[] = []
  for (let i = 10; i <= 30; i++) {
    fontSizes.push(i)
  }
  const fontSizeOptions = fontSizes.map((size) => ({ value: size, label: size }))

  const fontSizeChangeHandler = useCallback(
    (value: string) => {
      setFontSize(+value)
    },
    [setFontSize]
  )

  const fontUpload = useCallback(
    async (data: UploadChangeParam<UploadFile<unknown>>) => {
      if (data.file) {
        const font = data.file as RcFile
        const fontBuffer = await font.arrayBuffer()

        setFont(fontBuffer)
      }
    },
    [setFont]
  )

  return (
    <div className={classNames(cls.Wrapper)}>
      <div className={classNames(cls.FontSizeSelect)}>
        <span>Размер шрифта: </span>
        <Select
          value={fontSize.toString()}
          options={fontSizeOptions}
          onChange={fontSizeChangeHandler}
        />
      </div>

      <Upload
        beforeUpload={() => false}
        multiple={false}
        maxCount={1}
        onChange={fontUpload}
        accept=".ttf"
      >
        <Button>Загрузите файл шрифта в формате .ttf (при необходимости)</Button>
      </Upload>
    </div>
  )
}
