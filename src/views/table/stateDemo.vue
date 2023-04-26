<template>
  <div class="table-app" style="text-align: start;">
    <div class="ui left icon input">
      <input type="text" v-model="courseName" placeholder="课程名称……">
      <button class="ui button" @click="search">搜索</button>
      <i class="users icon"></i>
    </div>
    <div class="ui left icon input">
      <button class="ui button" @click="get">GET</button>
    </div>
    <div class="ui left icon input">
      <button class="ui button" @click="set">SET</button>
    </div>
    <rd-table ref="rdLearnTable" :type="['check']" :onDefinedColum="onDefinedColum" :numVis="true" :defined-colum="['studyNum']"/>
    {{ keys }}
  </div>
</template>

<script>
import RdTable from '@/components/rdtable/rd-table'
import LearnDriver from './learnDriver.js'
import ExamDriver from './examDriver.js'
import PracticeDriver from './practiceDriver.js'
import {convertSecToHHmm} from "@/utils/time-moment";

export default {
  name: 'userDemo',
  components: {RdTable},
  data() {
    return {
      learnDriver: new LearnDriver(),
      practiceDriver: new PracticeDriver(),
      examDriver: new ExamDriver(),
      courseName: '',
      activeName: 'learn',
      keys: []
    }
  },
  mounted() {
    this.learnDriver.onInit(this.$refs.rdLearnTable)
    this.set()
  },
  methods: {

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
      this.learnDriver.doList()
    },
    get(){
      this.keys = this.learnDriver.getSelectedRowKeys()
    },
    set(){
      const keys = ['dsaftsxcvxchrdsrxvxcd1']
      this.learnDriver.setDefaultSelectedRowKeys(keys)
    },
    onDefinedColum(val, type) {
      console.log('特殊对象处理', val, type)
      // return type === 'totalHour' ? convertSecToHHmm(val) : type === 'accuracy' ? val + '%' : val
      let state = (val === 1 ? '未发布' : val === 2 ? '已发布' : '已下线')
      let stateType = (val === 1 ? 'danger' : val === 2 ? 'success' : 'info')
      return <el-tag type="danger"
                     style="position: relative; top: 50%; transform: translateY(-50%); width: 90px; border-radius: 30px;">{state}</el-tag>
    }
  }
}
</script>

<style scoped>
.self-row {
  margin-top: 20px !important;
}
</style>
