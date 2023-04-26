<template>
  <div id="table-app" class="table-app">
    <el-row class="ui container self-row">
      <el-col :span="2">
        <el-button class="ui basic button" id="settingsBtn" @click="add">
          <i class="add icon"></i>
          添加
        </el-button>
      </el-col>
      <el-col :span="2">
        <el-button class="ui basic button" id="settingsBtn" @click="getCheck">
          <i class="add icon"></i>
          多选数据
        </el-button>
      </el-col>
    </el-row>
    <rd-table class="zenais-table" :cell-style-option="cellStyleOption" ref="rdTable" :num-vis="true" :type="['check']" :table-height="tableHeight" :table-width="tableWidth" :layout-page="['prev', 'pager', 'next']"/>
  </div>
</template>

<style>
.table-body-cell-class1 {
  background: #91d5ff !important;
  color: #fff !important;
}
.table-body-cell-class2 {
  background: orange !important;
  color: #fff !important;
}
.table-body-cell-class {
  background: #91d555 !important;
  color: #fff !important;
}
</style>

<script>
import RdTable from '@/components/rdtable/rd-table'
import UserDriver from './UserDriver.js'
import {convertSecToHHmm}  from '@/utils/time-moment'

export default {
  name: 'userDemo',
  components: { RdTable },
  data () {
    return {
      userDriver: new UserDriver(),
      tableHeight: '',
      tableWidth: '',
      cellStyleOption: {
        bodyCellClass: ({ row, column, rowIndex }) => {
          console.log( row, column, rowIndex)
          if (column.field === "field") {
            return "table-body-cell-class1";
          }

          if (column.field === "sex" && rowIndex === 2) {
            return "table-body-cell-class2";
          }

          if (rowIndex === 3) {
            return "table-body-cell-class";
          }
        },
      }
    }
  },
  mounted () {
    this.userDriver.onInit(this.$refs.rdTable)
    // 计算搜索框的高度
    var searchBarHeight = (this.$refs.rdTable.$el.clientHeight + 170 ) + 'px'
    this.tableHeight = `calc(100vh - ${searchBarHeight})`
    this.tableWidth = 'calc(100vw)'
  },
  computed: {

  },
  methods: {
    add () {
      this.userDriver.tryAdd()
    },
    onDefinedColum(val, type) {
      console.log('特殊对象处理', val, type)
      return type === 'totalHour' ? convertSecToHHmm(val) : type === 'accuracy' ? val + '%' : val
    },
    onColumWidth(col, val){
      val.width = 600
      return val
    },
    getCheck() {
      console.log('checkIds', this.userDriver.getCheck())
    }
  }
}
</script>

<style scoped lang="scss">
.self-row {
  margin-top: 20px !important;
}
.zenais-table{
  ::v-deep.ve-table .ve-table-container table.ve-table-content tbody.ve-table-body.ve-table-stripe tr.ve-table-body-tr:nth-child(2n + 1) td{
    background-color: red ;
  }
}

</style>
