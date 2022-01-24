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
        <div>
          <h5>List of Statues</h5>
          <p v-for="(date, index) in datesOnly" :key="index">
            {{ date }}
            <ul v-for="(status, index) in statuses" :key="index">
              <li v-if="standardizeDateFormat(status.date) === date">
                {{ status.feeling }}
              </li>
            </ul>
          </p>
        </div></v-col
      >
      <v-col sm="3"></v-col>
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
import { format } from 'date-fns'

export default {
  name: 'Home',

  components: {
    CalendarComponent
  },

  data: () => ({
    emptyStatus: true,
    status: '',
    statuses: [
      {
        feeling: 'Having some colds',
        date: new Date(2022, 0, 3, 8, 33, 30, 0)
      },
      {
        feeling: 'Having some chills',
        date: new Date(2022, 0, 4, 10, 33, 30, 0)
      },
      {
        feeling: 'No taste and smell',
        date: new Date(2022, 0, 5, 9, 33, 30, 0)
      },
      {
        feeling: 'Weakening of body',
        date: new Date(2022, 0, 5, 10, 55, 30, 0)
      },
      {
        feeling: 'Having fever',
        date: new Date(2022, 0, 6, 7, 50, 30, 0)
      },
      {
        feeling: 'Lowering of fever, having some taste and smell',
        date: new Date(2022, 0, 7, 6, 33, 30, 0)
      },
      {
        feeling: 'No more fever, regaining strength',
        date: new Date(2022, 0, 8, 9, 33, 30, 0)
      },
      {
        feeling: 'Feeling better',
        date: new Date(2022, 0, 8, 15, 0, 30, 0)
      }
    ],
    datesOnly: []
  }),

  created() {
    this.getDatesOnly()
  },

  watch: {
    status: function () {
      this.emptyStatus = this.status?.length > 0 ? false : true
    }
  },

  methods: {
    storeStatus: function () {
      // const date = new Date()

      // const status = {
      //   feeling: this.status,
      //   date: date,
      //   dayOfWeek: `${format(date, 'eeee')}`,
      //   time: formatISO9075(date, { representation: 'time' })
      // }
      // this.statuses.push(status)
      // this.status = ''
      // console.log('this.statuses:', this.statuses)

      // loading UI begin
      // push
      // sort
      // update
      // loading UI finish

    },

    standardizeDateFormat(date) {
      return format(date, 'MMMM d, yyyy, EEEE')
    },

    getDatesOnly: function () {
      const datesOnly = []
      this.statuses.forEach((status) => {
        if (!datesOnly.includes(format(status.date, 'MMMM d, yyyy, EEEE')))
          datesOnly.push(format(status.date, 'MMMM d, yyyy, EEEE'))
      })
      this.datesOnly = datesOnly
    }
  }
}
</script>
