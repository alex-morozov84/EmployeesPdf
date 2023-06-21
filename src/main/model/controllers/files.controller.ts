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
}
