<template>
  <div>
    <div class="ui grid">
      <div class="row" style="line-height: normal;">
        <div class="three wide column cus-item-list" @click="enter(source.id)">
          <img class="ui mini rounded image" :src="source.img">
        </div>
        <div class="five wide column cus-item-list" @click="enter(source.id)">
          <div class="content star text" style="text-align: start;padding-top: 15px;">
            <div
              class="header left aligned"
              style="color: #0377d0;font-size: 25px;font-weight: 600;"
            >{{ source.courseName }}
            </div>
            <div class="description">
              <p />
            </div>
            <div class="extra span_label" style="color: #121212;">
              创建人：<span style="font-weight: 100;">{{ source.creatorName }}</span>
            </div>
            <div class="extra span_label" style="color: #121212;">
              创建时间：<span style="font-weight: 100;">{{ source.createTime }}</span>
            </div>
          </div>
        </div>
        <div class="four wide column " style="border-left: 2px solid #e0dada;">
          <el-tag v-if="source.state === 1" type="danger" class="cus-item-tag"> {{ source.state | setState }}</el-tag>
          <el-tag v-if="source.state === 2" type="success" class="cus-item-tag">{{ source.state | setState }}</el-tag>
          <el-tag v-if="source.state === 3" type="info" class="cus-item-tag"> {{ source.state | setState }}</el-tag>
        </div>
        <div class="four wide column" style="border-left: 2px solid #e0dada;">
          <el-button type="text" class="cus-item-btton"  v-if="source.state === 1" @click="info(source.id)">编辑</el-button>
          <el-button type="text" class="cus-item-btton"  v-if="source.state === 1" @click="release(source.id)">发布</el-button>
          <el-button type="text" class="cus-item-btton del_button"  v-if="source.state === 1" @click="del(source.id)">删除</el-button>
          <span v-else class="cus-item-btton">已发布 </span>
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
  name: 'CusItemScore',
  props: {
    // index key
    index: {
      type: Number
    },
    // 数据
    source: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      info: this.info,
      release: this.release,
      del: this.del,
      enter: this.enter
    }
  },
  inject:['info', 'release', 'del', 'enter'],
  filters: {
    setState(val) {
      return val === 1 ?  '草稿' : val === 2 ? '进行中' : '已结束'
    }
  },
  methods: {

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
.cus-item-tag {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  width: 90px;
  border-radius: 30px;
}
</style>
