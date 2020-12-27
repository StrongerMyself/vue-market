const db = require('../../db.json')
import { Category } from 'entity-types'

export const fetchList = () => {
  return new Promise<Category[]>((resolve) => {
    setTimeout(() => {
      resolve(db.categories)
    }, 2000)
  })
}
