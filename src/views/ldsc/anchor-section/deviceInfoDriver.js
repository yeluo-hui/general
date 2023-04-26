import TableDriver from '@/components/rdtable/table-driver'
import {orderCall} from '@/components/rdtable/tools/util'
import {ellD1, ellD2, ellD3, ellD5, ellD6, ellD7, ellD8, ellD9, ellDc, ellDe} from "@/api/ldsc";
import formJson from './formInfoJson.js'

export default class DeviceInfoDriver extends TableDriver {

    constructor() {
        super();
        this.deviceMap = new Map()
        this.acticeIndex = '1'
        this.initDevice()
    }

    initDevice(){
        this.deviceMap.set('1',{api: ellD1, json: formJson.json1})
        this.deviceMap.set('2',{api: ellD2, json: formJson.json2})
        this.deviceMap.set('3',{api: ellD3, json: formJson.json3})
        this.deviceMap.set('4',{api: ellD5, json: formJson.json4})
        this.deviceMap.set('5',{api: ellD6, json: formJson.json5})
        this.deviceMap.set('6',{api: ellD7, json: formJson.json6})
        this.deviceMap.set('7',{api: ellD8, json: formJson.json7})
        this.deviceMap.set('8',{api: ellD9, json: formJson.json8})
        this.deviceMap.set('9',{api: ellDc, json: formJson.json9})
        this.deviceMap.set('10',{api: ellDe, json: formJson.json10})
    }

    onInit(table, id, index) {
        console.log('@index==>', id)
        this.acticeIndex = index
        //获取接口
        const param = this.deviceMap.get(this.acticeIndex)

        super.onInit(table).onPageVis(false)

        let action = []
        super.onAction(action)

        // 自定义form
        var fun_getForm = super.onAskForm(this.onForm(param.json))

        // 查询数据
        var fun_getList = super.onAskList(param.api())

        orderCall(fun_getForm, fun_getList)
    }

    onList(listQuery) {
        return this.deviceMap.get(this.acticeIndex).api(listQuery)
    }

    onForm(json) {
        super.onForm(json);
    }

}
