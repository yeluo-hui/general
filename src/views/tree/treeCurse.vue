<!--https://amsik.github.io/liquor-tree/#Checkboxes-->
<template>
  <div class="table-app">
    <div class="ui vertical animated button" tabindex="0">
      <div class="hidden content" @click="changeStyle">样式切换</div>
      <div class="visible content">
        <i class="share square icon"></i>
      </div>
    </div>
    <el-button @click="addNode">添加</el-button>
    <el-button>编辑</el-button>
    <div class="demo-tree" >
      <cus-tree ref="cusTree" :title="titel" :tree-options="options1" :on-tree-node="onTreeNode" ></cus-tree>
    </div>
    <div class="demo-tree" >
      <cus-tree ref="cusTreeCatalogue" :title="titelLoacl" :tree-options="options2" :on-tree-node="onTreeNode" ></cus-tree>
    </div>
    <div class="demo-tree" >
      <cus-tree ref="cusTreeEdit" :title="titelCourse" :tree-options="options3" :edit-vis="true" :on-tree-node="onTreeNode" ></cus-tree>
    </div>
    <div class="demo-tree">
      <tree :options="fetchExample1" :data="treeData1" />
    </div>
  </div>
</template>

<script>

import CusTree from "@/components/rdtable/cus-tree/cus-tree";
import TreeCourseDriver from './treeCourseDriver'
import TreeCatalogueDriver from './treeCatalogueDriver.js'
import TreeEditCatalogueDriver from './treeEditCatalogueDriver.js'
import Tree from '@/components/rdtable/cus-tree/liquor-tree/components/TreeRoot.vue'
import { asyncTree } from  '@/api/asynctree'
export default {
  name: 'TreeCurse',
  components: {CusTree, Tree},
  data() {
    return {
      // 学生端课程分类
      titel: '答题卡',
      treeCurseDriver: new TreeCourseDriver(),

      // 教师端学院
      titelLoacl: '组织目录树',
      TreeCatalogueDriver: new TreeCatalogueDriver(),

      titelCourse: '编辑 ',
      cusTreeEdit: new TreeEditCatalogueDriver(),

      cssStyle: 'cus-tree-base',
      cssStyle1: 'cus-tree-edit',
      // 样式 https://amsik.github.io/liquor-tree/#Checkboxes
      // 选择引用组件
      id: '',
      // tree 结构-答题卡
      options1: {
        propertyNames: {
          text: 'catalogName',
          children: 'children'
        },
        // 多选
        multiple: false,
        // 键盘操作
        keyboardNavigation: false,
        // 父级可选
        deletion: false
      },
      // tree 结构-组织目录
      options2: {
        propertyNames: {
          text: 'organizeName',
          children: 'children'
        },
        // 多选
        multiple: false,
        // 键盘操作
        keyboardNavigation: false,
        // 父级可选
        deletion: false
      },
      // tree 结构-编辑
      options3: {
        propertyNames: {
          text: 'typeName',
          children: 'children'
        },
        // 编辑
        filter: {
          plainList: true
        },
        dnd: true,
        // 多选
        multiple: false,
        // 键盘操作
        keyboardNavigation: false,
        // 父级可选
        deletion: false
      },
      treeData1: [{
        text: 'Root node',
        id: 'root',
        isBatch: true
      }],
      fetchExample1: {
        propertyNames: {
          text: 'text',
          children: 'children'
        },
        minFetchDelay: 600,
        fetchData(node) {
          // return Promise object
          return asyncTree({id: node.id}).then(res => {
            if(res && res.code === 200) {
              res.data[0].state = {
                checked: true
              }
              return res.data
            }
          }).catch(e => console.log(e))
        },
        onFetchError(error) {
          console.error(error)
        }
      },
    }
  },
  mounted() {
    this.treeCurseDriver.onInit(this.$refs.cusTree, this.id)
    this.TreeCatalogueDriver.onInit(this.$refs.cusTreeCatalogue, this.id)
    this.cusTreeEdit.onInit(this.$refs.cusTreeEdit, this.id)
  },
  methods: {
    onTreeNode(data) {
      console.log('@@=>treeCurse', data)
    },
    changeStyle() {
    },
    // 编辑功能
    editNode(node){
      console.log('editNode', node)
      this.cusTreeEdit.onUpdate()
      return new Promise(resolve => {
        resolve(true)
      })
    },
    addNode() {
      const nodes = [
        {
          "id": "dsaftsxc34343srxvxc1",
          "parentId": "dsavxchrdsrxvxchf1",
          "typeName": "ZD9型高铁道岔转辙机",
        },
        {
          "id": "dsaftsxc999xvxc2",
          "parentId": "dsavxchrdsrxvxchf1",
          "typeName": "ZD6型道岔转辙机",
        }]
      this.$refs.cusTree.addChildNode('7878')
    },
    removeNode(node){
      console.log('removeNode', node)
      this.cusTreeEdit.onDel()
    },
  }
}
</script>

<style lang="scss" scoped>
.self-row {
  margin-top: 20px !important;
}

::v-deep .tree-anchor {
  color: #ffffff;
  font-family: '微软雅黑';
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  color: #FFFFFF;
}

::v-deep .tree-node.selected > .tree-content > .tree-anchor {
  color: #ffffff;
}

.demo-tree {
  width: 280px;
  height: 750px;
  float: left;
  margin-left: 20px;
  background-color: #20336e;
  margin: 0 10px 20px 10px;
  border-radius: 10px;
}
// 图表样式 -设置固定图标
/*::v-deep .tree-arrow.has-child:after {
  //background: url(../../assets/img/arrow.png);
  border: 0;
  width: 16px;
  height: 16px;
  background-repeat: no-repeat;
  transform: rotate(0deg) translateY(-50%) translateX(-2px);
}

::v-deep .tree-arrow.expanded.has-child:after {
  transform: rotate(90deg) translateY(0%) translateX(-8px);
}*/

::v-deep .tree-arrow.has-child:after {

  position: absolute;
  display: block;
  width: 0px;
  height: 0px;
  // 大小以及颜色设置
  border: 8px solid transparent;
  border-bottom-color: #a9a9a9;

  margin-top: -8px;
  margin-left: 4px;

  transform: rotate(90deg) ;
  transition: transform .25s;
  transform-origin: center;
}

::v-deep .tree-arrow.expanded.has-child:after {
  transform: rotate(180deg) translateY(-4px) translateX(4px);
}


</style>
