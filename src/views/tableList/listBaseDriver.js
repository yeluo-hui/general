import ListDriver from '@/components/rdtable/list-driver'
import {formFormType, getFormType, delFormType, updateFormType, addFormType} from '@/api/formType'
import { score } from "@/api/list";
import {demonstrationOptions, selectOptions} from '@/api/options'
import { orderCall } from '@/components/rdtable/tools/util'

export default class ListBaseDriver extends ListDriver {
  onInit(list) {
    /*
    * 添加操作按钮
    * action = [] 不显示操作按钮
    * action = [{action: 'info', label: '详情'}] 添加操作
    * null 默认编辑和删除操作
    * */
    let action = [{action: 'info', label: '详情'}]
    super.onAction(action)

    super.onInit(list)
    // 通过端口查询jsonForm
    // eslint-disable-next-line camelcase
    // 动态写入jsonForm
    // var fun_getForm = super.onAskForm(this.onForm())

    this.initRadio()
    this.initCheckbox()

    // 添加属性options 与属性别名一致
    var fun_getOption1 = super.onAskOptions('demonstrationType', demonstrationOptions())

    var fun_getOption2 = super.onAskOptions('selectType', selectOptions())

    var fun_getList = super.onAskList(score(this.listQuery))

    orderCall( fun_getOption1, fun_getOption2, fun_getList)
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
    return score(listQuery)
  }

  onAction() {
    super.onAction([{action: 'del', label: '删除'}])
  }

  onForm() {
    let formData = []
    super.onForm(formData)
  }
}
