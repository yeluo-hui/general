<template>
  <div class="table-app" style="text-align: start;">
    <div class="ui left icon input">
      <input type="text" v-model="courseName" placeholder="课程名称……">
      <button class="ui button" @click="search">搜索</button>
      <i class="users icon"></i>
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="学习统计" name="learn">
        <rd-table ref="rdLearnTable" :numVis="true" :defined-colum="['rd_action']" :onDefinedColum="onDefinedColum"/>
      </el-tab-pane>
      <el-tab-pane label="练习统计" name="practice">
        <rd-table ref="rdPracticeTable" :numVis="true"/>
      </el-tab-pane>
      <el-tab-pane label="考试统计" name="exam">
        <rd-table ref="rdExamTable" :numVis="true"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import RdTable from '@/components/rdtable/rd-table'
import LearnDriver from './learnDriver.js'
import ExamDriver from './examDriver.js'
import PracticeDriver from './practiceDriver.js'

export default {
  name: 'userDemo',
  components: {RdTable},
  data() {
    return {
      learnDriver: new LearnDriver(),
      practiceDriver: new PracticeDriver(),
      examDriver: new ExamDriver(),
      courseName: '',
      activeName: 'learn'
    }
  },
  mounted() {
    this.learnDriver.onInit(this.$refs.rdLearnTable)
    this.practiceDriver.onInit(this.$refs.rdPracticeTable)
    this.examDriver.onInit(this.$refs.rdExamTable)
  },
  methods: {
    onDefinedColum(val, type, action) {
      return (<el-button type='text' >111</el-button>)
    },
    deleteRow(data) {
      alert(data)
    },
    search() {
      this.learnDriver.listQuery = {
        page_index: 1,
        page_size: 4,
        filters: [{"fn": "couresName", "fv": this.courseName, "op": "like"}, {
          "fn": "userId",
          "fv": "xzadasdafzxczfasdasd",
          "op": "="
        }],
        sorters: []
      }
      this.tableDriver.doList()
    }
  }
}
</script>

<style scoped>
.self-row {
  margin-top: 20px !important;
}
</style>
