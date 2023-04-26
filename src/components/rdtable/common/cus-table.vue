<!--releasenote * 1.0-->
<template>
  <div class="ui vertical segment">
    <div style="padding: 0px;">
      <div type="" style="overflow-y: auto; margin-bottom: 10px;">
        <!-- 默认使用表格       -->
        <ve-table
          v-if="type.includes('check')"
          :style="setWidth"
          :columns="fields"
          :table-data="rowData"
          :row-style-option="rowStyleOption"
          :sort-option="sortOption"
          :max-height="tableHeight"
          row-key-field-name="id"
          :checkbox-option="checkboxOption"
          :event-custom-option="eventCheckCustomOption"
          :cell-style-option="cellStyleOption"
        />

        <!-- 单选题结构       -->
        <ve-table
          v-else-if="type.includes('radio')"
          :style="setWidth"
          :columns="fields"
          :table-data="rowData"
          :row-style-option="rowStyleOption"
          :sort-option="sortOption"
          :max-height="tableHeight"
          row-key-field-name="id"
          :radio-option="radioOption"
          :event-custom-option="eventRadioCustomOption"
          :cell-style-option="cellStyleOption"
        />

        <!-- 表格树结构       -->
        <dragTreeTable
          v-else-if="type.includes('tree')"
          ref="dragTable"
          :max-height="tableHeight"
          :columns="fields"
          :table-data="rowData"
          :on-drag="onTreeDataChange"
          resize
          fixed
          :on-render="onTreeRender"
          :is-draggable="isDraggable"
          :isFold="isFold"
          @onMsg="onMsg"
        />

        <!--  默认样式      -->
        <ve-table
          v-else
          :style="setWidth"
          :columns="fields"
          :table-data="rowData"
          :row-style-option="rowStyleOption"
          :sort-option="sortOption"
          :max-height="tableHeight"
          :cell-style-option="cellStyleOption"
        />
      </div>
      <!--  分页结构      -->
      <ve-pagination
        v-if="total> 0 && pageVis"
        ref="vePageRef"
        :total="total"
        :page-index="pageIndex"
        :page-size="pageSize"
        :layout="layoutPage"
        @on-page-number-change="onPageNumberChange"
        @on-page-size-change="onPageSizeChange"
      />
    </div>
  </div>
</template>
<style scoped>
@import '../Semantic-UI-CSS-master/semantic.min.css';
</style>
<script>
import 'vue-easytable/libs/theme-default/index.css'
import dragTreeTable from './table-tree/dragTreeTable.vue'
import {
  VeTable,
  VePagination
  // VeIcon,
  // VeLoading,
} from 'vue-easytable'

