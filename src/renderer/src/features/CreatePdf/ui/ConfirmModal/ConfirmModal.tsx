import { Button, Modal } from 'antd'

interface ConfirmModalProps {
  confirmModalIsOpen: boolean
  closeConfirmModal: () => void
  fileName: string
}

export const ConfirmModal = ({
  confirmModalIsOpen,
  closeConfirmModal,
  fileName
}: ConfirmModalProps) => {
  // const onOkHandler = useCallback(async () => {
  // setFileName('')
  // const response = await ipcRenderer.invoke('getPdfFile', fileName)
  // const blob = new Blob([response], { type: 'application/pdf' })
  // const newWindow = window.open('/test.pdf')
  // if (newWindow) {
  //   newWindow.onload = () => {
  //     const fileObjectURL = URL.createObjectURL(blob)
  //     console.log(fileObjectURL)
  //     newWindow.location = fileObjectURL
  //   }
  // }
  // const reader = new FileReader()
  // reader.onload = function (e) {
  //   window.location.href = reader.result
  // }
  // reader.readAsDataURL(blob)
  // const url = URL.createObjectURL(blob)
  // const link = document.createElement('a')
  // // link.href = window.URL.createObjectURL(blob)
  // link.href = url
  // link.download = `${fileName}.pdf`
  // link.target = '_blank'
  // link.click()
  // }, [fileName, ipcRenderer, setFileName])

  return (
    <Modal
      title={`Файл ${fileName}.pdf создан в папке "Открытки"`}
      open={confirmModalIsOpen}
      footer={[
        <Button
          key="ok"
          type="primary"
          onClick={closeConfirmModal}
        >
          Ок
        </Button>
      ]}
    >
      {/*<div>{`Файл ${fileName}.pdf создан в папке "Открытки"`}</div>*/}
    </Modal>
  )
}
