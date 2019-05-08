<template>
  <div class="container">
    <q-carousel
      class="carousel"
      v-model="slide"
      animated
      arrows
      navigation
      infinite
    >
      <q-carousel-slide :name="1" img-src="https://carryitforward.trifoia.com/images/tom.png" />
      <q-carousel-slide :name="2" img-src="https://cdn.quasar-framework.org/img/parallax1.jpg" />
      <q-carousel-slide :name="3" img-src="https://cdn.quasar-framework.org/img/parallax2.jpg" />
      <q-carousel-slide :name="4" img-src="https://cdn.quasar-framework.org/img/quasar.jpg" />
    </q-carousel>
  </div>
</template>

<script>
export default {
  name: 'Carousel',
  data() {
    return {
      slide: 1,
    }
  },
}
</script>

<style scoped>
.container {
  width: 100%;
  padding-top: 56.25%;
  position: relative;
}

.carousel {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
