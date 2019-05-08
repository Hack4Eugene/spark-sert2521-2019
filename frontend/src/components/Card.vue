<template>
  <q-card class="card" @click="navigate">
    <img :src="image">

    <q-card-section>
      <div class="subtitle2 text-secondary">{{ capitalizedCity }}</div>
      <div class="text-h6">{{ title }}</div>
      <p v-line-clamp="3">{{ body }}</p>
      <Progress :raised="raised" :goal="goal" />
      <strong>${{ simpleRaised }} raised</strong> of ${{ simpleGoal }}
    </q-card-section>
  </q-card>
</template>

<script>
import Progress from './Progress'

export default {
  name: 'Card',
  components: { Progress },
  props: {
    title: String,
    image: String,
    city: String,
    body: String,
    slug: String,
    raised: Number,
    goal: Number,
  },
  computed: {
    capitalizedCity() {
      return this.city.toUpperCase()
    },
    simpleRaised() {
      return Math.round(this.raised)
    },
    simpleGoal() {
      return Math.round(this.goal)
    },
    url() {
      return `/s/${this.slug}`
    },
  },
  methods: {
    navigate() {
      this.$router.push(this.url)
    },
  },
}
</script>

<style scoped>
.card {
  width: calc(33% - 4rem);
  min-width: 300px;
  margin: 25px auto;
  cursor: pointer;
}
</style>
