<!--releasenote * 1.0-->
<!--https://jbaysolutions.github.io/vue-grid-layout/zh/guide/properties.html#gridlayout-->
<template>
  <div>
    <grid-layout
        :layout.sync="layout"
        :style="setStyle"
        class="grid-card-layout"
        :col-num="colNum"
        :row-height="rowHeight"
        :is-draggable="draggable"
        :is-resizable="resizable"
        :is-mirrored="mirrored"
        :vertical-compact="true"
        :use-css-transforms="true"
        :margin="margin"
    >
      <grid-item
          class="grid-card-item"
          v-for="(item, i) in layout"
          :key="i"
          :static="item.static"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
      >
        <component ref="detail" :is="cusComponent" :gridInfo="item.info"></component>
      </grid-item>
    </grid-layout>
    <div class="page-center">
      <ve-pagination
          v-show="layout.length > 0"
          :total="total"
          :page-index="pageIndex"
          :page-size="pageSize"
          :page-size-option="size_option"
          @on-page-number-change="onPageNumberChange"
          @on-page-size-change="onPageSizeChange"
          :layout="layoutPage"
      />
    </div>

  </div>
</template>
<style scoped>
.ve-pagination {
  bottom: -25% !important;
}
</style>
<script>
import {GridLayout, GridItem} from 'vue-grid-layout'

import {
  VePagination,
} from 'vue-easytable'
import 'vue-easytable/libs/theme-default/index.css'

export default {
  components: {
    GridLayout,
    GridItem,
    VePagination
  },
  props: {
    // grid 高度
    gridHeight: {
      type: String,
      required: true
    },
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
    //定义最大行数。
    maxRows: {
      type: Number,
      required: false,
      default: 2
    },
    //每行的高度，单位像素。
    rowHeight: {
      type: Number,
      required: false,
      default: 20
    },
    //定义栅格系统的列数，其值需为自然数。
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
    layout: {
      type: Array,
      required: true
    },
    // 设置分页样式
    /*layout 属性支持以下配置项：
      total：显示总条数、prev：显示上一页按钮、pager：显示页码按钮、next：显示下一页按钮、sizer：显示每页大小设置、jumper：显示跳转文本框*/
    layoutPage: {
      type: Array,
      default: () => ['total', 'prev', 'pager', 'next', 'sizer', 'jumper'],
      required: false
    }
  },
  data() {
    return {
      cusComponent: null,
      // grid参数
      // 这是栅格的初始布局
      colNum: 12,

      size_option: [8, 16, 24],

      setStyle: ''

    }
  },
  mounted() {
    this.gridComponent()
  },
  watch: {
    gridHeight(val) {
      console.log('@@@=> maxWidth', val)
      this.setStyle = `max-height: ${val}; overflow-y:auto;overflow-x:hidden;`
    }
  },
  methods: {
    gridComponent1() {
      let self = this
      let cusComponent = () => import(`@/components/rdtable/cus-grid/grid-components/${self.type}`);
      return self.cusComponent = cusComponent;
    },
    // 动态设置组件
    // https://blog.csdn.net/yorcentroll/article/details/122679683
    gridComponent() {
      const self = this
      self.cusComponent = r => require.ensure([], () => r(require(`@/components/rdtable/cus-grid/grid-components/${self.type}`)))
    },
  }
}
</script>

<style scoped>
.page-center {
  margin-top: 15px;
  text-align: center;
  width: 100%;
}

.vue-grid-layout {
  background: #FFF;
  height: calc(100% - 100px) !important;
}

.grid-card-item {
  width: 25% !important;
  display: inline-block;
  position: unset !important;
  /* margin-top: 10px; */
  transform: none !important;
  height: calc((100% - 30px) / 2) !important;
}

.grid-card-layout .grid-card-item:nth-of-type(n+5) {
  margin-top: 20px;
}

.vue-grid-item:not(.vue-grid-placeholder) {
  /*background: #ccc;
  border: 1px solid black;*/
}

.vue-grid-item .resizing {
  opacity: 0.9;
}

.vue-grid-item .static {
  background: #FFF;
}

.vue-grid-item .text {
  font-size: 24px;
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 100%;
  width: 100%;
}

.vue-grid-item .no-drag {
  height: 100%;
  width: 100%;
}

.vue-grid-item .minMax {
  font-size: 12px;
}

.vue-grid-item .add {
  cursor: pointer;
}

.vue-draggable-handle {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 0;
  left: 0;
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>") no-repeat;
  background-position: bottom right;
  padding: 0 8px 8px 0;
  background-repeat: no-repeat;
  background-origin: content-box;
  box-sizing: border-box;
  cursor: pointer;
}

.ve-pagination {
  font-size: 14px;
  height: 32px;
  line-height: 32px;
  background-color: #fff;
  margin: 0;
  padding: 0;
  /* display: inline-block; */
  /* left: 50%; */
  /* transform: translate(-50%,100%); */
  list-style-type: none;
}

.ui.vertical.segment {
  margin: 0;
  padding-left: 0;
  padding-right: 0;
  background: none transparent;
  border-radius: 0;
  -webkit-box-shadow: none;
  box-shadow: none;
  border: none;
  border-bottom: none;
}

</style>
