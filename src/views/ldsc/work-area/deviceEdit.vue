<template>
  <el-dialog
      :title="row.id? '修改设备': '添加设备'"
      :visible.sync="visible"
      width="30%"
      :before-close="close">

    <el-form
        ref="comruleForm"
        :model="comruleForm"
        :rules="rules"
        label-width="50px"
        class="demo-ruleForm"
        style="width: 100%;"
    >
      <el-container>
        <el-container>
          <el-aside width="50%" style="overflow: hidden;padding-top: 20px">
            <el-form-item label="设备名称：" prop="type">
              <el-input v-model="comruleForm.duration" type="text" placeholder="请输入" style="width: 50%;"/>
            </el-form-item>

            <el-form-item label="规格型号：" prop="bankId">
              <treeselect v-model="comruleForm.bankId" placeholder="请选择规格" :options="treeOptions"
                          :normalizer="normalizer"/>
            </el-form-item>

            <el-form-item label="出厂编号：" prop="type">
              <el-input v-model="comruleForm.duration" type="text" placeholder="请输入" style="width: 50%;"/>
            </el-form-item>

            <el-form-item label="生产厂家：" prop="bankId">
              <treeselect v-model="comruleForm.bankId" placeholder="请选择题库" :options="treeOptions"
                          :normalizer="normalizer"/>
            </el-form-item>

            <el-form-item label="设备状态：" prop="bankId">
              <el-select v-model="comruleForm.type" placeholder="请选择状态" @change="changeState">
                <el-option v-for="(item,index) in options" :key="index" :label="item.label" :value="item.type"/>
              </el-select>
            </el-form-item>

          </el-aside>
          <el-container>
            <el-main class="el-main-title">
              <el-form-item label="设备照片：" prop="bankId">
                <el-upload
                    action="#"
                    list-type="picture-card"
                    :auto-upload="false">
                  <i slot="default" class="el-icon-plus"></i>
                  <div slot="file" slot-scope="{file}">
                    <img
                        class="el-upload-list__item-thumbnail"
                        :src="file.url" alt=""
                    >
                    <span class="el-upload-list__item-actions">
                      <span
                          class="el-upload-list__item-preview"
                          @click="handlePictureCardPreview(file)"
                      >
                        <i class="el-icon-zoom-in"></i>
                      </span>
                      <span
                          v-if="!disabled"
                          class="el-upload-list__item-delete"
                          @click="handleDownload(file)"
                      >
                        <i class="el-icon-download"></i>
                      </span>
                      <span
                          v-if="!disabled"
                          class="el-upload-list__item-delete"
                          @click="handleRemove(file)"
                      >
                        <i class="el-icon-delete"></i>
                      </span>
                    </span>
                  </div>
                </el-upload>
              </el-form-item>

              <el-form-item label="设备介绍：" prop="bankId">
                <el-input
                    :key="item.select"
                    v-model="item.describe"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入内容"
                />
              </el-form-item>
            </el-main>
          </el-container>
        </el-container>
        <el-button style="margin: 40px 40px;" type="primary" @click="save">保 存</el-button>
        <el-button type="success" @click="close">取 消</el-button>
      </el-container>
    </el-form>
  </el-dialog>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'


export default {
  name: "deviceInfo",
  components: {Treeselect},
  data() {
    return {
      visible: false,
      row: {},
      comruleForm: {},
      rules: {
        type: [{
          required: true,
          message: '请选择试卷类型',
          trigger: 'blur'
        }],
        bankId: [{
          required: true,
          message: '请选择所属题库',
          trigger: 'blur'
        }],
        difficulty: [{
          required: true,
          message: '请选择难度',
          trigger: 'blur'
        }],
        score: [{
          required: true,
          message: '请设置分数',
          trigger: 'blur'
        }, {pattern: /^([1-9][0-9]{0,1}|100)$/, message: '请输入1到100的正整数'}],
        stem: [{
          required: true,
          message: '请填写题干',
          trigger: 'blur'
        }],
        titleName: [{
          required: true,
          message: '请填写标题',
          trigger: 'blur'
        }],
        duration: [{
          required: true,
          message: '请填写时长',
          trigger: 'blur'
        }, {pattern: /(^[1-9]\d*$)/, message: '请输入大于0的正整数'}]
      },
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false
    }
  },
  methods: {
    init(data, index) {
      this.visible = true
      this.row = data
      this.$nextTick(() => {
        this.deviceInfoDriver.onInit(this.$refs.infoTable, data.id, index)
      })
    },
    // 保存并继续添加
    save(status = '') {
      const self = this
      this.$refs['comruleForm'].validate((valid) => {
        if (valid) {
          console.log(self.comruleForm.content)
          this.question.setAnalysis(self.comruleForm.analysis)
          self.question.setStem(self.comruleForm.stem)
          // todo 正则表达式
          self.question.setKeyWord(self.comruleForm.keyWord)
          // 实操题为空
          if ([5, 6, 7].includes(self.comruleForm.type)) {
            self.comruleForm.content = ''
          }
          self.question.setContent(self.comruleForm.content)
          console.log('保存并继续添加', self.question.getQuestion())
          self.submit(self.question.getQuestion(), status)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    close() {
      this.visible = false
    }
  }

}
</script>

<style scoped>

</style>