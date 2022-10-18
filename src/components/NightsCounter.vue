<script setup lang="ts">
import { computed, watch } from 'vue'
import { oneDayInMs, dateStringToMs } from '../utils'

// Improve: validate props
const props = defineProps(['dates', 'nights'])
const emit = defineEmits(['nights-change'])
const nightsProp = computed(() => props.nights)

watch(() => props.dates.dateOut, (newDateOut, oldDateOut) => {
  // improve: check if out date is after the in date
  const daysInMs = dateStringToMs(newDateOut) - dateStringToMs(props.dates.dateIn)
  const value = Math.ceil(daysInMs / oneDayInMs)
  emit('nights-change', value)
})

const changeNights = (n: number) => {
  const value = nightsProp.value + n
  emit('nights-change', value)
}
</script>

<template>
  <div class="nights-counter bordered">
    <p class="nights-counter__text">Nights</p>
    <div class="nights-counter-inner">
       <div class="nights-counter__item nights-counter_button bordered rt-bordered"
            @click="changeNights(-1)">-</div>
       <div class="nights-counter__item">{{nightsProp}}</div>
       <div class="nights-counter__item nights-counter_button bordered lt-bordered"
            @click="changeNights(1)">+</div>
    </div>
  </div>

</template>

<style>
.nights-counter {
  display: flex;
  flex-direction: column;
  width: 120px;
  box-sizing: border-box;
}

.nights-counter__text {
  font-size: 0.8rem;
  margin: 0;
  padding: 3px;
}

.nights-counter-inner {
  display: flex;
}

.nights-counter__item {
  display: flex;
  padding: 3px;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
}

.nights-counter_button {
  cursor: pointer;
  font-size: 1rem;
  min-width: 28px;
  flex-grow: 0;
  user-select: none;
}
.nights-counter_button:hover {
  background-color: #dcdcdc;
}
</style>