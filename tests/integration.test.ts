import { DOMWrapper, mount } from '@vue/test-utils'
import App from '../src/App.vue'
import { initReservationData } from '../src/utils/initReservationData'
import {
  oneDayInMs,
  dateStringToMs,
  dateMsToString
} from '../src/utils'
import { nextTick } from 'vue'
import { expect } from 'vitest'

const execClick = async (el: DOMWrapper<Element>, nTimes: number): Promise<void> => {
  for(let i = 1; i <= nTimes; i++) {
    await el.trigger('click')
    await nextTick()
  }
}

describe('Integration', () => {
  const initialNights = 1
  const addNights = 4
  const subNights = 2
  const expectAddNights = 5
  const expectSubNights = 3
  const subButtonSelector = '.rt-bordered'
  const addButtonSelector = '.lt-bordered'
  const nightsCounterSelector = '.night-counter__nights'
  const dateInputSelector = '.date-input__value'

  it('changes nights and dateOut on click nights buttons', async () => {
    const reservationData = initReservationData(initialNights)
    const wrapper = mount(App)
    const subButton =  wrapper.find(subButtonSelector)
    const addButton =  wrapper.find(addButtonSelector)
    const nightsCounter = wrapper.find(nightsCounterSelector)
    const dateOutEl = wrapper.findAll(dateInputSelector)[1].element as HTMLInputElement
    const expectedAddDateOut = dateMsToString((dateStringToMs(reservationData.dateIn) + oneDayInMs * expectAddNights))

    await execClick(addButton, addNights)
    await nextTick()

    expect(nightsCounter.text()).toEqual(`${expectAddNights}`)
    expect(dateOutEl.value).toEqual(expectedAddDateOut)

    const expectedSubDateOut = dateMsToString((dateStringToMs(dateOutEl.value) - oneDayInMs * subNights))
    await execClick(subButton, subNights)
    await nextTick()
    expect(nightsCounter.text()).toEqual(`${expectSubNights}`)
    expect(dateOutEl.value).toEqual(expectedSubDateOut)

    wrapper.unmount()
  })
  it('changes nights on change dateOut', async () => {
    const reservationData = initReservationData(initialNights)
    const wrapper = mount(App)

    const dateOut = wrapper.findAll(dateInputSelector)[1]
    const changeDateOut = dateMsToString((dateStringToMs(reservationData.dateIn) + oneDayInMs * expectAddNights))

    await dateOut.setValue(changeDateOut)
    await nextTick()

    const nightsCounter = wrapper.find(nightsCounterSelector)
    expect(nightsCounter.text()).toEqual(`${expectAddNights}`)
    wrapper.unmount()
  })
  it('keeps nights but changes dateOut on change dateIn', async () => {
    const initialNights = 3
    const reservationData = initReservationData(initialNights)
    const wrapper = mount(App, { props: { reservationData }})

    const changeDateInBy = 60
    const datesList = wrapper.findAll(dateInputSelector)
    const dateIn = datesList[0]
    const dateOutEl = datesList[1].element as HTMLInputElement
    const changeDateIn = dateMsToString((dateStringToMs(reservationData.dateIn) - oneDayInMs * changeDateInBy))

    const nightsBeforeChange = wrapper.find(nightsCounterSelector).text()
    await dateIn.setValue(changeDateIn)
    await nextTick()

    const nightsAfterChange = wrapper.find(nightsCounterSelector).text()
    const expectedDateOut = dateMsToString((dateStringToMs(changeDateIn) + oneDayInMs * initialNights))

    expect(dateOutEl.value).toEqual(`${expectedDateOut}`)
    expect(nightsBeforeChange).toEqual(nightsAfterChange)

    wrapper.unmount()
  })
})
