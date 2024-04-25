export enum typeAccident {
  FELL = 'fell',
  BLEED = 'bleed',
  DRUG = 'drug',
  ALLERGY = 'allergy',
  OTHER = 'other',
  UNCONSCIOUS = 'unconscious',
}

export interface UsedMaterial {
  name: string
  quantity: number
}

export interface Case {
  id: string
  eventId: string
  victimId?: string
  caregiverId?: Array<string>
  typeAccident: typeAccident
  date: Date
  accidentDescription?: string
  diagnose?: string
  careGiven?: string
  checkUpRequired: boolean
  checkUpDescription?: string
  referred: boolean
  referralDescription?: string
  personalEnsurance: boolean
  eventEnsurance: boolean
  usedMaterials?: Array<UsedMaterial>
}
