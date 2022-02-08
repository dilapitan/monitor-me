<template>
  <div>
    <v-row class="pl-4">
      <template>
        <v-text-field
          v-model="status"
          placeholder="What are you feeling?"
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
                  hint="Format: Year-Month-Day"
                  persistent-hint
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
                  label="Choose a time"
                  prepend-icon="mdi-clock-time-four-outline"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  clearable
                ></v-text-field>
              </template>

              <v-time-picker v-model="time" full-width format="ampm">
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
        v-if="statusData"
        text
        class="grey--text mr-2"
        small
        @click="closeModal()"
      >
        Cancel
      </v-btn>
      <v-btn
        :disabled="emptyStatus"
        color="primary"
        small
        @click="getSubmittedStatus()"
      >
        {{ statusData ? 'Edit Status' : 'Enter' }}
      </v-btn>
    </v-row>
  </div>
</template>

<script>
import { format } from 'date-fns'

export default {
  name: 'Form',

  props: ['statusData', 'dialog'],

  data: () => ({
    date: null,
    dateModel: false,
    dialogTime: false,
    emptyStatus: true,
    status: '',
    time: null,
    timeModel: false,
  }),

  mounted() {
    if (this.statusData) {
      this.setStatusData()
    }
  },

  watch: {
    date: function () {
      if (this.status?.length > 0 && this.date) this.emptyStatus = false
      else this.emptyStatus = true
    },

    dialog: function () {
      if (this.dialog && this.statusData) this.setStatusData()
    },

    status: function () {
      if (this.status?.length && this.date) this.emptyStatus = false
      else this.emptyStatus = true
    },

    // time: function () {
    //   if (this.time) {
    //     const selectedTime = this.time.split(':')
    //     if (selectedTime[0] > '12') {
    //       const hours = Number(selectedTime[0]) - 12
    //       const converted = `${hours.toString()}:${selectedTime[1]}`
    //       this.time = converted
    //     } else if (selectedTime[0] === '12') {
    //       const converted = `12:${selectedTime[1]}`
    //       this.time = converted
    //     }
    //   }
    // },
  },

  methods: {
    clearFields() {
      this.status = ''
      this.date = null
      this.dateModel = false
      this.dialogTime = false
      this.emptyStatus = true
      this.time = null
      this.timeModel = false
    },

    closeModal() {
      this.clearFields()
      this.$emit('closeModal')
    },

    getSubmittedStatus() {
      const status = {
        status: this.status,
        date: this.date,
        time: this.time,
      }

      this.date = null
      this.time = null
      this.status = ''
      this.$emit('setStatus', status)
    },

    getToday() {
      const today = new Date()
      return format(today, 'yyyy-MM-dd')
    },

    setStatusData() {
      this.date = format(this.statusData.date, 'yyyy-MM-dd')
      this.time = format(this.statusData.date, 'HH:mm')

      this.status = this.statusData.feeling
    },
  },
}
</script>
