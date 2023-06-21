import { Button, Upload, UploadFile } from 'antd'
import { cmyk, PDFDocument, PDFFont, PDFPage } from 'pdf-lib'
import { Employee } from '@renderer/entities/Employee'
import { useCallback, useEffect, useState } from 'react'
import fontkit from '@pdf-lib/fontkit'
import { classNames } from '@renderer/shared/lib/classNames/classNames'
import cls from './CreatePdf.module.scss'
import { Description } from '../Description/Description'
import { RcFile, UploadChangeParam } from 'antd/es/upload'
import { Font } from '../Font/Font'
import { StringsDistance } from '../StringsDistance/StringsDistance'
import { TextOffset } from '../TextOffset/TextOffset'

type Position = 'top' | 'middle' | 'bottom'

interface DrawData {
  page: PDFPage
  position: Position
  appeal: string
  name: string
  font: PDFFont
  fontSize: number
  appealWidth: number
  nameWidth: number
}

interface CreatePdfProps {
  employees: Employee[]
}

export const CreatePdf = ({ employees }: CreatePdfProps) => {
  const [font, setFont] = useState<string | Uint8Array | ArrayBuffer>()
  const [fontSize, setFontSize] = useState(25)
  const [stringsDistance, setStringsDistance] = useState(30)
  const [textOffset, setTextOffset] = useState(0)

  const getFonts = async () => {
    const { ipcRenderer } = window.electron
    const response = await ipcRenderer.invoke('getFileTemplate', 'fontOne')
    // if (typeof response === 'Uint8Array') {
    console.log(typeof response)
    // }
    setFont(response)
  }

  useEffect(() => {
    getFonts()
  }, [])

  const drawData = ({
    page,
    position,
    appeal,
    name,
    font,
    fontSize,
    appealWidth,
    nameWidth
  }: DrawData) => {
    const yTop = 800 - textOffset
    const yMiddle = 530 - textOffset
    const yBottom = 260 - textOffset
    const yPos: Record<Position, number[]> = {
      top: [yTop, yTop - stringsDistance],
      middle: [yMiddle, yMiddle - stringsDistance],
      bottom: [yBottom, yBottom - stringsDistance]
    }

    page.drawText(appeal, {
      // x: 350,
      x: 410 - appealWidth / 2,
      y: yPos[position][0],
      size: fontSize,
      font,
      color: cmyk(0.26, 0.95, 1, 0.22)
    })

    page.drawText(name, {
      // x: 320,
      x: 410 - nameWidth / 2,
      y: yPos[position][1],
      size: fontSize,
      font,
      color: cmyk(0.26, 0.95, 1, 0.22)
    })
  }

  const patternUpload = useCallback(
    async (data: UploadChangeParam<UploadFile<unknown>>) => {
      if (data.file && font) {
        const pdfDoc = await PDFDocument.create()

        const patternFile = data.file as RcFile
        const templateBlob = await patternFile.arrayBuffer()

        const template = await PDFDocument.load(templateBlob)

        // Подключаем кастомный шрифт
        pdfDoc.registerFontkit(fontkit)
        // const fontBlob = await font.arrayBuffer()
        const customFont = await pdfDoc.embedFont(font)

        // Номер заполняемой страницы
        let pageNumber = 0
        for await (const [i, employee] of employees.entries()) {
          if (i % 3 === 0) {
            // Для каждой четвертой записи создаем новую копию шаблона и добавляем ее в PDF
            const [templatePage] = await pdfDoc.copyPages(template, [0])
            pdfDoc.addPage(templatePage)
            // Переключаем текущую страницу на только что созданную
            pageNumber += 1
          }

          // Находим в документе текущую страницу
          const pages = pdfDoc.getPages()
          const page = pages[pageNumber - 1]

          const appeal = employee.sex === 'male' ? 'Уважаемый' : 'Уважаемая'
          const name = `${employee.firstname} ${employee.patronymic}!`

          const appealWidth = customFont.widthOfTextAtSize(appeal, fontSize)
          const nameWidth = customFont.widthOfTextAtSize(name, fontSize)

          if (i % 3 === 0) {
            drawData({
              page,
              position: 'top',
              appeal,
              name,
              font: customFont,
              fontSize,
              appealWidth,
              nameWidth
            })
          }

          if ((i + 2) % 3 === 0) {
            drawData({
              page,
              position: 'middle',
              appeal,
              name,
              font: customFont,
              fontSize,
              appealWidth,
              nameWidth
            })
          }

          if ((i + 1) % 3 === 0) {
            drawData({
              page,
              position: 'bottom',
              appeal,
              name,
              font: customFont,
              fontSize,
              appealWidth,
              nameWidth
            })
          }
        }

        const pdfBytes = await pdfDoc.save()

        saveFile(pdfBytes)
      }
    },
    [drawData, employees, font, fontSize]
  )

  const saveFile = (blobData: Uint8Array) => {
    const blob = new Blob([blobData], { type: 'application/pdf' })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = 'test.pdf'
    link.click()
  }

  return (
    <div className={classNames(cls.Wrapper)}>
      <Description />

      <Font
        fontSize={fontSize}
        setFontSize={setFontSize}
        setFont={setFont}
      />

      <TextOffset
        textOffset={textOffset}
        setTextOffset={setTextOffset}
      />

      <StringsDistance
        setStringsDistance={setStringsDistance}
        stringsDistance={stringsDistance}
      />

      <Upload
        beforeUpload={() => false}
        multiple={false}
        maxCount={1}
        onChange={patternUpload}
        accept="application/pdf"
      >
        <Button type="primary">Загрузить шаблон и сформировать поздравление</Button>
      </Upload>

      <span className={classNames(cls.Description)}>
        {`Итоговый файл будет содержать поздравления ${employees.length} сотр. на ${
          employees.length % 3 === 0
            ? Math.floor(employees.length / 3)
            : Math.floor(employees.length / 3) + 1
        } л.`}
      </span>
    </div>
  )
}
