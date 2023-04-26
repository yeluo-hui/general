<template>
  <div class="table-app">
    <rd-list :type="type" ref="rdList" />
  </div>
</template>

<script>

import RdList from "@/components/rdtable/rd-list";
import ListCourseDriver from './listCourseDriver'

export default {
  name: 'ListCourse',
  components: { RdList },
  data () {
    return {
      listCourseDriver: new ListCourseDriver(),
      // 选择引用组件
      type: 'cus-item-course',
      id: ''
    }
  },
  mounted () {
    this.listCourseDriver.onInit(this.$refs.rdList, this.id)
  },
  methods: {
  }
}
</script>

<style scoped>
.self-row {
  margin-top: 20px !important;
}
</style>
