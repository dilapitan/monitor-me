<template>
  <div>
    <template v-if="!token">
      <Login />
    </template>
    <template v-else>
      <HomeComponent />
    </template>
  </div>
</template>

<script>
import Login from '@/components/LoginComponent'
import HomeComponent from '@/components/HomeComponent'

export default {
  name: 'Home',
  components: {
    Login,
    HomeComponent,
  },

  data: () => ({
    token: null,
  }),
}
</script>
