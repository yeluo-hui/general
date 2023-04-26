<template>
  <div ref="table" class="drag-tree-table">
    <div class="drag-tree-table-header">
      <column
        v-for="(item, index) in columns"
        :key="index"
        :width="item.width"
        :flex="item.flex"
        :border="border === undefined ? resize : border"
        :class="['align-' + item.titleAlign, 'colIndex' + index]"
      >
        <span v-if="item.type == 'checkbox' && (item.title === '' || item.title === undefined)">
          <input
            class="checkbox"
            type="checkbox"
            @click="onCheckAll($event, item.onChange)"
          >
          {{ item.title }}
        </span>

        <span v-else :style="{ fontSize: item.size + 'px' }" v-html="item.title" />
        <div v-show="resize!== undefined" class="resize-line" @mousedown="mousedown(index, $event)" />
      </column>
    </div>
    <div
      class="drag-tree-table-body"
      :style="bodyStyle"
      :class="isDraing ? 'is-draging' : '' "
      @dragover="draging"
      @dragend="drop"
    >
      <row
        v-for="(item, index) in rowData"
        depth="0"
        :key="index"
        :columns="columns"
        :isdraggable="isDraggable"
        :model="item"
        :custom_field="custom_field"
        :on-check="onSingleCheckChange"
        :border="border === undefined ? resize : border"
        :is-contain-children="isContainChildren"
      />
    </div>
    <div class="drag-line" />
  </div>
</template>

<script>
import row from './row.vue'
import column from './column.vue'
import space from './space.vue'
import func from './func'

