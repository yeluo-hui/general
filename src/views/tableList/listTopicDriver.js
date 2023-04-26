import ListDriver from '@/components/rdtable/list-driver'
import { topic } from "@/api/list";
import { orderCall } from '@/components/rdtable/tools/util'

export default class ListTopicDriver extends ListDriver {
  onInit(list) {

    let action = [{action: 'info', label: '详情'}]
    super.onAction(action)

    super.onInit(list).onPageVis(false)


    var fun_getList = super.onAskList(topic(this.listQuery))

    orderCall( fun_getList)
  }
}
