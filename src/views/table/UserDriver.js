import TableDriver from '@/components/rdtable/table-driver'
import { get, form, update, add, del, list} from '@/api/user'
import { orderCall } from '@/components/rdtable/tools/util'

export default class UserDriver extends TableDriver {
  onInit (table) {

    super.onAction([])

    super.onInit(table)
    console.log('@@@onInit')
    // eslint-disable-next-line camelcase
    var fun_get = super.onAskForm(form({}))

    // eslint-disable-next-line camelcase
    var fun_list = super.onAskList(list(this.listQuery))

    orderCall(fun_get, fun_list)
  }

  onGet (id) {
    let param = {'filters': [{'fn': 'id', 'fv': id, 'op': '='}]}
    return get(param)
  }

  onDel (id) {
    let param = {'filters': [{'fn': 'id', 'fv': id, 'op': '='}]}
    return del(param)
  }

  onAdd (model) {
    return add(model)
  }

  onUpdate (model) {
    model.filters = [{'fn': 'id', 'fv': model.id, 'op': '='}]
    return update(model)
  }

  onList (listQuery) {
    return list(listQuery)
  }

  getCheck() {
    return super.getCheck();
  }
}