document.body.ondrop = function(event) {
  event.preventDefault()
  event.stopPropagation()
}
export default {
  name: 'DragTreeTable',
  components: {
    row,
    column,
    // eslint-disable-next-line vue/no-unused-components
    space
  },
  props: {
    isDraggable: {
      type: Boolean,
      required: true
    },
    isFold: {
      type: Boolean,
      default: true
    },
    // data: Object,
    columns: Array,
    tableData: Array,
    customField: {
      type: Object,
      required: false,
      default: () => {}
    },
    onDrag: Function,
    fixed: String | Boolean,
    height: String | Number,
    border: String,
    onlySameLevelCanDrag: String,
    hightRowChange: String,
    resize: String,
    beforeDragOver: Function
  },
  data() {
    return {
      dragX: 0,
      dragY: 0,
      dragId: '',
      targetId: '',
      whereInsert: '',
      isDraing: false,
      rowData: [],
      custom_field: {
        id: 'id',
        parentId: 'parentId',
        order: 'order',
        children: 'children',
        open: 'open',
        checked: 'checked',
        highlight: 'highlight',
        level: 'level'
      },
      onCheckChange: null,
      isContainChildren: false,
      mouse: {
        status: 0,
        startX: 0,
        curColWidth: 0,
        curIndex: 0
      },
      maxLength: 2,
      zenais_fold: false
    }
  },
  computed: {
    bodyStyle() {
      return {
        overflow: (this.fixed !== undefined && this.fixed !== false) ? 'auto' : 'hidden',
        height: (this.fixed !== undefined && this.fixed !== false) ? (this.height || '400px') : 'auto'
      }
    }
  },
  watch: {
    tableData: {
      handler(val) {
        console.log('@@=>', val)
        this.rowData = val
        this.zenais_fold = this.isFold
        this.onTreeFold(this.isFold)
      },
      deep: true
    }
  },
  mounted() {
    if (this.customField) {
      this.custom_field = Object.assign({}, this.custom_field, this.customField)
    }
    setTimeout(() => {
      this.columns.map((item) => {
        if (item.type === 'checkbox') {
          this.onCheckChange = item.onChange
          this.isContainChildren = item.isContainChildren
        }
      })
    }, 100)
    window.addEventListener('mouseup', e => {
      if (this.mouse.status) {
        const curX = e.clientX
        var line = document.querySelector('.drag-line')
        line.style.left = '-10000px'
        this.mouse.status = 0
        const curWidth = this.mouse.curColWidth
        const subWidth = curX - this.mouse.startX
        const lastWidth = curWidth + subWidth
        const cols = document.querySelectorAll('.colIndex' + this.mouse.curIndex)
        for (let index = 0; index < cols.length; index++) {
          const element = cols[index]
          element.style.width = lastWidth + 'px'
        }
        // 更新数据源
        this.columns[this.mouse.curIndex].width = lastWidth
      }
    })
    window.addEventListener('mousemove', e => {
      if (this.mouse.status) {
        const endX = e.clientX
        const tableLeft = document.querySelector('.drag-tree-table').getBoundingClientRect().left
        var line = document.querySelector('.drag-line')
        line.style.left = endX - tableLeft + 'px'
      }
    })
  },
  methods: {
    draging(e) {
      this.isDraing = true
      if (e.pageX === this.dragX && e.pageY === this.dragY) return
      this.dragX = e.pageX
      this.dragY = e.clientY
      this.filter(e.pageX, e.clientY)
      if (e.clientY < 100) {
        window.scrollTo(0, scrollY - 6)
      } else if (e.clientY > (document.body.clientHeight - 160)) {
        window.scrollTo(0, scrollY + 6)
      }
    },
    drop(event) {
      func.clearHoverStatus()
      this.resetTreeData()
      this.isDraing = false
      if (this.targetId !== undefined) {
        if (this.hightRowChange !== undefined) {
          this.$nextTick(() => {
            var rowEle = document.querySelector("[tree-id='" + window.dragId + "']")
            rowEle.style.backgroundColor = 'rgba(64,158,255,0.5)'
            setTimeout(() => {
              rowEle.style.backgroundColor = 'rgba(64,158,255,0)'
            }, 2000)
          })
        }
      }
    },
    // 查找匹配的行，处理拖拽样式
    filter(x, y) {
      var rows = document.querySelectorAll('.tree-row')
      this.targetId = undefined
      const dragRect = window.dragParentNode.getBoundingClientRect()
      const dragW = dragRect.left + window.dragParentNode.clientWidth
      const dragH = dragRect.top + window.dragParentNode.clientHeight
      if (x >= dragRect.left && x <= dragW && y >= dragRect.top && y <= dragH) {
        // 当前正在拖拽原始块不允许插入
        return
      }
      let hoverBlock
      let targetId
      let whereInsert = ''

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i]
        const rect = row.getBoundingClientRect()
        const rx = rect.left
        const ry = rect.top
        const rw = row.clientWidth
        const rh = row.clientHeight
        if (x > rx && x < (rx + rw) && y > ry && y < (ry + rh)) {
          const diffY = y - ry
          const pId = row.getAttribute('tree-p-id')
          // 不允许改变层级结构，只能改变上下顺序逻辑
          if (this.onlySameLevelCanDrag !== undefined && pId !== window.dragPId) {
            return
          }
          targetId = row.getAttribute('tree-id')
          hoverBlock = row.children[row.children.length - 1]
          var rowHeight = row.offsetHeight
          if (diffY / rowHeight > 3 / 4) {
            whereInsert = 'bottom'
          } else if (diffY / rowHeight > 1 / 4) {
            if (this.onlySameLevelCanDrag !== undefined) {
              // 不允许改变层级结构，只能改变上下顺序逻辑
              return
            }
            whereInsert = 'center'
          } else {
            whereInsert = 'top'
          }
          break
        }
      }
      if (targetId === undefined) {
        // 匹配不到清空上一个状态
        func.clearHoverStatus()
        const whereInsert = ''
        return
      }

      let canDrag = true
      if (this.beforeDragOver) {
        const curRow = this.getItemById(this.rowData, window.dragId)
        const targetRow = this.getItemById(this.rowData, targetId)
        canDrag = this.beforeDragOver(curRow, targetRow, whereInsert)
      }
      if (canDrag === false) return
      hoverBlock.style.display = 'block'
      var rowHeight = row.offsetHeight
      if (whereInsert === 'bottom') {
        if (hoverBlock.children[2].style.opacity !== '0.5') {
          func.clearHoverStatus()
          hoverBlock.children[2].style.opacity = 0.5
        }
      } else if (whereInsert === 'center') {
        if (hoverBlock.children[1].style.opacity !== '0.5') {
          func.clearHoverStatus()
          hoverBlock.children[1].style.opacity = 0.5
        }
      } else {
        if (hoverBlock.children[0].style.opacity !== '0.5') {
          func.clearHoverStatus()
          hoverBlock.children[0].style.opacity = 0.5
        }
      }

      this.targetId = targetId
      this.whereInsert = whereInsert
    },
    resetTreeData() {
      console.log('@@=>this.rowData', this.rowData)
      if (this.targetId === undefined) return
      const listKey = this.custom_field.children
      const parentIdKey = this.custom_field.parentId
      const idKey = this.custom_field.id
      const newList = []
      const curList = this.rowData
      const _this = this
      let curDragItem = null
      let taggetItem = null
      function pushData(curList, needPushList) {
        for (let i = 0; i < curList.length; i++) {
          const item = curList[i]
          var obj = func.deepClone(item)
          obj[listKey] = []
          if (_this.targetId == item[idKey]) {
            curDragItem = _this.getItemById(_this.rowData, window.dragId)
            taggetItem = _this.getItemById(_this.rowData, _this.targetId)
            if (_this.whereInsert === 'top') {
              curDragItem[parentIdKey] = item[parentIdKey]
              needPushList.push(curDragItem)
              needPushList.push(obj)
            } else if (_this.whereInsert === 'center') {
              curDragItem[parentIdKey] = item[idKey]
              obj.open = true
              obj[listKey].push(curDragItem)
              needPushList.push(obj)
            } else {
              curDragItem[parentIdKey] = item[parentIdKey]
              needPushList.push(obj)
              needPushList.push(curDragItem)
            }
          } else {
            if (window.dragId !== item[idKey]) {
              needPushList.push(obj)
            }
          }
          if (item[listKey] && item[listKey].length) {
            pushData(item[listKey], obj[listKey])
          }
        }
      }
      pushData(curList, newList)
      this.resetOrder(newList)
      this.onDrag(newList, curDragItem, taggetItem, _this.whereInsert)
    },
    // 重置所有数据的顺序order
    resetOrder(list) {
      const listKey = this.custom_field.children
      for (var i = 0; i < list.length; i++) {
        list[i][this.custom_field.order] = i
        if (list[i][listKey] && list[i][listKey].length) {
          this.resetOrder(list[i][listKey])
        }
      }
    },
    // 根据id获取当前行
    getItemById(children, id) {
      var curItem = null
      const listKey = this.custom_field.children
      const idKey = this.custom_field.id
      function getchild(curList) {
        for (let i = 0; i < curList.length; i++) {
          var item = curList[i]
          if (item[idKey] === id) {
            curItem = JSON.parse(JSON.stringify(item))
            break
          } else if (item[listKey] && item[listKey].length) {
            getchild(item[listKey])
          }
        }
      }
      getchild(children)
      return curItem
    },
    // 对外暴漏
    DelById(id) {
      const listKey = this.custom_field.children
      const orderKey = this.custom_field.order
      const idKey = this.custom_field.id
      const newList = []
      const curList = this.rowData
      function pushData(curList, needPushList) {
        let order = 0
        for (let i = 0; i < curList.length; i++) {
          const item = curList[i]
          if (item[idKey] !== id) {
            var obj = func.deepClone(item)
            obj[orderKey] = order
            obj[listKey] = []
            needPushList.push(obj)
            order++
            if (item[listKey] && item[listKey].length) {
              pushData(item[listKey], obj[listKey])
            }
          }
        }
      }
      pushData(curList, newList)
      return newList
    },
    // 递归设置属性,只允许设置组件内置属性
    deepSetAttr(key, val, list, ids) {
      const listKey = this.custom_field.children
      for (var i = 0; i < list.length; i++) {
        if (ids !== undefined) {
          if (ids.includes(list[i][this.custom_field['id']])) {
            list[i][this.custom_field[key]] = val
          }
        } else {
          list[i][this.custom_field[key]] = val
        }
        if (list[i][listKey] && list[i][listKey].length) {
          this.deepSetAttr(key, val, list[i][listKey], ids)
        }
      }
    },
    onFold() {
      this.onTreeFold(this.zenais_fold)
    },
    onTreeFold(deep = false) {
      const list = func.deepClone(this.rowData)
      this.deepSetAttr('open', deep, list)
      this.rowData = list
      this.zenais_fold = !this.zenais_fold
    },
    GetLevelById(id) {
      var row = this.$refs.table.querySelector('[tree-id="' + id + '"]')
      var level = row.getAttribute('data-level') * 1
      return level
    },
    HighlightRow(id, isHighlight = true, deep = false) {
      console.log('@@=>this.rowData', this.rowData)
      const list = func.deepClone(this.rowData)
      let ids = [id]
      if (deep === true) {
        ids = ids.concat(this.GetChildIds(id, true))
      }
      this.deepSetAttr('highlight', isHighlight, list, ids)
      this.rowData = list
    },
    AddRow(pId, data) {
      console.log('@@=>this.rowData', this.rowData, data)
      const deepList = func.deepClone(this.rowData)
      var _this = this
      // 控制递归次数
      function deep(list, maxLength) {
        if (maxLength >= 1) {
          if (pId) {
            // 过滤多层
            const listKey = _this.custom_field.children
            for (var i = 0; i < list.length; i++) {
              if (list[i][_this.custom_field['id']] === pId && list[i][_this.custom_field['level']] < maxLength) {
                list[i][_this.custom_field['open']] = true
                const newRow = Object.assign({}, data)
                newRow[_this.custom_field['parentId']] = pId
                newRow[_this.custom_field['level']] = list[i]['level'] + 1
                if (list[i][listKey]) {
                  newRow[_this.custom_field['order']] = list[i][listKey].length
                  list[i][listKey].push(newRow)
                } else {
                  list[i][listKey] = []
                  newRow[_this.custom_field['order']] = 0
                  list[i][listKey].push(newRow)
                }
              }
              if (list[i][listKey] && list[i][listKey].length) {
                deep(list[i][listKey], maxLength)
              }
            }
          } else {
            const newRow = Object.assign({}, data)
            newRow[_this.custom_field['order']] = list.length
            newRow['level'] = 1
            list.push(newRow)
          }
        } else {
          return 1
        }
      }
      deep(deepList, this.maxLength)
      console.log('@@=>this.rowData = deepList', deepList)
      this.rowData = deepList
    },
    EditRow(id, data) {
      console.log('@@=>this.rowData', this.rowData)
      const deepList = func.deepClone(this.rowData)
      var _this = this
      function deep(list) {
        const listKey = _this.custom_field.children
        for (var i = 0; i < list.length; i++) {
          if (list[i][_this.custom_field['id']] === id) {
            var newRow = Object.assign({}, list[i], data)
            list[i] = newRow
          }
          if (list[i][listKey] && list[i][listKey].length) {
            deep(list[i][listKey])
          }
        }
      }
      deep(deepList)
      this.rowData = deepList
    },
    GetChildIds(id, deep = true) {
      const ids = []
      const _this = this
      function getChilds(list, id) {
        const listKey = _this.custom_field.children
        for (var i = 0; i < list.length; i++) {
          let currentPid = ''
          const pid = list[i][_this.custom_field['parentId']]
          if (id === pid) {
            currentPid = list[i][_this.custom_field['id']]
            ids.push(currentPid)
          } else {
            currentPid = id
          }
          if (deep === true || id === currentPid) {
            if (list[i][listKey] && list[i][listKey].length) {
              getChilds(list[i][listKey], currentPid)
            }
          }
        }
      }
      getChilds(this.rowData, id)
      return ids
    },
    // 全选按钮事件
    onCheckAll(evt, func) {
      console.log('@@=>this.rowData', this.rowData)
      this.setAllCheckData(this.rowData, !!evt.target.checked)
      const checkedList = this.getCheckedList(this.rowData)
      func && func(checkedList)
    },
    // 单个CheckBox勾选触发
    onSingleCheckChange() {
      const checkedList = this.getCheckedList(this.rowData)
      this.onCheckChange && this.onCheckChange(checkedList)
    },
    // 根据flag批量处理数据
    setAllCheckData(curList, flag) {
      const listKey = this.custom_field.children
      for (let i = 0; i < curList.length; i++) {
        var item = curList[i]
        this.$set(item, 'checked', flag)
        if (item[listKey] && item[listKey].length) {
          this.setAllCheckData(item[listKey], flag)
        }
      }
    },
    // 获取所有选中的行
    getCheckedList(children) {
      const listKey = this.custom_field.children
      var checkedList = []
      const deepList = func.deepClone(children)
      function getchild(curList) {
        for (let i = 0; i < curList.length; i++) {
          var item = curList[i]
          if (item.checked && item.isShowCheckbox != false) {
            checkedList.push(item)
          }
          if (item[listKey] && item[listKey].length) {
            getchild(item[listKey])
          }
        }
      }
      getchild(deepList)
      return checkedList
    },
    mousedown(curIndex, e) {
      const startX = e.target.getBoundingClientRect().x
      const curColWidth = e.target.parentElement.offsetWidth
      this.mouse = {
        status: 1,
        startX,
        curIndex,
        curColWidth
      }
    },
    getTreeData() {
      return this.rowData
    }
  }
}
</script>

<style lang="scss">
  .drag-tree-table{
    position: relative;
    margin: 20px 0;
    color: #606266;
    font-size: 16px;
    &.border{
      border: 1px solid #eee;
      border-right: none;
    }
  }
  .drag-line{
    position:absolute;
    top: 0;
    left: -1000px;
    height: 100%;
    width: 1px;
    background: #ccc;
  }
  .drag-tree-table-header{
    display: flex;
    // padding: 15px 10px;
    background: #f5f7fa;
    height: 66px;
    line-height: 36px;
    box-sizing: border-box;
    font-weight: 600;
    .align-left{
        text-align: left;
    }
    .align-right{
        text-align: right;
    }
    .align-center{
        text-align: center;
    }
    .tree-column{
      user-select: none;
    }
  }
  .tree-icon-hidden{
    visibility: hidden;
  }
  .is-draging .tree-row:hover{
    background: transparent !important;
  }
  .tree-row{
    background-color: rgba(64,158,255,0);
    transition: background-color 0.5s linear;
  }
</style>
