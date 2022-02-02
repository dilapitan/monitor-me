<template>
  <div>
    <v-switch
      v-model="feelingToday"
      :label="feelingToday ? `Today's Feeling` : `Feelings in the past days`"
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
                  label="Choose a time"
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
        @click="getSubmittedStatus()"
      >
        Enter
      </v-btn>
    </v-row>
  </div>
</template>

<script>
import { format } from 'date-fns'

export default {
  name: 'Form',

  data: () => ({
    date: null,
    dateModel: false,
    feelingToday: true,
    dialogTime: false,
    emptyStatus: true,
    status: '',
    time: null,
    timeModel: false,
  }),

  watch: {
    date: function () {
      if (this.status?.length > 0 && this.date) this.emptyStatus = false
      else this.emptyStatus = true
    },

    status: function () {
      if (this.feelingToday)
        this.emptyStatus = this.status?.length > 0 ? false : true
      else {
        if (this.status?.length && this.date) this.emptyStatus = false
        else this.emptyStatus = true
      }
    },
  },

  methods: {
    getSubmittedStatus() {
      const status = {
        feelingToday: this.feelingToday,
        status: this.status,
        date: this.date,
        time: this.time,
      }

      if (!this.feelingToday) {
        this.date = null
        this.time = null
      }

      this.status = ''
      this.$emit('setStatus', status)
    },

    getToday() {
      const today = new Date()
      return format(today, 'yyyy-MM-dd')
    },
  },
}
</script>
