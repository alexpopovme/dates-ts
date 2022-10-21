import { reactive } from 'vue'
import { dateMsToString, getCurrDate, oneDayInMs } from './index'
import { ReservationData } from '../../types/common'

const currDate = getCurrDate()

export const initReservationData = (initialNights: number = 1): ReservationData => {
  return reactive({
    dateIn: currDate.str,
    dateOut: dateMsToString( oneDayInMs * initialNights + currDate.ms),
    nights: initialNights
  })
}
