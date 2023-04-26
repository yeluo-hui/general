<template>
  <div class="table-app">
    <el-row class="ui container self-row">
      <el-col :span="2">
        <el-button class="ui basic button" id="settingsBtn" @click="select">
          <i class="add icon"></i>
          全选
        </el-button>
      </el-col>
      <el-col :span="2">
        <el-button class="ui basic button" id="settingsBtn" @click="reverse">
          <i class="add icon"></i>
          反选
        </el-button>
      </el-col>
      <el-col :span="2">
        <el-button class="ui basic button" id="settingsBtn" @click="view">
          <i class="add icon"></i>
          确定
        </el-button>
      </el-col>
    </el-row>
    <rd-list :type="type" ref="rdList" :checked="checked" :list-height="listHeight" :layout-page="['prev', 'pager', 'next']"/>
  </div>
</template>

<script>

import RdList from "@/components/rdtable/rd-list";
import ListSelectDriver from './listSelectDriver.js'

export default {
  name: 'ListSelect',
  components: {RdList},
  data() {
    return {
      listSelectDriver: new ListSelectDriver(),
      type: 'cus-item-select',
      checked: true,
      listHeight: ''
    }
  },
  provide() {
    return {
      onChecked: this.onChecked,
      enter: this.enter,
    }
  },
  mounted() {
    this.listSelectDriver.onInit(this.$refs.rdList)
    // 计算搜索框的高度
    var searchBarHeight = (this.$refs.rdList.$el.clientHeight + 170 ) + 'px'
    this.listHeight = `calc(100vh - ${searchBarHeight})`
  },
  methods: {
    // 全选
    select() {
      this.$refs.rdList.onAllChoice()
    },
    // 反选
    reverse() {
      this.$refs.rdList.onReverse()
    },
    enter(data) {
      alert(data.id)
    },
    onChecked(data) {
      this.currentId = data.id
    },
    view() {
      const list = this.$refs.rdList.onChoiced()
      console.log(list)
    }
  }
}
</script>

<style scoped>
.self-row {
  margin-top: 20px !important;
}
</style>
