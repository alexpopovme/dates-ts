import { VueWrapper, mount } from '@vue/test-utils'
import DateInput from '../src/components/DateInput.vue'
import { initReservationData } from '../src/utils/initReservationData'
import {
  oneDayInMs,
  dateStringToMs,
  dateMsToString,
} from '../src/utils'
import { Props } from '../types/common'

const initialMount = (initialProps: Props): VueWrapper => {
   return mount(DateInput, { props: initialProps })
}

describe('DateInput component', () => {
  const dateInputSelector = '.date-input__value'

  it('Should exist', () => {
    expect(DateInput).toBeTruthy()
  })

  it('Emits modelValue event on change value', async () => {
    const initialNights = 1
    const reservationData = initReservationData(initialNights)
    const initialDate = reservationData.dateIn
    const initialProps =  {
      modelValue: initialDate,
      reservationData
    }
    const changeDate = dateMsToString((dateStringToMs(initialDate) + oneDayInMs * reservationData.nights))

    const wrapper = initialMount(initialProps)
    await wrapper.find(dateInputSelector).setValue(changeDate)
    expect(wrapper.emitted()).toHaveProperty('update:modelValue')

    wrapper.unmount()
  })

  it('watches dateIn and changes dateOut by emitting date-out-change', async () => {
    const initialNights = 1
    const reservationData = initReservationData(initialNights)
    const initialDate = reservationData.dateIn
    const initialProps =  {
      modelValue: initialDate,
      reservationData
    }
    const changeDate = dateMsToString((dateStringToMs(reservationData.dateIn) + oneDayInMs * initialNights))
    const expectedDateOut = dateMsToString((dateStringToMs(changeDate) + oneDayInMs * initialNights))

    const changedProps =  {
      modelValue: initialDate,
      reservationData: { ...reservationData, dateIn: changeDate}
    }

    const wrapper = initialMount(initialProps)
    await wrapper.setProps(changedProps)

    expect(wrapper.emitted()).toHaveProperty('date-out-change')
    expect(wrapper.emitted()['date-out-change']).toEqual([[expectedDateOut]])

    wrapper.unmount()
  })

  it('watches nights and changes dateOut by emitting date-out-change', async () => {
    const initialNights = 3
    const reservationData = initReservationData(initialNights)

    const initialDate = reservationData.dateIn
    const initialProps =  {
      modelValue: initialDate,
      reservationData
    }

    const changedNights = 5
    const expectedDateOut = dateMsToString((dateStringToMs(initialDate) + oneDayInMs * changedNights))

    const changedProps =  {
      modelValue: initialDate,
      reservationData: { ...reservationData, nights: changedNights }
    }

    const wrapper = initialMount(initialProps)

    await wrapper.setProps(changedProps)

    expect(wrapper.emitted()).toHaveProperty('date-out-change')
    expect(wrapper.emitted()['date-out-change']).toEqual([[expectedDateOut]])

    wrapper.unmount()
  })
})
