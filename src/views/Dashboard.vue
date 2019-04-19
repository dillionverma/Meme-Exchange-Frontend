<template>
  <v-layout style="height: auto">
    <v-card style="padding: 8px">
      <apexchart
        width="500"
        type="bar"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  data: function() {
    return {
      chartOptions: {
        chart: {
          id: "vuechart-example"
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        },
        title: {
          text: "Total Users",
          align: 'center',
          margin: 20,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize:  '20px',
            color:  '#263238'
          },
        }
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 35, 50, 49, 60, 70, 91]
        }
      ]
    };
  }
};
</script>
