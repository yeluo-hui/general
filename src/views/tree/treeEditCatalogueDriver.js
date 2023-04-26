import TreeDriver from "@/components/rdtable/cus-tree/tree-driver";
import { orderCall } from '@/components/rdtable/tools/util'
import { catalogTeacher } from "@/api/tree";
import {addFormType, delFormType, updateFormType} from "@/api/formType";

export default class TreeEditCatalogueDriver extends TreeDriver {
  onInit(tree, id) {

    super.onInit(tree)
    // 添加属性options 与属性别名一致

    var fun_getList = super.onAskList(catalogTeacher({"id": id}))

    orderCall(fun_getList)
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

}
