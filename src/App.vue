<template>
  <v-app>
    <v-app-bar app dark>
      <v-toolbar-title> Monitor Me! </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/dilapitan/monitor-me"
        target="_blank"
        text
      >
        <span class="mr-2">Source Code</span>
        <v-icon>mdi-code-tags</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <HomeComponent />
    </v-main>
  </v-app>
</template>

<script>
import HomeComponent from '@/components/HomeComponent'

export default {
  name: 'App',

  components: {
    HomeComponent,
  },

  data: () => ({
    //
  }),
}
</script>
