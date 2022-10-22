import { mount } from '@vue/test-utils'
import NightsCounter from '../src/components/NightsCounter.vue'
import { initReservationData } from '../src/utils/initReservationData'
import {
  oneDayInMs,
  dateStringToMs,
  dateMsToString
} from '../src/utils'

const buttonTest = async (buttonSelector: string, action: 'add'|'sub') => {
  const reservationData = initReservationData(1)

  const wrapper = mount(NightsCounter, { props: { reservationData } })

  const resultNights = action === 'add'
    ? reservationData.nights + 1
    : reservationData.nights - 1

  await wrapper.find(buttonSelector).trigger('click')
  expect(wrapper.emitted()).toHaveProperty('nights-change')
  expect(wrapper.emitted()['nights-change']).toEqual([[resultNights]])

  wrapper.unmount()
}


describe('NightsCounter component', () => {
  it('Should exist', () => {
    expect(NightsCounter).toBeTruthy()
  })

  it('watches dateOut and changes nights by emitting nights-change', async () => {
    const reservationData = initReservationData(1)
    const expectedNights = 3
    const changeDateOut = dateMsToString((dateStringToMs(reservationData.dateIn) + oneDayInMs * expectedNights))

    const changedProps =  {
      reservationData: { ...reservationData, dateOut: changeDateOut}
    }

    const wrapper = mount(NightsCounter, { props: { reservationData } })
    await wrapper.setProps(changedProps)

    expect(wrapper.emitted()).toHaveProperty('nights-change')
    expect(wrapper.emitted()['nights-change']).toEqual([[expectedNights]])

    wrapper.unmount()
  })

  it('Add (+) button @click should emit nights-change and add one to nights', async () => {
    await buttonTest('.lt-bordered', 'add')
  })

  it('Substrate (-) button @click should emit nights-change and remove one from nights', async () => {
    await buttonTest('.rt-bordered', 'sub')
  })
})
