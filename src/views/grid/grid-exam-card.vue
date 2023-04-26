<template>
  <rd-grid
      ref="cusGrid"
      :margin="margin"
      :rowHeight="rowHeight"
      :colNums="colNums"
      :type="type"
      :layout-page="['prev', 'pager', 'next']"
      @goSingle="goSingle"
  />
</template>

<script>
import GridTestDriver from "./GridTestDriver";
import RdGrid from "@/components/rdtable/rd-grid";

export default {
  name: 'GridExamCard',
  components: {RdGrid},
  data() {
    return {
      gridTestDriver: new GridTestDriver(),
      type: 'exam-card',
      colNums: 4,   //定义栅格系统的列数，其值需为自然数。
      rowHeight:44 ,//每行的高度，单位像素。
      margin: [20, 10],  // 网格之间的边距 两个数字组成的数组 第一个数字为水品距离 第二个为垂直距离 非必填 默认值为 [10,10]
    }
  },
  mounted() {
    this.gridTestDriver.onInit(this.$refs.cusGrid)
  },
  methods: {
// 查询数据
    search(){
      let id = '018ba8264a5ffe30bf799fdb7c472094'
      this.gridTestDriver.listQuery.filters = [{'fn': 'id', 'fv':id, 'op': '='}]
      this.gridTestDriver.doList()
    },
    goSingle(source) {
      console.log(source)
    }
  },
}
</script>

<style scoped>

</style>
