<template>
  <div class="cus-tree-header" style="height: 100%">
    <div v-if="title" style="text-align: center; height: 45px; line-height: 45px;">
      <label class="ui column cus-tree-header_font">{{ title }}</label>
    </div>
    <!--        <el-button @click="expandAll">1</el-button>-->
    <div v-if="title" class="ui inverted divider" />

    <div v-if="filterVisible" class="example-description">
      <input type="text" placeholder="请输入关键字进行搜索" v-model="filter" class="filter-field">
    </div>

    <div class="example-description-line"></div>


    <tree ref="tree" :data="treeData" :options="treeOptions" :filter="filter" style="height:calc(100% - 45px);">
      <div slot-scope="{ node }" class="tree-scope">
        <template>
          <span class="text">
            {{ node.text }}
          </span>
          <div v-if="editVis" class="node-controls">
            <a href="#" @mouseup.stop="openNodeTree(node)"><i class=" teal plus icon" /></a>
            <a href="#" @mouseup.stop="editNode(node)"><i class=" teal pencil alternate icon" /></a>
            <a href="#" @mouseup.prevent="removeNode(node)"><i class=" red trash alternate icon" /></a>
          </div>
          <span v-if="!node.hasChildren()" class="release">
            {{ node.data.release }}
          </span>
        </template>

        <!--        <template v-else>
                  <span class="text">
                    {{ node.text }}
                  </span>

                  <span class="release">
                    {{ node.data.release }}
                  </span>
                </template>-->
      </div>
    </tree>
  </div>
</template>

<style scoped>
@import '../Semantic-UI-CSS-master/semantic.min.css';
.ui.divider:not(.vertical):not(.horizontal) {
  border: none;
}
</style>

