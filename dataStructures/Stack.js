class Stack {
    constructor() {
        this.data = [];
    }

    push(elem) {
        this.data[this.data.length] = elem;
    }

    pop() {
        return this.data.pop();
        this.data.pop();
    }

    peek() {
        if(this.data.length === 0) {
            return 'Стек пуст';
        } else {
            return this.data[this.data.length-1];
        }
    }

    length() {
        return this.data.length;
    }

}

module.exports = Stack;










