export interface Equipment {
  id: string
  name: string
  category: string
  description: string
  totalStock: number
  reservedStock: Array<reservedStock>
  available: boolean
  expirationDate: Date
}

export interface reservedStock {
  eventId: string
  amount: number
}
