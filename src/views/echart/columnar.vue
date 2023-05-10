<template>
    <div class="echart-view" ref="chart"></div>
</template>

<script>
import * as echarts from 'echarts'
import ColumnarOptions from "@/views/echart/ColumnarOptions";
export default {
  name: 'ColumnarEcharts',
  data() {
    return {
      mychart: null,
      options: null,
      data: [
        { name: '入库数量', type: 'bar', data: [120, 210, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120], itemStyle: {color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0, color: '#0065FE'}, {offset: 1, color: '#0035CE'}])}},
        { name: '入所数量', type: 'bar', data: [120, 310, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130], itemStyle: {color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0, color: '#00CAFF'}, {offset: 1, color: '#006BFF'}])}},
        { name: '安装数量', type: 'bar', data: [303, 140, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140], itemStyle: {color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0, color: '#01FDFF'}, {offset: 1, color: '#309EFF'}])}}
      ]
    }
  },
  created() {
    this.options = new ColumnarOptions(this.data).getOptions()
  },
  mounted() {
    this.mychart = echarts.init(this.$refs.chart)
    this.mychart.setOption(this.options)
  },
  watch: {
    options: {
      deep: true,
      handler(newVal, oldVal) {
        this.mychart.setOption(newVal)
      }
    }
  },
  beforeDestroy() {
    if (this.chart) {
      this.mychart.dispose()
      this.mychart = null
    }
  }
}
</script>

<style scoped>
.echart-view {
  width: 100%;
  height: calc(20vh)
}
</style>
