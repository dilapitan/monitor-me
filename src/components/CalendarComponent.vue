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
  data() {
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    return {
      masks: {
        weekdays: "WWW",
      },
      attributes: [
        {
          key: "today",
          highlight: true,
          dates: new Date(),
        },
        {
          key: 1,
          dates: new Date(year, month, 24),
          highlight: {
            color: "green",
            fillMode: "outline",
          },
          popover: {
            label: "Water Plants",
            visibility: "click",
          },
        },
        {
          key: 2,
          dates: new Date(year, month, 24),
          highlight: {
            color: "green",
            fillMode: "outline",
          },
          popover: {
            label: "Read 30 pages",
            visibility: "click",
          },
        },
      ],
    };
  },
};
</script>
