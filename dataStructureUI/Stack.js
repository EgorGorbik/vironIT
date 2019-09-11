const Stack = (function(EventEmitterClass) {
    class Stack extends EventEmitterClass {
        constructor() {
            super();
            this._values = [];
        }

        push(value, createStackUI = false){
            // в очереди используются два стека, и чтобы для их инициализации не создавать форму стека на странице,
            // сделал параметр createStackUI
            const stackView = document.getElementById('stack');
            this._values.push(value);
            if(createStackUI) {
                this.emit('pushStackNode', value, stackView, 'stack');
            }
        }

        pop(removesStackUI = false) {
            const value = this._values.pop();
            if(removesStackUI) {
                this.emit('popStackNode', 'stack');
            }
        }

        length() {
            return this._values.length;
        }
    }
    return Stack;
})(EventEmitter);


const StackNodeUI = (function (docObj) {
    class StackNodeUI {
        static createNodeUI(...props) {
            var num = this;
            return new StackNodeUI(...props, stack[this].length(), num);
        }

        static deleteNodeUI(numStack, len) {
            //document.getElementsByClassName('5')[numStack].remove();
            if(document.getElementById(numStack).childNodes[1]) {
                document.getElementById(numStack).lastChild.remove();
            }

        }

        constructor(parentNode, value, count, num) {
                this.stac = document.getElementsByClassName('stack' + num)[0];
            this.nodeEl = docObj.createElement('div');
            this.nodeEl.className = 'stack-node-ui ' + count;
            this.nodeEl.innerText = value;
            this.stac.append(this.nodeEl);
        }
    }

    return StackNodeUI;
})(document);
