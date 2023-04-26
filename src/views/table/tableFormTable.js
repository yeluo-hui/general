import TableDriver from '@/components/rdtable/table-driver'
import {formFormType, listFormType, getFormType, delFormType, updateFormType, addFormType} from '@/api/formType'
import {demonstrationOptions, selectOptions} from '@/api/options'
import { orderCall } from '@/components/rdtable/tools/util'

export default class TableFormTable extends TableDriver {
  onInit(table) {
    /*
     * 添加操作按钮
     * action = [] 不显示操作按钮
     * action = [{action: 'info', label: '详情'}] 添加操作
     * null 默认编辑和删除操作
     * action = {action: 'info', label: '详情'} 显示添加得一个操作按钮
     *
     * actions = {
     *    action: [{action: 'info', label: '详情'}],
     *    formatter: Function(row){
     *
     *    }
     * }
     * */
    let action = [{action: 'info', label: '详情'},{action: 'info1', label: '详情'}]
    super.onAction(action)

    super.onInit(table)
    // 通过端口查询jsonForm
    // eslint-disable-next-line camelcase
    var fun_getForm = super.onAskForm(formFormType({}))
    // 动态写入jsonForm
    // var fun_getForm = super.onAskForm(this.onForm())

    this.initRadio()
    this.initCheckbox()

    // 添加属性options 与属性别名一致
    var fun_getOption1 = super.onAskOptions('demonstrationType', demonstrationOptions())

    var fun_getOption2 = super.onAskOptions('selectType', selectOptions())

    var fun_getList = super.onAskList(listFormType(this.listQuery))

    orderCall(fun_getForm, fun_getOption1, fun_getOption2, fun_getList)
  }

  initRadio() {
    let radioOptions = [{'id': '1', 'value': '备选1'}, {'id': '2', 'value': '备选2'}, {'id': '3', 'value': '备选3'}]
    super.setOptions('radioType', radioOptions)
  }

  initCheckbox() {
    let checkboxOptions = ['复选框 A', '复选框 B', '复选框 C']
    super.setOptions('checkboxType', checkboxOptions)
  }

  onGet(id) {
    let param = {'filters': [{'fn': 'id', 'fv': id, 'op': '='}]}
    return getFormType(param)
  }

  onDel(id) {
    let param = {'filters': [{'fn': 'id', 'fv': id, 'op': '='}]}
    return delFormType(param)
  }

  onAdd(model) {
    return addFormType(model)
  }

  onUpdate(model) {
    model.filters = [{'fn': 'id', 'fv': model.id, 'op': '='}]
    return updateFormType(model)
  }

  onList(listQuery) {
    return listFormType(listQuery)
  }

  onAction() {
    super.onAction([{action: 'del', label: '删除'}])
  }

  actionFilter(fi, row) {
    console.log('@@@@=>father-actionFilter',fi, row)
    // 过滤 aciton
    return fi.action !== 'info1'
  }

  actionEditor(et, row) {

    return et
  }

