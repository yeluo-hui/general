<!--https://amsik.github.io/liquor-tree/#Checkboxes-->
<template>
  <div class="table-app">
    <div class="demo-tree" >
      <cus-tree ref="cusTree" :title="titel" :tree-options="options" :onTreeNode="onTreeNode"></cus-tree>
    </div>
  </div>
</template>

<script>

import CusTree from "@/components/rdtable/cus-tree/cus-tree";
import TreeMenu from './treeMenu'
import { getTreeList } from "@/api/ldsc";

export default {
  name: 'TreeCurse',
  components: {CusTree},
  data() {
    return {
      // 学生端课程分类
      titel: '目录结构树',
      treeMenu: new TreeMenu(),

      id: '',
      // tree 结构-答题卡
      options: {
        minFetchDelay: 600,
        propertyNames: {
          text: 'text',
          children: 'children'
        },
        fetchData(node) {
          const  param = {
            nodeId: node.id,
            nodeType: node.param.type,
            projectId: node.param.projectId,
            projectSectionId: node.param.sectionId
          }
          // return Promise object
          return getTreeList(param).then(r => r.json()).then(data => {
            data[0].state = {
              checked: true
            }
            return data
          }).catch(e => console.log(e))
        },
        onFetchError(error) {
          console.error(error)
        },
        // 多选
        multiple: false,
        // 键盘操作
        keyboardNavigation: false,
        // 父级可选
        deletion: false
      },
    }
  },
  mounted() {
    this.treeMenu.onInit(this.$refs.cusTree, {})
  },
  methods: {
    onTreeNode(data) {
      console.log('@@=>treeCurse', data)
      const  param = {
        nodeId: data.id,
        nodeType: data.param.type,
        projectId: data.param.projectId,
        projectSectionId: data.param.sectionId
      }

      this.treeMenu.onList(param).then(res => {

      })
    },
    // 编辑功能
    editNode(node){
      console.log('editNode', node)
      this.cusTreeEdit.onUpdate()
      return new Promise(resolve => {
        resolve(true)
      })
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

.demo-tree {
  width: 280px;
  height: 750px;
  float: left;
  margin-left: 20px;
  background-color: #20336e;
  margin: 0 10px 20px 10px;
  border-radius: 10px;
}
</style>
