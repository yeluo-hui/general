<template>
  <div class="ui link cards">
    <a class="card" @click="goSingle(gridInfo)">
      <div class="">
        <el-image
          style="border-radius: 5px;"
          :src="gridInfo.img"
          fit="fill"
        />
      </div>
      <div class="content title-content">
        <div class="header left floated" style="line-height: none!important;margin-top: 2px;">{{ gridInfo.courseName }}
        </div>
      </div>
      <div class="extra content">
        <span class="left floated"><i class="clock outline icon" />{{ gridInfo.courseHour }}课时</span>
        <span class="right floated"><i class="user  icon" /> {{ gridInfo.studyNum }} 在线学习 </span>
      </div>
    </a>
  </div>
  <!-- </router-link> -->
</template>
<style scoped>
  @import '../../Semantic-UI-CSS-master/semantic.min.css';
</style>
<script>
export default {
  name: 'ExamCard',
  props: {
    gridInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      goSingle: this.goSingle
    }
  },
  mounted() {
    console.log('@@=>gridInfo', this.gridInfo)
  },
  inject: ['goSingle'],
  methods: {}
}
</script>

<style scoped>
  .ui {
    margin: 0 auto;
    width: 98%;
    box-sizing: border-box;
    /* height: 100%; */
  }

  .ui.cards>.card>.content {
    height: 30px;
  }

  .card-image,
/*  .card-image img {
    height: calc(100% - 60px);
  } */

  .card {
    margin: 0 5px !important;
    width: 100% !important;
    box-shadow: 0px 0px 1px #ccc !important;
    border: none !important;
    background: rgba(245, 247, 250, 1) !important;
    height: 100%;
  }

  .title-content {
    height: 28px;
    line-height: 28px;
    font-size: 12px !important;
    padding: 5px !important;
  }

  .extra {
    padding: 0.3em !important;
  }

  .ui.cards>.card>.image>img {
    display: block;
    width: 100%;
    border-radius: 2px;
  }

  .ui.cards>.card>.extra {
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
    color: #606266;
    -webkit-box-shadow: none;
    box-shadow: none;
    -webkit-transition: color .1s ease;
    transition: color .1s ease;
  }
  .ui.cards>.card>.content {
      -webkit-box-flex: 1;
      -ms-flex-positive: 1;
      flex-grow: 1;
      border: none;
      border-top: 0px solid rgba(34,36,38,.1);
      background: 0 0;
      margin: 0;
      padding: 1em 1em;
      -webkit-box-shadow: none;
      box-shadow: none;
      font-size: 1em;
      border-radius: 0;
  }
</style>
