<template>
  <div class="table-app">
    <el-row class="ui container self-row">
      <el-col :span="2">
        <el-button class="ui basic button" id="settingsBtn" @click="add">
          <i class="add icon"></i>
          添加
        </el-button>
      </el-col>
    </el-row>
    <rd-list :type="type" ref="rdList" />
  </div>
</template>

<script>

import RdList from "@/components/rdtable/rd-list";
import ListBaseDriver from './listBaseDriver.js'

export default {
  name: 'ListBaseDemo',
  components: { RdList },
  data () {
    return {
      listBaseDriver: new ListBaseDriver(),
      type: 'cus-item-base',
    }
  },
  mounted () {
    this.listBaseDriver.onInit(this.$refs.rdList)
  },
  methods: {
    add () {
      this.listBaseDriver.tryAdd()
    }
  }
}
</script>

<style scoped>
.self-row {
  margin-top: 20px !important;
}
</style>
