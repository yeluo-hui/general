let catalog = [
    {
        "id": "dsaftsxcvxchrdsrxvxchfgdxfd1",
        "catalogName": "设备简介",
        "progress": 1,
        "question_content": {
            "hour": "14分38秒",
            "size": "1101M"
        }
    },
    {
        "id": "dsaftsxcvxchrdsrxvxchfgdxfd2",
        "catalogName": "设备组成",
        "progress": 0.8,
        "question_content": {
            "hour": "14分38秒",
            "size": "1101M"
        }
    },
    {
        "id": "dsaftsxcvxchrdsrxvxchfgdxfd3",
        "catalogName": "电路原理",
        "progress": 0.6,
        "question_content": {
            "hour": "14分38秒",
            "size": "1101M"
        }
    },
    {
        "id": "dsaftsxcvxchrdsrxvxchfgdxfd4",
        "catalogName": "作业流程",
        "progress": 0.2,
        "question_content": {
            "hour": "14分38秒",
            "size": "1101M"
        }
    }, {
        "id": "dsaftsxcvxcrdsrxvxchfgdxfd5",
        "catalogName": "外观检查",
        "progress": 0,
        "question_content": {
            "hour": "14分38秒",
            "size": "1101M"
        }
    },
    {
        "id": "dsaftsxcvxchrdsrxvhfgdxfd6",
        "catalogName": "室外测试",
        "progress": 0,
        "question_content": {
            "hour": "14分38秒",
            "size": "1101M"
        }
    },
]

let catalogTree = [
    {
        "id": "dsaftsxcvxchrdsrxvxchf1",
        "catalogName": "设备讲解",
        "children": [
            {
                "id": "dsaftsxcvxchrdsrxvxchfgdxfd1",
                "catalogName": "设备简介",
                "progress": 1,
                "question_content": {
                    "hour": "14分38秒",
                    "size": "1101M"
                }
            },
            {
                "id": "dsaftsxcvxchrdsrxvxchfgdxfd2",
                "catalogName": "设备组成",
                "progress": 0.8,
                "question_content": {
                    "hour": "14分38秒",
                    "size": "1101M"
                }
            },
            {
                "id": "dsaftsxcvxchrdsrxvxchfgdxfd3",
                "catalogName": "电路原理",
                "progress": 0.6,
                "question_content": {
                    "hour": "14分38秒",
                    "size": "1101M"
                }
            }
        ]
    },
    {
        "id": "dsaftsxcvxchrdsrxvxchf2",
        "catalogName": "作业流程",
        "children": [
            {
                "id": "dsaftsxcvxchrdsrxvxchfgdxfd4",
                "catalogName": "作业流程",
                "progress": 0.2,
                "question_content": {
                    "hour": "14分38秒",
                    "size": "1101M"
                }
            }
        ]
    },
    {
        "id": "dsaftsxcvxchrdsrxvxchf3",
        "catalogName": "日常养护",
        "children": [
            {
                "id": "dsaftsxcvxchrdsrd5",
                "catalogName": "外观检查",
                "progress": 0,
                "question_content": {
                    "hour": "14分38秒",
                    "size": "1101M"
                }
            }
        ]
    },
    {
        "id": "dsaftsxcvxchrdsrxvxch4",
        "catalogName": "集中检修",
        "children": [
            {
                "id": "12",
                "catalogName": "外观检查",
                "progress": 0,
                "question_content": {
                    "hour": "14分38秒",
                    "size": "1101M"
                }
            },
            {
                "id": "dsaftsxcvxcdsrxvfgdxfd6",
                "catalogName": "室外测试",
                "progress": 0,
                "question_content": {
                    "hour": "14分38秒",
                    "size": "1101M"
                }
            }
        ]
    },
]


let catalogTeacher = [
    {
        "id": "dsavxchrdsrxvxchf1",
        "typeName": "课程分类",
        "parentId": "",
        "children": [
            {
                "id": "dsaftsxcvxchrdsrxvxc1",
                "parentId": "dsavxchrdsrxvxchf1",
                "typeName": "ZD9型高铁道岔转辙机",
            },
            {
                "id": "dsaftsxcvxchrdsrxvxc2",
                "parentId": "dsavxchrdsrxvxchf1",
                "typeName": "ZD6型道岔转辙机",
            },
            {
                "id": "dsaftsxcvxchrdsrxvxc3",
                "parentId": "dsavxchrdsrxvxchf1",
                "typeName": "S700K型道岔转辙机",
            },
            {
                "id": "dsaftsxcvxchrdsrxvxc4",
                "parentId": "dsavxchrdsrxvxchf1",
                "typeName": "25HZ轨道电路",
            },
            {
                "id": "dsaftsxcvxchrdsrxvxc6",
                "parentId": "dsavxchrdsrxvxchf1",
                "typeName": "ZPW2000A轨道电路",
            },
            {
                "id": "dsaftsxcvxchrdsrxvxc7",
                "parentId": "dsavxchrdsrxvxchf1",
                "typeName": "ZPW2000K轨道电路",
            },
            {
                "id": "dsaftsxcvxchrdsrxvxc8",
                "parentId": "dsavxchrdsrxvxchf1",
                "typeName": "DS6-11型计算机联锁",
            }
        ]
    }
]

let catalogLocal = [
    {
        "id": "dsaftsrxvxchf1",
        "organizeName": "武汉铁路职业技术学院",
        "parentId": "",
        "children": [
            {
                "id": "dsaftsxcvxchrdsrxvxc1",
                "organizeName": "铁道通信与信号学院",
                "parentId": "dsaftsrxvxchf1",
                "children": [
                    {
                        "id": "dsaftsxcvxchrdsrxvxc11",
                        "parentId": "dsaftsxcvxchrdsrxvxc1",
                        "organizeName": "现代通信技术",
                    },
                    {
                        "id": "dsaftsxcvxchrdsrxvxc12",
                        "parentId": "dsaftsxcvxchrdsrxvxc1",
                        "organizeName": "铁道信号自动控制",
                    }
                ]
            },
            {
                "id": "dsaftsxcvxchrdsrxvxc2",
                "organizeName": "铁道工程学院",
                "parentId": "dsaftsrxvxchf1",
                "children": [
                    {
                        "id": "dsaftsxcvxchrdsrxvxc21",
                        "parentId": "dsaftsxcvxchrdsrxvxc2",
                        "organizeName": "铁道工程技术",
                    },
                    {
                        "id": "dsaftsxcvxchrdsrxvxc22",
                        "parentId": "dsaftsxcvxchrdsrxvxc2",
                        "organizeName": "高速铁路施工与维护",
                    },
                    {
                        "id": "dsaftsxcvxchrdsrxvxc23",
                        "parentId": "dsaftsxcvxchrdsrxvxc2",
                        "organizeName": "测绘工程技术",
                    }
                ]
            },
        ]
    }
]

export default {

    'post|/learn/getCatalogTree': option => {
        return {
            code: 200,
            total: 2,
            data: catalogTree
        }
    },

    'post|/learn/getCatalog': option => {
        return {
            code: 200,
            total: 2,
            data: catalog
        }
    },

    'post|/learn/catalogTeacher': option => {
        return {
            code: 200,
            total: 2,
            data: catalogTeacher
        }
    },

    'post|/learn/catalogLocal': option => {
        return {
            code: 200,
            total: 2,
            data: catalogLocal
        }
    },
}
