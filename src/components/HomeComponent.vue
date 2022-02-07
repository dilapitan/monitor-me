<template>
  <v-container>
    <v-row>
      <v-col cols="11" sm="6" md="5">
        <FormComponent @setStatus="getSubmittedStatus" />
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

        <br />

        <div v-if="datesOnly.length === 0">
          <br />
          <p class="font-italic grey--text text-center">No statuses yet.</p>
        </div>

        <v-container v-else style="height: 400px" class="overflow-y-auto">
          <div v-for="(date, index) in datesOnly" :key="index">
            <div>
              <span class="text-overline primary--text font-weight-bold">{{
                date
              }}</span>
              <v-card
                v-for="(status, index) in statuses"
                :key="index"
                class="mb-5"
              >
                <template v-if="standardizeDateFormat(status.date) === date">
                  <v-card-title class="text-body-2">
                    {{ status.feeling }}
                  </v-card-title>

                  <v-card-subtitle class="font-italic">
                    {{ addTimeToDateFormat(status.date) }}
                  </v-card-subtitle>

                  <v-row class="pr-5">
                    <v-spacer></v-spacer>
                    <v-btn
                      color="grey lighten-2"
                      small
                      icon
                      class="mr-2"
                      @click="openModal('edit', status)"
                    >
                      <v-icon>mdi-square-edit-outline</v-icon>
                    </v-btn>

                    <v-btn
                      color="grey lighten-2"
                      small
                      icon
                      @click="openModal('delete', status)"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-row>
                </template>
              </v-card>
            </div>
          </div>
          <br />

          <ModalComponent
            :action="action"
            :dialog="dialog"
            :modalData="modalData"
            @closeModal="closeModal"
          />
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import CalendarComponent from '@/components/CalendarComponent'
import FormComponent from '@/components/shared/FormComponent'
import ModalComponent from '@/components/shared/ModalComponent'
import { format } from 'date-fns'

export default {
  name: 'Home',

  components: {
    // CalendarComponent,
    FormComponent,
    ModalComponent,
  },

  data: () => ({
    action: '',
    dialog: false,
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
    modalData: null,
    datesOnly: [],
  }),

  mounted() {
    this.setUpStatuses()
    this.sortStatusByAscDate()
  },

  watch: {
    statuses: function () {
      this.setUpStatuses()
    },
  },

  methods: {
    addTimeToDateFormat(date) {
      // i.e. 7:45 am
      return format(date, "hh:mm aaaaa'm'")
    },

    closeModal() {
      this.modalData = null
      this.dialog = false
    },

    getSubmittedStatus(status) {
      this.storeStatus(status)
    },

    openModal(action, status) {
      this.action = action
      this.dialog = true
      this.modalData = status
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

    storeStatus: function (retrievedStatus) {
      const { feelingToday, status, date, time } = retrievedStatus

      if (feelingToday) {
        const newStatus = {
          feeling: status,
          date: new Date(),
        }
        this.statuses.push(newStatus)
        this.sortStatusByAscDate()
      } else {
        let _date = date ? date : new Date()
        let selectedDate
        if (time) {
          const parsedTime = time.split(':')
          selectedDate = new Date(_date)
          selectedDate.setHours(Number(parsedTime[0]))
          selectedDate.setMinutes(Number(parsedTime[1]))
        } else {
          _date = new Date(date)
        }

        const newStatus = {
          feeling: status,
          date: time ? selectedDate : _date,
        }
        this.statuses.push(newStatus)
        this.sortStatusByAscDate()
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
