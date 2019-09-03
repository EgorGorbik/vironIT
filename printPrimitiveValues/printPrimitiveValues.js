function printPrimitiveValues(obj) {
    let array = [];
    collectByRecursion(obj);

    function collectByRecursion(essence) {
        if(Array.isArray(essence) == true) {
            for(var i = 0; i < essence.length; i++) {
                if((typeof essence[i] === "object") && (essence[i] !== null)) {
                    collectByRecursion(essence[i])
                } else {
                    array.push(essence[i])
                }
            }
        } else {
            for (let value of Object.values(essence)) {
                if((typeof value === "object") && (value !== null)) {
                    collectByRecursion(value)
                } else {
                    array.push(value)
                }
            }
        }
    }
    return array;
}

let o = {
    name: "Alex",
    information: [{id:0, letter: "b", married: true, man: {
            1: "one",
            2: "two",
            3: false,
            4: {cat: "milk", dog: "meet", special: ["null", "undefined"]},
            5: {nesting: [1, 2, 3, null, undefined, [{1:1}, {2:2}, {3:3}]]}
        }}],
    array: [1, 110]
}

console.log(printPrimitiveValues(o));


