import ListDriver from '@/components/rdtable/list-driver'
import { orderCall } from '@/components/rdtable/tools/util'
import { getCatalog } from "@/api/list";

export default class listCourseDriver extends ListDriver {
  onInit(list, id) {
    /*
    * 添加操作按钮
    * action = [] 不显示操作按钮
    * action = [{action: 'info', label: '详情'}] 添加操作
    * null 默认编辑和删除操作
    * */
    super.onInit(list)

    let action = null
    super.onAction()

    // 添加属性options 与属性别名一致

    var fun_getList = super.onAskList(getCatalog({"id": id}))

    orderCall(fun_getList)
  }

}
