<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title> Monitor Me! </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/dilapitan/monitor-me"
        target="_blank"
        text
      >
        <span class="mr-2">Source Code</span>
        <v-icon>mdi-github</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main> </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {},

  data: () => ({
    //
  })
}
</script>
