<template>
  <q-page class="flex flex-center">
    <h2 class="title">Meet Our Neighbors</h2>
    <p class="text-subtitle1 intro">
      Spark is a new program we're implementing to help specific individuals in the community with the items and support
      they need. Every month, Carry It Forward chooses a select few individuals in order to tell you their story and
      what they need to survive and thrive. You can choose to donate items directly, give money towards their purchase
      or offer help in other ways. Please read their stories and help in any way you're able.
    </p>

    <div class="flex flex-center">
      <Card
        title="Tom"
        image="https://carryitforward.trifoia.com/images/tom.png"
        city="Eugene, OR"
        body="I'm just a regular guy, originally from Missouri but I’ve moved all around. I’ve been homeless off/on
for about 6 years. I’ve worked on farms and in construction. I like to work on motorcycles but I had to sell my bike
to survive last year. I have a back injury and COPD, which make it hard to work these days. I believe God has a plan,
I’m just doing my best to get right."
        slug="tom"
        :raised="136"
        :goal="200" />

      <Card
        title="Mary"
        image="https://carryitforward.trifoia.com/images/mary.png"
        city="Eugene, OR"
        body="I want people to know that I am a human being, a mother and grandmother. I’ve worked all my life, run my
own business, and taken care of others. I became homeless after my husband died in 2008 and I fell into a bottle. For
the last year I’ve been going to AA and getting my life back together. I get social security every month but it’s not
enough to cover rent. It’s hard on the street, but I still take care of the kids. We all need compassion to heal."
        slug="mary"
        :raised="178"
        :goal="200" />

      <Card
        title="Roscoe"
        image="https://carryitforward.trifoia.com/images/roscoe.png"
        city="Eugene, OR"
        body="I want people to know that I am a human being, a mother and grandmother. I’ve worked all my life, run my
own business, and taken care of others. I became homeless after my husband died in 2008 and I fell into a bottle. For
the last year I’ve been going to AA and getting my life back together. I get social security every month but it’s not
enough to cover rent. It’s hard on the street, but I still take care of the kids. We all need compassion to heal."
        slug="roscoe"
        :raised="95"
        :goal="200" />
    </div>
  </q-page>
</template>

<script>
import Card from '../components/Card'

export default {
  name: 'PageIndex',
  components: { Card },
}
</script>

<style scoped>
.title {
  margin: 20px;
}

.intro {
  margin: 0 25px;
}
</style>
