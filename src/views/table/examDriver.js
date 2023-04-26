import TableDriver from '@/components/rdtable/table-driver'
import {orderCall} from '@/components/rdtable/tools/util'
import {examSummaryList} from "@/api/count";

export default class ExamDriver extends TableDriver {
    onInit(table) {

        super.onInit(table)

        /*
        * 添加操作按钮
        * action = [] 不显示操作按钮
        * action = [{action: 'info', label: '详情'}] 添加操作
        * null 默认编辑和删除操作
        * action = {action: 'info', label: '详情'} 显示添加得一个操作按钮
        * */
        let action = {action: 'info', label: '详情'}
        super.onAction(action)
        // 自定义form
        var fun_getForm = super.onAskForm(this.onForm())
        // 查询数据
        var fun_getList = super.onAskList(examSummaryList(this.listQuery))

        orderCall(fun_getForm, fun_getList)
    }

    onList(listQuery) {
        return examSummaryList(listQuery)
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
            'fn': 'practiceName',
            'fp': {},
            'cn': '试卷名称',
            'id': 2,
            'ft': ''
        }, {
            'val': [],
            'fn': 'accuracy',
            'fp': {},
            'cn': '正确率',
            'id': 3,
            'ft': ''
        }, {
            'val': [],
            'fn': 'examHour',
            'fp': {},
            'cn': '用时',
            'id': 4,
            'ft': ''
        }, {
            'val': [],
            'fn': 'topScore',
            'fp': {},
            'cn': '最高分',
            'id': 5,
            'ft': ''
        }, {
            'val': [],
            'fn': 'result',
            'fp': {},
            'cn': '结果',
            'id': 6,
            'ft': ''
        }, {
            'val': [],
            'fn': 'level',
            'fp': {},
            'cn': '层次',
            'id': 7,
            'ft': ''
        }, {
            'val': [],
            'fn': 'examNum',
            'fp': {},
            'cn': '考试次数',
            'id': 8,
            'ft': ''
        }]
        super.onForm(json);
    }
}
