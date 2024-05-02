<script setup>
import {computed} from "vue";

const props = defineProps(['value', 'formValidate', 'color', 'variant'])

const form = computed(
  () => {
    if (props.formValidate === undefined) return true
    else return props.formValidate
  }
)

const variant = computed(
  () => {
    if (props.variant === undefined) return 'tonal'
    else return props.variant
  }
)

</script>

<template>
  <v-btn
    @click="$emit('clickEvent')"
    class="mb-8"
    :color="props.color"
    size="large"
    :variant="variant"
    type="submit"
    :disabled="!form"
    block
  >
    {{ props.value }}
  </v-btn>
</template>

<style scoped>

</style>
