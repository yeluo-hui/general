import TableDriver from '@/components/rdtable/table-driver'
import { get, form, update, add, del, list} from '@/api/drag-tree.js'
import { orderCall } from '@/components/rdtable/tools/util'

export default class DragTreeDriver extends TableDriver {
  onInit (table) {

    super.onInit(table)

    /*
       * 添加操作按钮
       * action = [] 不显示操作按钮
       * action = [{action: 'info', label: '详情'}] 添加操作
       * null 默认编辑和删除操作
       * action = {action: 'info', label: '详情'} 显示添加得一个操作按钮
       * */
    let action = {action: 'info', label: '详情'}
    super.onAction([{action: 'info', label: '详情'}])

    console.log('@@@onInit')
    // eslint-disable-next-line camelcase
    var fun_get = super.onAskForm(form({}))

    // eslint-disable-next-line camelcase
    var fun_list = super.onAskList(list(this.listQuery))

    orderCall(fun_get, fun_list)
  }

  onGet (id) {
    let param = {'filters': [{'fn': 'id', 'fv': id, 'op': '='}]}
    return get(param)
  }

  onDel (id) {
    let param = {'filters': [{'fn': 'id', 'fv': id, 'op': '='}]}
    return del(param)
  }

  onAdd (model) {
    return add(model)
  }

  tryAddNode (model) {
    return add(model)
  }

  onUpdate (model) {
    model.filters = [{'fn': 'id', 'fv': model.id, 'op': '='}]
    return update(model)
  }

  onList (listQuery) {
    return list(listQuery)
  }

  onHighlight(s){
    return super.onHighlight(s);
  }

  onFold() {
    super.onFold();
  }
}
