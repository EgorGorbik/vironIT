var stack = [];
var queue = [];
var binary_tree = [];

function onPushNode(value, elem, dataStructure ) {
    switch(dataStructure) {
        case 'stack':
            StackNodeUI.createNodeUI.call(this, elem, value);
            break;
        case 'queue':
            QueueNodeUI.createNodeUI.call(this, elem, value);
            break;
        case 'binary_tree':
            BinaryTreeNodeUI.createNodeUI.call(this, elem, value);
    }
}

function onDelNode(dataStructure, data) {
    switch(dataStructure) {
        case 'stack':
            StackNodeUI.deleteNodeUI(this, stack[this].length());
            break;
        case 'queue':
            QueueNodeUI.deleteNodeUI(this, queue[this].length());
            break;
        case 'binary_tree':
            BinaryTreeNodeUI.deleteNodeUI(this, data);
            break;
    }
}

// Cтек
document.getElementsByClassName('create_stack')[0].addEventListener('click', () => {
    stack.push(new Stack());
    stack[stack.length-1].on('pushStackNode', onPushNode.bind(stack.length-1));
    stack[stack.length-1].on('popStackNode', onDelNode.bind(stack.length-1));

    this.stackUI = document.createElement('div');
    this.stackUI.className = 'stack' + (stack.length-1) + ' stack';
    this.stackUI.id = stack.length-1;
    document.getElementById('stack').append(this.stackUI);

    this.header = document.createElement('div');
    this.header.className = 'itemHeader';

    this.input = document.createElement('input');
    this.buttonAdd = document.createElement('button');
    this.buttonAdd.innerText = '+';
    this.buttonAdd.id = 'addStackButton';
    this.buttonDel = document.createElement('button');
    this.buttonDel.innerText = '-';
    this.buttonDel.id = 'delStackButton';
    this.header.append(this.input, this.buttonAdd, this.buttonDel);
    this.stackUI.append(header);

        document.querySelectorAll('#addStackButton')[this.stack.length-1].addEventListener('click', (val) => {
            this.Node = val.path[0];
            while(this.Node.className !== 'itemHeader') {
                this.Node = this.Node.parentNode;
            }
            stack[this.Node.parentNode.id].push(this.Node.childNodes[0].value, true);
        });


        document.querySelectorAll('#delStackButton')[this.stack.length-1].addEventListener('click', (val) => {
            this.Node = val.path[0];
            while(this.Node.className != 'itemHeader') {
                this.Node = this.Node.parentNode;
            }
            stack[this.Node.parentNode.id].pop(true);
        });
});

//Очередь
document.getElementsByClassName('create_queue')[0].addEventListener('click', () => {
    queue.push(new Queue());
    queue[queue.length-1].on('pushQueueNode', onPushNode.bind(queue.length-1));
    queue[queue.length-1].on('popQueueNode', onDelNode.bind(queue.length-1));
    //let numOfNewStack = stack.length;
    this.queueUI = document.createElement('div');
    this.queueUI.className = 'queue' + (queue.length-1) + ' queue';

    this.queueUI.id = queue.length-1;
    document.getElementById('queue').append(this.queueUI);

    this.header = document.createElement('div');
    this.header.className = 'itemHeader';

    this.input = document.createElement('input');
    this.buttonAdd = document.createElement('button');
    this.buttonAdd.innerText = '+';
    this.buttonAdd.id = 'addQueueButton';
    this.buttonDel = document.createElement('button');
    this.buttonDel.innerText = '-';
    this.buttonDel.id = 'delQueueButton';
    this.header.append(this.input, this.buttonAdd, this.buttonDel);
    this.queueUI.append(header);

    document.querySelectorAll('#addQueueButton')[this.queue.length-1].addEventListener('click', (val) => {
        this.Node = val.path[0];
        while(this.Node.className != 'itemHeader') {
            this.Node = this.Node.parentNode;
        }

        queue[this.Node.parentNode.id].enqueue(this.Node.childNodes[0].value);

    });


    document.querySelectorAll('#delQueueButton')[this.queue.length-1].addEventListener('click', (val) => {
        this.Node = val.path[0];
        while(this.Node.className != 'itemHeader') {
            this.Node = this.Node.parentNode;
        }
        queue[this.Node.parentNode.id].dequeue();
    });
});


//Бинарное дерево
document.getElementsByClassName('create_binary_tree')[0].addEventListener('click', () => {
    binary_tree.push(new BinaryTree());
    binary_tree[binary_tree.length-1].on('pushBinaryTreeNode', onPushNode.bind(binary_tree.length-1));
    binary_tree[binary_tree.length-1].on('popBinaryTreeNode', onDelNode.bind(binary_tree.length-1));

    this.binaryTreeUI = document.createElement('div');
    this.binaryTreeUI.className = 'binaryTree' + (binary_tree.length-1) + ' binaryTree';
    this.binaryTreeUI.id = binary_tree.length-1;
    document.getElementById('binaryTree').append(this.binaryTreeUI);

    this.header = document.createElement('div');
    this.header.className = 'itemHeader';

    this.input = document.createElement('input');
    this.buttonAdd = document.createElement('button');
    this.buttonAdd.innerText = '+';
    this.buttonAdd.id = 'addBinaryTreeButton';
    this.buttonDel = document.createElement('button');
    this.buttonDel.innerText = '-';
    this.buttonDel.id = 'delBinaryTreeButton';
    this.header.append(this.input, this.buttonAdd, this.buttonDel);
    this.binaryTreeUI.append(header);

    document.querySelectorAll('#addBinaryTreeButton')[this.binary_tree.length-1].addEventListener('click', (val) => {
        this.Node = val.path[0];
        while(this.Node.className !== 'itemHeader') {
            this.Node = this.Node.parentNode;
        }
        binary_tree[this.Node.parentNode.id].add(this.Node.childNodes[0].value, true);

    });


    document.querySelectorAll('#delBinaryTreeButton')[this.binary_tree.length-1].addEventListener('click', (val) => {
        this.Node = val.path[0];
        while(this.Node.className != 'itemHeader') {
            this.Node = this.Node.parentNode;
        }
        binary_tree[this.Node.parentNode.id].remove(this.Node.childNodes[0].value, true);
    });
});




