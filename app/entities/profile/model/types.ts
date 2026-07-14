export interface ProfileLinks {
  email: string
  telegram: string
  phone: string
}

export interface Profile {
  yearsOfExperience: string
  openToRelocate: boolean
  openToBusinessTrips: boolean
  languages: Array<{ code: string; levelKey: string }>
  links: ProfileLinks
}