  onForm() {
    let formData = [{
      'val': [{'msg': '请选择时间!', 'isRequired': true}],
      'fn': 'dateRange',
      'fp': {'unlink-panels': false, 'format': 'yyyy-MM-dd', 'type': 'daterange', 'align': 'right'},
      'cn': '日期范围',
      'id': 1,
      'ft': 'date_range'
    }, {
      'val': [{'msg': '请选择数据!', 'isRequired': true}],
      'fn': 'demonstrationType',
      'fp': {
        'filterable': false,
        'default': {'label': '顶部导航', 'value': 'dingbudaohang'},
        'clearable': false,
        'collapse_tags': false,
        'placeholder': '试试搜索：指南',
        'props': {'multiple': true}
      },
      'cn': '级联选择',
      'id': 2,
      'ft': 'demonstration'
    }, {
      'val': [{'msg': '请选择时间!', 'isRequired': true}],
      'fn': 'dateType',
      'fp': {'format': 'yyyy-MM-dd', 'placeholder': '选择日期', 'type': 'date', 'align': 'right'},
      'cn': '日期',
      'id': 3,
      'ft': 'date'
    }, {
      'val': [{'msg': '不能为空!', 'isRequired': true}],
      'fn': 'uploadType',
      'fp': {'default': [], 'size': '0', 'limit': '3', 'accept': []},
      'cn': '上传路径',
      'id': 4,
      'ft': 'upload'
    }, {
      'val': [{'msg': '请选择时间!', 'isRequired': true}],
      'fn': 'timeType',
      'fp': {'placeholder': '选择时间', 'type': 'date'},
      'cn': '时间',
      'id': 5,
      'ft': 'time'
    }, {
      'val': [{'msg': '不能为空!', 'isRequired': true}],
      'fn': 'textType',
      'fp': {'default': '张三', 'min': '10', 'max': '30', 'placeholder': '请输入内容'},
      'cn': 'text类型',
      'id': 6,
      'ft': 'text'
    }, {'fn': 'creatTime', 'cn': '创建时间', 'id': 7, 'ft': 'datetime'}, {
      'fn': 'id',
      'cn': '主键',
      'id': 8
    }, {
      'val': [{'msg': '请选择数据!', 'isRequired': true}],
      'fn': 'checkboxType',
      'fp': {'default': ['复选框 A'], 'size': 'small'},
      'cn': '多选',
      'id': 9,
      'ft': 'checkbox'
    }, {
      'val': [{'msg': '不能为空!', 'isRequired': true}],
      'fn': 'compositeType',
      'fp': {'default': '根据文本内容自动进行调整', 'min': 10, 'max': 100, 'placeholder': '请输入内容', 'slot': 'prepend'},
      'cn': '复合文本框',
      'id': 10,
      'ft': 'composite'
    }, {
      'val': [{'msg': '请选择颜色!', 'isRequired': true}],
      'fn': 'colorType',
      'fp': {
        'default': '#409EFF',
        'color-format': 'rgb',
        'show_alpha': false,
        'size': 'small',
        'predefine_colors': ['#ff4500', '#ff8c00', '#ffd700']
      },
      'cn': '颜色选择器',
      'id': 11,
      'ft': 'color'
    }, {
      'val': [{'msg': '请选择数据!', 'isRequired': true}],
      'fn': 'selectType',
      'fp': {
        'filterable': false,
        'default': '选项2',
        'default_first_option': false,
        'size': 'mini',
        'allow_create': false,
        'options': [],
        'reserve_keyword': false,
        'multiple': false,
        'collapse_tags': false,
        'remote': false
      },
      'cn': '选择器',
      'id': 12,
      'ft': 'select'
    }, {
      'val': [{'msg': '不能为空!', 'isRequired': true}],
      'fn': 'numberType',
      'fp': {
        'default': 1,
        'min': '1',
        'size': 'small',
        'max': '10',
        'laber': '描述文字',
        'step': '0.01',
        'position': 'right'
      },
      'cn': '数字',
      'id': 13,
      'ft': 'number'
    }, {
      'val': [{'msg': '不能为空!', 'isRequired': true}],
      'fn': 'textareaType',
      'fp': {'default': '根据文本内容自动进行调整', 'min': 10, 'max': 100, 'placeholder': '请输入内容'},
      'cn': '文本域',
      'id': 14,
      'ft': 'textarea'
    }, {
      'fn': 'switchType',
      'fp': {
        'default': 0,
        'inactive': {'color': '#ff4949', 'text': '按年付费', 'value': 1},
        'active': {'color': '#13ce66', 'text': '按月付费', 'value': 0}
      },
      'cn': '开关',
      'id': 15,
      'ft': 'switch'
    }, {
      'val': [{'msg': '请评分!', 'isRequired': true}],
      'fn': 'rateType',
      'fp': {
        'default': 2,
        'show_text': false,
        'show_score': false,
        'iconClasses': ['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3'],
        'colors': ['#99A9BF', '#F7BA2A', '#FF9900']
      },
      'cn': '评分',
      'id': 16,
      'ft': 'rate'
    }, {'fn': 'updateTime', 'cn': '修改时间', 'id': 17, 'ft': 'datetime'}, {
      'val': [{'msg': '不能为空!', 'isRequired': true}],
      'fn': 'passwordType',
      'fp': {'default': 'abcd123456', 'min': '10', 'max': '20', 'placeholder': '请输入密码'},
      'cn': '密码',
      'id': 18,
      'ft': 'password'
    }, {
      'val': [{'msg': '请选择时间!', 'isRequired': true}],
      'fn': 'timeRange',
      'fp': {'arrow-control': false, 'placeholder': '选择时间范围'},
      'cn': '时间范围',
      'id': 19,
      'ft': 'time_range'
    }, {
      'val': [{'msg': '请选择时间!', 'isRequired': true}],
      'fn': 'datetimeType',
      'fp': {'format': 'yyyy-MM-dd HH:mm:ss', 'placeholder': '选择日期时间', 'type': 'datetime', 'align': 'right'},
      'cn': '日期时间',
      'id': 20,
      'ft': 'datetime'
    }, {
      'val': [{'msg': '不能为空!', 'isRequired': true}],
      'fn': 'sliderType',
      'fp': {
        'default': 3,
        'show_input': false,
        'min': 1,
        'max': 10,
        'show_stops': false,
        'range': true,
        'step': 1,
        'vertical': false
      },
      'cn': '滑块',
      'id': 21,
      'ft': 'slider'
    }, {
      'val': [{'msg': '请选择时间!', 'isRequired': true}],
      'fn': 'dateTimeRange',
      'fp': {'unlink-panels': false, 'format': 'yyyy-MM-dd HH:mm:ss', 'type': 'datetimerange'},
      'cn': '日期时间范围',
      'id': 22,
      'ft': 'datetime_range'
    }, {
      'val': [{'msg': '请选择数据!', 'isRequired': true}],
      'fn': 'radioType',
      'fp': {'default': '3', 'min': '1', 'size': 'small', 'max': '2'},
      'cn': '单选组合',
      'id': 23,
      'ft': 'radio'
    }]

    super.onForm(formData)
  }
}
