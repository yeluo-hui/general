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
import ListScoreDriver from './listScoreDriver.js'

export default {
  name: 'ListScore',
  components: { RdList },
  data () {
    return {
      listScoreDriver: new ListScoreDriver(),
      type: 'cus-item-score',
    }
  },
  mounted () {
    this.listScoreDriver.onInit(this.$refs.rdList)
  },
  methods: {
    add () {
      this.listScoreDriver.tryAdd()
    }
  }
}
</script>

<style scoped>
.self-row {
  margin-top: 20px !important;
}
</style>
