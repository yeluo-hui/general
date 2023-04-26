<template>
  <div  class="ui message" @mouseenter="changebgcolor(index) "
    @mouseleave="clearcolor" @click="goto(source)" style="width:70%;margin-left:30px;background:none!important;box-shadow:none!important;font-size:15px;font-weight:bold;padding:4px;cursor:pointer;">
    {{source.progress}}
    <el-row :class="{ cur: bgcolor === index }">
      <el-col :span="1">
        <i v-if="!source.progress" class=" greyI circle outline icon"></i>
        <i v-if="source.progress > 0 && source.progress < 1" class="green adjust icon"></i>
        <i v-if="source.progress === 1" class=" green circle icon"></i>
      </el-col>
      <el-col :span="20" style="text-align: initial;">
        {{ index + 1 }}、{{ source.catalogName }}(需要用时：{{ source.duration }}
      </el-col>
      <el-col :span="3">
        <i v-if="source.progress === 0" class=" grey video icon"></i>
        <i v-else class=" green video icon"></i>
        {{ source.size }}
      </el-col>
    </el-row>
  </div>
  <!-- <router-link   :to="{name: 'secondlearnview', params: {id: source.id}}"> -->
  <!-- </router-link> -->

</template>

<script>
  export default {
    name: 'CusItemCourse',
    props: {
      index: { // index of current item
        type: Number
      },
      source: { // here is: {uid: 'unique_1', text: 'abc'}
        type: Object,
        default () {
          return {}
        }
      }
    },
    data() {
      return {
        bgcolor: -1,
      }
    },
    methods: {
      // 鼠标移动上更换背景色
      changebgcolor(index) {
        console.log(index)
        // index:鼠标移上的元素的索引值
        this.bgcolor = index;
      },
      //鼠标移出，还原颜色
      clearcolor() {
        this.bgcolor = -1
      },
      goto(source) {
        this.$router.push({
          path: '/secondlearnview',
          query: { id: source.id}
          // query: { id: source.id, name: source.courseName }
        }) //
      }
    }
  }
</script>
<style scoped>
  .cur {
    background-color: #f2f2f3;
  }
</style>
