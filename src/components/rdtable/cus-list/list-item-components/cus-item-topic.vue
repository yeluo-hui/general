<template>
  <div class="cus-item_content">
    <div class="ui left aligned segment"style="padding: 20px 10px;">
      <div ><span class="ui header">{{ source.title }}</span></div>
    </div>
    <div class="cus-topic-exam">
      <div class="ui small header" style="font-size: 15px; font-weight: lighter">
        <span>{{ source.index }}、</span><span v-html="source.questionStem"> </span><span>({{ source.questionScore }}分)</span>
      </div>
      <!--    单选题-->
      <div v-if="source.questionType ===1">
        <el-radio-group v-model="single" @change="(value) => getAnswer(source, value)">
          <div style="margin: 5px 0px"  v-for="(item, index) in source.questionContent.selection" :key="index">
            <el-radio :label="item.select">
              ({{ item.select }}) {{ item.describe }}
            </el-radio>
          </div>
        </el-radio-group>
      </div>

      <!--    多选题-->
      <div v-if="source.questionType ===2">
        <el-checkbox-group v-model="multiple" @change="(value) => getAnswer(source, value)">
          <div v-for="(item, index) in source.questionContent.selection" :key="index">
            <el-checkbox :label="item.select">
              ({{ item.select }}) {{ item.describe }}
            </el-checkbox>
          </div>
        </el-checkbox-group>
      </div>

      <!--    判断题-->
      <div v-if="source.questionType ===3">
        <el-radio-group v-model="judgment" @change="(value) => getAnswer(source, value)">
          <div style="margin: 5px 0px"  v-for="(item, index) in source.questionContent.selection" :key="index">
            <el-radio :label="item.select">
             {{ item.describe }}
            </el-radio>
          </div>
        </el-radio-group>
      </div>

      <!--    填空题-->
      <div v-if="source.questionType ===4">
        <el-radio-group >
          <div style="margin: 5px 0px"  v-for="(item, index) in source.questionContent.selection" :key="index">
            <el-input
                type="textarea"
                :rows="2"
                :placeholder="item.select"
                v-model="fill[item.select]"
                @change="getAnswer(source, fill)">
            </el-input>
          </div>
        </el-radio-group>
      </div>

      <!--    实操题-->
      <div v-if="source.questionType === 5">
        <el-row>
          <el-col :span="17">
            <label >实操题 :</label>&nbsp;
            <span v-show="source.questionContent.tips" >
                <i @click="onTips" class="question yellow middle circle icon"></i>
               <label v-show=" tipsVis">{{source.questionContent.tips}}</label>
            </span>
          </el-col>
          <el-col :span="6">
            <el-button @click="enter(source)"  class="ui right floated primary button">进入实操</el-button>
          </el-col>
        </el-row>
        <el-radio-group v-model="option" @change="(value) => getAnswer(source, value)">
          <div style="margin: 5px 0px"  v-for="(item, index) in source.questionContent.selection" :key="index">
            <el-radio :label="item.select">
              ({{ item.select }}) {{ item.describe }}
            </el-radio>
          </div>
        </el-radio-group>
      </div>

    </div>

    <div class="ui divider"></div>
  </div>

</template>
<style scoped>
.cus-topic-exam {
  text-align: start;
}
.cus-item_content {
  text-align: start;
}
.cus-item_title {
  padding: 10px;
  margin: 10px 0px;
  background-color: rgba(245, 247, 250, 1);
  box-sizing: border-box;
  border: 1px solid  rgba(235, 238, 245, 1);
}
@import "../../Semantic-UI-CSS-master/semantic.min.css"
</style>
<script>
export default {
  name: 'CusItemTopic',
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
  inject: ['getAnswer', 'enter'],
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
      option: '',
      // 获取答案
      getAnswer: this.getAnswer,
      // 进入实操
      enter: this.enter,
      tipsVis: false
    }
  },
  methods: {
    onTips() {
      this.tipsVis = !this.tipsVis
    }
  }
}
</script>
