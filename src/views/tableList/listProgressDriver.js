import ListDriver from '@/components/rdtable/list-driver'
import { progress } from "@/api/list";
import { orderCall } from '@/components/rdtable/tools/util'

export default class ListProgressDriver extends ListDriver {
  onInit(list) {

    super.onInit(list)

    var fun_getList = super.onAskList(progress(this.listQuery))

    orderCall( fun_getList)
  }

}
