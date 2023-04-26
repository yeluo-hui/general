import TreeDriver from "@/components/rdtable/cus-tree/tree-driver";
import { orderCall } from '@/components/rdtable/tools/util'
import { getTreeList } from "@/api/ldsc";

export default class extends TreeDriver {
  onInit(tree, data) {

    super.onInit(tree)
    // 添加属性options 与属性别名一致

    var fun_getList = super.onAskList(getTreeList(data))

    orderCall(fun_getList)
  }

  onList(data) {
     return getTreeList(data);
  }

}
