<template>
  <div style="margin: 20px 0px;padding-bottom: 30px;">
    <div class="cus-topic-exam">
      <div v-if="setTitle" class="ui left aligned segment" style="padding: 20px 10px;">
        <div><span class="ui header">{{ source.title }}</span><span class="ui green header" style="margin-left: 70%;" >得分:0</span></div>
      </div>
      <div class="ui small header" style="font-size: 15px; font-weight: lighter">
        <span>{{ source.index }}、</span><span v-html="source.questionStem" /><span>({{ source.questionScore }}分)</span>
      </div>
      <!--    单选题-->
      <div v-if="source.questionType ===1">
        <el-radio-group v-model="source.questionContent.answer[0]" disabled>
          <div v-for="(item, index) in source.questionContent.selection" :key="index" style="margin: 5px 0px">
            <el-radio :label="item.select" disable>
              ({{ item.select }}) {{ item.describe }}
            </el-radio>
          </div>
        </el-radio-group>
      </div>

      <!--    多选题-->
      <div v-if="source.questionType ===2">
        <el-checkbox-group v-model="source.questionContent.answer" disabled>
          <div v-for="(item, index) in source.questionContent.selection" :key="index">
            <el-checkbox :label="item.select">
              ({{ item.select }}) {{ item.describe }}
            </el-checkbox>
          </div>
        </el-checkbox-group>
      </div>

      <!--    判断题-->
      <div v-if="source.questionType ===3">
        <el-radio-group v-model="source.questionContent.answer[0]" disabled>
          <div v-for="(item, index) in source.questionContent.selection" :key="index" style="margin: 5px 0px">
            <el-radio :label="item.select">
              {{ item.describe }}
            </el-radio>
          </div>
        </el-radio-group>
      </div>

      <!--    填空题-->
      <div v-if="source.questionType ===4">
        <el-radio-group>
          <div v-for="(item, index) in source.questionContent.selection" :key="index" style="margin: 5px 0px">
            <el-input
              v-model="source.questionContent.answer[index].describe"
              type="textarea"
              :rows="2"
              :placeholder="item.select"
              disabled
              @change="changeHandler(source, fill)"
            />
          </div>
        </el-radio-group>
      </div>

      <!--    实操题-->
      <div v-if="source.questionType ===5">
        <el-row>
          <el-col :span="20">
            <label>实操结果：</label>
            <el-radio-group v-model="source.questionContent.answer[0]" disabled>
              <el-radio v-for="(item, index) in source.questionContent.selection" :key="index" :label="item.select">
                {{ item.describe }}
              </el-radio>
            </el-radio-group>
          </el-col>
          <el-col :span="4">
            <el-button class="ui right floated primary button" @click="goto(source.filePath)">进入实操</el-button>
          </el-col>
        </el-row>
      </div>
      <div style="margin-top: 10px;">
        <div v-if="result " class="ui green label"><span>答案：{{ source| answer }}</span></div>
        <div v-else class="ui red label"><span>答案：{{ source | answer }}</span></div>
      </div>

      <div class="ui yellow message"><span>解析： </span>{{ source.analysis | analysis}}</div>

    </div>
  </div>

</template>
<style scoped>
.cus-topic-exam {
  text-align: start;
}

@import "../../Semantic-UI-CSS-master/semantic.min.css"
</style>
<script>
export default {
  name: 'CusItemParse',
  filters: {
    answer(val) {
      if (val && val.questionContent && val.questionContent.answer) {
        console.log('@@=>answer', val)
        const res = val.questionContent.answer.map(item => {
          let single = (item.describe ? item.describe : item)
          // 判断以及实操题
          if ([3, 5].indexOf(val.questionType) >= 0) {
            single = (item === '1' ? '对' : '错')
          }
          return single
        })
        return res.join('、')
      }
      return val.questionContent.answer
    },
    analysis(val) {
      return val || '无'
    }
  },
  props: {
    index: { // index of current item
      type: Number
    },
    source: { // here is: {uid: 'unique_1', text: 'abc'}
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      // 单选
      single: '',
      // 多选
      multiple: [],
      // 判断
      judgment: '',
      // 填空
      fill: {},
      // 实操
      option: ''
    }
  },
  computed: {
    result() {
      const source = this.$props.source
      const answer = (source && source.questionContent && source.questionContent.answer ? source.questionContent.answer.sort().toString() : null)
      const studentA = (source && source.studentAnswer ? source.studentAnswer.sort().toString() : null)
      console.log('a', answer, studentA)
      return studentA ? Object.is(answer, studentA) : false
    },
    setTitle() {
      const source = this.$props.source
      const inList = ['1.1', '2.1', '3.1', '4.1', '5.1', '6.1', '7.1', '8.1', '9.1']
      return inList.indexOf(source.index) >= 0
    }
  },
  methods: {
    goto(data) {
      console.log('@@=>data', data)
    }
  }
}
</script>
