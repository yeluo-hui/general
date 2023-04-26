import {question} from "@/api/list";

let scores = [{
    "id": "dsaftsxcvxchrdsrxvxchfgdxfd1",
    "paperName": "25Hz相敏轨道电路",
    "img": "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
    "totalHour": 100,
    "totalScore": 100,
    "examTime": "2022年3月10日 14:30:00~2022年4月10日 14:30:00",
    "creator": "王老师",
    "creatorId": "122",
    "socre": 90.5
}, {
    "id": "dsaftsxcvxchrdsrxvxchfgdxfd1",
    "paperName": "25Hz相敏轨道电路1",
    "img": "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
    "totalHour": 100,
    "totalScore": 100,
    "examTime": "2022年4月10日 14:30:00~2022年4月10日 14:30:00",
    "creator": "刘老师",
    "creatorId": "123",
    "socre": 90
}]
let progress = [{
    "id": "dsaftsxcvxchrdsrxvxchfgdxfd1",
    "courseName": "25Hz相敏轨道电路",
    "img": "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
    "courseHour": "10.5",
    "totalCatalog": 10,
    "studyTime": "2022年3月10日~2022年4月10日",
    "progress": "0.90",
    "creator": "刘老师",
    "creatorId": "123",
}, {
    "id": "dsaftsxcvxchrdsrxvxchfgdxfd2",
    "courseName": "25Hz相敏轨道电路",
    "img": "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
    "courseHour": "10.5",
    "totalCatalog": 10,
    "studyTime": "2022年3月10日~2022年4月10日",
    "progress": "0.00",
    "creator": "刘老师",
    "creatorId": "123",
}, {
    "id": "dsaftsxcvxchrdsrxvxchfgdxfd3",
    "courseName": "25Hz相敏轨道电路",
    "img": "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
    "courseHour": "10.5",
    "totalCatalog": 10,
    "studyTime": "2022年3月10日~2022年4月10日",
    "progress": "1",
    "creator": "刘老师",
    "creatorId": "123",
}, {
    "id": "dsaftsxcvxchrdsrxvxchfgdxfd4",
    "courseName": "ZD9型高铁道岔转辙机",
    "img": "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
    "courseHour": "12",
    "totalCatalog": 10,
    "studyTime": "2022年3月10日~2022年4月10日",
    "progress": "0.90",
    "creator": "刘老师",
    "creatorId": "123",
}]
let topic = [{
    "id": "dsaftsxcvxchrdsrxvxchfgdxfd1", "title": "一、单选题（共1题 共计3.00分）", "index": "1.1", "questionType": 1,  // 1:单选 2 多选 3 判断...,
    "questionScore": 2.5, "questionStem": "25Hz相敏轨道继电器的局部线圈超前轨道线圈。", "questionContent": {
        "selection": [{
            "select": "A", "describe": "120度"
        }, {
            "select": "B", "describe": "180度"
        }, {
            "select": "C", "describe": "270度"
        }, {
            "select": "D", "describe": "90度"
        }, {
            "select": "E", "describe": "0度"
        }], "answer": ["A"]
    }, "questionSeq": 1
}, {
    "id": "dsaftsxcvxchrdsrxvxchfgdxfd1", "index": "2.1", "title": "二、多选题（共1题 共计4.00分）", "questionType": 2, //1:单选 2 多选 3 判断...,
    "questionScore": 2.5, "questionStem": "25Hz相敏轨道电路室内部分送电端设备组成。", "questionContent": {
        "selection": [{
            "select": "A", "describe": "BMT-25电源室内调整变压器"
        }, {
            "select": "B", "describe": "NGL-T室内隔离盒"
        }, {
            "select": "C", "describe": "防雷单元"
        }, {
            "select": "D", "describe": "RX限流电阻"
        }], "answer": ["A", "C"]
    }, "questionSeq": 2
}, {
    "id": "dsaftsxcvxchrdsrxvxchfgdxfd1", "index": "3.1", "title": "三、判断题（共1题 共计3.00分）", "questionType": 3, //1:单选 2 多选 3 判断...,
    "questionScore": 2.5, "questionStem": "25Hz相敏轨道电路送电端有扼流变压器时（旧型）其电阻R为3.4Ω。", "questionContent": {
        "selection": [{
            "select": "1", "describe": "对"
        }, {
            "select": "0", "describe": "错"
        }], "answer": ['0']
    }, "questionSeq": 2
}, {
    "id": "dsaftsxcvxchrdsrxvxchfgdxfd1",
    "index": "4.1",
    "title": "四、填空题（共1题 共计2.00分）",
    "questionType": 4, //1:单选 2 多选 3 判断 4 填空题,
    "questionScore": 2.5,
    "questionStem": "在电力牵引区段，当钢轨连续牵引总电流不大于_____1______、不平衡牵引电流不大于_____2______时，轨道电路保证正常工作。",
    "questionContent": {
        "selection": [{
            "select": "1", "describe": ""
        }, {
            "select": "2", "describe": ""
        }], "answer": [{
            "select": 1, "describe": "填空答案112"
        }, {
            "select": 2, "describe": "填空答案222"
        }], "required": {
            "sequence": true, "caseSensitive": false
        }
    },
    "questionSeq": 2
}, {
    "id": "dsaftsxcvxchrdsrxvxchfgdxfd1", "index": "5.1", "title": "五、实操题（共1题 共计25.00分）", "questionType": 5, //5 实操题,
    "questionScore": 2.5, "questionStem": "电特性测试（25分）", "questionContent": {
        "selection": [{
            "select": "1", "describe": "正确"
        }, {
            "select": "0", "describe": "错误"
        }], "answer": ["1"]
    }, "filePath": "http:/", "questionSeq": 2
}, {
    "id": "dsaftsxcvxchrdsrxvxchfgdxfd1", "index": "6.1", "title": "六、视频题（共1题 共计25.00分）", "questionType": 6, //6 视频题,
    "questionScore": 2.5, "questionStem": "题干", "questionContent": {}, "filePath": "http:/", "questionSeq": 2
}, {
    "id": "dsaftsxcvxchrdsrxvxchfgdxfd1", "index": "7.1", "title": "七、文本题（共1题 共计25.00分）", "questionType": 7, //7 文本题,
    "questionScore": 2.5, "questionStem": "题干", "questionContent": {}, "question_duration": 20,//时长
    "questionSeq": 2
}]
let parse = [{
    "id": "dsaftsxcv1", // 查询考试试题id
    "title": "一、单选题（共1题 共计3.00分）",
    "index": "1.1",
    "questionType": 1,  // 1:单选 2 多选 3 判断...,
    "questionScore": 2.5,
    "questionStem": "25Hz相敏轨道继电器的局部线圈超前轨道线圈",
    "questionContent": {
        "selection": [{
            "select": "A", "describe": "120度"
        }, {
            "select": "B", "describe": "180度"
        }, {
            "select": "C", "describe": "270度"
        }, {
            "select": "D", "describe": "90度"
        }], "answer": ["A"]
    },
    "questionSeq": 1,
    "studentAnswer": ["A"],
    "analysis": "区分度反映试题区分不同水平受试者的程度，即考出学生的不同水平，把优秀、一般、差三个层次的学生真正分别开。区分度高的考试，优秀、一般、差三个层次的学生都有一定比例，如果某一分数区间学生相对集中，高分太多或不及格太多的考试，区分度则低。"
}, {
    "id": "dsaftsxcv2",
    "index": "2.1",
    "title": "二、多选题（共1题 共计4.00分）",
    "questionType": 2, //1:单选 2 多选 3 判断...,
    "questionScore": 2.5,
    "questionStem": "25Hz相敏轨道电路室内部分送电端设备组成",
    "questionContent": {
        "selection": [{
            "select": "A", "describe": "BMT-25电源室内调整变压器"
        }, {
            "select": "B", "describe": "NGL-T室内隔离盒"
        }, {
            "select": "C", "describe": "防雷单元"
        }, {
            "select": "D", "describe": "RX限流电阻"
        }], "answer": ["A", "C"]
    },
    "questionSeq": 2,
    "studentAnswer": ["A", "C"],
    "analysis": "区分度反映试题区分不同水平受试者的程度，即考出学生的不同水平，把优秀、一般、差三个层次的学生真正分别开。区分度高的考试，优秀、一般、差三个层次的学生都有一定比例，如果某一分数区间学生相对集中，高分太多或不及格太多的考试，区分度则低。"
}, {
    "id": "dsaftsxcv3", "index": "3.1", "title": "三、判断题（共1题 共计3.00分）", "questionType": 3, //1:单选 2 多选 3 判断...,
    "questionScore": 2.5, "questionStem": "25Hz相敏轨道电路送电端有扼流变压器时（旧型）其电阻R为3.4Ω。", "questionContent": {
        "selection": [{
            "select": "1", "describe": "对"
        }, {
            "select": "0", "describe": "错"
        }], "answer": ["0"]
    }, "questionSeq": 2, "studentAnswer": ["1"], "analysis": "试题解析"
}, {
    "id": "dsaftsxcv4",
    "index": "4.1",
    "title": "四、填空题（共1题 共计2.00分）",
    "questionType": 4, //1:单选 2 多选 3 判断 4 填空题,
    "questionScore": 2.5,
    "questionStem": "在电力牵引区段，当钢轨连续牵引总电流不大于_____1______、不平衡牵引电流不大于_____2______时，轨道电路保证正常工作。",
    "questionContent": {
        "selection": [{
            "select": "A", "describe": ""
        }, {
            "select": "B", "describe": ""
        }, {
            "select": "C", "describe": ""
        }], "answer": [{
            "select": 1, "describe": "填空答案1"
        }, {
            "select": 2, "describe": "填空答案2"
        }, {
            "select": 3, "describe": "填空答案3"
        }], "required": {
            "sequence": true, "caseSensitive": false
        }
    },
    "questionSeq": 2,
    "studentAnswer": [{
        "select": 1, "describe": "填空答案1"
    }, {
        "select": 2, "describe": "填空答案2"
    }, {
        "select": 3, "describe": "填空答案3"
    }],
    "analysis": "试题解析"
}, {
    "id": "dsaftsxcv5", "index": "5.1", "title": "五、实操题（共1题 共计25.00分）", "questionType": 5, //5 实操题,
    "questionScore": 2.5, "questionStem": "题干", "questionContent": {
        "selection": [{
            "select": "1", "describe": "对"
        }, {
            "select": "0", "describe": "错"
        }], "answer": ["0"]
    }, "filePath": "http:/", "questionSeq": 2, "studentAnswer": ["0"], "analysis": "试题解析"
}, {
    "id": "dsaftsxcv6", "index": "6.1", "title": "六、视频题（共1题 共计25.00分）", "questionType": 6, //6 视频题,
    "questionScore": 2.5, "questionStem": "题干", "questionContent": {}, "filePath": "http:/", "questionSeq": 2
}, {
    "id": "dsaftsxcv7", "index": "7.1", "title": "七、文本题（共1题 共计25.00分）", "questionType": 7, //7 文本题,
    "questionScore": 2.5, "questionStem": "题干", "questionContent": {}, "question_duration": 20,//时长
    "questionSeq": 2
}

]

