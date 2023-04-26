let tree = [
    {
        title:"一、单选题（共10题 共计20分）",
        type:1,
        questions: [
            {
                seq:1.1,
                questionId:"12",
                finished:true
            },
            {
                seq:1.2,
                questionId:"13",
                finished:true
            },
            {
                seq:1.3,
                questionId:"14",
                finished:false
            },
            {
                seq:1.4,
                questionId:"14",
                finished:false
            },
            {
                seq:1.5,
                questionId:"15",
                finished:false
            },
            {
                seq:1.6,
                questionId:"16",
                finished:false
            },
            {
                seq:1.7,
                questionId:"17",
                finished:false
            },
            {
                seq:1.8,
                questionId:"18",
                finished:false
            },
            {
                seq:1.9,
                questionId:"19",
                finished:false
            }

        ]
    },
    {
        title:"二、多选题（共10题 共计20分）",
        type:2,
        questions: [
            {
                seq:2.1,
                questionId:"21",
                finished:true
            },
            {
                seq:2.2,
                questionId:"22",
                finished:true
            },
            {
                seq:2.3,
                questionId:"23",
                finished:true
            },
            {
                seq:2.4,
                questionId:"24",
                finished:false
            },
            {
                seq:2.5,
                questionId:"25",
                finished:false
            },
            {
                seq:2.6,
                questionId:"26",
                finished:false
            }

        ]
    },
    {
        title:"三、判断题（共5题 共计10分）",
        type:3,
        questions: [
            {
                seq:3.1,
                questionId:"31",
                finished:true
            },
            {
                seq:3.2,
                questionId:"32",
                finished:true
            },
            {
                seq:3.3,
                questionId:"33",
                finished:false
            }
        ]
    }
]

export default {

    'post|/exam/questionTree': option => {
        return {
            code: 200,
            total: 2,
            data: tree
        }
    },
}
