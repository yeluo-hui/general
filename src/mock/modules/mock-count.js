let learnList = [
    {
        "id": "dsaftsxcvxchfgdxfd1",
        "paperName": "25Hz相敏轨道电路",
        "totalHour": "100分钟", //#考试时长
        "studyNum": 3,
        "startTime": "2022-03-01 14:30:00",
        "endTime": "2022-04-10 14:30:00"
    },
    {
        "id": "dsaftsxcvxchrdsrxvxcd1",
        "paperName": "25Hz相敏轨道电路",
        "totalHour": "9", //#考试时长
        "studyNum": 3,
        "startTime": "2022-03-08 14:30:00",
        "endTime": "2022-04-10 14:30:00"
    }
]

let practiceList = [
    {
        "id": "sdaxaxadasdasdasda1",
        practiceName: "25Hz相敏轨道电路",
        accuracy: "95%",   //#正确率
        topScore: "95",
        result: "95",
        level: "优秀",
        "practiceNum": 3
    },
    {
        "id": "sdaxaxadasdasdasda2",
        practiceName: "25Hz相敏轨道电路",
        accuracy: "95%",   //#正确率
        topScore: "80",
        result: "80",
        level: "优秀",
        "practiceNum": 1
    },
    {
        "id": "sdaxaxadasdasdasda3",
        practiceName: "25Hz相敏轨道电路",
        accuracy: "91%",   //#正确率
        topScore: "92",
        result: "95",
        level: "优秀",
        "practiceNum": 2
    }

]

let examList = [
    {
        "id": "sdaxaxadasdasdasda1",
        practiceName: "25Hz相敏轨道电路",
        accuracy: "95%",   //#正确率
        topScore: "95",
        result: "95",
        level: "优秀",
        "examNum": 3,
        "examHour": "45"
    },
    {
        "id": "sdaxaxadasdasdasda2",
        practiceName: "25Hz相敏轨道电路",
        accuracy: "95%",  // #正确率
        topScore: "95",
        result: "95",
        level: "优秀",
        "examNum": 3,
        "examHour": "45"
    },
    {
        "id": "sdaxaxadasdasdasda3",
        practiceName: "25Hz相敏轨道电路",
        accuracy: "95%",   //#正确率
        topScore: "95",
        result: "95",
        level: "优秀",
        "examNum": 3,
        "examHour": "45"
    }

]

export default {

    'post|/learn/summaryList': option => {
        return {
            code: 200,
            total: 2,
            data: learnList
        }
    },
    'post|/practice/summaryList': option => {
        return {
            code: 200,
            total: 2,
            data: practiceList
        }
    },
    'post|/exam/summaryList': option => {
        return {
            code: 200,
            total: 2,
            data: examList
        }
    },
}
