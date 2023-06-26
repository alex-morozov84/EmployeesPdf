import { app, ipcMain } from 'electron'
import fs from 'fs'
import path from 'path'

const TemplatePaths = {
  fontOne: path.join(process.env.PORTABLE_EXECUTABLE_DIR || '', 'data', 'fonts', 'ArtScript.ttf'),
  another: path.join(app.getPath('home'), 'employee', 'another.docx')
} as const

type TemplateType = keyof typeof TemplatePaths

export const filesController = () => {
  ipcMain.handle('getFileTemplate', async (_, type: TemplateType) => {
    return fs.readFileSync(TemplatePaths[type])
  })

  ipcMain.handle('getPdfFile', async (_, name: string) => {
    const filePath = path.join(process.env.PORTABLE_EXECUTABLE_DIR || '', 'Открытки')

    return fs.readFileSync(path.resolve(filePath, `${name}.pdf`))
  })

  ipcMain.handle(
    'loadNewPdf',
    async (_, { file, fileName }: { file: ArrayBuffer; fileName: string }) => {
      const filePath = path.join(process.env.PORTABLE_EXECUTABLE_DIR || '', 'Открытки')

      // Check if directory exists
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true })
      }
      return fs.writeFileSync(path.resolve(filePath, `${fileName}.pdf`), Buffer.from(file))
    }
  )
}
