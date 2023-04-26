import { questionTree } from '@/api/exam'
import {toAsync} from "@/components/rdtable/tools/util";

export default class ExamTree {

  constructor(vm) {
    this.vm = vm
    // 题库数据
    this.questionMap = new Map()
    // 答题卡存储器
    this.memoryArr = []
    // 存储答题卡信息
    this.memoryMap = new Map()

    // 第一题
    this.step = 1
    // 答题卡总共题
    this.max = 1
  }

  init(examId, paperId) {
    this.memory(examId).then(res => {
      // this.selectQuestion(paperId, res)
    })
  }

  /**
   * 封装了向后台获取数据列表的操作
   * @param {*} request
   * @returns
   */
  onRequest (request) {
    return toAsync(this, function (that, resolve, reject) {
      request.then((rsp) => {

        console.log('@onAskList rsp=>', rsp.code, rsp)
        if (res && res.code === 200) {
          const tree = res.data.map((item, index) => {
            if (item && item.questions) {
              item.questions.map((it, ind) => {
                self.memoryArr.push(it.questionId)
                it.index = (index + 1) + '.' + (ind + 1)
                self.memoryMap.set(it.questionId, it.index)
                return it
              })
            }
            return item
          })
          self.vm.examTreeDriver.onJsonForm(tree)
          resolve(tree)
          // console.log('@@==>memoryArr', self.memoryArr, self.memoryArr.length)
        } else {
          reject()
          console.log('@@==>memoryArr', self.memoryArr, self.memoryArr.length)
        }
      })
    })
  }


  // 缓存题库
  selectQuestion(id, tree) {
    answerList({ 'paperId': id }).then(res => {
      if (res && res.code === 200) {
        // 第一题
        this.step = 1
        this.max = res.data.length
        if (res.data.length) {
          res.data.map(item => {
            this.questionMap.set(item.id, item)
          })
        }
        console.log('@@==>questionMap', this.questionMap, this.questionMap.size)
      }
    })
  }
  /**
   * 存储答题卡
   * @param memory
   */
  memory(id) {
    const self = this
    return new Promise(function(resolve, reject) {
      questionTree({'studentExamId': id}).then(res => {
        if (res && res.code === 200) {
          const tree = res.data.map((item, index) => {
            if (item && item.questions) {
              item.questions.map((it, ind) => {
                self.memoryArr.push(it.questionId)
                it.index = (index + 1) + '.' + (ind + 1)
                self.memoryMap.set(it.questionId, it.index)
                return it
              })
            }
            return item
          })
          self.vm.examTreeDriver.onJsonForm(tree)
          resolve(tree)
          // console.log('@@==>memoryArr', self.memoryArr, self.memoryArr.length)
        } else {
          reject()
          console.log('@@==>memoryArr', self.memoryArr, self.memoryArr.length)
        }
      })
    })
  }

  // 发送题
  onSend(data) {
    // 设置步骤
    const id = data ? (data.questionId ? data.questionId : data) : this.memoryArr[this.vm.step - 1]
    this.vm.step = this.memoryArr.indexOf(id) + 1
    console.log(this.vm.step)
    // 设置当前查看树id
    this.vm.currentId = id
    const index = this.memoryMap.get(id)
    const obj = this.questionMap.get(id)
    obj.index = index
    this.vm.listTopicDriver.onJsonForm([obj])
  }

  // 答题卡变色
  setKeyColors(questionId) {
    this.vm.examTreeDriver.changeKey({
      questionId: questionId,
      finished: true
    })
  }

  // 提交数据
  submit(data, id) {
    const self = this
    submit(data).then(res => {
      if (res && res.code === 200) {
        self.setKeyColors(id)
      }
    })
  }

  // 上一题
  prev() {
    this.vm.step = this.vm.step > 0 ? this.vm.step - 1 : 0
    this.onSend()
  }

  // 下一题
  next() {
    const id = this.memoryArr[this.vm.step - 1]
    // 设置步骤
    this.vm.step = this.vm.step < this.memoryArr.length ? this.vm.step + 1 : this.memoryArr.length - 1
    // 更新题库
    this.onSend()
    // 提交数据
    const data = this.vm.judgement.get_stuAnswer(id)
    console.log('查询提交数据', data)
    if (data) this.submit(data, id)
  }


  // 最终提交
  confirmSubmit() {
    const id = this.memoryArr[this.vm.step - 1]
    // 提交数据
    const data = this.vm.judgement.get_stuAnswer(id)
    console.log('查询提交数据', data)
    if (data) this.submit(data, id)
  }
}
