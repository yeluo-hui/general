let formData = [{
    "val": [{"msg": "请选择时间!", "isRequired": true}],
    "fn": "dateRange",
    "fp": {"unlink-panels": false, "format": "yyyy-MM-dd", "type": "daterange", "align": "right"},
    "cn": "日期范围",
    "id": 1,
    "ft": "date_range"
}, {
    "val": [{"msg": "请选择数据!", "isRequired": true}],
    "fn": "demonstrationType",
    "fp": {
        "filterable": false,
        "default": {"label": "顶部导航", "value": "dingbudaohang"},
        "clearable": false,
        "collapse_tags": false,
        "placeholder": "试试搜索：指南",
        "props": {"multiple": true}
    },
    "cn": "级联选择",
    "id": 2,
    "ft": "demonstration"
}, {
    "val": [{"msg": "请选择时间!", "isRequired": true}],
    "fn": "dateType",
    "fp": {"format": "yyyy-MM-dd", "placeholder": "选择日期", "type": "date", "align": "right"},
    "cn": "日期",
    "id": 3,
    "ft": "date"
}, {
    "val": [{"msg": "不能为空!", "isRequired": true}],
    "fn": "uploadType",
    "fp": {"default": [], "size": "0", "limit": "3", "accept": []},
    "cn": "上传路径",
    "id": 4,
    "ft": "upload"
}, {
    "val": [{"msg": "请选择时间!", "isRequired": true}],
    "fn": "timeType",
    "fp": {"placeholder": "选择时间", "type": "date"},
    "cn": "时间",
    "id": 5,
    "ft": "time"
}, {
    "val": [{"msg": "不能为空!", "isRequired": true}],
    "fn": "textType",
    "fp": {"default": "张三", "min": "10", "max": "30", "placeholder": "请输入内容"},
    "cn": "text类型",
    "id": 6,
    "ft": "text"
}, {"fn": "creatTime", "cn": "创建时间", "id": 7, "ft": "datetime"}, {
    "fn": "id",
    "cn": "主键",
    "id": 8
}, {
    "val": [{"msg": "请选择数据!", "isRequired": true}],
    "fn": "checkboxType",
    "fp": {"default": ["复选框 A"], "size": "small"},
    "cn": "多选",
    "id": 9,
    "ft": "checkbox"
}, {
    "val": [{"msg": "不能为空!", "isRequired": true}],
    "fn": "compositeType",
    "fp": {"default": "根据文本内容自动进行调整", "min": 10, "max": 100, "placeholder": "请输入内容", "slot": "prepend"},
    "cn": "复合文本框",
    "id": 10,
    "ft": "composite"
}, {
    "val": [{"msg": "请选择颜色!", "isRequired": true}],
    "fn": "colorType",
    "fp": {
        "default": "#409EFF",
        "color-format": "rgb",
        "show_alpha": false,
        "size": "small",
        "predefine_colors": ["#ff4500", "#ff8c00", "#ffd700"]
    },
    "cn": "颜色选择器",
    "id": 11,
    "ft": "color"
}, {
    "val": [{"msg": "请选择数据!", "isRequired": true}],
    "fn": "selectType",
    "fp": {
        "filterable": false,
        "default": "选项2",
        "default_first_option": false,
        "size": "mini",
        "allow_create": false,
        "options": [],
        "reserve_keyword": false,
        "multiple": false,
        "collapse_tags": false,
        "remote": false
    },
    "cn": "选择器",
    "id": 12,
    "ft": "select"
}, {
    "val": [{"msg": "不能为空!", "isRequired": true}],
    "fn": "numberType",
    "fp": {
        "default": 1,
        "min": "1",
        "size": "small",
        "max": "10",
        "laber": "描述文字",
        "step": "0.01",
        "position": "right"
    },
    "cn": "数字",
    "id": 13,
    "ft": "number"
}, {
    "val": [{"msg": "不能为空!", "isRequired": true}],
    "fn": "textareaType",
    "fp": {"default": "根据文本内容自动进行调整", "min": 10, "max": 100, "placeholder": "请输入内容"},
    "cn": "文本域",
    "id": 14,
    "ft": "textarea"
}, {
    "fn": "switchType",
    "fp": {
        "default": 0,
        "inactive": {"color": "#ff4949", "text": "按年付费", "value": 1},
        "active": {"color": "#13ce66", "text": "按月付费", "value": 0}
    },
    "cn": "开关",
    "id": 15,
    "ft": "switch"
}, {
    "val": [{"msg": "请评分!", "isRequired": true}],
    "fn": "rateType",
    "fp": {
        "default": 2,
        "show_text": false,
        "show_score": false,
        "iconClasses": ["icon-rate-face-1", "icon-rate-face-2", "icon-rate-face-3"],
        "colors": ["#99A9BF", "#F7BA2A", "#FF9900"]
    },
    "cn": "评分",
    "id": 16,
    "ft": "rate"
}, {"fn": "updateTime", "cn": "修改时间", "id": 17, "ft": "datetime"}, {
    "val": [{"msg": "不能为空!", "isRequired": true}],
    "fn": "passwordType",
    "fp": {"default": "abcd123456", "min": "10", "max": "20", "placeholder": "请输入密码"},
    "cn": "密码",
    "id": 18,
    "ft": "password"
}, {
    "val": [{"msg": "请选择时间!", "isRequired": true}],
    "fn": "timeRange",
    "fp": {"arrow-control": false, "placeholder": "选择时间范围"},
    "cn": "时间范围",
    "id": 19,
    "ft": "time_range"
}, {
    "val": [{"msg": "请选择时间!", "isRequired": true}],
    "fn": "datetimeType",
    "fp": {"format": "yyyy-MM-dd HH:mm:ss", "placeholder": "选择日期时间", "type": "datetime", "align": "right"},
    "cn": "日期时间",
    "id": 20,
    "ft": "datetime"
}, {
    "val": [{"msg": "不能为空!", "isRequired": true}],
    "fn": "sliderType",
    "fp": {
        "default": 3,
        "show_input": false,
        "min": 1,
        "max": 10,
        "show_stops": false,
        "range": true,
        "step": 1,
        "vertical": false
    },
    "cn": "滑块",
    "id": 21,
    "ft": "slider"
}, {
    "val": [{"msg": "请选择时间!", "isRequired": true}],
    "fn": "dateTimeRange",
    "fp": {"unlink-panels": false, "format": "yyyy-MM-dd HH:mm:ss", "type": "datetimerange"},
    "cn": "日期时间范围",
    "id": 22,
    "ft": "datetime_range"
}, {
    "val": [{"msg": "请选择数据!", "isRequired": true}],
    "fn": "radioType",
    "fp": {"default": "3", "min": "1", "size": "small", "max": "2"},
    "cn": "单选组合",
    "id": 23,
    "ft": "radio"
},{
    "val": [{"msg": "不能为空!", "isRequired": true}],
    "fn": "richTextType",
    "fp": {"default": "", "placeholder": "富文本编辑器"},
    "cn": "富文本编辑器",
    "id": 24,
    "ft": "rich_text"
}]

