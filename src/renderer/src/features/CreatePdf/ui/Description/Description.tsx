import { classNames } from '@renderer/shared/lib/classNames/classNames'
import cls from './Description.module.scss'

export const Description = () => {
  return (
    <div className={classNames(cls.Wrapper)}>
      <span className={classNames(cls.Description)}>1. Создайте файл-шаблон в формате .pdf</span>
      <span className={classNames(cls.Description)}>
        2. Выберите в списке слева сотрудников, имена которых требуется добавить в шаблон
      </span>
      <span className={classNames(cls.Description)}>
        3. При необходимости измените размер шрифта
      </span>
      <span className={classNames(cls.Description)}>
        4. По умолчанию используется шрифт ArtScript. При необходимости изменения шрифта добавьте
        требуемый файл со шрифтом в формате .ttf, нажав на соответствующую кнопку
      </span>
      <span className={classNames(cls.Description)}>
        {`5. Для формирования документа нажмите на кнопку "Загрузить шаблон и сформировать
         поздравление". Выберите файл-шаблон. Документ будет сформирован автоматически. Сохраните
         готовый файл в формате .pdf в требуемое место`}
      </span>
      <span className={classNames(cls.Description)}>
        6. При необходимости смещения текста вверх или вниз относительно положения, заданного по
        умолчанию, а также при необходимости изменения межстрочного расстояния, поменяйте
        соответствующие значения и повторите формирование документа
      </span>
    </div>
  )
}
