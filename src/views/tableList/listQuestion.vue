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
import ListQuestionDriver from './listQuestionDriver.js'

export default {
  name: 'ListTopic',
  components: { RdList },
  data () {
    return {
      listQuestionDriver: new ListQuestionDriver(),
      type: 'cus-item-question'
    }
  },
  provide() {
    return {
      info : this.info,
      del: this.del,
      enter: this.enter
    }
  },
  mounted () {
    this.listQuestionDriver.onInit(this.$refs.rdList)
  },
  methods: {
    add () {
      this.listQuestionDriver.tryAdd()
    },
    enter(data){
      alert(data.id)
    },
    info(data){
      alert(data.id)
    },
    del(data){
      alert(data.id)
    }
  }
}
</script>

<style scoped>
.self-row {
  margin-top: 20px !important;

}
</style>
