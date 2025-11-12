import { TFunction } from 'i18next'

export const getLabelMap = (
  t: TFunction<['translation', ...string[]], undefined>,
  successLabel?: string,
  unSuccessLabel?: string
) => ({
  ACTIVE: successLabel ? successLabel : t('RENDER_CHIP.CORRECT'),
  FAILED: unSuccessLabel ? unSuccessLabel : t('RENDER_CHIP.ERROR'),
  SUCCESS: 'Успешно',
  IN_PROGRESS: 'В процессе',
  LOST: 'Потерянные',
  PARTIAL: 'Частичные',
  CANCELED: 'Отменённые',
  CREATING: 'Создается',
  Online: 'Онлайн',
  Linkdown: 'Офлайн',
  DELETING: 'Удаляется',
  HERMIT: 'Ограждается',
})
