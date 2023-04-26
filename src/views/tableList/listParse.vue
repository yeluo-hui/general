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
import ListParseDriver from './listParseDriver.js'

export default {
  name: 'ListParse',
  components: { RdList },
  data () {
    return {
      listParseDriver: new ListParseDriver(),
      type: 'cus-item-parse'
    }
  },
  mounted () {
    this.listParseDriver.onInit(this.$refs.rdList)
  },
  methods: {
    add () {
      this.listParseDriver.tryAdd()
    }
  }
}
</script>

<style scoped>
.self-row {
  margin-top: 20px !important;
}
</style>
