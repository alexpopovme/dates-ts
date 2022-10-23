<script setup lang="ts">
import { watch } from 'vue'
import { oneDayInMs, dateStringToMs } from '../utils'
import { ReservationData } from '../../types/common'

/*
* Note: At the moment Vue v3.2.37 doesn't support direct
* pass of imported type to the defineProps generic
* so we can't use something like this: defineProps<ReservationData>
* */

interface Props {
  reservationData: ReservationData
}

interface Emits {
  (ev: 'nights-change', payload: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

watch(() => props.reservationData.dateOut, (newDateOut) => {
  // improve: check if out date is after the in date
  const daysInMs = dateStringToMs(newDateOut) - dateStringToMs(props.reservationData.dateIn)
  const value = Math.ceil(daysInMs / oneDayInMs)
  emit('nights-change', value)
})

const changeNights = (step: number) => {
  const value = props.reservationData.nights + step
  emit('nights-change', value)
}
</script>

<template>
  <div class="nights-counter bordered">
    <p class="nights-counter__text">Nights</p>
    <div class="nights-counter-inner">
       <div class="nights-counter__item nights-counter_button bordered rt-bordered"
            @click="changeNights(-1)">-</div>
       <div class="nights-counter__item">
         <span class="night-counter__nights">
           {{props.reservationData.nights}}
         </span>
       </div>
       <div class="nights-counter__item nights-counter_button bordered lt-bordered"
            @click="changeNights(1)">+</div>
    </div>
  </div>
</template>

<style lang="scss">
.nights-counter {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 120px;
  min-height: var(--dates-main-height);
  &__text {
    font-size: 0.8rem;
    margin: 0;
    padding: 3px;
  }
  &__item {
    display: flex;
    padding: 3px;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
  }
  &_button {
    cursor: pointer;
    font-size: 1rem;
    min-width: 28px;
    flex-grow: 0;
    user-select: none;
    &:hover {
      background-color: #dcdcdc;
    }
  }
}

.nights-counter-inner {
  display: flex;
}
</style>
