<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>Spark</q-toolbar-title>

        <q-btn flat round dense icon="exit_to_app" />
      </q-toolbar>
    </q-header>

    <q-page-container class="main">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'DefaultLayout',
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
    }
  },
  methods: {
    openURL,
  },
}
</script>

<style scoped>
.main {
  padding: 0 20px;
}
</style>
