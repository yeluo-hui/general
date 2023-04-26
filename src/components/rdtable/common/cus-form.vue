<!--releasenote * 1.0-->
<template>
  <div>
    <el-form :model="dataFrom" ref="dataFrom" :rules="rules" :label-position="labelPosition" label-width="120px">
      <template v-for="item of fields">
        <!-- 文本 -->
        <el-form-item :key="item.id" v-if="item.ft === 'text'" :label="item.cn" :prop="item.fn" >
          <el-input class="rbipt form_label_styel" v-model="dataFrom[item.fn]" :placeholder="item.fp.placeholder" :maxlength="item.fp.max"
                    :minlength="item.fp.min" clearable >
          </el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item :key="item.id" v-if="item.ft === 'password'" :label="item.cn" :prop="item.fn">
          <el-input class="rbipt form_label_styel" v-model="dataFrom[item.fn]" :placeholder="item.fp.placeholder" :maxlength="item.fp.max"
                    :minlength="item.fp.min" show-password clearable>
          </el-input>
        </el-form-item>

        <!--time 时间-->
        <el-form-item style="text-align: left;" :key="item.id" v-if="item.ft === 'time'" :label="item.cn" :prop="item.fn">
          <el-time-picker v-model="dataFrom[item.fn]" :placeholder="item.fp.placeholder" :value-format="item | setTimeDateFormat"/>
        </el-form-item>

        <!--time_range 时间范围-->
        <el-form-item style="text-align: left;" :key="item.id" v-if="item.ft === 'time_range'" :label="item.cn"
                      :prop="item.fn">
          <el-time-picker is-range :placeholder="item.fp.placeholder" v-model="dataFrom[item.fn]" :arrow-control=false
                          range-separator="至"
                          start-placeholder="开始时间"
                          end-placeholder="结束时间"
                          :value-format="item | setTimeDateFormat">
          </el-time-picker>
        </el-form-item>

        <!--date value-format特殊-->
        <el-form-item style="text-align: left;" :key="item.id" v-if="item.ft === 'date'" :label="item.cn"
                      :prop="item.fn">
          <el-date-picker v-model="dataFrom[item.fn]" type="date" :placeholder="item.fp.placeholder" :value-format="item | setTimeDateFormat">
          </el-date-picker>
        </el-form-item>

        <!--date_range-->
        <el-form-item style="text-align: left;" :key="item.id" v-if="item.ft === 'date_range'" :label="item.cn"
                      :prop="item.fn">
          <el-date-picker v-model="dataFrom[item.fn]" type="daterange" range-separator="至" start-placeholder="开始日期"
                          end-placeholder="结束日期" :value-format="item | setTimeDateFormat" >
          </el-date-picker>
        </el-form-item>

        <!--datetime-->
        <el-form-item style="text-align: left;" :key="item.id" v-if="item.ft === 'datetime'" :label="item.cn"
                      :prop="item.fn">
          <el-date-picker v-model="dataFrom[item.fn]" type="datetime" :value-format="item | setTimeDateFormat">
          </el-date-picker>
        </el-form-item>

        <!--datetime_range-->
        <el-form-item style="text-align: left;" :key="item.id" v-if="item.ft === 'datetime_range'" :label="item.cn"
                      :prop="item.fn">
          <el-date-picker v-model="dataFrom[item.fn]" type="datetimerange" range-separator="至" start-placeholder="开始日期"
                          end-placeholder="结束日期" :value-format="item | setTimeDateFormat" >
          </el-date-picker>
        </el-form-item>

        <!--number-->
        <el-form-item style="text-align: left;" :key="item.id" v-if="item.ft === 'number'" :label="item.cn"
                      :prop="item.fn">
          <el-input-number v-model="dataFrom[item.fn]" :min="Number(item.fp.min)" :max="Number(item.fp.max)"
                           :label="item.fp.laber">
          </el-input-number>
        </el-form-item>

        <!--slider 不太好用-->
        <el-form-item style="text-align: left;" :key="item.id" v-if="item.ft === 'slider'" :label="item.cn"
                      :prop="item.fn">
          <el-slider  class="rbipt form_label_styel form_slisder" v-model.number="dataFrom[item.fn]" :min="Number(item.fp.min)" :max="Number(item.fp.max)"
                      :step="item.fp.step"
                      :marks="item.fp| setMarks"
                      :show-stops="item.fp.show_stops" :show-input="item.fp.show_input" :range="item.fp.range"
                      :vertical="item.fp.vertical" :height="item.fp.height">
          </el-slider>
        </el-form-item>

        <!--switch-->
        <el-form-item style="text-align: left;" :key="item.id" v-if="item.ft === 'switch'" :label="item.cn"
                      :prop="item.fn">
          <el-switch
            style="display: block"
            v-model="dataFrom[item.fn]"
            :active-color="item.fp.active.color"
            :inactive-color="item.fp.inactive.color"
            :active-value="item.fp.active.value"
            :inactive-value="item.fp.inactive.value"
            :active-text="item.fp.active.text"
            :inactive-text="item.fp.inactive.text">
          </el-switch>
        </el-form-item>

        <!--rate-->
        <el-form-item style="text-align: left;" :key="item.id" v-if="item.ft === 'rate'" :label="item.cn"
                      :prop="item.fn">
          <el-rate
            v-model="dataFrom[item.fn]"
            :colors="item.fp.colors"
            :texts="item.fp.texts"
            :show-score="item.fp.show_score"
            :show-text="item.fp.show_text">
          </el-rate>
        </el-form-item>

        <!--color-->
        <el-form-item style="text-align: left;" :key="item.id" v-if="item.ft === 'color'" :label="item.cn"
                      :prop="item.fn">
          <el-color-picker v-model="dataFrom[item.fn]"
                           :size="item.fp.size"
                           :show-alpha="item.fp.show_alpha"
                           :color-format="item.fp.color_format"
          >
          </el-color-picker>
        </el-form-item>

        <!-- radio-->
        <el-form-item style="text-align: left;" :key="item.id" v-if="item.ft === 'radio'" :label="item.cn"
                      :prop="item.fn">
          <el-radio-group v-model="dataFrom[item.fn]" :size="item.fp.size">
            <template v-for="(site, i) in options[item.fn]">
              <el-radio :key="i" :label="site.id" :border="item.fp.border">{{ site.value }}</el-radio>
            </template>
          </el-radio-group>
        </el-form-item>

        <!--checkbox      v-if="options[item.fn] && options[item.fn].length ? true : false"  -->
        <el-form-item style="text-align: left;" :key="item.id" v-if="item.ft === 'checkbox'" :label="item.cn"
                      :prop="item.fn">
          <el-checkbox-group
            v-model="dataFrom[item.fn]">
            <el-checkbox v-for="check in options[item.fn]" v-if="options[item.fn] && options[item.fn].length ? true : false"  :label="check" :key="check">{{ check }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <!--select        -->
        <el-form-item style="text-align: left;" :key="item.id" v-if="item.ft === 'select'" :label="item.cn"
                      :prop="item.fn">
          <el-select v-model="dataFrom[item.fn]" :placeholder="item.fp.placeholder">
            <el-option
              v-for="newitem in options[item.fn]" :label="newitem.label" :key="newitem.value"
              :remote="item.fp.remote" :reserve_keyword="item.fp.reserve_keyword"
              :allow_create="item.fp.allow_create" :multiple="item.fp.multiple"
              :collapse_tags="item.fp.collapse_tags" :filterable="item.fp.filterable"
              :default_first_option="item.fp.default_first_option" :size="item.fp.size"
              :value="newitem.value">
              <span style="float: left">{{ newitem.label }}</span>
            </el-option>
          </el-select>
        </el-form-item>

        <!--demonstration-->
        <el-form-item style="text-align: left;" :key="item.id" v-if="item.ft === 'demonstration'" :label="item.cn"
                      :prop="item.fn">
          <el-cascader
            :placeholder="item.fp.placeholder" :options="options[item.fn]"
            :show-all-levels="false" :filterable="item.fp.filterable"
            :clearable="item.fp.clearable" :collapse_tags="item.fp.collapse_tags"
            v-model="dataFrom[item.fn]"
          >
          </el-cascader>
        </el-form-item>

        <!--文本域-->
        <el-form-item style="text-align: left;" :key="item.id" v-if="item.ft === 'textarea'" :label="item.cn" :prop="item.fn">
            <el-input
              type="textarea"
              :rows="2"
              :placeholder="item.fp.placeholder"
              :maxlength="item.fp.max"
              :minlength="item.fp.min"
              :autosize="{ minRows: 2, maxRows: 5}"
              v-model="dataFrom[item.fn]">
            </el-input>
        </el-form-item>

        <!-- 上传-->
        <el-form-item :key="item.id" v-if="item.ft === 'upload'" :label="item.cn" :prop="item.fn">
          <cus-upload :colName="item.fn" :fileRecords="dataFrom[item.fn]" @uploadData="uploadData"></cus-upload>
        </el-form-item>

      </template>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </div>
</template>

<script>
import CusValidate from './cus-validate.js'
import CusUpload from './cus-upload'

let self
export default {
  name: 'CusForm',
  components: {
    CusUpload
  },
  props: {
    fields: {
      type: Array,
      required: true,
      default: () => []
    },
    options: {
      type: Object,
      required: true,
      default: () => {}
    },
    // model: {
    //   type: Object,
    //   default: () => {}
    // }
  },
  inject: ['onSubmit', 'onSubmitNode'],
  data () {
    return {
      dataFrom: {},
      rules: {},
      cusValidate: {},
      labelPosition: 'left',
      // treeTable
      parentId: null
    }
  },
  beforeCreate: function () {
    self = this
  },
  computed: {
    // getRdModel () {
      // return this.model()
    // }
  },
  watch: {
    // updata 更新dataForm
    getRdModel (val) {
      // eslint-disable-next-line no-prototype-builtins
      if (val.hasOwnProperty('parentId')) this.parentId = val.parentId
      // this.initFields(val)
    }
  },
  filters: {
    // 设置滑块显示数据
    setMarks (val) {
      let marks = {}
      marks[val.min] = `最小: ${val.min}`
      marks[val.max] = `最大: ${val.max}`
      return marks
    },

    //  设置日期格式
    setTimeDateFormat (val) {
      let format = ''
      if (['time_range', 'time'].includes(val.ft)) { format = 'HH:mm:ss' }
      if (['date'].includes(val.ft)) { format = 'yyyy-MM-dd' }
      if (['date_range'].includes(val.ft)) { format = 'YYYY-MM-DD' }
      if (['datetime'].includes(val.ft)) { format = 'yyyy-MM-dd HH:mm:ss' }
      if (['datetime_range'].includes(val.ft)) { format = 'yyyy-MM-dd HH:mm:ss' }

      return val.fp && val.fp.format && val.fp.format ? val.fp.format : format
    }
  },

  mounted () {
    console.log('$$$mounted', this.fields)
    this.cusValidate = new CusValidate()
    // this.initFields(this.rdModel ? this.rdModel : {})
  },

  methods: {
    initFields (model) {
      self.dataFrom = {}
      self.fields.forEach(item => {
        console.log(item.fn, item)
        // 设置date 默认时间
        if (['time'].includes(item.ft)) { self.$set(self.dataFrom, item.fn, (self.hasProperty(model, item.fn) ? model[item.fn] : self.$moment().format('HH:mm:ss'))); return }
        if (['time_range'].includes(item.ft)) { self.$set(self.dataFrom, item.fn, (self.hasProperty(model, item.fn) ? JSON.parse(model[item.fn]) : [this.$moment().format('HH:mm:ss'), self.$moment().add(1, 'h').format('HH:mm:ss')])); return }
        if (['date'].includes(item.ft)) { self.$set(self.dataFrom, item.fn, (self.hasProperty(model, item.fn) ? model[item.fn] : self.$moment().format('YYYY-MM-DD'))); return }
        if (['date_range'].includes(item.ft)) { self.$set(self.dataFrom, item.fn, (self.hasProperty(model, item.fn) ? JSON.parse(model[item.fn]) : [self.$moment().format('YYYY-MM-DD'), self.$moment().add(1, 'd').format('YYYY-MM-DD')])); return }
        if (['datetime'].includes(item.ft)) { self.$set(self.dataFrom, item.fn, (self.hasProperty(model, item.fn) ? this.$moment(model[item.fn]).format('YYYY-MM-DD HH:mm:ss') : this.$moment().format('YYYY-MM-DD HH:mm:ss'))); return }
        if (['datetime_range'].includes(item.ft)) { self.$set(self.dataFrom, item.fn, (self.hasProperty(model, item.fn) ? JSON.parse(model[item.fn]) : [this.$moment().format('YYYY-MM-DD HH:mm:ss'), this.$moment().add(1, 'd').format('YYYY-MM-DD HH:mm:ss')])); return }
        // 处理特殊字段swich中得0
        if (['switch'].includes(item.ft)) {
          self.$set(self.dataFrom, item.fn, (self.hasProperty(model, item.fn) ? model[item.fn] : (item.fp && item.fp.default && item.fp.default !== 0 ? item.fp.default : 0)))
        } else if (['demonstration', 'checkbox'].includes(item.ft)) {
          // 实现form编辑
          let a = (self.hasProperty(model, item.fn) ? JSON.parse(model[item.fn]) : (item.fp && item.fp.default && item.fp.default.length ? item.fp.default : []))
          self.$set(self.dataFrom, item.fn, a)
        }  else if (['upload'].includes(item.ft)) {
          // 实现form编辑
          let a = (self.hasProperty(model, item.fn) ? model[item.fn] : (item.fp && item.fp.default && item.fp.default.length ? item.fp.default : []))
          console.log('@@@a', a)
          self.$set(self.dataFrom, item.fn, a)
        }else {
          // 实现form编辑
          self.$set(self.dataFrom, item.fn, (self.hasProperty(model, item.fn) ? model[item.fn] : (item.fp && item.fp.default ? item.fp.default : '')))
        }
      })
      self.initValidator(self.fields)
    },
    initValidator (newVal) {
      let rule = {}
      newVal.forEach(item => {
        item.val ? (rule[item.fn] = self.cusValidate.getRules(item.val)) : null
      })
      this.rules = rule
    },
    hasProperty(data, key) {
      return Object.hasOwnProperty.call(data, key)
    },
    uploadData (col, eventName, data) {
      if (eventName === 'upload') {
        this.dataFrom[col] = [...this.dataFrom[col],...data]
      } else if ( eventName === 'upload:delete'){
      } else if ( eventName === 'upload:error'){
        this.$message()
      }
      console.log(this.dataFrom[col])
    },
    close() {
      this.$emit('closeDialog')
    },
    submit () {
      console.log('@@@submit=>', this.dataFrom)
      this.$refs['dataFrom'].validate((valid) => {
        if (valid) {
          const id = this.parentId ? this.parentId : this.dataFrom.id
          if(['addNode', 'editNode'].includes(this.operation)) {
            self.onSubmitNode(id, this.dataFrom)
          } else {
            self.onSubmit(this.dataFrom)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.form_label_styel {
  width: 80%; float:left;
}

.form_slisder >>> .el-slider__marks-text {
  font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
  margin-top: 5px;
  top: -50%;
  color: #409EFF;
  font-size: 100%;
  width: fit-content;
}

::v-deep.dialog-footer{
  text-align: center;
}

</style>