let listData = [{
    "numberType": 1,
    "switchType": 0,
    "checkboxType": "[\"复选框 A\"]",
    "dateRange": "[\"2022-04-11\", \"2022-04-12\"]",
    "timeType": "11:30:36",
    "textType": "张三",
    "updateTime": "2022-04-11T11:30:41",
    "textareaType": "根据文本内容自动进行调整",
    "colorType": "#409EFF",
    "rateType": 2,
    "dateType": "2022-04-11",
    "datetimeType": "2022-04-11T11:30:36",
    "sliderType": 3,
    "creatTime": "2022-04-11T11:30:41",
    "uploadType": [],
    "dateTimeRange": "[\"2022-04-11 11:30:36\", \"2022-04-12 11:30:36\"]",
    "passwordType": "abcd123456",
    "selectType": "选项2",
    "id": "018ba8264a5ffe30bf799fdb7c472094",
    "demonstrationType": "[\"zujian\", \"form\", \"checkbox\"]",
    "radioType": "3",
    "compositeType": "根据文本内容自动进行调整",
    "timeRange": "[\"11:30:36\", \"12:30:36\"]",
    "richTextType": '<p>This</p>'
}, {
    "numberType": 4,
    "switchType": 1,
    "checkboxType": "[\"复选框 A\", \"复选框 B\", \"复选框 C\"]",
    "dateRange": "[\"2022-04-21\", \"2022-04-22\"]",
    "timeType": "08:28:40",
    "textType": "121212",
    "updateTime": "2022-04-07T16:26:46",
    "textareaType": "根据文本内容自动进行调整",
    "colorType": "#A0331D",
    "rateType": 4,
    "dateType": "2022-03-02",
    "datetimeType": "2022-04-07T16:26:38",
    "sliderType": 1,
    "creatTime": "2022-04-05T00:00:00",
    "uploadType": [],
    "dateTimeRange": "[\"2022-04-21 00:00:00\", \"2022-04-22 00:00:00\"]",
    "passwordType": "abcd1234561212",
    "selectType": "选项1",
    "id": "1176b6cf2a184333581a639c1a046ee6",
    "demonstrationType": "[\"zujian\", \"data\", \"progress\"]",
    "radioType": "1",
    "compositeType": "根据文本内容自动进行调整",
    "timeRange": "[\"16:28:40\", \"23:40:47\"]",
    "richTextType": '<p>This is just a boring paragraph</p>'
}, {
    "numberType": 1,
    "switchType": 0,
    "checkboxType": "[\"复选框 A\"]",
    "dateRange": "[\"2022-04-07\", \"2022-04-08\"]",
    "timeType": "13:56:06",
    "textType": "2",
    "updateTime": "2022-04-07T13:56:12",
    "textareaType": "根据文本内容自动进行调整",
    "colorType": "#0E5BAA",
    "rateType": 2,
    "dateType": "2022-04-07",
    "datetimeType": "2022-04-07T15:39:47",
    "sliderType": 1,
    "creatTime": "2022-04-07T13:56:06",
    "uploadType": [],
    "dateTimeRange": "[\"2022-04-07 13:56:06\", \"2022-04-08 13:56:06\"]",
    "passwordType": "abcd123456",
    "selectType": "选项2",
    "id": "29ce96ae490be41cb2eda3c96fb8e2ab",
    "demonstrationType": "[\"zujian\", \"form\", \"input\"]",
    "radioType": "3",
    "compositeType": "根据文本内容自动进行调整",
    "timeRange": "[\"13:56:06\", \"14:56:06\"]",
    "richTextType": '<p>This is just a boring paragraph</p>'
}, {
    "numberType": 1,
    "switchType": 0,
    "checkboxType": "[\"复选框 A\"]",
    "dateRange": "[\"2022-04-06\", \"2022-04-07\"]",
    "timeType": "17:20:10",
    "textType": "3",
    "updateTime": "2022-04-06T05:20:15",
    "textareaType": "根据文本内容自动进行调整",
    "colorType": "#409EFF",
    "rateType": 2,
    "dateType": "2022-04-06",
    "datetimeType": "2022-04-07T15:39:47",
    "sliderType": 1,
    "creatTime": "2022-04-06T05:20:15",
    "uploadType": [],
    "dateTimeRange": "[\"2022-04-06 17:20:10\", \"2022-04-07 17:20:10\"]",
    "passwordType": "abcd123456",
    "selectType": "选项2",
    "id": "2ac941d19919558d3583f32b811b03d7",
    "demonstrationType": "[\"zujian\", \"form\", \"checkbox\"]",
    "radioType": "3",
    "compositeType": "根据文本内容自动进行调整",
    "timeRange": "[\"17:20:10\", \"18:20:10\"]",
    "richTextType": '<p>This is just a boring paragraph</p>'
}, {
    "numberType": 1,
    "switchType": 0,
    "checkboxType": "[\"复选框 A\"]",
    "dateRange": "[\"2022-04-07\", \"2022-04-08\"]",
    "timeType": "11:52:47",
    "textType": "4",
    "updateTime": "2022-04-11T11:30:35",
    "textareaType": "根据文本内容自动进行调整",
    "colorType": "#409EFF",
    "rateType": 2,
    "dateType": "2022-04-07",
    "datetimeType": "2022-04-07T15:39:48",
    "sliderType": 3,
    "creatTime": "2022-04-07T11:52:53",
    "uploadType": [],
    "dateTimeRange": "[\"2022-04-07 11:52:47\", \"2022-04-08 11:52:47\"]",
    "passwordType": "abcd123456",
    "selectType": "选项2",
    "id": "2f13619e9883f807d4f103d1bd6846d2",
    "demonstrationType": "[\"zhinan\", \"daohang\", \"dingbudaohang\"]",
    "radioType": "3",
    "compositeType": "根据文本内容自动进行调整",
    "timeRange": "[\"11:52:47\", \"12:52:47\"]",
    "richTextType": '<p>This is just a boring paragraph</p>'
}, {
    "numberType": 1,
    "switchType": 0,
    "checkboxType": "[\"复选框 A\"]",
    "dateRange": "[\"2022-04-06\", \"2022-04-07\"]",
    "timeType": "11:30:23",
    "textType": "张三",
    "updateTime": "2022-04-11T11:30:28",
    "textareaType": "根据文本内容自动进行调整",
    "colorType": "#409EFF",
    "rateType": 2,
    "dateType": "2022-04-11",
    "datetimeType": "2022-04-11T11:30:23",
    "sliderType": 1,
    "creatTime": "2022-04-11T11:30:28",
    "uploadType": [],
    "dateTimeRange": "[\"2022-04-06 10:49:33\", \"2022-04-07 10:49:33\"]",
    "passwordType": "abcd123456",
    "selectType": "选项2",
    "id": "45ce4a892bb11f8615df2d199076c496",
    "demonstrationType": "[\"zhinan\", \"shejiyuanze\", \"fankui\"]",
    "radioType": "3",
    "compositeType": "根据文本内容自动进行调整",
    "timeRange": "[\"10:49:33\", \"11:49:33\"]",
    "richTextType": '<p>This is just a boring paragraph</p>'
}, {
    "numberType": 1,
    "switchType": 0,
    "checkboxType": "[\"复选框 A\"]",
    "dateRange": "[\"2022-04-06\", \"2022-04-07\"]",
    "timeType": "10:49:33",
    "textType": "6",
    "updateTime": "2022-04-06T10:50:02",
    "textareaType": "根据文本内容自动进行调整",
    "colorType": "#409EFF",
    "rateType": 2,
    "dateType": "2022-04-06",
    "datetimeType": "2022-04-07T15:39:49",
    "sliderType": 1,
    "creatTime": "2022-04-06T10:49:33",
    "uploadType": [{"name":"sample.docx","lastModified":"1565232623243","sizeText":"3 KB","size":3028,"type":"application/pdf","ext":"docx","url":"D:/upload/20220415/a254403a1a9b0c84a13323ec40f6a7d1/1649995514580.doc"}],
    "dateTimeRange": "[\"2022-04-06 10:49:33\", \"2022-04-07 10:49:33\"]",
    "passwordType": "abcd123456",
    "selectType": "选项2",
    "id": "500f820f386c4c979c5f0ca69534a90f",
    "demonstrationType": "[\"zhinan\", \"daohang\", \"dingbudaohang\"]",
    "radioType": "3",
    "compositeType": "根据文本内容自动进行调整",
    "timeRange": "[\"10:49:33\", \"11:49:33\"]",
    "richTextType": '<p>This is just a boring paragraph</p>'
}, {
    "numberType": 1,
    "switchType": 0,
    "checkboxType": "[\"复选框 A\"]",
    "dateRange": "[\"2022-04-06\", \"2022-04-07\"]",
    "timeType": "17:20:21",
    "textType": "7",
    "updateTime": "2022-04-06T17:20:22",
    "textareaType": "根据文本内容自动进行调整",
    "colorType": "#409EFF",
    "rateType": 2,
    "dateType": "2022-04-06",
    "datetimeType": "2022-04-07T15:39:50",
    "sliderType": 3,
    "creatTime": "2022-04-06T17:20:21",
    "uploadType": [],
    "dateTimeRange": "[\"2022-04-06 17:20:21\", \"2022-04-07 17:20:21\"]",
    "passwordType": "abcd123456",
    "selectType": "选项2",
    "id": "51ba70fa5e0a575ea7d8c968f80b75f5",
    "demonstrationType": "[\"zujian\", \"form\", \"input\"]",
    "radioType": "3",
    "compositeType": "根据文本内容自动进行调整",
    "timeRange": "[\"17:20:21\", \"18:20:21\"]",
    "richTextType": '<p>This is just a boring paragraph</p>'
}, {
    "numberType": 1,
    "switchType": 0,
    "checkboxType": "[\"复选框 A\"]",
    "dateRange": "[\"2022-04-11\", \"2022-04-12\"]",
    "timeType": "14:18:52",
    "textType": "张三12",
    "updateTime": "2022-04-11T02:14:15",
    "textareaType": "根据文本内容自动进行调整",
    "colorType": "#409EFF",
    "rateType": 2,
    "dateType": "2022-04-12",
    "datetimeType": "2022-04-26T14:13:52",
    "sliderType": 1,
    "creatTime": "2022-04-11T02:14:15",
    "uploadType": [{"name":"sample.docx","lastModified":"1565232623243","sizeText":"3 KB","size":3028,"type":"application/pdf","ext":"docx","url":"D:/upload/20220415/a254403a1a9b0c84a13323ec40f6a7d1/1649995514580.doc"}],
    "dateTimeRange": "[\"2022-04-29 00:00:00\", \"2022-04-30 00:00:00\"]",
    "passwordType": "abcd123456",
    "selectType": "选项2",
    "id": "640b941d3b2ae6b4c2ecdad759e831f6",
    "demonstrationType": "[\"zhinan\", \"daohang\", \"dingbudaohang\"]",
    "radioType": "2",
    "compositeType": "根据文本内容自动进行调整",
    "timeRange": "[\"14:13:55\", \"15:13:52\"]",
    "richTextType": '<p>This is just a boring paragraph</p>'
}, {
    "numberType": 1,
    "switchType": 0,
    "checkboxType": "[\"复选框 A\"]",
    "dateRange": "[\"2022-04-07\", \"2022-04-08\"]",
    "timeType": "13:30:51",
    "textType": "8",
    "updateTime": "2022-04-07T01:30:57",
    "textareaType": "根据文本内容自动进行调整",
    "colorType": "#409EFF",
    "rateType": 2,
    "dateType": "2022-04-07",
    "datetimeType": "2022-04-07T15:39:51",
    "sliderType": 3,
    "creatTime": "2022-04-07T01:30:57",
    "uploadType": [{"name":"sample.docx","lastModified":"1565232623243","sizeText":"3 KB","size":3028,"type":"application/pdf","ext":"docx","url":"D:/upload/20220415/a254403a1a9b0c84a13323ec40f6a7d1/1649995514580.doc"}],
    "dateTimeRange": "[\"2022-04-07 13:30:51\", \"2022-04-08 13:30:51\"]",
    "passwordType": "abcd123456",
    "selectType": "选项2",
    "id": "73b9d06295d71128365520ce229d3bc9",
    "demonstrationType": "[\"zhinan\", \"shejiyuanze\", \"fankui\"]",
    "radioType": "3",
    "compositeType": "根据文本内容自动进行调整",
    "timeRange": "[\"13:30:51\", \"14:30:51\"]",
    "richTextType": '<p>This is just a boring paragraph</p>'
}]


