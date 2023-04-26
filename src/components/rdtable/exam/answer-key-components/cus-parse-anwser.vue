<template>
  <div class="ui link cards">
      <span v-for="(item, index) in questions" :key="index">
        <div style="margin: 5px 3px;">
              <button :class="item.finished ? 'ui circular green button' : 'ui circular red button'">{{ item.index }}</button>
        </div>
      </span>
    </div>
</template>
<style scoped>
@import '../../Semantic-UI-CSS-master/semantic.min.css';
</style>
<script>

export default {
  name: 'ParseAnwser',
  props: {
    questions: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
