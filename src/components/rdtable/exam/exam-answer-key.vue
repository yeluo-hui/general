<template>
  <div class="ui raised segment" style="text-align: initial;background-color: rgba(41, 57, 126, 1);height: 100%;padding:15px 0px 0 17px">
    <div style="text-align: center">
      <label class="ui header column" style="color: #ffffff">答题卡</label>
    </div>
    <div class="ui inverted divider line" />
    <div v-for="(answer, index) in answerKeyData" :key="index">
      <div style="margin: 20px 0px;">
        <h4 class="ui header column" style="color: #ffffff">{{ answer.title }}</h4>
      </div>
      <div>
        <component :is="cusComponent" ref="detail" :questions="answer.questions" :currentId="currentId" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '../Semantic-UI-CSS-master/semantic.min.css';
</style>

<script>

export default {
  name: 'ExamAnswerKey',
  props: {
    // 选择自动注入item样式
    type: {
      type: String,
      required: true
    },
    currentId: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      answerKeyData: null,
      // 引入样式组件
      cusComponent: null,
      options: {},
      listQuery: {
        total: 0,
        page_index: 0,
        page_size: 10
      }
    }
  },
  mounted() {
    this.gridComponent()
  },
  methods: {

    gridComponent1() {
      const self = this
      const cusComponent = () => import(`@/components/rdtable/exam/answer-key-components/${self.type}`)
      return self.cusComponent = cusComponent
    },
    // 动态设置组件
    // https://blog.csdn.net/yorcentroll/article/details/122679683
    gridComponent() {
      const self = this
      self.cusComponent = r => require.ensure([], () => r(require(`@/components/rdtable/exam/answer-key-components/${self.type}`)))
    },

    buildFields(data) {
      this.answerKeyData = data
    },

    buildFieldsCopy(data) {
      console.log('@==>exam-answer-key.vue:', data)
      this.answerKeyData = data.map((item, index) => {
        if (item && item.questions) {
          item.questions.map((it, ind) => {
            it.index = (index + 1) + '.' + (ind + 1)
            return it
          })
        }
        return item
      })
    }
  }
}
</script>

<style scoped>

</style>
