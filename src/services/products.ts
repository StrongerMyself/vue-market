const db = require('../../db.json')
import { Product } from 'entity-types'

export const fetchList = () => {
  return new Promise<Product[]>((resolve) => {
    setTimeout(() => {
      resolve(db.products)
    }, 2000)
  })
}
