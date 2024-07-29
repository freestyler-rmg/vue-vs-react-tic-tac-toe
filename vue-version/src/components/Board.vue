<script setup lang="ts">
import Square from './Square.vue';

interface Props {
  squares: (string | null)[];
  squaresPosition: string[];
  winnerSquares: number[];
}

const props = defineProps<Props>();

// const emit = defineEmits(['onPlay']);
const emit = defineEmits<{
  onPlay: [payload: number];
}>();

function handleClick(payload: number) {
  emit('onPlay', payload);
}

function isWinner(index: number) {
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
