<script setup lang="ts">
interface Props {
  value: string;
  position?: string;
  winner?: boolean;
}

withDefaults(defineProps<Props>(), {
  position: 'XX'
});

const emit = defineEmits(['onClick']);

function onClick() {
  emit('onClick');
}
</script>

<template>
  <div
    class="square-el border-1 relative flex h-8 w-8 flex-none cursor-pointer items-center justify-center border border-black align-top text-lg leading-none hover:bg-gray-100"
    :class="{ 'bg-lime-200': winner }"
    @click="onClick"
  >
    {{ value }}
    <span
      class="inset absolute -z-10 flex items-center justify-center text-xs text-gray-200"
      >{{ position }}</span
    >
  </div>
</template>
