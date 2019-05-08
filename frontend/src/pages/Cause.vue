<template>
  <q-page class="flex flex-center column page">
    <h2 class="title">Tom</h2>

    <div class="row justify-center header">
      <div class="col-12 col-md-6 carousel">
        <Carousel />
      </div>

      <div class="col-12 col-md-4 data">
        <Progress :raised="136" :goal="200" />

        <div class="text-h4 text-secondary value">$136</div>
        <div class="text-subtitle1">raised of $200 goal</div>

        <div class="text-h4 value">22</div>
        <div class="text-subtitle1">supporters</div>

        <div class="text-h4 value">144</div>
        <div class="text-subtitle1">social media shares</div>
      </div>
    </div>

    <q-tabs
      class="bg-white tabs"
      v-model="tab"
      no-caps
    >
      <q-tab name="story" label="Story" />
      <q-tab name="updates" label="Updates" />
      <q-tab name="comments" label="Comments" />
      <q-tab name="stats" label="Stats" />
    </q-tabs>

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="story">
        <div class="text-h6">Story</div>
        <div class="summary col" v-html="compiledMarkdown"></div>
      </q-tab-panel>

      <q-tab-panel name="updates">
        <div class="text-h6">Updates</div>
        <div class="summary col" v-html="compiledMarkdown"></div>
      </q-tab-panel>

      <q-tab-panel name="comments">
        <div class="text-h6">Comments</div>
        <div class="summary col" v-html="compiledMarkdown"></div>
      </q-tab-panel>

      <q-tab-panel name="stats">
        <div class="text-h6">Stats</div>
        <div class="summary col" v-html="compiledMarkdown"></div>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
import marked from 'marked'
import Carousel from '../components/Carousel'
import Progress from '../components/Progress'

export default {
  name: 'Cause',
  components: { Progress, Carousel },
  data() {
    return {
      card: false,
      slide: 1,
      tab: 'story',
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

My sleeping bag is too light and I am cold most of the time. My backpack got stolen a month ago and I’ve been carrying
things in small bags. A new backpack would be a great help. In this weather, my feet are always wet and cold. Some good
boot socks would save my feet. I’m grateful for any help. Thank you.

My sleeping bag is too light and I am cold most of the time. My backpack got stolen a month ago and I’ve been carrying
things in small bags. A new backpack would be a great help. In this weather, my feet are always wet and cold. Some good
boot socks would save my feet. I’m grateful for any help. Thank you.

My sleeping bag is too light and I am cold most of the time. My backpack got stolen a month ago and I’ve been carrying
things in small bags. A new backpack would be a great help. In this weather, my feet are always wet and cold. Some good
boot socks would save my feet. I’m grateful for any help. Thank you.

My sleeping bag is too light and I am cold most of the time. My backpack got stolen a month ago and I’ve been carrying
things in small bags. A new backpack would be a great help. In this weather, my feet are always wet and cold. Some good
boot socks would save my feet. I’m grateful for any help. Thank you.

My sleeping bag is too light and I am cold most of the time. My backpack got stolen a month ago and I’ve been carrying
things in small bags. A new backpack would be a great help. In this weather, my feet are always wet and cold. Some good
boot socks would save my feet. I’m grateful for any help. Thank you.

My sleeping bag is too light and I am cold most of the time. My backpack got stolen a month ago and I’ve been carrying
things in small bags. A new backpack would be a great help. In this weather, my feet are always wet and cold. Some good
boot socks would save my feet. I’m grateful for any help. Thank you.

My sleeping bag is too light and I am cold most of the time. My backpack got stolen a month ago and I’ve been carrying
things in small bags. A new backpack would be a great help. In this weather, my feet are always wet and cold. Some good
boot socks would save my feet. I’m grateful for any help. Thank you.

My sleeping bag is too light and I am cold most of the time. My backpack got stolen a month ago and I’ve been carrying
things in small bags. A new backpack would be a great help. In this weather, my feet are always wet and cold. Some good
boot socks would save my feet. I’m grateful for any help. Thank you.

My sleeping bag is too light and I am cold most of the time. My backpack got stolen a month ago and I’ve been carrying
things in small bags. A new backpack would be a great help. In this weather, my feet are always wet and cold. Some good
boot socks would save my feet. I’m grateful for any help. Thank you.

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
.title {
  margin: 30px 0;
}
.header {
  width: 100%;
  margin-bottom: 20px;
}
.value {
  margin-top: 20px;
}
.header .carousel {
  width: 100%;
}
.header .data {
  text-align: center;
}
@media (min-width: 1024px) {
  .header > * {
    padding-left: 18px;
    padding-right: 18px;
  }
  .header .carousel {
    max-width: 50%;
  }
  .header .data {
    text-align: left;
  }
}
.tabs {
  width: 100%;
  top: 50px;
  position: sticky;
  border-top: 1px solid #DCDEDD;
  border-bottom: 1px solid #DCDEDD;
  z-index: 2;
}
.summary {
  min-width: 300px;
  margin: 10px;
  flex-grow: 1;
}
</style>