let curriculum = [{
    "courseName": "25Hz相敏轨道电路",
    "img": "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
    "id": "ODRm18cXBj7btCBb4BaiTOmGPuN0Kztv",
    "creatorId": "ODRm18cXBj7btCBb4BaiTOmGPuN0",  // 创建id
    "creatorName": "王老师", // 创建人
    "state": 1, // 状态 1 草稿， 2、进行中，3、已结束
    "createTime": "2022-03-22T11:43:18",
    "typeId": "ODRm18cXBj7btCBb4BaiTOmGP", // 课程分类id
}, {
    "courseName": "II型计算机联锁",
    "img": "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
    "id": "ODRm18cXBj7btCBb4BaiTOmGPuN0Kztv",
    "creatorId": "ODRm18cXBj7btCBb4BaiTOmGPuN0",  // 创建id
    "creatorName": "王老师", // 创建人
    "state": 2, // 状态 1 草稿， 2、进行中，3、已结束
    "createTime": "2022-03-22T11:43:18",
    "typeId": "ODRm18cXBj7btCBb4BaiTOmGP", // 课程分类id
}, {
    "courseName": "II型计算机联锁",
    "img": "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
    "id": "ODRm18cXBj7btCBb4BaiTOmGPuN0Kztv",
    "creatorId": "ODRm18cXBj7btCBb4BaiTOmGPuN0",  // 创建id
    "creatorName": "王老师", // 创建人
    "state": 3, // 状态 1 草稿， 2、进行中，3、已结束
    "createTime": "2022-03-22T11:43:18",
    "typeId": "ODRm18cXBj7btCBb4BaiTOmGP", // 课程分类id
}]

