<template>
  <div>
    <cus-rich-text
        ref="richText"
        :col-name="'analysis'"
        :content="''"
        :height="height"
        :width="width"
        :meta="meta"
        :server="server"
        @rich-html="richHtml"
    />
  </div>
</template>

<script>
import CusRichText from '@/components/rdtable/cus-rich-text/cus-rich-text'
import { getToken } from '@/utils/auth'

export default {
  name: 'RichText',
  components: {
    CusRichText,
  },
  data () {
    return {
      col: 'name',
      content: 'richText',
      height: '',
      width: '',
      server: 'http://127.0.0.1:8080/common/upload',
      meta: {
        token: getToken()
      },
    }
  },
  mounted () {
    // 计算搜索框的高度
    var searchBarHeight = 100 + 'px'
    this.height = `calc(100vh - ${searchBarHeight})`
    this.width = 'calc(50vw)'
  },
  methods: {
    uploadRich(col, data){
      console.log(col, data)
    },
    insterImage(data){
      const selft = this
      const config = { headers:selft.uploadHeaders }
      return new Promise(resolve => {
        resolve(selft.$axios.post(selft.uploadUrl, data, config))
      })
    },
    richHtml(col, data) {
      // 进行base64处理
      console.log('richHtml', col, data)
    },
  }
}
</script>

<style scoped>
.self-row {
  margin-top: 20px !important;
}
</style>
