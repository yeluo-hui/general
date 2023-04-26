<template>
  <div class="cus-item_content">
    <div v-if="setTitle" class="ui left aligned segment" style="padding: 20px 10px;background-color: rgba(235, 238, 245, 1);">
      <span class="ui header ">{{ source.title }}</span>
      <button class="ui icon button cus-item_add" @click="open(source)">
        <i class=" big blue plus square outline icon"></i>
      </button>
    </div>
    <div class="ui grid">
      <div class="row" style="line-height: normal;margin-left: 30px;">
        <div class="fourteen wide column ">
          <div class="ui small header" style="font-size: 15px; font-weight: lighter">
            <span>{{ source.index }}、</span><span v-html="source.questionStem"/><span>({{
              source.questionScore
            }}分)</span>
          </div>
          <!--    单选题-->
          <div v-if="source.questionType ===1">
            <el-radio-group v-model="single">
              <div style="margin: 5px 0px" v-for="(item, index) in source.questionContent.selection" :key="index">
                <el-radio :label="item.select">
                  ({{ item.select }}) {{ item.describe }}
                </el-radio>
              </div>
            </el-radio-group>
          </div>

          <!--    多选题-->
          <div v-if="source.questionType ===2">
            <el-checkbox-group v-model="multiple">
              <div v-for="(item, index) in source.questionContent.selection" :key="index">
                <el-checkbox :label="item.select">
                  ({{ item.select }}) {{ item.describe }}
                </el-checkbox>
              </div>
            </el-checkbox-group>
          </div>

          <!--    判断题-->
          <div v-if="source.questionType ===3">
            <el-radio-group v-model="judgment">
              <div style="margin: 5px 0px" v-for="(item, index) in source.questionContent.selection" :key="index">
                <el-radio :label="item.select">
                  {{ item.describe }}
                </el-radio>
              </div>
            </el-radio-group>
          </div>

          <!--    填空题-->
          <div v-if="source.questionType ===4">
            <el-radio-group>
              <div style="margin: 5px 0px" v-for="(item, index) in source.questionContent.selection" :key="index">
                <el-input
                    type="textarea"
                    :rows="2"
                    :placeholder="item.select"
                    v-model="fill[item.select]"
                >
                </el-input>
              </div>
            </el-radio-group>
          </div>

          <!--    实操题-->
          <div v-if="source.questionType === 5">
            <el-row>
              <el-col :span="6">
                <label>实操题 :</label>&nbsp;
                <span v-show="source.questionContent.tips">
                <i @click="onTips" class="question yellow middle circle icon"></i>
               <label v-show=" tipsVis">{{ source.questionContent.tips }}</label>
            </span>
              </el-col>
              <el-col :span="6">
                <el-button @click="enter(source)" class="ui right floated primary button">进入实操</el-button>
              </el-col>
            </el-row>
            <el-radio-group v-model="option">
              <span style="margin: 5px 0px" v-for="(item, index) in source.questionContent.selection" :key="index">
                <el-radio :label="item.select">
                  ({{ item.select }}) {{ item.describe }}
                </el-radio>
              </span>
            </el-radio-group>
          </div>

          <!--    视频题-->
          <div v-if="source.questionType === 6">
            <el-row>
              <el-col :span="6">
                <label>视频题 :</label>&nbsp;
                <span v-show="source.questionContent.tips">
                <i @click="onTips" class="question yellow middle circle icon"></i>
               <label v-show=" tipsVis">{{ source.questionContent.tips }}</label>
            </span>
              </el-col>
              <el-col :span="6">
                <el-button @click="enter(source)" class="ui right floated primary button">进入视频</el-button>
              </el-col>
            </el-row>
          </div>

          <!--    文本题-->
          <div v-if="source.questionType === 7">
            <el-row>
              <el-col :span="6">
                <label>文本题 :</label>&nbsp;
                <span v-show="source.questionContent.tips">
                <i @click="onTips" class="question yellow middle circle icon"></i>
               <label v-show=" tipsVis">{{ source.questionContent.tips }}</label>
            </span>
              </el-col>
              <el-col :span="6">
                <el-button @click="enter(source)" class="ui right floated primary button">进入文本</el-button>
              </el-col>
            </el-row>
          </div>

        </div>
        <div class="two wide column center floated" style="position: relative;text-align: center;">
          <img style="position: absolute; top: 45%;padding: 0px;" :src="baseUrl" @mouseover="mouseOver($event)"
               @mouseleave="mouseLeave($event)" @click="del(source)">
        </div>

      </div>
    </div>

    <div class="ui divider"></div>
  </div>
</template>
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
      // 进入实操
      enter: this.enter,
      del: this.del,
      tipsVis: false,
      baseUrl: require('@/assets/img/prey.png'),
      redUrl: require('@/assets/img/red.png'),
      selectId: ''
    }
  },
  inject: ['enter', 'del', 'open'],
  computed: {
    setTitle() {
      const source = this.$props.source
      const inList = ['1.1', '2.1', '3.1', '4.1', '5.1', '6.1', '7.1', '8.1', '9.1']
      return inList.indexOf(source.index) >= 0
    }
  },
  methods: {
    onTips() {
      this.tipsVis = !this.tipsVis
    },
    // 选中id
    mouseOver($event) {
      $event.currentTarget.src = this.redUrl;
    },
    mouseLeave($event) {
      $event.currentTarget.src = this.baseUrl;
    },
  }
}
</script>
<style scoped>
.cus-topic-exam {
  text-align: start;
}

.cus-item_content {
  text-align: start;
}

.cus-item_add {
  background-color: rgba(235, 238, 245, 1);
  padding: 0 !important;
  display: inline-block;
  float: right;
  top: 25px;
  margin-top: 0px;
  margin-right: 65px;
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