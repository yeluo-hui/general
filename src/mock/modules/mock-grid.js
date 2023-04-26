let list = [
    {
        "id": "dsaftsxcvxchrdsrxvxchfgdxfd1",
        "courseName": "25Hz相敏轨道电路",
        "img": "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
        "courseHour": 10.5,
        "studentNum": 64
    },
    {
        "id": "dsaftsxcvxchrdsrxvxchfgdxfd2",
        "courseName": "ZD9型高铁道岔转辙机",
        "img": "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
        "courseHour": 11,
        "studentNum": 33
    },
    {
        "id": "dsaftsxcvxchrdsrxvxchfgdxfd3",
        "courseName": "ZD9型高铁道岔转辙机",
        "img": "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
        "courseHour": 10,
        "studentNum": 23
    }, {
        "id": "dsaftsxcvxchrdsrxvxchfgdxfd4",
        "courseName": "ZD9型高铁道岔转辙机",
        "img": "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
        "courseHour": 10,
        "studentNum": 33
    },{
        "id": "dsaftsxcvxchrdsrxvxchfgdxfd5",
        "courseName": "25Hz相敏轨道电路",
        "img": "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
        "courseHour": 10.5,
        "studentNum": 64
    },
    {
        "id": "dsaftsxcvxchrdsrxvxchfgdxfd12",
        "courseName": "ZD9型高铁道岔转辙机",
        "img": "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
        "courseHour": 11,
        "studentNum": 33
    },
    {
        "id": "dsaftsxcvxchrdsrxvxchfgdxfd13",
        "courseName": "ZD9型高铁道岔转辙机",
        "img": "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
        "courseHour": 10,
        "studentNum": 23
    }, {
        "id": "dsaftsxcvxchrdsrxvxchfgdxfd14",
        "courseName": "ZD9型高铁道岔转辙机",
        "img": "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
        "courseHour": 10,
        "studentNum": 33
    }
]

export default {

    'post|/course/list': option => {
        return {
            code: 200,
            total: 8,
            data: list
        }
    },
}
