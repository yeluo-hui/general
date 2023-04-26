import ListDriver from '@/components/rdtable/list-driver'
import { parse } from "@/api/list";
import { orderCall } from '@/components/rdtable/tools/util'

export default class listParseDriver extends ListDriver {
  onInit(list) {

    super.onInit(list).onPageVis(false)

    var fun_getList = super.onAskList(parse(this.listQuery))

    orderCall( fun_getList)
  }
}
