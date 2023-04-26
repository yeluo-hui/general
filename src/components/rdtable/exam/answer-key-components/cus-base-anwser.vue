<template>
  <div class="ui link cards">
      <span v-for="(item, index) in questions" :key="index">
        <div style="margin: 5px 3px;">
             <button v-if="currentId === item.questionId" @click="onSpend(item)" class="ui circular olive button">{{ item.index }}</button>
             <button v-else @click="onSpend(item)" :class="item.finished ? 'ui circular yellow button' : 'ui circular grey button'">{{ item.index }}</button>
        </div>
      </span>
  </div>
</template>
<style scoped>
@import '../../Semantic-UI-CSS-master/semantic.min.css';
</style>
<script>

export default {
  name: 'BaseAnwserVue',
  props: {
    questions: {
      type: Array,
      required: true
    },
    currentId: {
      type: String,
      required: false
    }
  },
  inject: ['onSpend'],
  data() {
    return {
      onSpend: this.onSpend
    }
  },
  mounted() {
    console.log('@@=>questions', this.questions)
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
