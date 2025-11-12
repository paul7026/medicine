import { TFunction } from 'i18next'
import * as Yup from 'yup'

import { SearchInputForm } from './types'

export const validationSchema = (
  t: TFunction<'translation', 'CLUSTERS_PAGE.CREATE_CLUSTER_MODAL.TEXT_FIELD'>
): Yup.ObjectSchema<SearchInputForm> =>
  Yup.object().shape({
    name: Yup.string().required(t('CLUSTER_NAME.VALIDATION_TEXT')).trim(),
  })
