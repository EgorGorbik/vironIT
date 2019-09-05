class PriorityQueue {
    constructor() {
        this.data = [];
    }

    enqueue(elem) {
        if(typeof elem !== "object") {
            console.log("входной элемент не является объектом");
        } else {
            if(elem.priority === undefined) {
                console.log("у данного объекта нет поля приоритет")
            } else {
                this.insertByPriority(elem);
            }
        }
        console.log(this.data)
    }

    dequeue() {
        var value = this.data[0];
        for(var i = 0; i < this.data.length; i++) {
            this.data[i] = this.data[i+1];
        }
        this.data.pop();
        return value;
    }

    peek() {
        return this.data[0]
    }

    insertByPriority(elem) {
        var samePriority = false;
        //проверяем на наличие таких же приоритетов
        if(this.data.length > 1) {
            for(var i = this.data.length-1; i >= 0; i--) {
                if(elem.priority === this.data[i].priority) {
                    samePriority = true;
                    this.data.splice(i+1, 0, elem);
                    break;
                }
            }

            //если не нашли, то ищем его место среди других приоритетов
            if(!samePriority) {
                for(var i = this.data.length-1; i > 0; i--) {
                    if(elem.priority > this.data[i].priority) {
                        this.data.splice(i+1, 0, elem);
                        break;
                    }
                    if(i === 1) {
                        this.data.splice(0, 0, elem);
                    }
                }
            }
        } else {
            this.data.push(elem);
        }
    }

}


var u = new PriorityQueue();
u.enqueue({"priority": 1, "name": "Alex"});
u.enqueue({"prior   ity": 5, "name": "Kevin"});
u.enqueue({"priority": 5, "name": "Leha"});
u.dequeue();
u.enqueue({"priority": 1, "name": "Nazar"});
u.enqueue({"priority": 1, "name": "Sasha"});
console.log(u.peek());


