<template>
  <div class="table-app">
    <div style="text-align: right;margin-right: 20px;">
      <div class="ui vertical animated button" tabindex="0">
        <div class="hidden content" @click="changeKey">提交</div>
        <div class="visible content">
          <i class="share square icon"></i>
        </div>
      </div>
    </div>
    <div style="width: 305px; height: 750px;float: left;">
      <exam-answer-key ref="examTree" :type="type" :current-id="currentId"/>
    </div>
    <div style="width: 305px; height: 750px;float: left;margin-left: 20px;" >
      <exam-answer-key ref="examTreeOne" :type="typeOne"/>
    </div>
  </div>
</template>

<script>
import ExamTreeDriver from './ExamTreeDriver.js'
// 引入发送class
import  ExamTree  from './tools/examTree'

import ExamTreeDriver1 from './ExamTreeDriver1.js'
import ExamParseTree from './tools/examParseTree.js'

import ExamAnswerKey from "@/components/rdtable/exam/exam-answer-key";

export default {
  name: 'userDemo',
  components: { ExamAnswerKey },
  data () {
    return {
      // 引入drive
      examTreeDriver: new ExamTreeDriver(),
      examTree: null,

      examTreeDriverOne: new ExamTreeDriver1(),
      examParseTree: null,
      // 选择样式
      type: 'cus-base-anwser',
      typeOne: 'cus-parse-anwser',
      /*****/
      finished: false,
      paperId: '',
      // 当前选中树nodeId
      currentId: ''
    }
  },
  provide() {
    return {
      onSpend: this.onSpend
    }
  },
  mounted () {
    this.examTreeDriver.onInit(this.$refs.examTree)
    // 派送题目
    this.examTree = new ExamTree(this)

    this.examTreeDriverOne.onInit(this.$refs.examTreeOne)
    // 派送题目
    this.examParseTree = new ExamParseTree(this)

    this.init()
  },
  methods: {
    init() {
      this.examTree.init(this.examId, this.paperId)
      this.examParseTree.init(this.examId, this.paperId)
    },
    onSpend(data) {
      console.log('@@=>answer', data)
      this.currentId = data.questionId
    },
    changeKey(){
      this.finished = !this.finished
      this.examTreeDriver.changeKey({questionId: '18', finished: this.finished})
    },
  }
}
</script>

<style scoped>
.self-row {
  margin-top: 20px !important;
}
</style>
