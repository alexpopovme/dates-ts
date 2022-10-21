import { mount } from '@vue/test-utils'
import DateInput from '../src/components/DateInput.vue'
import { initReservationData } from '../src/utils/initReservationData'
import {
  oneDayInMs,
  dateStringToMs,
  dateMsToString,
  dateToLocaleStr,
  formatDateString
} from '../src/utils'



describe('DateInput component', () => {
  const reservationData = initReservationData()
  const initialDate = formatDateString(dateToLocaleStr(new Date('2022-10-20')))
  const changeDate =  formatDateString(dateToLocaleStr(new Date('2022-10-21')))
  const initialProps =  {
    modelValue: initialDate,
    reservationData
  }

  it('Should exist', () => {
    expect(DateInput).toBeTruthy()
  })

  it('Emits modelValue event on change value', async () => {
    const wrapper = mount(DateInput, { props: { ...initialProps } })
    await wrapper.find('.date-input__value').setValue(changeDate)
    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
  })

  it('watches dateIn and changes dateOut by emitting date-out-change', async () => {
    const nights = 1
    const dateOut = dateMsToString((dateStringToMs(changeDate) + oneDayInMs * nights))

    const changedProps =  {
      modelValue: initialDate,
      reservationData: { ...reservationData, dateIn: changeDate}
    }

    const wrapper = mount(DateInput, { props: { ...initialProps } })
    await wrapper.setProps(changedProps)

    expect(wrapper.emitted()).toHaveProperty('date-out-change')
    expect(wrapper.emitted()['date-out-change']).toEqual([[dateOut]])
  })

  it('watches nights and changes dateOut by emitting date-out-change', async () => {
    const nights = 3
    const dateOut = dateMsToString((dateStringToMs(changeDate) + oneDayInMs * nights))

    const changedProps =  {
      modelValue: initialDate,
      reservationData: { ...reservationData, nights}
    }

    const wrapper = mount(DateInput, { props: { ...initialProps } })
    await wrapper.setProps(changedProps)

    expect(wrapper.emitted()).toHaveProperty('date-out-change')
    expect(wrapper.emitted()['date-out-change']).toEqual([[dateOut]])
  })
})
