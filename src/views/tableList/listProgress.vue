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
    <rd-list :type="type" ref="rdList"/>
  </div>
</template>

<script>

import RdList from "@/components/rdtable/rd-list";
import ListProgressDriver from './listProgressDriver.js'

export default {
  name: 'ListProgress',
  components: { RdList },
  data () {
    return {
      listProgressDriver: new ListProgressDriver(),
      type: 'cus-item-progress',
    }
  },
  mounted () {
    this.listProgressDriver.onInit(this.$refs.rdList)
  },
  methods: {
    add () {
      this.listProgressDriver.tryAdd()
    }
  }
}
</script>

<style scoped>
.self-row {
  margin-top: 20px !important;
}
</style>
