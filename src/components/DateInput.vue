<script setup lang="ts">
import { watch } from 'vue'
import { oneDayInMs, dateStringToMs, dateMsToString } from '../utils'

// Improve: validate props
const props = defineProps(['modelValue', 'reservationData'])
const emit = defineEmits(['update:modelValue', 'date-out-change'])

let isDateChange = false

const updateOutDate = (n: number) => {
  const dateOutMs = dateStringToMs(props.reservationData.dateOut)
  const plusDayMs = dateOutMs + oneDayInMs * n
  emit('date-out-change', dateMsToString(plusDayMs))
}

if (props.reservationData) {
  watch(() => props.reservationData.dateIn, (newDateIn) => {
    const currNightsInMs = props.reservationData.nights * oneDayInMs
    const dateInMs = dateStringToMs(newDateIn)
    const newDateOutMs = dateInMs + currNightsInMs
    emit('date-out-change', dateMsToString(newDateOutMs))
  })

  watch(() => props.reservationData.nights, (newVal, oldVal) => {
    if (isDateChange) {
      isDateChange = false
      return
    }
    updateOutDate(newVal > oldVal ? 1 : -1)
  })
}

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