<script>
import Tree from './liquor-tree/components/TreeRoot.vue'
import TreeFun from './liquor-tree/lib/Tree'
export default {
  name: 'CusTree',
  components: {
    Tree
  },
  props: {
    // 选择自动注入item样式
    title: {
      type: String,
      required: false,
      default: ''
    },
    // 编辑器
    editVis: {
      type: Boolean,
      required: false,
      default: false
    },

    // 选择自动注入item样式
    treeOptions: {
      type: Object,
      required: false,
      default: () => {
      }
    },
    // 选择自动注入item样式
    filterVisible: {
      type: Boolean,
      required: false,
      default: false
    },
    // 选择自动注入item样式
    cssStyle: {
      type: String,
      required: false,
      default: 'cus-tree-edit'
    },
    node: {
      type: Object,
      required: false,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: () => {}
    },
    state: {
      type: Object,
      required: false,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: () => {
        return { expanded: true }
      },
    },
    onTreeNode: {
      type: Function,
      required: false
    }
  },
  data () {
    return {
      treeData: [],
      traverseMap: null,
      //  当前node状态
      // node: { state: { expanded: true }},
      currentNode: {},
      key: 0,
      childNode: {},
      // eslint-disable-next-line vue/no-dupe-keys
      filter: '',
      // 存储修改状态的id
      // 事件类型
      eventsArr: [
        { name: 'node:selected', args: ['Node'] },
        { name: 'node:checked', args: ['Node', 'Target Node'] },
        { name: 'node:unchecked', args: ['Node'] }
        /* { name: 'tree:mounted', args: ['Tree Component'] },
         { name: 'tree:filtered', args: ['Matches', 'Filter String'] },
         { name: 'tree:data:fetch', args: ['Parent Node'] },
         { name: 'tree:data:received', args: ['Parent Node'] },

         { name: 'node:disabled', args: ['Node']},
         { name: 'node:enabled', args: ['Node']},
         { name: 'node:shown', args: ['Node'] },
         { name: 'node:hidden', args: ['Node'] },
         { name: 'node:dblclick', args: ['Node'] },
        { name: 'node:selected', args: ['Node'] },
        { name: 'node:unselected', args: ['Node'] },
         { name: 'node:checked', args: ['Node', 'Target Node'] },
         { name: 'node:unchecked', args: ['Node'] },
         { name: 'node:expanded', args: ['Node'] },
         { name: 'node:collapsed',  args: ['Node'] },
         { name: 'node:added',  args: ['Node', 'New Node'] },
         { name: 'node:removed',  args: ['Node'] },
         { name: 'node:text:changed', args: ['Node', 'New Text', 'Old Text']},

         { name: 'node:editing:start',  args: ['Node'] },
         { name: 'node:editing:stop',  args: ['Node', 'isTextChanged'] },*/
      ]
    }
  },
  mounted() {
    this.eventsArr.forEach(e => {
      this.$refs.tree.$on(e.name, this.initEventViewer(e))
    })

    // 编辑单个时间
    this.$refs.tree.$on('node:editing:start', (node) => {
      console.log('Start editing: ' + node.text)
    })

    this.$refs.tree.$on('node:editing:stop', (node, prevNodeText) => {
      console.log('Stop editing: ' + node.text + ', ' + prevNodeText)
      // if (confirm('确定编辑?')) {
      // this.treeDriver.doAdd(node)
      this.$emit('updateNode', node)
      // this.updateNode(node)
      /* } else {
        node.text = prevNodeText
      }*/
    })

    this.$refs.tree.$on('node:removed', (node) => {
      console.log('removed editing: ' + node)
    })

    this.$refs.tree.$on('node:checked', (node) => {
      console.log('checked: ' + node )
      this.$emit('checkedNode', node)
    })
    this.$refs.tree.$on('node:unchecked', (node) => {
      console.log('unchecked: ' + node)
      this.$emit('uncheckedNode', node)
    })
  },
  methods: {
    buildFields(data) {
      this.treeData = data
      // console.log('@===>treeData', data)
      // 重构结构
      const node = this.node ? this.node : { state: this.state }
      this.onOptions(this.treeData, node)
      // 添加外部播放事件
    },
    // 展开按钮
    expandAll() {
      this.$refs.tree.expandAll()
    },
    onOptions(tree, node) {
      tree.map(item => {
        if (node.id === item.id) {
          item['state'] = Object.assign({}, item.state)
          // eslint-disable-next-line no-undef
          item.state ? item['state'] = Object.assign(item.state, node.state) : (item['state'] = node.state)
        }

        if (!node.id || node.id === '') {
          // eslint-disable-next-line no-undef
          item.state ? Object.assign(item.state, node.state) : (item['state'] = node.state)
        }
        if (item.children && item.children.length > 0) {
          this.changState(item.children, node)
        }
      })
    },
    /**
     *  改变状态
     * @param copyTree
     * @param newTree
     */
    changState(tree, node) {
      for (const i in tree) {
        const item = tree[i]
        if (node.id === item.id) {
          item['state'] = Object.assign({}, item.state)
          // eslint-disable-next-line no-undef
          item.state ? item['state'] = Object.assign(item.state, node.state) : (item['state'] = node.state)
        }
        if (!node.id || node.id === '') {
          // eslint-disable-next-line no-undef
          item.state ? Object.assign(item.state, node.state) : (item['state'] = node.state)
        }
        if (item.children && item.children.length > 0) {
          this.changState(node, item.children)
        }
      }
    },
    // 初始化事件
    initEventViewer(event) {
      const self = this

      return function(node, newNode) {

        let nodeText = '-'
        const targetNode = newNode && newNode.text ? newNode : node

        if (targetNode && targetNode.text) {
          nodeText = targetNode.text
        }
        console.log(nodeText, arguments, event)
        console.log(node, newNode ? newNode.text : null)
        this.currentNode = node
        self.onTreeNode(node)
      }
    },
    // 编辑
    editNode(node, e) {
      node.startEditing()
    },

    removeNode(node) {
      console.log('@@@=>', node)
      if (node.children && node.children.length) {
        this.$message.warning('该数据存在子节点，不能删除！')
      } else {
        this.$emit('delNode', node)
        // node.remove()
      }
    },
    openNodeTree(node) {
      if (node.enabled()) {
        this.childNode = node
        this.$emit('openTree', 'addNode', node.id)
      }
    },
    addChildNode(text) {
      if (this.childNode.enabled()) {
        this.childNode.append(text)
        this.addNode(this.childNode)
      }
    },
    addChildNodeById(childNode) {
      let node = TreeFun.getNodeById(this.currentNode.id)
     this.$refs.tree.addChild(node, childNode)
    }
  }
}
</script>

<!--//导入外部scss文件-->
<style lang = "scss" :src="`../../../assets/rd_sass/_tree/${this.cssStyle}.scss`"></style>


<style scoped>
/*
 表头
*/
.cus-tree-header {
  color: #ffffff;
  text-align: center;
  left: 0px;
  top: 0px;
  height: 50px;
  background: inherit;
  background-color: #20336e;
  box-sizing: border-box;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(222, 228, 239, 1);
  border-radius: 0px;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
  box-shadow: none;
  font-size: 14px;
  font-family: '微软雅黑';
}

.cus-tree-header_font {
  font-style: normal;
  text-align: initial;
  height: 100%;
}

/*
目录树
*/
.tree-arrow.has-child:after {
  /*background: url(../img/arrow.png);*/
  /*color: #ffffff;*/
  border: 0;
  width: 16px;
  height: 16px;
  background-repeat: no-repeat;
  transform: rotate(0deg) translateY(-50%) translateX(-2px);
}

.tree-arrow.expanded.has-child:after {
  transform: rotate(90deg) translateY(0%) translateX(-8px);
}



.tree-content {
  padding: 2px 0;
}

.tree-scope {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.release {
  color: #a9a9a9;
}

::v-deep .tree-anchor {
  color: #ffffff;
  font-family: '微软雅黑';
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  color: #FFFFFF;
}

/*
头部
*/
.tree-title {
  color: #00CCFF !important;
}

/**
分割线
 */
.ui.divider {
  margin: 0;
}

</style>
