<template>
  <el-dialog
    :title="operation==='add' ? '新增' : operation==='addNode'? '添加子节点' : '修改'"
    :close-on-click-modal="false"
    :visible="visible"
    class="cus-from"
    :width="width"
    @close="closeDialog"
    :append-to-body="false"
  >
    <cus-form
      ref="cusFormRef"
      :fields="fields"
      :options="options"
      :operation="operation"
      @closeDialog="closeDialog"
    ></cus-form>
  </el-dialog>
</template>

<script>
import CusForm from './cus-form'

export default {
  name: 'CusDialog',
  components: { CusForm },
  props: {
    fields: {
      type: Array,
      default: () => []
    },
    options: {
      type: Object,
      default: () => {}
    },
    visible: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      required: true
    },
    operation: {
      type: String
    }
  },
  data () {
    return {}
  },
  methods: {
    closeDialog () {
      this.$emit('closeDialog')
    }
  }
}
</script>

<style scoped lang="scss">

::v-deep .el-dialog__header {
  text-align: initial;
  background: #409EFE;
  font-family: Avenir, Helvetica, Arial, sans-serif
}
::v-deep .el-dialog__title {
  color: ffffff;
}

::v-deep  .el-dialog__headerbtn .el-dialog__close {
  color: #FFFFF0 ;
}

.cus-from{
::v-deep.el-dialog__title{
  color: #FFFFFF !important;
}
::v-deep.el-dialog__header{
  background: rgba(0, 130, 205, 1) !important;
}
}

</style>
