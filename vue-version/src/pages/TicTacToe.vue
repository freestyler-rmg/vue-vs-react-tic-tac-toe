<script setup lang="ts">
import { ref, computed } from 'vue';
import Board from '../components/Board.vue';

const history = ref([Array(9).fill(null)]);

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

const totalMoves = computed(() => history.value.length);
const currentEmoji = computed(() => (totalMoves.value % 2 === 0 ? '⭕' : '❌'));
const lastMove = computed(() => history.value[totalMoves.value - 1]);
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

function handlePlay(payload) {
  if (lastMove.value[payload] || winner.value) return;
  const newSquares = [...lastMove.value];
  newSquares[payload] = currentEmoji.value;
  history.value = [...history.value, newSquares];
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
    <div class="mt-3">Rollback:</div>
  </div>
</template>
