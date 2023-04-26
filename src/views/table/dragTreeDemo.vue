<template>
  <div id="table-app" class="table-app">
    <el-row class="ui container self-row">
      <el-col :span="2">
        <el-button class="ui basic button" id="settingsBtn" @click="add">
          <i class="add icon"></i>
          添加
        </el-button>
      </el-col>
      <el-col :span="3">
        <el-button class="ui basic button" id="openAll" @click="onFold">
          <i class="add icon"></i>
          {{ zip ? '全部折叠' : '全部打开'}}
        </el-button>
      </el-col>
      <el-col :span="3">
        <el-button class="ui basic button" id="settingsBtn" @click="highlight(true)">
          <i class="add icon"></i>
          取消高亮
        </el-button>
      </el-col>
      <el-col :span="3">
        <el-button class="ui basic button" id="settingsBtn" @click="highlight(false)">
          <i class="add icon"></i>
          多选数据
        </el-button>
      </el-col>
    </el-row>
    <rd-table ref="rdTable" :isdraggable="false" :is-fold="true" :type="['tree']" :defined-colum="['name','password']" :onDefinedColum="onDefinedColum" :table-height="tableHeight" :table-width="tableWidth" />
  </div>
</template>

<script>
import RdTable from '@/components/rdtable/rd-table'
import DragTreeDriver from './DragTreeDriver.js'

export default {
  name: 'dragTreeDemo',
  components: { RdTable },
  data () {
    return {
      dragTreeDriver: new DragTreeDriver(),
      tableHeight: '',
      tableWidth: '',
      // treeTable使用折叠
      zip: false
    }
  },
  mounted () {
    this.dragTreeDriver.onInit(this.$refs.rdTable)
    // 计算搜索框的高度
    var searchBarHeight = (this.$refs.rdTable.$el.clientHeight - 240) + 'px'
    this.tableHeight = `calc(100vh - ${searchBarHeight})`
    this.tableWidth = 'calc(100vw)'
  },
  computed: {

  },
  methods: {
    add () {
      this.dragTreeDriver.tryAdd()
    },
    /**
     * 特殊字段处理
     * @param val
     * @param type
     * @returns {*}
     */
    onDefinedColum(val, type) {
      console.log('特殊对象处理', val, type)
      if(type === 'name') {
        val.type = 'action'
        val.actions = [{
          text: val,
          onclick: (item) => {
            // item是当前行的数据
            this.action("name", item)
          },
          formatter: (item) => {
            return(
                <span>
                <span style="margin-right:20px;">{item.name}</span>
                <el-button > 选择文件 </el-button>
              </span>
            )
          }
        }]
      }
      if (type === 'password'){
        val.formatter =  item => {
          return  "<el-tag type='warning'>" + item.password + "</el-tag>";
        }
      }
      return val
    },
    action(type, data){
      console.log(type, data)
    },
    onFold() {
      this.zip = !this.zip
      this.dragTreeDriver.onFold()
    },
    highlight(){
      this.dragTreeDriver.onHighlight()
    }
  }
}
</script>

<style scoped>
.self-row {
  margin-top: 20px !important;
}
</style>
