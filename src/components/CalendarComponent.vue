<template>
  <div class="text-center section">
    <vc-calendar
      :masks="masks"
      :attributes="attributes"
      :value="null"
      color="green"
      is-expanded
      is-range
    />
  </div>
</template>

<script>
export default {
  name: 'Calendar',

  props: {
    statuses: {
      type: Array,
      required: true,
    },
  },

  mounted() {
    this.setStatuses()
  },

  watch: {
    statuses() {
      this.setStatuses()
    },
  },

  data() {
    return {
      masks: {
        weekdays: 'WWW',
      },
      attributes: [
        {
          key: 'today',
          highlight: true,
          dates: new Date(),
        },
      ],
    }
  },

  methods: {
    setStatuses() {
      const updatedStatuses = this.statuses.map((status) => {
        status['dates'] = status.date

        status['highlight'] = {
          color: 'green',
          fillMode: 'outline',
        }

        status['popover'] = {
          label: status.feeling,
          visibility: this.setVisibility(),
        }

        return status
      })

      this.attributes = [...this.attributes, ...updatedStatuses]
    },

    setVisibility() {
      return this.$vuetify.breakpoint.name === 'xs' ? 'click' : 'hover'
    },
  },
}
</script>
