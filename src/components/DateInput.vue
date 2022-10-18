<script setup lang="ts">
import { watch, computed, ref } from 'vue'
import { oneDayInMs, dateStringToMs, dateMsToString } from '../utils'

// Improve: validate props
const props = defineProps(['modelValue', 'dates', 'nights'])
const emit = defineEmits(['update:modelValue', 'date-out-change'])

const nightsProp = computed(() => props.nights)
let isDateChange = false

const updateOutDate = (n: number) => {
  const dateOutMs = dateStringToMs(props.dates.dateOut)
  const plusDayMs = dateOutMs + oneDayInMs * n
  emit('date-out-change', dateMsToString(plusDayMs))
}

if (props.dates) {
  watch(() => props.dates.dateIn, (newDateIn) => {
    const currNightsInMs = nightsProp.value * oneDayInMs
    const dateInMs = dateStringToMs(newDateIn)
    const newDateOutMs = dateInMs + currNightsInMs
    emit('date-out-change', dateMsToString(newDateOutMs))
  })

  watch(nightsProp, (newVal, oldVal) => {
    if (isDateChange) {
      isDateChange = false
      return
    }
    updateOutDate(newVal > oldVal ? 1 : -1)
  })
}

const inputHandler = (ev: Event) => {
  isDateChange = true
  emit('update:modelValue', ((ev.target as HTMLInputElement).value))
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
