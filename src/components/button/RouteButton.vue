<script setup>
const emits = defineEmits(['clickEvent'])

const props = defineProps(['size', 'variant', 'color', 'value'])
function event() {
  emits('clickEvent')
}
</script>

<template>
  <v-btn
    :size="props.size"
    :variant="props.variant"
    :color="props.color"
    @click="event"
  >
    {{props.value}}
  </v-btn>
</template>

<style scoped>

</style>
