import { Input, Modal } from 'antd'
import React from 'react'

interface FileNameModalProps {
  isModalOpen: boolean
  closeModal: () => void
  fileName: string
  setFileName: React.Dispatch<React.SetStateAction<string>>
  saveFileHandler: () => void
}

export const FileNameModal = ({
  isModalOpen,
  closeModal,
  fileName,
  setFileName,
  saveFileHandler
}: FileNameModalProps) => {
  const changeFileNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileName = e.target.value
    setFileName(fileName)
  }

  return (
    <Modal
      title="Введите название файла"
      open={isModalOpen}
      onCancel={closeModal}
      onOk={saveFileHandler}
    >
      <Input
        value={fileName}
        onChange={changeFileNameHandler}
      />
    </Modal>
  )
}
