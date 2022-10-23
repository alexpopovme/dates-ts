export interface ReservationData {
  dateIn: string
  dateOut: string
  nights: number
}

export interface Props {
  modelValue: string
  reservationData?: ReservationData
}
