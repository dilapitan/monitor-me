<template>
  <v-container>
    <v-row>
      <v-col cols="2" sm="3"></v-col>

      <v-col cols="8" sm="6">
        <br /><br /><br />
        <v-row>
          <v-textarea
            v-model="status"
            placeholder="What are you feeling?"
            max-height="30"
            clearable
            no-resize
          ></v-textarea>
        </v-row>
        <p class="text-caption primary--text">
          Note: Time and Date are automatically included.
        </p>
        <br />
        <v-row>
          <v-spacer> </v-spacer>
          <v-btn :disabled="emptyStatus" color="primary" @click="storeStatus()">
            Enter
          </v-btn>
        </v-row>
      </v-col>

      <v-col cols="2" sm="3"></v-col>
    </v-row>

    <v-row>
      <v-col sm="3"></v-col>
      <v-col sm="6">
        <CalendarComponent />
      </v-col>
      <v-col sm="3"></v-col>
    </v-row>
  </v-container>
</template>

<script>
import CalendarComponent from '@/components/CalendarComponent'

export default {
  name: 'Home',

  components: {
    CalendarComponent
  },

  data: () => ({
    emptyStatus: true,
    status: '',
    statuses: []
  }),

  watch: {
    status: function () {
      this.emptyStatus = this.status?.length > 0 ? false : true
    }
  },

  methods: {
    storeStatus: function () {
      const status = {
        feeling: this.status,
        time: Date.now()
      }
      this.statuses.push(status)
      this.status = ''
      console.log('this.statuses:', this.statuses)
    }
  }
}
</script>
