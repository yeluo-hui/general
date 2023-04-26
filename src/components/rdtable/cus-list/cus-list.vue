<template>
  <div style="text-align: center;">
    <virtual-list
      class="teach-v-list"
      :style="setStyle"
      :data-key="'id'"
      :data-sources="virtualData"
      :data-component="itemComponent"
    />
    <ve-pagination
      v-if="virtualData.length && pageVis"
      :total="total"
      :page-index="pageIndex"
      :page-size="pageSize"
      :page-size-option="size_option"
      @on-page-number-change="onPageNumberChange"
      @on-page-size-change="onPageSizeChange"
      :layout="layoutPage"
    />
  </div>
</template>

<style scoped>
@import '../Semantic-UI-CSS-master/semantic.min.css';
.ve-pagination{
  bottom: 6% !important;
}
</style>

<script>
import VirtualList from 'vue-virtual-scroll-list'
import {
  VePagination
} from 'vue-easytable'
import 'vue-easytable/libs/theme-default/index.css'

export default {
  name: 'CusList',
  components: {'virtual-list': VirtualList, VePagination},
  data() {
    return {
      // 引入样式组件
      itemComponent: Object,
      // 引入样组件方法 1
      // itemComponent: () => import(`@/components/rdtable/cus-list/list-item-components/${this.type}`),
      options: {},
      size_option: [4, 8, 12],
      setStyle: ''
    }
  },
  props: {
    pageVis: {
      type: Boolean,
      required: false,
      default: true
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
    // 选择自动注入item样式
    type: {
      type: String,
      required: true,
    },
    // 选择自动注入item样式
    virtualData: {
      type: Array,
      required: true,
    },
    onPageNumberChange: {
      type: Function,
      required: true
    },
    onPageSizeChange: {
      type: Function,
      required: true
    },
    // 选择数据
    onCheck: {
      type: Array,
      required: false
    },
    // 设置list 高度
    listHeight:{
      type: String,
      default: 'calc(100vh)',
      required: false
    },
    // 设置分页样式
    /*layout 属性支持以下配置项：
      total：显示总条数、prev：显示上一页按钮、pager：显示页码按钮、next：显示下一页按钮、sizer：显示每页大小设置、jumper：显示跳转文本框*/
    layoutPage:{
      type: Array,
      default:() => ['total', 'prev', 'pager', 'next', 'sizer', 'jumper'],
      required: false
    }
  },
  mounted() {
    this.gridComponent()
  },
  computed:{},
  watch: {
    listHeight (val) {
      console.log('@@@=> maxWidth', val)
      this.setStyle = `max-height: ${val}; overflow-y:auto;overflow-x:hidden;`
    }
  },
  methods: {
    // 动态设置组件  // 引入样组件方法 2
    gridComponent1() {
      const self = this
      const cusComponent = () => import(`@/components/rdtable/cus-list/list-item-components/${self.type}`)
      return self.itemComponent = cusComponent
    },
    // 动态设置组件  // 引入样组件方法 3
    // https://blog.csdn.net/yorcentroll/article/details/122679683
    gridComponent () {
      const self = this
      self.itemComponent = r => require.ensure([], () => r(require(`@/components/rdtable/cus-list/list-item-components/${self.type}`)))
    },
    buildFields(data) {
      console.log('@==>listDriver:', data)
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
  margin-top:10px;
  display: inline-block;
  /*position: absolute;*/
  /*left: 50%;*/
  /*bottom: 120px!important;*/
  /*transform: translate(-50%, 0%);*/
  list-style-type: none;
}

.ui.vertical.segment {
  border-bottom: none !important;
}

::v-deep .ve-pagination .ve-pagination-goto .ve-pagination-goto-input {
  text-align: center;
}
</style>
