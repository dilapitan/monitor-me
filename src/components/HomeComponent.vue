<template>
  <v-container>
    <v-row>
      <v-col sm="5">
        <v-switch
          v-model="feelingToday"
          :label="feelingToday ? `Today's Feeling` : `Feelings in the past days`">
        </v-switch>

        <v-row>
          <v-text-field
            v-model="status"
            placeholder="What are you feeling?"
            clearable
          ></v-text-field>
        </v-row>

        <p class="text-caption primary--text">
          Note: Time and Date are automatically included.
        </p>

        <v-row>
          <v-spacer> </v-spacer>
          <v-btn :disabled="emptyStatus" color="primary" small @click="storeStatus()">
            Enter
          </v-btn>
        </v-row>
      </v-col>

      <!-- <v-col sm="3">
        <br /><br /><br />
        <CalendarComponent />
      </v-col> -->
    </v-row>

    <br>

    <v-row>
      <v-col sm="6">
        <h4 class="text-overline">
          <v-icon>
            mdi-file-sign
          </v-icon>
          List of Statuses
        </h4>

        <v-container style="height: 400px;" class="overflow-y-auto">
          <p v-for="(date, index) in datesOnly" :key="index">
            <span class="text-overline primary--text font-weight-bold">{{ date }}</span>
            <ul v-for="(status, index) in statuses" :key="index">
              <li v-if="standardizeDateFormat(status.date) === date" class="text-body1">
                <span class="text-body-2">
                  <span class="font-italic mr-4">
                    {{ addTimeToDateFormat(status.date) }}
                  </span>
                  {{ status.feeling }}
                </span>
              </li>
            </ul>

            <br>

            <v-divider></v-divider>
          </p>
        </v-container>
      </v-col>
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
    items: [
      {
        action: 'mdi-ticket',
        items: [{ title: 'List Item' }],
        title: 'Attractions'
      },
      {
        action: 'mdi-silverware-fork-knife',
        active: true,
        items: [
          { title: 'Breakfast & brunch' },
          { title: 'New American' },
          { title: 'Sushi' }
        ],
        title: 'Dining'
      },
      {
        action: 'mdi-school',
        items: [{ title: 'List Item' }],
        title: 'Education'
      },
      {
        action: 'mdi-human-male-female-child',
        items: [{ title: 'List Item' }],
        title: 'Family'
      },
      {
        action: 'mdi-bottle-tonic-plus',
        items: [{ title: 'List Item' }],
        title: 'Health'
      },
      {
        action: 'mdi-briefcase',
        items: [{ title: 'List Item' }],
        title: 'Office'
      },
      {
        action: 'mdi-tag',
        items: [{ title: 'List Item' }],
        title: 'Promotions'
      }
    ],
    emptyStatus: true,
    feelingToday: true,
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
    addTimeToDateFormat(date) {
      // i.e. 7:45 am
      return format(date, "hh:mm aaaaa'm'")
    },

    getDatesOnly: function () {
      /**
       * This is to create an array of dates with no duplicates.
       *
       * This is where the statuses array will be compared to for adding
       * the same-date feelings under each date.
       */
      const datesOnly = []
      this.statuses.forEach((status) => {
        if (!datesOnly.includes(format(status.date, 'MMMM d, yyyy, EEEE')))
          datesOnly.push(format(status.date, 'MMMM d, yyyy, EEEE'))
      })
      this.datesOnly = datesOnly
    },

    standardizeDateFormat(date) {
      // i.e. November 16, 2021, Thursday
      return format(date, 'MMMM d, yyyy, EEEE')
    },

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
    }
  }
}
</script>
