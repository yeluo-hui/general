let json = [
    {
        "text": "Getting Started",
        "isBatch": true,
        "id": 1
    },
    {
        "text": "Patterns",
        "isBatch": true,
        "id": 2
    },
    {
        "text": "Has an error",
        "isBatch": true
    }
]

let json1 = [
    { "text": "OBJECT ORIENTED" },
    { "text": "ANONYMOUS FUNCTIONS" },
    { "text": "FUNCTIONS AS FIRST-CLASS OBJECTS" },
    { "text": "LOOSE TYPING" }
]


let json2 = [
    {
        "text": "'DESIGN PATTERNS'",
        "state": { "expanded": true },
        "children": [
            { "text": "'Creational Design Patterns'" },
            { "text": "'Factory'" },
            { "text": "'Prototype'" },
            { "text": "'Mixin'" },
            { "text": "'Singleton'", "state": { "disabled": true } }
        ]
    },
    { "text": "'Structural Design Patterns'"}
]


export default {

    'post|/learn/asyncTree': option => {
        let jso = []
        let index = JSON.parse(option.body).id
        if(index === 'root'){
            jso = json
        }
        if(index === 1){
            jso = json
        }
        if(index === 2){
            jso = json
        }
        return {
            code: 200,
            total: 2,
            data: jso
        }
    },
}
