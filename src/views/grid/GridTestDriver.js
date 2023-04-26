import GridDriver from "@/components/rdtable/grid-driver";
import { orderCall } from '@/components/rdtable/tools/util'
import { list } from '@/api/grid'


export default class GridTestDriver extends GridDriver {
  onInit(grid) {

    super.onInit(grid)

    // 添加属性options 与属性别名一致
    var fun_getList = super.onAskList(list(this.listQuery))

    orderCall(fun_getList)
  }

  onGet(id) {
    // let param = {'filters': [{'fn': 'id', 'fv': id, 'op': '='}]}
    // return getFormType(param)
  }

  onDel(id) {
    // let param = {'filters': [{'fn': 'id', 'fv': id, 'op': '='}]}
    // return delFormType(param)
  }

  onAdd(model) {
    // return addFormType(model)
  }

  onUpdate(model) {
    // model.filters = [{'fn': 'id', 'fv': model.id, 'op': '='}]
    // return updateFormType(model)
  }

  onList(listQuery) {
    return list(listQuery)
  }


  onForm() {
    let formData = []

    super.onForm(formData)
  }
}
