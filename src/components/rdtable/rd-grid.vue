<!--releasenote * 1.0-->
<template>
  <div class="table-app">
    <cus-grid
      :grid-height="gridHeight"
      :layout="layout"
      :margin="margin"
      :row-height="rowHeight"
      :col-nums="colNums"
      :type="type"
      :total="listQuery.total"
      :page-index="listQuery.page_index"
      :page-size="listQuery.page_size"
      :on-page-number-change="onPageNumberChange"
      :on-page-size-change="onPageSizeChange"
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
import CusGrid from '@/components/rdtable/cus-grid/cus-grid'
import CusDialog from './common/cus-dialog'

export default {
  name: 'RdGrid',
  components: {CusDialog, CusGrid},
  props: {
    type: {
      type: String,
      required: true
    },
    // 标识栅格中的元素是否可调整大小。
    resizable: {
      type: Boolean,
      required: false,
      default: false
    },
    // 标识栅格中的元素是否可拖拽
    draggable: {
      type: Boolean,
      required: false,
      default: false
    },
    // 标识栅格中的元素是否可镜像反转
    mirrored: {
      type: Boolean,
      required: false,
      default: false
    },
    // 定义最大行数。
    maxRows: {
      type: Number,
      required: false,
      default: 2
    },
    // 每行的高度，单位像素。
    rowHeight: {
      type: Number,
      required: false,
      default: 20
    },
    // 定义栅格系统的列数，其值需为自然数。
    colNums: {
      type: Number,
      required: false,
      default: 5
    },
    // 网格之间的边距 两个数字组成的数组 第一个数字为水品距离 第二个为垂直距离 非必填 默认值为 [10,10]
    margin: {
      type: Array,
      required: false
    },
    // 设置分页样式
    layoutPage: {
      type: Array,
      required: false
    },
    gridHeight: {
      type: String,
      required: false,
      default: () => 'calc(100vh)'
    }
  },
  data () {
    return {
      fields: [],
      gridData: [],
      listQuery: {
        total: 0,
        page_index: 1,
        page_size: 8
      },
      // 这是栅格的初始布局
      colNum: 12,
      // Y轴坐标
      yAxis: 5,
      sortOrder: [],
      rdFormVisible: false,
      // 组件
      layout: [],
      options: {},
      items: [],
      model: {},
      //  设置操作
      operation: ''
    }
  },
  provide () {
    return {
      onSubmit: this.onSubmit,
      goSingle :this.goSingle,
      model: () => this.model
    }
  },
  methods: {

    /*
   * i 栅格中元素的ID。
   * x 标识栅格元素位于第几列，需为自然数。
   * y 标识栅格元素位于第几行，需为自然数。
   * w 标识栅格元素的初始宽度，值为colWidth的倍数。
   * h 标识栅格元素的初始高度，值为rowHeight的倍数。
   * minW 栅格元素的最小宽度，值为colWidth的倍数 / maxW。
   * minH 栅格元素的最小高度，值为rowHeight的倍数 / maxH。
   * */
    buildFields (data) {
      const self = this
      let i = 0
      // 计算列数
      const xNum = Math.floor(self.colNum / self.colNums)
      console.log('@@=>xNum', xNum)
      if (!data.length) {
        this.layout = []
      }
      // 计算行
      this.layout = data.map((item, index) => {
        // 计算x轴坐标位置
        const x = index % self.colNums * xNum
        i = ((index % self.colNums) === 0 ? i + 1 : i)
        // 计算y轴坐标位置
        const y = this.yAxis * i
        const ele = {'x': x, 'y': y, 'w': 3, 'h': this.yAxis, 'i': '0', static: false, 'info': item}
        i = (index % self.colNums < self.colNums ? i + 1 : 0)
        return ele
      })
      console.log('@@=>layout', this.layout)
      // this.addActionsButton()
      // this.addActionsButton()
    },

    // 动态操作按钮
    addActionsButton () {
      const actions = this.gridDriver.actions
      if (actions.length) {
        this.fields.push({
          ft: 'default',
          field: '',
          key: 'e',
          title: '操作',
          width: 50 * actions.length, // 默认单个操作按键间距为 50
          center: 'center',
          renderBodyCell: ({row, column, rowIndex}, h) => {
            // console.log(column, rowIndex, h)
            return this.buildActions(row)
          }
        })
      }
    },

    // 动态button生成
    buildActions (row) {
      let actions = ''
      actions = this.gridDriver.actions.map(item => {
        const action = item.action
        // 设置删除样式为红色
        const setClass = action === 'del' ? 'del_button' : ''
        return <el-button type='text' class={ setClass } on-click={() => this.onActionClicked(action, row)}>
          {item.label}
        </el-button>
      })
      return actions
    },

    // actions方法处理
    onActionClicked (action, row) {
      console.log('slot actions: on-click', action, row)
      if (action === 'edit') {
        this.editRow(row.id)
      } else if (action === 'del') {
        this.deleteRow(row.id)
      } else {
        this.$emit('actionRow', action, row)
      }
    },

    editRow (id) {
      const gridDriver = this.gridDriver

      gridDriver.doGet(id).then((rsp) => {
        const that = this
        console.error(rsp)
        this.$nextTick(() => {
          that.operation = 'edit'
          that.rdFormVisible = true
        })
      })
    },
    deleteRow (id) {
      this.confirmDo('确定删除吗？', () => {
        this.gridDriver.doDel(id)
      })

      this.$emit('deleteRow', id)
    },

    onPageNumberChange (pageNumber) {
      this.gridDriver.listQuery.page_index = pageNumber
      this.requestList()
    },
    onPageSizeChange (pageSize) {
      this.gridDriver.listQuery.page_size = pageSize
      this.requestList()
    },
    onSubmit (model) {
      this.gridDriver.doSubmit(model)
      this.closeDialog()
    },
    goSingle(card){
      console.log('@goSiongle=>', card)
      this.$emit('goSingle', card)
    },
    requestList () {
      this.gridDriver.doList()
    },

    closeDialog () {
      this.rdFormVisible = false
    },

    confirmDo (prompt, callback) {
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
    tryAdd () {
      this.model = {}
      this.operation = 'add'
      this.rdFormVisible = true
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
