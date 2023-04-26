<template>
  <div>
    <div class="ui grid">
      <div class="row" style="line-height: normal;">
        <div class="three wide column cus-item-list" @click="goSingle(source.courseId)">
          <img class="ui mini rounded image" :src="source.img">
        </div>
        <div class="ten wide column cus-item-list" @click="goSingle(source.courseId)">
          <div class="content star text" style="text-align: start;padding-top: 15px;">
            <div
              class="header left aligned"
              style="color: #0377d0;font-size: 25px;font-weight: 600;"
            >{{ source.courseName }}
            </div>
            <div class="meta">
              <span>
                <span class="span_label">学习目录：</span><span style="color:#626267;font-weight:bold">共{{ source.totalCatalog }}个目录</span><span style="margin: 0 5px;">|</span>
                <span class="span_label">学习课时：</span><span style="color:#626267;font-weight:bold" >共{{ source.courseHour }}课时</span><span style="margin: 0 5px;">|</span>
                <span class="span_label">学习时间：</span><span style="color:#626267;font-weight:bold">{{ source.startTime }}--{{ source.endTime }}</span><span
                  style="margin: 0 5px;"
                >|</span>
                <span class="span_label">创建人：</span> <span style="color:#626267;font-weight:bold">{{ source.creator }}</span>
              </span>
            </div>
            <div class="description">
              <p />
            </div>
            <div class="extra span_label" style="color: #121212;display:flex;flex-direction:row;align-items: center;justify-content: center;justify-content:space-between">
              <div> 学习进度：</div>
              <el-progress style="width:90%" :stroke-width="12" :percentage.number="parseInt(source.progress)" color="rgba(51, 153, 51, 1)" :format="format"></el-progress>
            </div>
          </div>
        </div>
        <div class="two wide column">
          <el-button @click="goto(source)" v-if="status === 1" class="ui primary button cus-item-btton"  >立即学习 </el-button>
          <el-button @click="goto(source)" v-else-if="status === 2" class="ui grey button cus-item-btton"  >正在学习 </el-button>
          <el-button @click="goto(source)" v-else class="ui orange button cus-item-btton"  >继续学习 </el-button>
        </div>
      </div>
    </div>
    <div class="ui divider" />
  </div>
</template>

<style scoped>
@import "../../Semantic-UI-CSS-master/semantic.min.css"
</style>

<script>
export default {
    name: 'CusItemProgress',
    props: {
      // index key
      index: {
        type: Number
      },
      // 数据
      source: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data() {
      return {
        status: 1
      }
    },
    methods: {
      format(percentage) {
        return `${percentage}%`
      },
      goSingle (id) {
        this.$router.push({ path: '/learnview/introview', query: { id: id }})
      },
      goto(source) {
        this.$router.push({
          path: '/secondlearnview',
          query: { id: source.id, name: source.courseName }
        }) //
      }
    }
  }
</script>
<style scoped>
.pan_label {
  font-family: '微软雅黑 Bold', '微软雅黑 Regular', '微软雅黑';
  font-weight: 700;
}

.ui {
  margin: 0 auto;
  width: 98%;
  /* height: 150px; */
  box-sizing: border-box;

}

.card {
  margin: 0 5px !important;
  width: 100% !important;
  box-shadow: 0px 0px 1px #ccc !important;
  border: none !important;
  background: rgba(245, 247, 250, 1) !important;
}

.ui.cards > .card > .image > img {
  display: block;
  width: 100%;
  height: 190px;
  border-radius: 2px;
}

.ui.cards > .card > .extra {
  max-width: 100%;
  min-height: 0 !important;
  -webkit-box-flex: 0;
  -ms-flex-positive: 0;
  flex-grow: 0;
  border-top: 0px solid rgb(226 34 34 / 5%) !important;
  position: static;
  background: 0 0;
  width: auto;
  margin: 0 0;
  padding: 0.3em 1em;
  top: 0;
  left: 0;
  color: #666666;
  -webkit-box-shadow: none;
  box-shadow: none;
  -webkit-transition: color .1s ease;
  transition: color .1s ease;
}

.ui {
  width: 100% !important;
  margin-left: auto !important;
  margin-right: auto !important;
}

.span_label {
  line-height: 40px;
  font-size: 16px;
  font-weight: bold;
}

.ui.items:last-child {
  margin-bottom: 20px !important;
}

.cus-item-list {
  cursor: pointer !important;
}

.cus-item-btton {
  height: 55px;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
</style>
