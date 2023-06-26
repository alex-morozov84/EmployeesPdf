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
import { FileNameModal } from '../FileNameModal/FileNameModal'
import { Widget } from '../../../../shared/ui/Widget'
import { ConfirmModal } from '../ConfirmModal/ConfirmModal'

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
  const { ipcRenderer } = window.electron
  const [font, setFont] = useState<string | Uint8Array | ArrayBuffer>()
  const [fontSize, setFontSize] = useState(25)
  const [stringsDistance, setStringsDistance] = useState(30)
  const [textOffset, setTextOffset] = useState(0)
  const [file, setFile] = useState<ArrayBuffer>()
  const [fileName, setFileName] = useState('')
  const [isFilenameModalOpen, setIsFilenameModalOpen] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)

  const closeModalHandler = useCallback(() => {
    setIsFilenameModalOpen(false)
  }, [])

  const closeConfirmModal = useCallback(() => {
    setFileName('')
    setIsConfirmModalOpen(false)
  }, [])

  const getFonts = async () => {
    const response = await ipcRenderer.invoke('getFileTemplate', 'fontOne')
    setFont(response)
  }

  useEffect(() => {
    getFonts()
    //eslint-disable-next-line
  }, [])

  const drawData = useCallback(
    ({ page, position, appeal, name, font, fontSize, appealWidth, nameWidth }: DrawData) => {
      const yTop = 800 - textOffset
      const yMiddle = 530 - textOffset
      const yBottom = 260 - textOffset
      const yPos: Record<Position, number[]> = {
        top: [yTop, yTop - stringsDistance],
        middle: [yMiddle, yMiddle - stringsDistance],
        bottom: [yBottom, yBottom - stringsDistance]
      }

      page.drawText(appeal, {
        x: 410 - appealWidth / 2,
        y: yPos[position][0],
        size: fontSize,
        font,
        color: cmyk(0.26, 0.95, 1, 0.22)
      })

      page.drawText(name, {
        x: 410 - nameWidth / 2,
        y: yPos[position][1],
        size: fontSize,
        font,
        color: cmyk(0.26, 0.95, 1, 0.22)
      })
    },
    [stringsDistance, textOffset]
  )

  // const saveFile = async (blobData: Uint8Array) => {
  //   const blob = new Blob([blobData], { type: 'application/pdf' })
  //
  //   // Для сохранения вручную
  //   // const link = document.createElement('a')
  //   // link.href = window.URL.createObjectURL(blob)
  //   // link.download = 'test.pdf'
  //   // link.click()
  // }

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
        const blob = new Blob([pdfBytes], { type: 'application/pdf' })
        const fileArrayBuffer = await blob.arrayBuffer()
        setFile(fileArrayBuffer)

        setIsFilenameModalOpen(true)
      }
    },
    [drawData, employees, font, fontSize]
  )

  const saveFileHandler = useCallback(async () => {
    if (fileName && file && font) {
      await ipcRenderer.invoke('loadNewPdf', { file, fileName })
      setFile(undefined)
      setIsFilenameModalOpen(false)
      setIsConfirmModalOpen(true)
    }
  }, [file, fileName, font, ipcRenderer])

  return (
    <div className={classNames(cls.Wrapper)}>
      <Description />

      <Font
        fontSize={fontSize}
        setFontSize={setFontSize}
        setFont={setFont}
      />

      <Widget title="Форматирование">
        <TextOffset
          textOffset={textOffset}
          setTextOffset={setTextOffset}
        />

        <StringsDistance
          setStringsDistance={setStringsDistance}
          stringsDistance={stringsDistance}
        />
      </Widget>

      <Upload
        beforeUpload={() => false}
        multiple={false}
        maxCount={1}
        onChange={patternUpload}
        accept="application/pdf"
      >
        <Button type="primary">Создать поздравление</Button>
      </Upload>

      <span className={classNames(cls.Description)}>
        {`Итоговый файл будет содержать поздравления ${employees.length} сотр. на ${
          employees.length % 3 === 0
            ? Math.floor(employees.length / 3)
            : Math.floor(employees.length / 3) + 1
        } л.`}
      </span>

      <FileNameModal
        isModalOpen={isFilenameModalOpen}
        closeModal={closeModalHandler}
        fileName={fileName}
        setFileName={setFileName}
        saveFileHandler={saveFileHandler}
      />

      <ConfirmModal
        confirmModalIsOpen={isConfirmModalOpen}
        closeConfirmModal={closeConfirmModal}
        fileName={fileName}
      />
    </div>
  )
}
