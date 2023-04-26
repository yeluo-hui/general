<!--releasenote * 1.0-->
<template>
  <div class="table-app">
    <cus-list
      :total="listQuery.total"
      :page-index="listQuery.page_index"
      :page-size="listQuery.page_size"
      :type="type"
      :virtual-data="virtualData"
      :on-page-number-change="onPageNumberChange"
      :on-page-size-change="onPageSizeChange"
      :page-vis="pageVis"
      :list-height="listHeight"
      :layout-page="layoutPage"
    />
    <cus-dialog
      class="ratings"
      :visible="rdFormVisible"
      :fields="items"
      :options="options"
      :operation="operation"
      @closeDialog="closeDialog"
    />
  </div>
</template>

<script>
import CusList from './cus-list/cus-list.vue'
import CusDialog from './common/cus-dialog'

export default {
  name: 'RDTable',
  components: {CusDialog, CusList},
  props: {
    // 选择自动注入item样式
    type: {
      type: String,
      required: true
    },
    // 添加选中状态
    checked: {
      type: Boolean,
      default: false,
      required: false
    },
    // 设置高度
    listHeight:{
      type: String,
      required: false
    },
    // 设置分页样式
    layoutPage:{
      type: Array,
      required: false
    }
  },
  data() {
    return {
      fields: [],
      listQuery: {
        total: 0,
        page_index: 1,
        page_size: 4
      },
      pageVis: true,
      rdFormVisible: false,
      // 组件
      listData: [],
      options: {},
      items: [],
      model: {},
      //  设置操作
      operation: '',
      virtualData: [],
      // 添加选择状态
      choiceType: ''
    }
  },
  provide() {
    return {
      onSubmit: this.onSubmit,
      model: () => this.model,
      // 全选状态
      choiceType: () => this.choiceType,
      changeChoice: this.changeChoice
    }
  },
  watch: {
    listData: {
      handler(list) {
        this.virtualData = list
      },
      deep: true
    }
  },
  methods: {

    buildFields(list) {
      this.listData = list.map(row => {
        console.log('@@@@@=>继续listrow', row)
        return this.listDriver.onListDateEditor(row)
      }).map(item => {
        // 题库判断
        // if (item && item.questionContent && typeof (item.questionContent) === 'string') {
        //   item.questionContent = JSON.parse(item.questionContent)
        // }
        // 添加选中状态
        // if (this.checked) {
        //   item.checked = false
        // }
        return item
      })
      // this.addActionsButton()
    },


    // 动态操作按钮
    addActionsButton() {
      const actions = this.listDriver.actions
      if (actions.length) {
        this.fields.push({
          ft: 'default',
          field: '',
          key: 'e',
          title: '操作',
          width: 50 * actions.length, // 默认单个操作按键间距为 50
          center: 'center',
          renderBodyCell: ({row, column, rowIndex}, h) => {
            console.log(column, rowIndex, h)
            return this.buildActions(row)
          }
        })
      }
    },

    // 动态button生成
    buildActions(row) {
      let actions = ''
      // console.log('zenais-> buildActions', row)
      actions = this.listDriver.actions.filter(fi => {
        this.listDriver.actionFilter(fi, row)
      }).map(et => {
        this.listDriver.actionEditor(et, row)
      }).map(item => {
        const action = item.action
        // 设置删除样式为红色
        const setClass = action === 'del' ? 'del_button' : ''
        return <el-button type='text' class={setClass} on-click={() => this.onActionClicked(action, row)}>
          {item.label}
        </el-button>
      })
      return actions
    },

    // actions方法处理
    onActionClicked(action, row) {
      console.log('slot actions: on-click', action, row)
      if (action === 'edit') {
        this.editRow(row.id)
      } else if (action === 'del') {
        this.deleteRow(row.id)
      } else {
        this.$emit('actionRow', action, row)
      }
    },

    editRow(id) {
      const listDriver = this.listDriver

      listDriver.doGet(id).then((rsp) => {
        const that = this
        console.error(rsp)
        this.$nextTick(() => {
          that.operation = 'edit'
          that.rdFormVisible = true
        })
      })
    },
    deleteRow(id) {
      this.confirmDo('确定删除吗？', () => {
        this.listDriver.doDel(id)
      })

      this.$emit('deleteRow', id)
    },

    onPageNumberChange(pageNumber) {
      this.listDriver.listQuery.page_index = pageNumber
      this.requestList()
    },
    onPageSizeChange(pageSize) {
      this.listDriver.listQuery.page_index = 1
      this.listDriver.listQuery.page_size = pageSize
      this.requestList()
    },
    onSubmit(model) {
      this.listDriver.doSubmit(model)
      this.closeDialog()
    },
    requestList() {
      this.listDriver.doList()
    },

    closeDialog() {
      this.rdFormVisible = false
    },

    confirmDo(prompt, callback) {
      this.$confirm(prompt, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          callback()
        })
        .catch(() => {
        })
    },
    tryAdd() {
      this.model = {}
      this.operation = 'add'
      this.rdFormVisible = true
    },

    // 改变状态
    changeChoice(){
      this.choiceType = ''
    },

    // 全选
    onAllChoice(){
      let list = Object.assign([], this.listData)
      this.listData = list.map(item => {
        item.checked = true
        return item
      })
      this.choiceType = 'all'
    },

    // 反选
    onReverse(){
      let list = Object.assign([], this.listData)
      this.listData = list.map(item => {
        item.checked = !item.checked
        return item
      })
      this.choiceType = 'reverse'
    },

    // 获取选中数据
    onChoiced(){
      let choiced = this.listData.filter(item => {
        return item.checked
      })
      return choiced
    },

    // 添加一条
    addStrip(strip){
      this.listData.splice(1,0,strip)
    },

    // 删除一条
    delStrip(id){
      let list = Object.assign([], this.listData)
      this.listData = list.filter(item => {
        return item.id !== id
      })
    }
  }
}
</script>

<style scoped>
.self-row {
  margin-top: 20px !important;
}
</style>
<style>
.del_button {
  color: #CC0000;
}
</style>
