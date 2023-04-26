<template>
  <div>{{ index }} - {{ source }}</div>
</template>

<script>
export default {
  name: 'CusItemBase',
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
  }
}
</script>
