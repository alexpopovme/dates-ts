<script setup lang="ts">
import { watch } from 'vue'
import { ReservationData } from '../types/common'
import {
  oneDayInMs,
  dateStringToMs,
  dateMsToString,
} from '../utils'

/*
* Note: At the moment Vue v3.2.37 doesn't support direct
* pass of imported type to the defineProps generic
* so we can't use something like this: defineProps<ReservationData>
* */

interface Props {
  modelValue: string
  reservationData?: ReservationData
}

interface Emits {
  (ev: 'update:modelValue', payload: string): void
  (ev: 'date-out-change', payload: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

let isDateChange = false

const initConditionalWatchers = () => {
  if (!props.reservationData) return

  const requiredProps = props as Required<Props>

  const updateOutDate = (n: number) => {
    const dateOutMs = dateStringToMs(requiredProps.reservationData.dateOut)
    const plusDayMs = dateOutMs + oneDayInMs * n
    emit('date-out-change', dateMsToString(plusDayMs))
  }

  watch(() => requiredProps.reservationData.dateIn, (newDateIn) => {
    const currNightsInMs = requiredProps.reservationData.nights * oneDayInMs
    const dateInMs = dateStringToMs(newDateIn)
    const newDateOutMs = dateInMs + currNightsInMs
    emit('date-out-change', dateMsToString(newDateOutMs))
  })

  watch(() => requiredProps.reservationData.nights, (newVal, oldVal) => {
    if (isDateChange) {
      isDateChange = false
      return
    }
    updateOutDate(newVal > oldVal ? 1 : -1)
  })
}

initConditionalWatchers()

const inputHandler = (ev: Event) => {
  isDateChange = true
  const typedTarget = ev.target as HTMLInputElement
  emit('update:modelValue', typedTarget.value)
}
</script>

<template>
  <label class="date-input">
    <input type="date"
           class="date-input__value bordered"
           :value="modelValue"
           @input="inputHandler"
    />
  </label>
</template>

<style>
.date-input__value {
  height: 100%;
  padding: 0 8px;
  min-width: 218px;
  min-height: 55px;
}
</style>
