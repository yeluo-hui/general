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
import ListTopicDriver from './listTopicDriver.js'

export default {
  name: 'ListTopic',
  components: { RdList },
  data () {
    return {
      listTopicDriver: new ListTopicDriver(),
      type: 'cus-item-topic'
    }
  },
  provide(){
    return {
      getAnswer: this.getAnswer,
      enter: this.enter
    }
  },
  mounted () {
    this.listTopicDriver.onInit(this.$refs.rdList)
  },
  methods: {
    add () {
      this.listTopicDriver.tryAdd()
    },
    getAnswer(source, type){
      console.log('@getAnswer=>', source, type)
    },
    enter(source){
      console.log('@enter=>', source)
    }
  }
}
</script>

<style scoped>
.self-row {
  margin-top: 20px !important;
}
</style>
