import TableDriver from '@/components/rdtable/table-driver'
import {orderCall} from '@/components/rdtable/tools/util'
import { learnSummaryList } from "@/api/count";

export default class LearnDriver extends TableDriver {
    onInit(table) {

        super.onInit(table)

        /*
        * 添加操作按钮
        * action = [] 不显示操作按钮
        * action = [{action: 'info', label: '详情'}] 添加操作
        * null 默认编辑和删除操作
        * action = {action: 'info', label: '详情'} 显示添加得一个操作按钮
        * */
        let action = [{action: 'info', label: '详情'}]
        super.onAction(action)
        // 自定义form
        var fun_getForm = super.onAskForm(this.onForm())
        // 查询数据
        var fun_getList = super.onAskList(learnSummaryList(this.listQuery))

        orderCall(fun_getForm, fun_getList)
    }

    onList(listQuery) {
        return learnSummaryList(listQuery)
    }

    onForm() {
        let json = [{
          'val': [],
          'fn': 'id',
          'fp': {},
          'cn': '序号',
          'id': 1,
          'ft': ''
        }, {
          'val': [],
          'fn': 'paperName',
          'fp': {},
          'cn': '课程名称',
          'id': 2,
          'ft': ''
        }, {
          'val': [],
          'fn': 'totalHour',
          'fp': {},
          'cn': '学习时长',
          'id': 3,
          'ft': ''
        }, {
          'val': [],
          'fn': 'startTime',
          'fp': {},
          'cn': '开始时间',
          'id': 4,
          'ft': ''
        }, {
          'val': [],
          'fn': 'endTime',
          'fp': {},
          'cn': '结束时间',
          'id': 5,
          'ft': ''
        }, {
          'val': [],
          'fn': 'studyNum',
          'fp': {},
          'cn': '已学习次数',
          'id': 6,
          'ft': ''
        }]
        super.onForm(json);
    }
}
