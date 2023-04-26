<template>
  <div class="table-app">
    <el-row class="ui container self-row">
      <el-col :span="2">
        <el-button class="ui basic button" id="settingsBtn" @click="addTopic">
          <i class="add icon"></i>
          添加
        </el-button>
      </el-col>
      <el-col :span="2">
        <el-button class="ui basic button" id="settingsBtn" @click="delTopic">
          <i class="add icon"></i>
          删除
        </el-button>
      </el-col>
    </el-row>
    <rd-list :type="type" ref="rdList"/>
  </div>
</template>

<script>

import RdList from "@/components/rdtable/rd-list";
import ListUpdateDriver from './listUpdateDriver.js'

export default {
  name: 'ListParse',
  components: {RdList},
  data() {
    return {
      listUpdateDriver: new ListUpdateDriver(),
      type: 'cus-item-update',
    }
  },
  mounted() {
    this.listUpdateDriver.onInit(this.$refs.rdList)
  },
  provide() {
    return {
      enter: this.enter,
      del: this.del,
      open: this.open
    }
  },
  methods: {
    addTopic() {
      let single = {
        "id": "dsaftsxcv1", // 查询考试试题id
          "title": "一、单选题（共1题 共计3.00分）",
          "index": "1.3",
          "questionType": 1,  // 1:单选 2 多选 3 判断...,
          "questionScore": 2.5,
          "questionStem": "25Hz相敏轨道继电器的局部线圈超前轨道线圈",
          "questionContent": {
        "selection": [{
          "select": "A", "describe": "120度"
        }, {
          "select": "B", "describe": "180度"
        }, {
          "select": "C", "describe": "270度"
        }, {
          "select": "D", "describe": "90度"
        }], "answer": ["A"]
      },
        "questionSeq": 1,
          "studentAnswer": ["A"],
          "analysis": "区分度反映试题区分不同水平受试者的程度，即考出学生的不同水平，把优秀、一般、差三个层次的学生真正分别开。区分度高的考试，优秀、一般、差三个层次的学生都有一定比例，如果某一分数区间学生相对集中，高分太多或不及格太多的考试，区分度则低。"
      }
      this.$refs.rdList.addStrip(single)
    },
    delTopic(){
      this.$refs.rdList.delStrip(this.currentId)
    },
    enter(data) {
      alert(data.id)
    },
    del(data) {
      this.currentId = data.id
      alert(data.id)
    },
    open(data) {
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