let questionData = [{

    "number": "20220322114318",
    "id": "dsaftsxcv1",
    "questionType": 1,  // 1:单选 2 多选 3 判断...,
    "questionScore": 2.5,
    "questionStem": "25Hz相敏轨道继电器的局部线圈超前轨道线圈。",
    "questionContent": {
        "selection": [{
            "select": "A", "describe": "120度"
        }, {
            "select": "B", "describe": "180度"
        }, {
            "select": "C", "describe": "270度"
        }, {
            "select": "D", "describe": "90度"
        }, {
            "select": "E", "describe": "0度"
        }], "answer": ["A"]
    },
    "filePath": "",
    "difficulty": 2, //  难度
    "createTime": "2022-03-22T11:43:18",
    "updateTime": "2022-03-22T11:43:18",
}, {
    "filePath": "",
    "difficulty": 2, //  难度
    "createTime": "2022-03-22T11:43:18",
    "updateTime": "2022-03-22T11:43:18",
    "number": "20220322114318",
    "id": "dsaftsxcv2",
    "questionType": 2, //1:单选 2 多选 3 判断...,
    "questionScore": 2.5, "questionStem": "25Hz相敏轨道电路室内部分送电端设备组成。", "questionContent": {
        "selection": [{
            "select": "A", "describe": "BMT-25电源室内调整变压器"
        }, {
            "select": "B", "describe": "NGL-T室内隔离盒"
        }, {
            "select": "C", "describe": "防雷单元"
        }, {
            "select": "D", "describe": "RX限流电阻"
        }], "answer": ["A", "C"]
    }, "questionSeq": 2
}, {
    "filePath": "",
    "difficulty": 2, //  难度
    "createTime": "2022-03-22T11:43:18",
    "updateTime": "2022-03-22T11:43:18",
    "number": "20220322114318",
    "id": "dsaftsxcv3",  "questionType": 3, //1:单选 2 多选 3 判断...,
    "questionScore": 2.5, "questionStem": "25Hz相敏轨道电路送电端有扼流变压器时（旧型）其电阻R为3.4Ω。", "questionContent": {
        "selection": [{
            "select": "1", "describe": "对"
        }, {
            "select": "0", "describe": "错"
        }], "answer": ['0']
    }, "questionSeq": 2
}, {
    "filePath": "",
    "difficulty": 2, //  难度
    "createTime": "2022-03-22T11:43:18",
    "updateTime": "2022-03-22T11:43:18",
    "number": "20220322114318",
    "id": "dsaftsxcv4",
    "questionType": 4, //1:单选 2 多选 3 判断 4 填空题,
    "questionScore": 2.5,
    "questionStem": "在电力牵引区段，当钢轨连续牵引总电流不大于_____1______、不平衡牵引电流不大于_____2______时，轨道电路保证正常工作。",
    "questionContent": {
        "selection": [{
            "select": "1", "describe": ""
        }, {
            "select": "2", "describe": ""
        }], "answer": [{
            "select": 1, "describe": "填空答案1"
        }, {
            "select": 2, "describe": "填空答案2"
        }], "required": {
            "sequence": true, "caseSensitive": false
        }
    },
    "questionSeq": 2
}, {
    "difficulty": 2, //  难度
    "createTime": "2022-03-22T11:43:18",
    "updateTime": "2022-03-22T11:43:18",
    "number": "20220322114318",
    "id": "dsaftsxcv5",  "questionType": 5, //5 实操题,
    "questionScore": 2.5, "questionStem": "电特性测试（25分）", "questionContent": {
        "selection": [{
            "select": "1", "describe": "正确"
        }, {
            "select": "0", "describe": "错误"
        }], "answer": ["1"]
    }, "filePath": "http:/", "questionSeq": 2
}, {
    "difficulty": 2, //  难度
    "createTime": "2022-03-22T11:43:18",
    "updateTime": "2022-03-22T11:43:18",
    "number": "20220322114318",
    "id": "dsaftsxcv6",  "questionType": 6, //6 视频题,
    "questionScore": 2.5, "questionStem": "题干", "questionContent": {}, "filePath": "http:/", "questionSeq": 2
}]


export default {

    'post|/exam/score': option => {
        return {
            code: 200, total: 2, data: scores
        }
    },

    'post|/exam/progress': option => {
        return {
            code: 200, total: 4, data: progress
        }
    },

    'post|/exam/topic': option => {
        return {
            code: 200, total: 2, data: topic
        }
    },

    'post|/exam/parse': option => {
        return {
            code: 200, total: 2, data: parse
        }
    },

    'post|/exam/curriculum': option => {
        return {
            code: 200, total: 2, data: curriculum
        }
    },

    'post|/exam/question': option => {
        return {
            code: 200, total: 2, data: questionData
        }
    },

}
