<script setup lang="ts">
import { ref, computed } from 'vue';
import Board from '../components/Board.vue';

const SQUARES_POSITION = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3'];
const WINNER_ROWS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const history = ref([Array(9).fill(null)]);
const stepsHistory = ref([]);

const currentStep = ref(0);

const currentEmoji = computed(() =>
  currentStep.value % 2 === 0 ? '❌' : '⭕'
);
const lastMove = computed(() => history.value[currentStep.value]);
const winner = computed(() => {
  for (let i = 0; i < WINNER_ROWS.length; i++) {
    const [a, b, c] = WINNER_ROWS[i];
    if (
      lastMove.value[a] &&
      lastMove.value[a] === lastMove.value[b] &&
      lastMove.value[a] === lastMove.value[c]
    ) {
      return lastMove.value[a];
    }
  }
  return null;
});
const message = computed(() => {
  return winner.value
    ? `A winner is you! ${winner.value}`
    : `Current turn: ${currentEmoji.value}`;
});

function handlePlay(index) {
  if (lastMove.value[index] || winner.value) return;

  const newStep = { pos: SQUARES_POSITION[index], value: currentEmoji.value };
  const newStepsHistory = stepsHistory.value.slice(0, currentStep.value);
  stepsHistory.value = [...newStepsHistory, newStep];

  const newSquares = [...lastMove.value];
  newSquares[index] = currentEmoji.value;

  const newHistory = history.value.slice(0, currentStep.value + 1);
  history.value = [...newHistory, newSquares];

  currentStep.value = history.value.length - 1;
}

function rollback(payload) {
  currentStep.value = payload;
}
</script>

<template>
  <div class="flex h-screen w-screen flex-col items-center justify-center">
    <div class="mb-3">{{ message }}</div>
    <Board
      :squares="lastMove"
      :value="currentEmoji"
      :squares-position="SQUARES_POSITION"
      @on-play="handlePlay"
    />
    <div class="mt-5">Rollback:</div>
    <ol class="mt-1 flex justify-center">
      <li
        class="cursor-pointer rounded bg-red-100 px-3 py-1 text-gray-700 hover:bg-red-200"
        @click="rollback(0)"
      >
        Restart
      </li>
      <li
        v-for="(step, index) in stepsHistory"
        :key="`step-${index}`"
        class="ml-2 cursor-pointer rounded bg-lime-100 px-3 py-1 text-gray-700 hover:bg-lime-200"
        @click="rollback(index + 1)"
      >
        {{ index + 1 }}: {{ step.pos }} {{ step.value }}
      </li>
    </ol>
  </div>
</template>
