import ListDriver from '@/components/rdtable/list-driver'
import { question } from "@/api/list";
import { orderCall } from '@/components/rdtable/tools/util'

export default class ListQuestionDriver extends ListDriver {
  onInit(list) {

    let action = [{action: 'info', label: '详情'}]
    super.onAction(action)

    super.onInit(list).onPageVis(false)


    var fun_getList = super.onAskList(question(this.listQuery))

    orderCall( fun_getList)
  }
}
