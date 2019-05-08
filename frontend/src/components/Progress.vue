<template>
  <q-linear-progress :value="progress" color="secondary" />
</template>

<script>
export default {
  name: 'Progress',
  props: {
    raised: Number,
    goal: Number,
  },
  computed: {
    progress() {
      return this.raised / this.goal
    },
  },
}
</script>

<style scoped>
</style>
