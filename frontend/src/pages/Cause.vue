<template>
  <q-page class="flex flex-center column page">
    <h2 class="title">Tom</h2>

    <div class="flex row justify-between">
      <q-img class="col image" src="https://carryitforward.trifoia.com/images/tom.png" />
      <div class="col-6 summary" v-html="compiledMarkdown"></div>
    </div>

    <q-markup-table class="items">
      <thead>
      <tr>
        <th class="text-center" style="width: 20%;">Item</th>
        <th class="text-center" style="width: 20%;">Price</th>
        <th class="text-center">Progress</th>
      </tr>
      </thead>
      <tbody>
      <tr @click="openCard">
        <td class="text-center">Cupcake</td>
        <td class="text-center">$20.55</td>
        <td class="text-center">
          <q-linear-progress :value="0.2" color="secondary" />
        </td>
      </tr>
      <tr>
        <td class="text-center">Cupcake</td>
        <td class="text-center">$20.55</td>
        <td class="text-center">
          <q-linear-progress :value="0.2" color="secondary" />
        </td>
      </tr>
      <tr>
        <td class="text-center">Cupcake</td>
        <td class="text-center">$20.55</td>
        <td class="text-center">
          <q-linear-progress :value="0.2" color="secondary" />
        </td>
      </tr>
      <tr>
        <td class="text-center">Cupcake</td>
        <td class="text-center">$20.55</td>
        <td class="text-center">
          <q-linear-progress :value="0.2" color="secondary" />
        </td>
      </tr>
      </tbody>
    </q-markup-table>

    <q-dialog v-model="card">
      <q-card>
        <q-img
          src="https://cdn.shopify.com/s/files/1/1125/0762/products/180005-specialist-1-day-backpack-le-black-isometric_2016.jpg?v=1471390607" />

        <q-card-section>
          <q-btn
            fab
            color="primary"
            icon="place"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%);"
          />

          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">Large Backpack</div>
            <div class="col-auto text-grey q-pt-md">
              <q-icon name="place" /> 250 ft
            </div>
          </div>
        </q-card-section>

        <q-card-section>
          <div class="text-subtitle1">$・Italian, Cafe</div>
          <div class="text-subtitle2 text-grey">Small plates, salads & sandwiches in an intimate setting.</div>
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <q-btn flat round icon="event" v-close-popup />
          <q-btn flat v-close-popup>5:30PM</q-btn>
          <q-btn flat v-close-popup>7:30PM</q-btn>
          <q-btn flat v-close-popup>9:00PM</q-btn>
          <q-btn flat color="primary" v-close-popup>Reserve</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import marked from 'marked'

export default {
  name: 'Cause',
  data() {
    return {
      card: false,
    }
  },
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
    compiledMarkdown() {
      const other = `
My name is Tom and this is my story.

I’m just a regular guy, originally from Missouri but I’ve moved all around. I’ve been homeless off/on for about 6 years.
I’ve worked on farms and in construction. I like to work on motorcycles but I had to sell my bike to survive last year.
I have a back injury and COPD, which make it hard to work these days. I believe God has a plan, I’m just doing my best
to get right.

I would really be grateful if I could get a few things:
- Cold weather sleeping bag
- Large back pack
- Boot socks

My sleeping bag is too light and I am cold most of the time. My backpack got stolen a month ago and I’ve been carrying
things in small bags. A new backpack would be a great help. In this weather, my feet are always wet and cold. Some good
boot socks would save my feet. I’m grateful for any help. Thank you.

My sleeping bag is too light and I am cold most of the time. My backpack got stolen a month ago and I’ve been carrying
things in small bags. A new backpack would be a great help. In this weather, my feet are always wet and cold. Some good
boot socks would save my feet. I’m grateful for any help. Thank you.

My sleeping bag is too light and I am cold most of the time. My backpack got stolen a month ago and I’ve been carrying
things in small bags. A new backpack would be a great help. In this weather, my feet are always wet and cold. Some good
boot socks would save my feet. I’m grateful for any help. Thank you.
      `
      return marked(this.body || other)
    },
  },
  methods: {
    openCard() {
      this.$set(this, 'card', true)
    },
  },
}
</script>

<style scoped>
.page {
  min-height: auto !important;
}
.image {
  min-width: 350px;
  border-radius: 10px;
  flex-grow: 1;
}
.summary {
  min-width: 300px;
  margin: 10px;
  flex-grow: 1;
}
.items {
  width: 80%;
  margin: 20px 0;
}

tr {
  cursor: pointer;
}
</style>
