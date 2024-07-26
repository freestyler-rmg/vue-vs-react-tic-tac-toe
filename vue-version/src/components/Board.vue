<script setup lang="ts">
import { ref, computed } from 'vue';
import Square from './Square.vue';

const props = defineProps({
  squares: Array,
  squaresPosition: Array,
  winnerSquares: Array
});

const emit = defineEmits(['onPlay']);

function handleClick(payload) {
  emit('onPlay', payload);
}

function isWinner(index) {
  return props.winnerSquares?.indexOf(index) !== -1;
}
</script>

<template>
  <div class="flex w-24 flex-wrap outline outline-1 outline-black">
    <template v-for="(value, index) in squares" :key="index">
      <Square
        :value="value"
        :position="squaresPosition[index]"
        :winner="isWinner(index)"
        @on-click="handleClick(index)"
      />
    </template>
  </div>
</template>
