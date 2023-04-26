<!--releasenote * 1.0-->
<template>
  <div>
    <cus-table
      v-loading="loading"
      ref="cusTable"
      :table-data="tableData"
      :max-width="maxWidth"
      :fields="fields"
      :total="listQuery.total"
      :page-index="listQuery.page_index"
      :page-size="listQuery.page_size"
      :options="options"
      :on-page-number-change="onPageNumberChange"
      :on-page-size-change="onPageSizeChange"
      :sort-option="sortOption"
      :table-height="tableHeight"
      :fixed-header="true"
      :page-vis="pageVis"
      :layout-page="layoutPage"
      :type="type"
      :maxLength="maxLength"
      :cellStyleOption="cellStyleOption"
      :is-draggable="isdraggable"
      :is-fold="isFold"
    />
    <cus-dialog
      ref="cusDialg"
      class="ratings"
      :visible="rdFormVisible"
      :fields="items"
      :options="options"
      :operation="operation"
      @closeDialog="closeDialog"
      :width="width"
    />
  </div>
</template>

<script>
import CusTable from './common/cus-table.vue'
import { TableFormatter } from './tools/table-formatter'
import { flexColumnWidth } from './tools/table-style'
import CusDialog from './common/cus-dialog'

export default {
  name: 'RDTable',
  components: { CusDialog, CusTable },
  props: {
    // 设置表格样式
    type: {
      type: Array,
      default: () => [],
      required: false
    },
    // 是否排序
    isSort: {
      type: Boolean,
      default: true,
      required: false
    },
    // 设置序号开关
    numVis: {
      type: Boolean,
      default: false,
      required: false
    },
    tableHeight: {
      type: String,
      required: false
    },
    tableWidth: {
      type: String,
      default: null,
      required: false
    },
    // 设置分页样式
    layoutPage: {
      type: Array,
      required: false
    },
    // 对特殊字段字段进行自定义处理
    definedColum: {
      type: Array,
      default: () => [],
      required: false
    },
    // 设置树结构层级 <=1 为无穷，>1 表示按层级添加子级
    maxLength: {
      type: Number,
      required: false
    },
    onDefinedColum: {
      type: Function,
      required: false
    },
    // 设置表头宽度
    columWidth: {
      type: Array,
      default: () => [],
      required: false
    },
    onColumWidth: {
      type: Function,
      required: false
    },
    // 表头
    columns:{
      type: Array,
      required: false,
      default:() => []
    },
    // dialog 宽度
    width: {
      type: String,
      required: false,
      default: '40%'
    },
    cellStyleOption:{
      type: Object,
      required: false
    },
    isdraggable:{
      type: Boolean,
      required: false,
      default: false
    },
    // 是否展开
    isFold:{
      type: Boolean,
      required: false,
      default: false
    }
    // 表数据
    /*tableData:{
     type: Array,
     required: false,
     default:() => []
   },*/
  },
  data() {
    return {
      sortOption: {
        sortAlways: true,
        sortChange: (params) => {
          this.buildSorter(params)
        }
      },
      colWidth: 0,
      maxWidth: '',
      fields: [],
      tableData: [],
      listQuery: {
        total: 0,
        page_index: 0,
        page_size: 10
      },

      sortOrder: [],
      rdFormVisible: false,
      // 组件
      options: {},
      items: [],
      model: {},
      //  设置操作
      operation: '',
      pageVis: true,
      // eslint-disable-next-line vue/no-reserved-keys
      // 加载等待
      loading: true
    }
  },
  provide() {
    return {
      onSubmit: this.onSubmit,
      onSubmitNode: this.onSubmitNode,
      // model: () => this.model
    }
  },
  watch: {
    // tree 时候出现数据重复添加问题
    rdFormVisible(val) {
      if (!val) this.operation = ''
    },
  },
  methods: {
    buildSorter(sort) {
      // 这里简单化处理了，实际上只保留了最后一次点击的列，后续可以优化保存原有的，变化的可以替换
      this.tableDriver.listQuery.sorters = []
      for (var fn in sort) {
        // 遍历json对象的每个key/value对,p为key

        if (sort[fn] != '') {
          this.tableDriver.listQuery.sorters.push({ fn: fn, op: sort[fn] == 'asc' ? '+' : '-' })
        }
      }

      this.requestList()
    },
    /**
     * 拼接列
     * @param item
     * @return {{field: *, width: (*|number), renderBodyCell: (function({row: *, column: *, rowIndex: *}, *): *), sortBy: string, title: *, ft: *, key: string}}
     */
    getColumn(item, index) {
      const that = this
      const key = '' + item.id
      const width = item.fn !== 'id' ? flexColumnWidth(item.fn) : 0
      console.log(item.cn, width)
      that.colWidth += width
      console.log('@@=> ', that.colWidth)

      const column = {
        ft: item.ft,
        field: item.fn,
        key: key,
        flex: 1, // 特殊字段在treeTable中实现表头平铺
        title: item.cn,
        width: width,

        renderBodyCell: ({ row, column, rowIndex }, h) => {
          // todo 考虑换为element方式，但是h.$createElement undefind
          /* let val = row[column.field]
          if (['date_range'].indexOf(item.ft) == -1) {
            return  val
          }
          // return val
          if (column.ft && !val) return val
          console.log('@@#=>', column.ft,val)
          // let res = that.formatter.formatterMap.get(column.ft)(val)
          // console.log('@@#=>res', res)
          return that.formatter.dateRange(val) */
          // 添加属性
          let property = item.fp && item.fp.default ? item.fp.default : null
          if (['switch', 'radio'].includes(item.ft)) {
            property = item.fp ? item.fp : null
          }

          property = JSON.stringify(property)
          // 对特殊字段进行处理
          if (that.definedColum.includes(column.field)) {
            const text = row[column.field]
            return that.onDefinedColum(text, column.field, row)
          } else {
            // 默认字段处理
            return <TableFormatter type={column.ft} row={row} column={column} rowIndex={rowIndex} property={property}
              options={that.options}/>
          }
        }
      }
      // 省略单元格内容
      if (['textarea', 'composite', 'rich_text'].includes(item.ft)) {
        column.ellipsis = {
          showTitle: true
        }
      }
      if(this.isSort){
        column.sortBy = ''
      }
      // 如果是treeTabel
      if (this.type.includes('tree')) that.onTreeColumn(index, column)

      // 设置表头宽度
      if (that.columWidth.includes(column.field)) {
        return that.onColumWidth(column.field, column)
      } else {
        return column
      }
    },
    onTreeColumn(index, column) {
      // 如果是treeTabel 添加标识符号
      if (index === 0) {
        column['type'] = 'selection'
      }
      // 默认设置文字位置
      column.align = 'left'
      // 如果是treeTabel 对特殊字段进行处理
      if (this.definedColum.includes(column.field)) {
        const field = column.field
        column = [this.onDefinedColum(column, field)]
      }
    },
    /**
     * 组装表头
     * @param list
     */
    buildFields(list) {
      const that = this
      if(this.columns.length) {
        that.fields = that.columns
      } else {
        this.items = list

        let fields = []
        that.colWidth = 0

        fields = list.map((item, index) => {
          // 设置主键隐藏
          console.log(item)
          return that.getColumn(item, index)
        })
        // 判断table的宽度是默认还是通过是指实现
        this.maxWidth = this.tableWidth ? this.tableWidth : (this.colWidth + 200) + 'px'
        console.log('@@=> maxWidth', this.maxWidth)
        this.fields = []
        this.fields = fields.filter((item) => {
          // 过滤id
          if (item.field !== 'id') {
            return item
          }
        })
        // 添加序号
        if (this.numVis) this.fields.unshift({ field: 'number', key: 'rd_index', title: '序号', align: 'center', width: '50px' })
        // 添加多选
        if (this.type.includes('check')) {
          this.fields.unshift({
            field: 'check',
            key: 'rd_check',
            type: 'checkbox',
            title: '选项',
            align: 'center',
            width: '50px'
          })
        }
        // 添加多选
        if (this.type.includes('radio')) {
          this.fields.unshift({
            field: 'radio',
            key: 'rd_radio',
            type: 'radio',
            title: '选项',
            align: 'center',
            width: '50px'
          })
        }
        console.log('@@=> this.fields', this.fields)

        // 添加操作
        this.addActionsButton()
      }
    },
    /**
     * 动态操作按钮
     */
    addActionsButton() {

      const isTree = this.type.includes('tree')
      console.log('@@@@@=>', isTree)
      const actions = this.tableDriver.actions
      const count = actions.length
      // 通用表格操作按钮
      const baseAction = {
        ft: 'rd_action',
        field: 'rd_action',
        key: 'e',
        title: '操作',
        width: 50 * count, // 默认单个操作按键间距为 50
        center: 'center',
        renderBodyCell: ({ row, column, rowIndex }, h) => {
          return this.buildActions(isTree, row)
        }
      }
      // tree表格操作按钮
      const treeAction = {
        title: '操作',
        type: 'action',
        field: 'rd_action',
        show: true,
        flex: 1,
        width: 50 * actions.length, // 默认单个操作按键间距为 50
        align: 'center',
        actions: this.buildActions(isTree)
      }
      let _actions = isTree ? treeAction : baseAction
      // 设置表头宽度
      if (this.columWidth.includes(_actions.field)) {
        _actions = [this.onColumWidth(_actions.field, _actions)]
      }
      if (actions.length) {
        // 属性结构表和通用表个使用
        this.fields.push(isTree ? treeAction : baseAction)
      }
    },

    // 动态button生成
    buildActions(isTree, row = {}) {
      const self = this
      let actions = ''
      // console.log('zenais-> buildActions', row)
      actions = this.tableDriver.actions.actions = self.tableDriver.actions.filter(fi => {
        return self.tableDriver.actionFilter(fi, row)
      }).map(et => {
        return self.tableDriver.actionEditor(et, row)
      }).map(item => {
        const action = item.action
        // 设置删除样式为红色
        const setClass = action === 'del' ? 'del_button' : ''
        return isTree ? {
          // 判断aciton类型
          text: item.label, onclick: (item) => {
            this.onActionClicked(action, item)
          }, formatter: it => {
            return (<i class={setClass} style='margin-left:10px;'>{item.label}</i>)
          }
        }
          // 添加按钮是否禁用
          : (<el-button type='text' class={setClass} disabled={item.disabled} on-click={() => this.onActionClicked(action, row)}>{item.label}  </el-button>)
      })
      return actions
    },

    // actions方法处理
    onActionClicked(action, row) {
      console.log('slot actions: on-click', action, row)
      if (action === 'edit') {
        this.operation = 'edit'
        this.editRow(row.id)
      } else if (action === 'del') {
        this.deleteRow(row.id)
        // 添加节点
      } else if (action === 'addNode') {
        this.operation = 'addNode'
        this.tryAddNode(row)
      } else if (action === 'editNode') {
        this.operation = 'editNode'
        this.tryEditNode(row)
        // 删除节点
      } else if (action === 'delNode') {
        this.deleteNode(row)
      } else {
        this.$emit('actionRow', action, row)
      }
    },
    editRow(id) {
      const tableDriver = this.tableDriver
      tableDriver.doGet(id).then((rsp) => {
        const that = this
        console.error(rsp)
        that.rdFormVisible = true
        this.$nextTick(() => {
          that.$refs['cusDialg'].$refs['cusFormRef'].initFields(that.model)
        })
      })
    },
    /**
     * 物理删除 -base
     * @param id
     */
    deleteRow(id) {
      this.confirmDo('确定删除吗？', () => {
        this.tableDriver.doDel(id)
      })
      this.$emit('deleteRow', id)
    },

    /**
     * 删除node - tree
     * @param data
     */
    deleteNode(data) {
      if (data.children && data.children.length) {
        this.confirmDo('存在子节点，确定删除吗？', () => {
          this.$refs['cusTable'].onDelNode(data.id)
        })
      } else {
        this.confirmDo('确定删除吗？', () => {
          this.$refs['cusTable'].onDelNode(data.id)
        })
      }
    },

    /**
     * 分页
     * @param pageNumber
     */
    onPageNumberChange(pageNumber) {
      this.tableDriver.listQuery.page_index = pageNumber
      this.requestList()
    },
    /**
     * 分页
     * @param pageNumber
     */
    onPageSizeChange(pageSize) {
      this.tableDriver.listQuery.page_index = 1
      this.tableDriver.listQuery.page_size = pageSize
      this.requestList()
    },
    // base Table
    onSubmit(model) {
      if (this.type.includes('tree')) {
        const node = {}
        Object.assign(node, this.model, model)
        console.log('@@@@@model', this.model, model, node)
        this.onSubmitNode(node)
      } else {
        this.tableDriver.doSubmit(model)
      }

      this.closeDialog()
    },
    // tree Table
    onSubmitNode(model) {
      console.log('@@operation=>', this.operation, model)
      if (this.operation === 'addNode') {
        this.$refs['cusTable'].onAddNode(model.parentId, model)
        this.operation = '' // 默认为编辑状态
      } else if (this.operation === 'add') {
        this.$refs['cusTable'].onAddNode('', model)
        this.operation = '' // 默认为编辑状态
        console.log('@@this.operation=>', this.operation)
      } else {
        this.$refs['cusTable'].onEditNode(model.id, model)
      }
      this.closeDialog()
    },
    requestList() {
      this.tableDriver.doList()
    },

    closeDialog() {
      this.rdFormVisible = false
    },

    confirmDo(prompt, callback) {
      this.$confirm(prompt, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        callback()
      })
        .catch(() => {
        })
    },
    /**
     * 通用Table模块
     */
    tryAdd(model) {
      this.model = model || {}
      this.operation = 'add'
      this.rdFormVisible = true
      this.$nextTick(() => {
        this.$refs['cusDialg'].$refs['cusFormRef'].initFields(this.model)
      })
    },
    /**
     * 通用tree - Table模块
     */
    tryAddNode(node) {
      this.model = Object.assign({}, node)
      this.model.parentId = node.id
      this.model.id = Date.now().toString()
      this.model.children = []
      this.operation = 'addNode'
      this.rdFormVisible = true
    },
    /**
     * 通用tree - Table模块
     */
    tryEditNode(node) {
      this.model = node
      this.operation = 'editNode'
      this.rdFormVisible = true
    },

    getTreeData() {
      return this.$refs['cusTable'].getTreeData()
    }
  }
}
</script>

<style scoped>
.self-row {
  margin-top: 20px !important;
}
</style>
<style scoped>
.del_button {
  color: #CC0000 !important;
}
</style>
