import ListDriver from '@/components/rdtable/list-driver'
import { curriculum } from "@/api/list";
import { orderCall } from '@/components/rdtable/tools/util'

export default class ListCurriculumDriver extends ListDriver {
  onInit(list) {

    super.onInit(list)

    var fun_getList = super.onAskList(curriculum(this.listQuery))

    orderCall( fun_getList)
  }
}
