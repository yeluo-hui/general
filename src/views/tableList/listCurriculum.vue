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
import ListCurriculumDriver from './listCurriculumDriver.js'

export default {
  name: 'ListCurriculum',
  components: { RdList },
  data () {
    return {
      listCurriculumDriver: new ListCurriculumDriver(),
      type: 'cus-item-curriculum',
    }
  },
  provide() {
    return {
      info : this.info,
      del: this.del,
      release: this.release,
      enter: this.enter
    }
  },
  mounted () {
    this.listCurriculumDriver.onInit(this.$refs.rdList)
  },
  methods: {
    add (id) {
      this.listCurriculumDriver.tryAdd()
    },
    info(id) {
      alert(id)
    },
    del(id){
      alert(id)
    },
    release(id){
      alert(id)
    },
    enter(id) {
      alert(id)
    }
  }
}
</script>

<style scoped>
.self-row {
  margin-top: 20px !important;
}
</style>
