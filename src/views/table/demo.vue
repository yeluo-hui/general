<template>
  <div class="table-app">
    <el-row class="ui container self-row">
      <el-col :span="2">
        <el-button class="ui basic button" id="settingsBtn" @click="add">
          <i class="add icon"></i>
          添加
        </el-button>
      </el-col>
      <el-col :span="2">
        <el-button class="ui basic button" id="settingsBtn" @click="search">
          搜索
        </el-button>
      </el-col>
      <el-col :span="2">
        <el-button class="ui basic button" id="settingsBtn" @click="$router.back(-1)">
          返回
        </el-button>
      </el-col>
    </el-row>
    <rd-table ref="rdTable" :table-height="tableHeight" />
  </div>
</template>

<script>
import RdTable from '@/components/rdtable/rd-table'
import TableFormTable from './tableFormTable'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Demo',
  components: {RdTable},
  data () {
    return {
      tableDriver: new TableFormTable(),
      tableHeight: '',
      tableWidth: '',
    }
  },
  mounted () {
    this.tableDriver.onInit(this.$refs.rdTable)
    console.log('params.id', this.$route.params.id)
    // 计算搜table的高度和宽度
    var searchBarHeight = (this.$refs.rdTable.$el.clientHeight + 170 ) + 'px'
    this.tableHeight = `calc(100vh - ${searchBarHeight})`
  },
  methods: {
    // 添加按钮
    add () {
      this.tableDriver.tryAdd()
    },
    // 查询数据
    search(){
      let id = '018ba8264a5f'
      this.tableDriver.listQuery.filters = [{'fn': 'id', 'fv':id, 'op': 'like'}]
      this.tableDriver.doList()
    }
  }
}
</script>

<style scoped>
.self-row {
  margin-top: 20px !important;
}
</style>
