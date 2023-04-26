<template>
  <div style="border: 1px solid #ccc;">
    <Toolbar
        v-if="toolbarVis"
        style="border-bottom: 1px solid #ccc"
        :editor="editor"
        :default-config="toolbarConfig"
        :mode="mode"
    />
    <Editor
        style="min-height: 125px;"
        v-model="html"
        :style="contentStyle"
        :default-config="editorConfig"
        :mode="mode"
        @onCreated="onCreated"
        @onChange="onChange"
        @onDestroyed="onDestroyed"
        @onMaxLength="onMaxLength"
        @onFocus="onFocus"
        @onBlur="onBlur"
        @customAlert="customAlert"
        @customPaste="customPaste"
    />
  </div>
</template>
<style src="@wangeditor/editor/dist/css/style.css"></style>
<script>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

export default {
  name: 'CusRichText',
  components: { Editor, Toolbar },
  props: {
    // 设置传参name
    colName: {
      type: String,
      default: '',
      required: false
    },
    // 初始文本内容
    content: {
      type: String,
      default: () => '',
      required: false
    },
    // 悬浮按钮
    bubbleVis: {
      type: Boolean,
      default: true,
      required: false
    },
    // 头部
    menuVis: {
      type: Boolean,
      default: true,
      required: false
    },
    // 设置高度和宽度
    width: {
      type: String,
      default: '500px'
    },
    height: {
      type: String,
      default: '300px'
    },
    // 上传参数
    server: {
      type: String,
      required: true
    },
    meta: {
      type: Object,
      required: true
    },
    // 工具栏显示
    toolbarVis: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {
      // 样式
      contentStyle: '',
      editor: null,
      html: '',
      toolbarConfig: {
        // 编辑工具栏中显示
        // toolbarKeys: [ /* 显示哪些菜单，如何排序、分组 */
        //   // 菜单 key
        //   'headerSelect',
        //
        //   // 分割线
        //   '|',
        // ],
        /* insertKeys: {
           index: 5, // 插入的位置，基于当前的 toolbarKeys
           keys: ['menu-key1', 'menu-key2']
         },*/
        excludeKeys: ['uploadVideo']
      },
      editorConfig: {
        placeholder: '请输入内容...',
        autoFocus: false,
        // 所有的菜单配置，都要在 MENU_CONF 属性下
        MENU_CONF: {
          uploadImage: {
            // form-data fieldName ，默认值 'wangeditor-uploaded-image'
            fieldName: 'file',

            server: this.server,
            // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
            meta: this.meta,

            // 上传之前触发
            onBeforeUpload(file) {
              // file 选中的文件，格式如 { key: file }
              return file

              // 可以 return
              // 1. return file 或者 new 一个 file ，接下来将上传
              // 2. return false ，不上传这个 file
            },
            // 上传进度的回调函数
            onProgress(progress) {
              // progress 是 0-100 的数字
              console.log('progress', progress)
            },
            // 单个文件上传成功之后
            onSuccess(file, res) {
              console.log(`${file.name} 上传成功`, res)
            },
            // 单个文件上传失败
            onFailed(file, res) {
              console.log(`${file.name} 上传失败`, res)
            },
            // 上传错误，或者触发 timeout 超时
            onError(file, err, res) {
              console.log(`${file.name} 上传出错`, err, res)
            }
          }
        }
      },
      mode: 'default' // or 'simple'
    }
  },
  watch: {
    height(val) {
      this.contentStyle = `height: ${val};overflow-y:auto;`
    },
    width(val) {
      this.editorStyle = ` width: ${val};`
    },
    content:{
      handler(val) {
        console.log('@@=>rich', val)
        this.$nextTick(() => {
          this.html = val
          // this.html = '<span>' + val + '</span>'
          // this.editor.setHtml(val)
        })
      },
      deep: true
    }
  },
  created() {
    console.log('created')
    console.log(this.server, this.meta)
  },
  mounted() {
    this.editorConfig.MENU_CONF['uploadImage'] = {
      server: this.server,
      meta: this.meta
    }
    console.log('mounted')
  },
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁 editor ，重要！！！
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor) // 【注意】一定要用 Object.seal() 否则会报错
      // console.log('按键keys', this.editor.getAllMenuKeys())
      // console.log('按键keys1', this.editorConfig)
      this.editor.on('fullScreen', () => { console.log('fullScreen') })
    },
    onChange(editor) {
      /*
      console.log(this.editor.getConfig().MENU_CONF.uploadImage)*/
      const html = editor.getHtml()
      this.$emit('rich-html', this.colName, html)
    },
    onDestroyed(editor) {
      console.log('onDestroyed', editor)
    },
    onMaxLength(editor) {
      console.log('onMaxLength', editor)
    },
    onFocus(editor) {
      console.log('onFocus', editor)
    },
    onBlur(editor) {
      console.log('onBlur', editor)
    },
    customAlert(info = '', type = '') {
      window.alert(`customAlert in Vue demo ${type}:${info}`)
    },
    customPaste(editor, event, callback) {
      console.log('ClipboardEvent 粘贴事件对象', event)
      // const html = event.clipboardData.getData('text/html') // 获取粘贴的 html
      const text = event.clipboardData.getData('text/plain') // 获取粘贴的纯文本
      // const rtf = event.clipboardData.getData('text/rtf') // 获取 rtf 数据（如从 word wsp 复制粘贴）
      // 自定义插入内容
      editor.insertText(text)

      // 返回 false ，阻止默认粘贴行为
      event.preventDefault()
      callback(false) // 返回值（注意，vue 事件的返回值，不能用 return）

      // 返回 true ，继续默认的粘贴行为
      // callback(true)
    },
    getHtml() {
      const html = this.editor.getHtml()
      console.log(html)
    },
    // 插入一段文字
    insertText() {
      const editor = this.editor // 获取 editor 实例
      if (editor == null) return
      // 调用 editor 属性和 API
      editor.insertText('一段文字')
      console.log(editor.children)
    }
  }
}
</script>

