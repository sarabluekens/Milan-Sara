export interface Equipment {
  id: string
  name: string
  category: string
  description: string
  totalStock: number
  reservedStock: string[]
  available: boolean
  expirationDate: Date
}