let singleData = {
    "numberType": 4,
    "switchType": 1,
    "checkboxType": "[\"复选框 A\", \"复选框 B\", \"复选框 C\"]",
    "dateRange": "[\"2022-04-21\", \"2022-04-22\"]",
    "timeType": "08:28:40",
    "textType": "121212",
    "updateTime": "2022-04-07T16:26:46",
    "textareaType": "根据文本内容自动进行调整",
    "colorType": "#A0331D",
    "rateType": 4,
    "dateType": "2022-03-02",
    "datetimeType": "2022-04-07T16:26:38",
    "sliderType": 1,
    "creatTime": "2022-04-05T00:00:00",
    "uploadType": [{"name":"sample.docx","lastModified":"1565232623243","sizeText":"3 KB","size":3028,"type":"application/pdf","ext":"docx","url":"D:/upload/20220415/a254403a1a9b0c84a13323ec40f6a7d1/1649995514580.doc"}],
    "dateTimeRange": "[\"2022-04-21 00:00:00\", \"2022-04-22 00:00:00\"]",
    "passwordType": "abcd1234561212",
    "selectType": "选项1",
    "id": "1176b6cf2a184333581a639c1a046ee6",
    "demonstrationType": "[\"zujian\", \"data\", \"progress\"]",
    "radioType": "1",
    "compositeType": "根据文本内容自动进行调整",
    "timeRange": "[\"16:28:40\", \"23:40:47\"]",
    "richTextType": '<h2> there,</h2><p>this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:</p><ul><li>That’s a bullet list with one …</li><li>… or two list items.</li></ul><p>Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:</p><pre><code class="language-css">body {display: none;}</code></pre><p>I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t </p><blockquote>Wow, that’s amazing. Good work, boy! 👏<br />— Mom</blockquote>'
}

let listData1 = [{
    "numberType": 1,
    "switchType": 0,
    "checkboxType": "[\"复选框 A\",\"复选框 B\"]",
    "dateRange": "[\"2022-02-01\",\"2022-02-02\"]",
}]


let success = "执行成功"

export default {

    'post|/formType/form': option => {
        return {
            code: 200,
            message: success,
            data: formData
        }
    },


    'post|/formType/list': option => {
        return {
            code: 200,
            total: 10,
            message: success,
            data: listData
        }
    },

    'post|/formType/add': option => {
        return {
            code: 200,
            message: success,
            result: "共1行受到到影响"
        }
    },

    'post|/formType/del': option => {
        return {
            code: 200,
            message: success,
            result: "共1行受到到影响"
        }
    },

    'post|/formType/update': option => {
        return {
            code: 200,
            message: success,
            result: "共1行受到到影响"
        }
    },

    'post|/formType/get': option => {
        const res = listData.filter( item => {
            return  item.id === JSON.parse(option.body).filters[0].fv
        })
        return {
            code: 200,
            message: success,
            data: res[0]
        }
    }
}
