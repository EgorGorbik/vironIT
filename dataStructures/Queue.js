const stac = require('./Stack.js');

class Queue {
    constructor() {
        this.s1 = new stac();
        this.s2 = new stac();
    }

    enqueue(elem) {
        this.s1.push(elem);
    }

    dequeue() {
        if(this.s2.length() > 0) {
            return this.s2.pop();
        }
        while (this.s1.length() > 0) {
            this.s2.push(this.s1.pop());
        }
        return this.s2.pop();

    }

    peek() {
        if(this.s2.length() > 0) {
            return this.s2.peek();
        }
        while (this.s1.length() > 0) {
            this.s2.push(this.s1.pop());
        }
        return this.s2.peek()
    }

}





var u = new Queue();
u.enqueue(1);
u.enqueue(2);
u.enqueue(3);
console.log(u.peek());
u.enqueue(5);
console.log(u.peek());
u.dequeue();
u.dequeue();
console.log(u.peek());
u.enqueue(1);
console.log(u.peek());
u.dequeue();
console.log(u.peek());
u.dequeue();
console.log(u.peek());