export default {
  name: 'RdTable',
  components: {
    VeTable,
    VePagination,
    // VeIcon,
    // VeLoading
    //
    dragTreeTable
  },
  filters: {},
  props: {
    type: {
      type: Array,
      required: true
    },
    // 固定头部
    tableHeight: {
      type: String,
      default: 'calc(100vh)',
      required: false
    },
    maxWidth: {
      type: String,
      required: false
    },
    fixedHeader: {
      type: Boolean,
      required: false,
      default: true
    },
    pageVis: {
      type: Boolean,
      required: false,
      default: true
    },
    // eslint-disable-next-line vue/no-dupe-keys
    sortOption: {
      type: Object,
      required: true
    },
    tableData: {
      type: Array,
      required: true
    },
    fields: {
      type: Array,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    pageIndex: {
      type: Number,
      required: true
    },
    pageSize: {
      type: Number,
      required: true
    },
    onPageNumberChange: {
      type: Function,
      required: true
    },
    onPageSizeChange: {
      type: Function,
      required: true
    },
    // 设置分页样式
    /*layout 属性支持以下配置项：
      total：显示总条数、prev：显示上一页按钮、pager：显示页码按钮、next：显示下一页按钮、sizer：显示每页大小设置、jumper：显示跳转文本框*/
    layoutPage: {
      type: Array,
      default: () => ['total', 'prev', 'pager', 'next', 'sizer', 'jumper'],
      required: false
    },
    // 设置树结构层级 <=1 为无穷，>1 表示按层级添加子级
    maxLength: {
      type: Number,
      required: true,
      default: 3
    },
    cellStyleOption:{
      type: Object,
      required: false
    },
    // 是否推拽
    isDraggable:{
      type: Boolean,
      required: true
    },
    // 是否展开
    isFold:{
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      rowStyleOption: {
        stripe: true // 通过属性stripe开启斑马纹
      },
      columns: [],
      setWidth: '', // 设置表格宽度
      rowData: [],
      /**
       * 多选
       */
      eventCheckCustomOption: {
        bodyRowEvents: ({ row, rowIndex }) => {
          return {
            click: (event) => {
              const currentRowKey = row['id']
              this.changeCheckSelectedRowKeysByRowClick(currentRowKey)
            }
          }
        }
      },
      /**
       * 多选
       */
      checkboxOption: {
        // 可控属性
        selectedRowKeys: [],
        // 存储选中内容
        selectedRows: [],
        // 行选择改变事件
        selectedRowChange: ({ row, isSelected, selectedRowKeys }) => {
          console.log(row)
        },
        // 全选改变事件
        selectedAllChange: ({ isSelected, selectedRowKeys }) => {
          this.changeSelectedRowKeys(selectedRowKeys)
        }
      },
      /**
       * 单选
       */
      radioOption: {
        // 禁用的选择（禁止勾选或者禁止取消勾选）
        selectedRowKey: '',
        // 存储选中内容
        selectedRows: [],
        // 行选择改变事件
        // 行选择改变事件
        selectedRowChange: ({ row }) => {
          this.changeRadioSelectedRowKey(row)
        }
      },
      eventRadioCustomOption: {
        bodyRowEvents: ({ row, rowIndex }) => {
          return {
            click: (event) => {
              const currentRow = row
              this.changeRadioSelectedRowKeyByRowClick(currentRow)
            }
          }
        }
      },
    }
  },
  watch: {
    maxWidth(val) {
      console.log('@@@=> maxWidth', val)
      this.setWidth = `width:${val};`
    },
    tableData: {
      // 对数据处理
      handler(val) {
        this.rowData = val
      },
      deep: true
    }
  },
  methods: {
    /**
     * 多选 给可控属性重新赋值
     */
    changeSelectedRowKeys(keys) {
      this.checkboxOption.selectedRowKeys = keys
    },
    /**
     * 多选  行点击触发
     */
    changeCheckSelectedRowKeysByRowClick(currentRowKey) {
      const { selectedRowKeys } = this.checkboxOption
      if (selectedRowKeys.includes(currentRowKey)) {
        const rowKeyIndex = selectedRowKeys.indexOf(currentRowKey)
        selectedRowKeys.splice(rowKeyIndex, 1)
      } else {
        selectedRowKeys.push(currentRowKey)
      }
    },
    /**
     * 获取多选数据
     */
    getSelectedRowKeys() {
      return this.type.includes('check') ? this.checkboxOption.selectedRowKeys : this.type.includes('radio') ? this.radioOption.selectedRowKey : ''
    },

    getSelectedRows() {
      // todo
      if (this.type.includes('check')) {
        return this.checkboxOption.selectedRows
      } else if ( this.type.includes('radio')) {
        return this.radioOption.selectedRows
      }
    },
    /**
     * 设置默认选中数据
     * @param rowKeys
     */
    setDefaultSelectedRowKeys(rowKeys) {
      if (this.type.includes('check')) {
        this.checkboxOption.selectedRowKeys = Object.assign(rowKeys, [])
      } else if ( this.type.includes('radio')) {
        this.radioOption.selectedRowKey = Object.assign(rowKeys, [])
      }
    },
    /**
     * 单选
     */
    changeRadioSelectedRowKey(row) {
      this.radioOption.selectedRows = row
      this.radioOption.selectedRowKey = row.id
    },
    // 行点击触发
    changeRadioSelectedRowKeyByRowClick(currentRow) {
      this.radioOption.selectedRows = currentRow
      this.radioOption.selectedRowKey = currentRow.id
    },
    /**
     * drag-tree
     */
    onTreeRender() {
      alert(1)
    },
    /**
     * drag-tree
     */
    onTreeDataChange(list) {
      this.rowData = list
    },
    /**
     * 折叠
     */
    onFold() {
      this.$refs.dragTable.onFold()
    },
    /**
     * 高亮
     */
    highlight(id) {
      this.$refs.dragTable.HighlightRow(id)
    },
    /**
     * add tree节点
     */
    onAddNode(pId, data) {
      console.log('pId, data', pId, data)
      this.$refs.dragTable.maxLength = this.maxLength
      this.$refs.dragTable.AddRow(pId, data)
    },
    /**
     * 编辑节点
     */
    onEditNode(id, data) {
      this.$refs.dragTable.EditRow(id, data)
    },
    /**
     * 删除节点
     */
    onDelNode(id) {
      const updatedLists = this.$refs.dragTable.DelById(id)
      console.log('当前行的数据', updatedLists)
      this.rowData = updatedLists
    },
    /**
     * 获取treeTable数据
     */
    getTreeData() {
      return this.$refs.dragTable.getTreeData()
    },
    onMsg() {
      this.$message.warning(`添加子集上限为${this.maxLength}!`)
    }
  }
}
</script>

<style scoped>
.ve-pagination {
  font-size: 14px;
  height: 32px;
  line-height: 32px;
  background-color: #fff;
  margin: 0;
  padding: 0;
  display: inline-block;
  /* margin: 0 510px !important; */
  list-style-type: none;
  /*position: absolute;*/
  bottom: 0%;
  /*transform: translate(-50%, 200%)*/
}

.ui.vertical.segment {
  border-bottom: none !important;
}

::v-deep .ve-pagination .ve-pagination-goto .ve-pagination-goto-input {
  text-align: center;
}
</style>
