import {questionTree} from '@/api/exam'

export default class ExamParseTree {
    constructor(vm) {
      this.vm = vm
      // 题库数据
      this.questionMap = new Map()
      // 答题卡存储器
      this.memoryArr = []
      // 存储答题卡信息
      this.memoryMap = new Map()
    }

    // eslint-disable-next-line no-unused-vars
    init(examId, paperId) {
        this.memory(examId).then(res => {
            // this.selectQuestion(paperId, res)
        })
    }

    /**
     * 存储答题卡
     * @param memory
     */

    memory(examId) {
        const self = this
        return new Promise(function (resolve, reject) {
            questionTree({'studentExamId': examId}).then(res => {
                if (res && res.code === 200) {
                    const tree = res.data.map((item, index) => {
                        if (item && item.questions) {
                            item.questions.map((it, ind) => {
                                self.memoryArr.push(it.questionId)
                                it.index = (index + 1) + '.' + (ind + 1)
                                self.memoryMap.set(it.questionId, {index: it.index, title: item.title})
                                return it
                            })
                        }
                        return item
                    })
                    self.vm.examTreeDriverOne.onJsonForm(tree)
                    resolve(tree)
                    // console.log('@@==>memoryArr', self.memoryArr, self.memoryArr.length)
                } else {
                    reject()
                }
            })
        })
    }

    // 缓存题库
    // eslint-disable-next-line no-unused-vars
    selectQuestion(id, tree) {
        const self = this
        // eslint-disable-next-line no-undef
        answerList({'paperId': id}).then(res => {
            if (res && res.code === 200) {
                // 第一题
                if (res.data.length) {
                    const arr = res.data.map(item => {
                        const obj = self.memoryMap.get(item.id)
                        return {...item, ...obj}
                    })
                    // 排序
                    arr.sort(super.sortBy('index'))
                    // 发送数据到页面
                    self.vm.listParseDriver.onJsonForm(arr)
                    // 关闭加载进度
                    self.vm.parseLoading = false
                }
            }
        })
    }
}
