<template>
  <v-container>
    <v-row>
      <v-col sm="5">
        <v-switch
          v-model="feelingToday"
          :label="
            feelingToday ? `Today's Feeling` : `Feelings in the past days`
          "
        >
        </v-switch>

        <v-row class="pl-4">
          <template v-if="feelingToday">
            <v-text-field
              v-model="status"
              placeholder="What are you feeling right now?"
              clearable
              hint="Note: Time and Date are automatically included."
            ></v-text-field>
          </template>

          <template v-else>
            <v-text-field
              v-model="status"
              placeholder="What are you feeling in the past days?"
              clearable
            ></v-text-field>

            <v-row>
              <v-col sm="6">
                <v-dialog
                  ref="dateDialog"
                  v-model="dateModel"
                  :return-value.sync="date"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="date"
                      label="Choose a date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      clearable
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" :max="getToday()" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="dateModel = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.dateDialog.save(date)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-col>
              <v-col sm="6">
                <v-dialog
                  ref="timeDialog"
                  v-model="timeModel"
                  :return-value.sync="time"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="time"
                      label="Chosen time"
                      prepend-icon="mdi-clock-time-four-outline"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      clearable
                    ></v-text-field>
                  </template>

                  <v-time-picker v-if="timeModel" v-model="time" full-width>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="timeModel = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.timeDialog.save(time)"
                    >
                      OK
                    </v-btn>
                  </v-time-picker>
                </v-dialog>
              </v-col>
            </v-row>
          </template>
        </v-row>

        <v-row>
          <v-spacer> </v-spacer>
          <v-btn
            :disabled="emptyStatus"
            color="primary"
            small
            @click="storeStatus()"
          >
            Enter
          </v-btn>
        </v-row>
      </v-col>

      <!-- <v-col sm="3">
        <br /><br /><br />
        <CalendarComponent />
      </v-col> -->
    </v-row>

    <br />

    <v-row>
      <v-col sm="6">
        <h4 class="text-overline">
          <v-icon> mdi-file-sign </v-icon>
          List of Statuses
        </h4>

        <v-container style="height: 400px" class="overflow-y-auto">
          <div v-for="(date, index) in datesOnly" :key="index">
            <div>
              <span class="text-overline primary--text font-weight-bold">{{
                date
              }}</span>
              <ul v-for="(status, index) in statuses" :key="index">
                <li
                  v-if="standardizeDateFormat(status.date) === date"
                  class="text-body1"
                >
                  <span class="text-body-2">
                    <span class="font-italic mr-4">
                      {{ addTimeToDateFormat(status.date) }}
                    </span>
                    {{ status.feeling }}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <br />

          <v-divider></v-divider>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import CalendarComponent from '@/components/CalendarComponent'
import { format } from 'date-fns'

export default {
  name: 'Home',

  // components: {
  //   CalendarComponent,
  // },

  data: () => ({
    date: null,
    dateModel: false,
    dialogTime: false,
    emptyStatus: true,
    feelingToday: true,
    status: '',
    statuses: [
      {
        feeling: 'Having some colds',
        date: new Date(2022, 0, 3, 8, 33, 30, 0),
      },
      {
        feeling: 'Having some chills',
        date: new Date(2022, 0, 4, 10, 33, 30, 0),
      },
      {
        feeling: 'No taste and smell',
        date: new Date(2022, 0, 5, 9, 33, 30, 0),
      },
      {
        feeling: 'Weakening of body',
        date: new Date(2022, 0, 5, 10, 55, 30, 0),
      },
      {
        feeling: 'Having fever',
        date: new Date(2022, 0, 6, 7, 50, 30, 0),
      },
      {
        feeling: 'Lowering of fever, having some taste and smell',
        date: new Date(2022, 0, 7, 6, 33, 30, 0),
      },
      {
        feeling: 'No more fever, regaining strength',
        date: new Date(2022, 0, 8, 9, 33, 30, 0),
      },
      {
        feeling: 'Feeling better',
        date: new Date(2022, 0, 8, 15, 0, 30, 0),
      },
    ],
    time: null,
    timeModel: false,
    today: new Date(),
    datesOnly: [],
  }),

  mounted() {
    this.setUpStatuses()
    this.sortStatusByAscDate()
  },

  watch: {
    status: function () {
      if (this.feelingToday)
        this.emptyStatus = this.status?.length > 0 ? false : true
      else {
        if (this.status?.length && this.date) this.emptyStatus = false
        else this.emptyStatus = true
      }
    },

    date: function () {
      if (this.status?.length > 0 && this.date) this.emptyStatus = false
      else this.emptyStatus = true
    },

    statuses: function () {
      this.setUpStatuses()
    },
  },

  methods: {
    addTimeToDateFormat(date) {
      // i.e. 7:45 am
      return format(date, "hh:mm aaaaa'm'")
    },

    getToday() {
      const today = new Date()
      return format(today, 'yyyy-MM-dd')
    },

    setUpStatuses: function () {
      if (this.statuses === null) {
        // API
      }

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

    sortStatusByAscDate: function () {
      // Got the solution for sorting dates:
      //  https://flaviocopes.com/how-to-sort-array-by-date-javascript/
      const sortedStatuses = this.statuses
        .slice()
        .sort((a, b) => b.date - a.date)

      this.statuses.splice(0, this.statuses.length, ...sortedStatuses)
    },

    standardizeDateFormat(date) {
      // i.e. November 16, 2021, Thursday
      return format(date, 'MMMM d, yyyy, EEEE')
    },

    storeStatus: function () {
      if (this.feelingToday) {
        const newStatus = {
          feeling: this.status,
          date: new Date(),
        }
        this.statuses.push(newStatus)
        this.sortStatusByAscDate()
        this.status = ''
      } else {
        let date = this.date ? this.date : new Date()
        let selectedDate
        if (this.time) {
          const parsedTime = this.time.split(':')
          selectedDate = new Date(date)
          selectedDate.setHours(Number(parsedTime[0]))
          selectedDate.setMinutes(Number(parsedTime[1]))
        } else {
          date = new Date(this.date)
        }

        const newStatus = {
          feeling: this.status,
          date: this.time ? selectedDate : date,
        }
        this.statuses.push(newStatus)
        this.sortStatusByAscDate()
        this.status = ''
        this.date = null
        this.time = null
      }

      // loading UI begin
      // push
      // sort
      // update
      // loading UI finish
    },
  },
}
</script>
