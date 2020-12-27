declare module 'root-types' {
  export type RootService = typeof import('./index').default;
}

declare module 'entity-types' {
  export interface Category {
    id: number
    title?: string
    decription?: string
  }

  export interface Product {
    id: number
    title?: string
    price: number
    caregoryId?: number
    decription?: string
  }
}
