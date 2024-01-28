import { list } from '@app/services/citizen/list'
import { create } from '@app/services/citizen/create'
import { save } from '@app/services/citizen/save'
import { remove } from '@app/services/citizen/remove'

export const citizensService = {
  list,
  create,
  save,
  remove,
}
