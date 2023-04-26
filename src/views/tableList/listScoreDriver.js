import ListDriver from '@/components/rdtable/list-driver'
import { score } from "@/api/list";
import { orderCall } from '@/components/rdtable/tools/util'

export default class ListScoreDriver extends ListDriver {
  onInit(list) {

    super.onInit(list)

    var fun_getList = super.onAskList(score(this.listQuery))

    orderCall( fun_getList)
  }
}
