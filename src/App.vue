<script setup lang="ts">
import { ref, reactive } from 'vue'
import { dateMsToString } from './utils'
import DateInput from './components/DateInput.vue'
import NightsCounter from './components/NightsCounter.vue'

// Improve: set default dateOut to the next day after the dateIn
const dates = reactive({
  dateIn: dateMsToString(),
  dateOut: dateMsToString()
})

const nights = ref(0)

const updateDateOut = (newDateOut: string) => {
  dates.dateOut = newDateOut
}

const updateNights = (val: number) => {
  nights.value = val
}
</script>

<template>
  <div class="container">
    <date-input v-model="dates.dateIn"/>
    <div class="nights-counter-wrapper">
      <nights-counter :dates="dates" :nights="nights" @nights-change="updateNights"/>
    </div>
    <date-input v-model="dates.dateOut" :dates="dates" :nights="nights" @date-out-change="updateDateOut"/>
  </div>
</template>

<style>
/* Improve: use SASS in components */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.nights-counter-wrapper {
  margin: 0 8px;
}

@media (max-width: 640px) {
  .container {
    flex-direction: column;
  }
  .nights-counter-wrapper {
    margin: 8px 0;
  }
}
</style>
