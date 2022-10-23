<script setup lang="ts">
import DateInput from './components/DateInput.vue'
import NightsCounter from './components/NightsCounter.vue'
import { initReservationData } from './utils/initReservationData'
import { ReservationData } from '../types/common'

interface Props {
  reservationData?: ReservationData
}
const props = defineProps<Props>()
const reservationData = props.reservationData ?? initReservationData(1)
const updateDateOut = (newDateOut: string) => {
  reservationData.dateOut = newDateOut
}
const updateNights = (val: number) => {
  reservationData.nights = val
}
</script>

<template>
  <div class="container">
    <date-input v-model="reservationData.dateIn"/>
    <div class="nights-counter-wrapper">
      <nights-counter
        :reservationData="reservationData"
        @nights-change="updateNights"
      />
    </div>
    <date-input
      v-model="reservationData.dateOut"
      :reservationData="reservationData"
      @date-out-change="updateDateOut"
    />
  </div>
</template>

<style lang="scss">
$counterWrapperMargin: 8px;

.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.nights-counter-wrapper {
  height: 100%;
  margin: 0 $counterWrapperMargin;
}

@media (max-width: 640px) {
  .container {
    flex-direction: column;
  }
  .nights-counter-wrapper {
    margin: $counterWrapperMargin 0;
  }
}
</style>
