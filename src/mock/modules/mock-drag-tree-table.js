
let success = "执行成功"

let data = [{
    "val": [{"msg": "不能为空!", "isRequired": true}],
    "fn": "sex",
    "fp": {
        "default": 1,
        "inactive": {"color": "#ff4949", "text": "男", "value": 2},
        "active": {"color": "#13ce66", "text": "女", "value": 1}
    },
    "cn": "性别",
    "id": 1,
    "ft": "switch"
}, {
    "val": [{"msg": "不能为空!", "isRequired": true}],
    "fn": "password",
    "fp": {"default": "abcd123456", "min": "10", "max": "20", "placeholder": "请输入密码"},
    "cn": "密码",
    "id": 2,
    "ft": "password"
}, {
    "val": [{"msg": "不能为空!", "isRequired": true}],
    "fn": "updateTime",
    "cn": "更新时间",
    "id": 3,
    "ft": "datetime"
}, {
    "val": [{"msg": "不能为空!", "isRequired": true}],
    "fn": "createTime",
    "cn": "创建时间",
    "id": 4,
    "ft": "datetime"
}, {"fn": "id", "cn": "主键", "id": 5}, {
    "val": [{"msg": "请选择时间!", "isRequired": true}],
    "fn": "birth",
    "fp": {"format": "yyyy-MM-dd HH:mm:ss", "placeholder": "选择日期时间", "type": "datetime", "align": "right"},
    "cn": "生日",
    "id": 5,
    "ft": "datetime"
}, {
    "val": [{"msg": "不能为空!", "isRequired": true}],
    "fn": "name",
    "fp": {"default": "张三", "min": "10", "max": "30", "placeholder": "请输入内容"},
    "cn": "用户名",
    "id": 6,
    "ft": "text"
}]

let list = [{
    // "order": 0,
    "password": "a",
    "parentId": "",
    "createTime": "2022-04-28T17:01:47",
    "sex": 1,
    // "open": true,
    "name": "luo",
    "birth": "2022-04-10T17:02:05",
    "updateTime": "2022-04-07T17:02:11",
    "id": "0fb5a57fa0cf815cd36fe77faee1e1e3",
    "children":[ {
        // "order": 0,
        "parentId": "0fb5a57fa0cf815cd36fe77faee1e1e3",
        "password": "as",
        "createTime": "2022-04-07T04:01:08",
        "sex": 0,
        "name": "ye",
        "birth": "2022-04-07T16:01:07",
        "updateTime": "2022-04-07T04:01:08",
        "id": "127754f37921e22e547f582b076654f4",
        "children":[]
    }, {
        // "order": 1,
        "parentId": "0fb5a57fa0cf815cd36fe77faee1e1e3",
        "password": "a2",
        "createTime": "2022-04-07T05:01:22",
        "sex": 0,
        "name": "ian",
        "birth": "2022-04-28T00:00:00",
        "updateTime": "2022-04-07T05:01:22",
        "id": "18ff1283f9d7b48abf1458de7ec6dcf8",
        "children":[{
            // "order": 0,
            "parentId": "18ff1283f9d7b48abf1458de7ec6dcf8",
            "password": "d",
            "createTime": "2022-04-07T04:22:18",
            "sex": 1,
            "name": "zenais",
            "birth": "2022-04-07T16:22:03",
            "updateTime": "2022-04-07T04:22:18",
            "id": "237eaec133ab7b460771bab57fa1e0bb",
            "children":[{
                // "order": 0,
                "parentId": "237eaec133ab7b460771bab57fa1e0bb",
                "password": "f",
                "createTime": "2022-04-07T04:56:54",
                "sex": 0,
                "name": "李明",
                "birth": "2022-04-07T16:56:47",
                "updateTime": "2022-04-07T04:56:54",
                "id": "28fad2cc03dcca008f30e49ff09c9ccc",
                "children":[]
            }]
        }]
    }]
},{
    // "order": 1,
    "parentId": "",
    "password": "abcd123456",
    "createTime": "2022-04-07T10:24:37",
    "sex": 0,
    "name": "李明",
    "birth": "2022-04-07T10:24:26",
    "updateTime": "2022-04-07T10:24:37",
    "id": "2debdc30002887d2acb6d37438a63ec5",
    "children":[{
        // "order": 0,
        "parentId": "2debdc30002887d2acb6d37438a63ec5",
        "password": "abcd123456",
        "createTime": "2022-04-07T10:24:40",
        "sex": 2,
        "name": "王瑶",
        "birth": "2022-04-07T10:24:40",
        "updateTime": "2022-04-07T10:24:53",
        "id": "2925ea590c60b75b396e8dd0ba83c866",
        "children":[]
    }]
}, {
    // "order": 1,
    "parentId": "",
    "password": "abcd123456",
    "createTime": "2022-04-07T04:51:07",
    "sex": 1,
    "name": "张三",
    "birth": "2022-04-07T16:51:03",
    "updateTime": "2022-04-07T04:51:07",
    "id": "58eba5f625b1448744459fb31a0ed393",
    "children":[{
        // "order": 0,
        "parentId": "58eba5f625b1448744459fb31a0ed393",
        "password": "abcd123456",
        "createTime": "2022-04-07T04:00:46",
        "sex": 1,
        "name": "张三",
        "birth": "2022-04-07T16:00:45",
        "updateTime": "2022-04-07T04:00:46",
        "id": "643458aa289d7088c83af6c712bb9e68",
        "children":[{
            // "order": 0,
            "parentId": "643458aa289d7088c83af6c712bb9e68",
            "password": "abcd123456",
            "createTime": "2022-04-07T04:58:53",
            "sex": 1,
            "name": "121212122222",
            "birth": "2022-04-07T16:59:05",
            "updateTime": "2022-04-07T16:59:13",
            "id": "68bac57320b2181acddfdbcf23d4a307",
            "children":[]
        }]
    }]
}]

let single = {
    "order": 0,
    "parentId": "643458aa289d7088c83af6c712bb9e68",
    "password": "abcd123456",
    "createTime": "2022-04-28T17:01:47",
    "sex": 1,
    "name": "张三",
    "birth": "2022-04-10T17:02:05",
    "updateTime": "2022-04-07T17:02:11",
    "id": "0fb5a57fa0cf815cd36fe77faee1e1e3"
}

export default {

    'post|/dragTree/form': option => {
        return {
            code: 200,
            message: success,
            data: data
        }
    },


    'post|/dragTree/list': option => {
        return {
            code: 200,
            total: 10,
            message: success,
            data: list
        }
    },

    'post|/dragTree/add': option => {
        return {
            code: 200,
            message: success,
            result: "共1行受到到影响"
        }
    },

    'post|/dragTree/del': option => {
        return {
            code: 200,
            message: success,
            result: "共1行受到到影响"
        }
    },

    'post|/dragTree/update': option => {
        return {
            code: 200,
            message: success,
            result: "共1行受到到影响"
        }
    },

    'post|/dragTree/get': option => {
        return {
            code: 200,
            message: success,
            data: single
        }
    }


}
