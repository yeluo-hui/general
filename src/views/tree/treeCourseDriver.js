import TreeDriver from "@/components/rdtable/cus-tree/tree-driver";
import { orderCall } from '@/components/rdtable/tools/util'
import { getCatalogTree } from "@/api/tree";

export default class TreeCourseDriver extends TreeDriver {
  onInit(tree, id) {

    super.onInit(tree)
    // 添加属性options 与属性别名一致

    var fun_getList = super.onAskList(getCatalogTree({"id": id}))

    orderCall(fun_getList)
  }

}
