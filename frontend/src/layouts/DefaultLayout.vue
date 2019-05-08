<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <span class="title" @click="navigate('/')">Spark</span>
        </q-toolbar-title>

        <q-btn flat @click="navigate('/explore')">Explore</q-btn>
        <q-btn flat @click="navigate('/start')">Start Project</q-btn>

        <div class="authentication">
          <q-btn flat @click="navigate('/signin')">Sign In</q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container class="main">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
    }
  },
  methods: {
    navigate(location) {
      this.$router.push(location)
    },
  },
}
</script>

<style scoped>
.title {
  cursor: pointer;
}

.authentication {
  margin-left: 20px;
}
</style>
