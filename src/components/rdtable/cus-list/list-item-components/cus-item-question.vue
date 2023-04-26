<template>
  <div class="cus-item_content">
    <div class="ui left aligned segment" style="background-color: rgba(235, 238, 245, 1)">
      <el-row>
        <el-col :span="6">试题编号：<span>{{ source.number }}</span></el-col>
        <el-col :span="6" style="text-align: center;">题型：<span>{{ source.questionType | setQtypeName }}</span></el-col>
        <el-col :span="6" style="text-align: center;">难度：<span v-html="rate(source.difficulty)"></span></el-col>
        <el-col :span="6" style="text-align: right;">更新日期：<span>{{ source.createTime }}</span></el-col>
      </el-row>
    </div>

    <div class="ui grid" style="margin-left: 30px;">
      <div class="row" style="line-height: normal;">
        <div class="fourteen wide column ">
          <div class="ui small header" style="font-size: 15px; font-weight: lighter">
            <span v-html="source.questionStem"> </span><span>()</span>
          </div>

          <!--    单选题-->
          <div v-if="source.questionType ===1">
            <div style="margin: 5px 0px" v-for="(item, index) in source.questionContent.selection" :key="index">
              <div>
                ({{ item.select }}) {{ item.describe }}
              </div>
            </div>
          </div>

          <!--    多选题-->
          <div v-if="source.questionType ===2">
            <div v-for="(item, index) in source.questionContent.selection" :key="index">
              <div :label="item.select">
                ({{ item.select }}) {{ item.describe }}
              </div>
            </div>
          </div>

          <!--    判断题-->
          <div v-if="source.questionType ===3">
            <div style="margin: 5px 0px" v-for="(item, index) in source.questionContent.selection" :key="index">
            </div>
          </div>

          <!--    填空题-->
          <div v-if="source.questionType ===4">
            <div style="margin: 5px 0px" v-for="(item, index) in source.questionContent.selection" :key="index">
            </div>
          </div>

          <!--    实操题-->
          <div v-if="source.questionType === 5">
<!--            <el-button @click="enter(source)" class="ui left floated primary button">进入实操</el-button>-->
          </div>

          <!--    视频题-->
          <div v-if="source.questionType === 6">
            <div>
              <el-button @click="enter(source)" class="ui left floated primary button">进入视频</el-button>
            </div>
          </div>

          <div style="margin-top: 10px;" v-if="source.questionType !== 6">
            <div class="ui header green"><span>答案：{{ source| answer }}</span></div>
          </div>
        </div>
        <div class="two wide column center aligned " style="position: relative;" >
          <button class="ui blue basic button" style="position: absolute; top: 45%;display: block;" @click="info(source)">编 辑</button>
          <button class="ui red basic button" style="position: absolute; top: 45%;" @click="del(source)">删 除</button>
        </div>
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
  border: 1px solid rgba(235, 238, 245, 1);
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
  inject: ['enter', 'del', 'info'],
  data() {
    return {
      // 进入实操
      info: this.info,
      del: this.del,
      enter: this.enter
    }
  },
  filters: {
    setQtypeName(val) {
      return val === 1 ? '单选题' : val === 2 ? '多选题' : val === 3 ? '判断题' : val === 4 ? '填空题' : val === 5 ? '实操题' : val === 6 ? '视频题' : '其他'
    },
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
  },
  methods: {
    rate (val) {
      if (typeof (val) !== 'number') return
      let string = `<div class="ui star rating">`
      let i = 1
      while (i <= val) {
        string += '<i class="icon active"></i>'
        i++
      }
      string += `</div>`
      return string
    }
  }
}
</script>
