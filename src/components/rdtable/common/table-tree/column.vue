<template>
    <div class="tree-column" v-bind:class="{border: border!== undefined}" v-bind:style="{ width: typeof (width) === 'string' ? width + '%' : width + 'px', flex: flex}" v-if="flex">
      <slot></slot>
    </div>
    <div class="tree-column" v-bind:class="{border: border!== undefined}" v-bind:style="{ width: typeof (width) === 'string' ?  width + '%' : width + 'px',}" v-else>
      <slot></slot>
    </div>
</template>
<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'column',
  props: {
    // eslint-disable-next-line vue/require-prop-type-constructor
    width: Number | String,
    field: String,
    label: String,
    flex: Number,
    border: String
  },
  data() {
      return {
          open: false
      }
  },
  mounted() {
  }
}
</script>
<style lang="scss">
  .tree-column{
    position: relative;
    padding: 12px 12px;
    min-width: 60px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    box-sizing: border-box;
    &.border{
      border-right: 1px solid #eee;
    }
  }
  .resize-line{
    position: absolute;
    top: 0;
    right: -3px;
    width:6px;
    height: 100%;
    cursor: col-resize;
  }
</style>
