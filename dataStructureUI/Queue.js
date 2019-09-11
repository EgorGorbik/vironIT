const Queue = (function(EventEmitterClass) {
class Queue extends EventEmitterClass {
    constructor() {
        super();
        this.s1 = new Stack();
        this.s2 = new Stack();
    }

    enqueue(elem) {
        const queueView = document.getElementById('queue');
        this.emit('pushQueueNode', elem, queueView, 'queue');

    }

    dequeue() {
        if(this.s2.length() > 0) {
            return this.s2.pop();
        }
        while (this.s1.length() > 0) {
            this.s2.push(this.s1.pop());
        }
        this.emit('popQueueNode', 'queue');
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

    length() {
        let temp = this.s1.length() + this.s2.length();
        return temp;
    }

}
    return Queue;
})(EventEmitter);


const QueueNodeUI = (function (docObj) {
    class QueueNodeUI {
        static createNodeUI(...props) {
            var num = this;
            return new QueueNodeUI(...props, queue[this].length(), num);
        }

        static deleteNodeUI(numStack, len) {
            if(document.getElementById('queue').childNodes[+numStack+3].childNodes[1]) {
                document.getElementById('queue').childNodes[+numStack+3].childNodes[1].remove();
            }

        }

        constructor(parentNode, value, count, num) {
            this.queue = document.getElementsByClassName('queue' + num)[0];
            this.nodeEl = docObj.createElement('div');
            this.nodeEl.className = 'queue-node-ui ' + count;
            this.nodeEl.innerText = value;
            this.queue.append(this.nodeEl);
        }
    }
    return QueueNodeUI;
})(document);





