const BinaryTree = (function(EventEmitterClass) {
class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class BinaryTree extends EventEmitterClass {
    constructor() {
        super();
        this.root = null;
    }

    contains(data) {
        function searchNode(node, data) {
            if (node == null) {
                return null;
            }

            if (node.data === data) {
                return true
            }

            if (data < node.data) {
                searchNode(node.left, data)
            }

            if (data > node.data) {
                searchNode(node.right, data)
            }

            return false;
        }

    }

    add(data) {
        const binaryTreeView = document.getElementById('binaryTree');
        this.emit('pushBinaryTreeNode', data, binaryTreeView, 'binary_tree');
        data = +data;
        let node = this.root;
        if (node === null) {
            this.root = new Node(data);
            return;
        } else {
            let searchTree = function searchTree(node) {
                if (data < node.data) {
                    if (node.left === null) {
                        node.left = new Node(data);
                        return;
                    } else if (node.left !== null) {
                        return searchTree(node.left);
                    }
                } else if (data > node.data) {
                    if (node.right === null) {
                        node.right = new Node(data);
                        return;
                    } else if (node.right !== null) {
                        return searchTree(node.right);
                    }
                } else {
                    return null;
                }
            }
            return searchTree(node);
        }
    }


    remove(data) {
        const binaryTreeView = document.getElementById('binaryTree');
        this.emit('popBinaryTreeNode','binary_tree',  data, binaryTreeView);
        function removeNode(node, data) {
            if (node == null) {
                return null;
            }
            if (data == node.data) {
                if ((node.left == null) && (node.right == null)) {
                    return null;
                }

                if (node.left == null) {
                    return node.right;
                }

                if (node.right == null) {
                    return node.left;
                }

                var temp = node.right;
                while (temp.left !== null) {
                    temp = temp.left;
                }
                node.data = temp.data;
                node.right = removeNode(node.right, temp.data);
                return node;
            } else if (data < node.data) {
                node.left = removeNode(node.left, data);
                return node;
            } else {
                node.right = removeNode(node.right, data);
                return node;
            }
        }
        this.root = removeNode(this.root, data);
    }
}

return BinaryTree;
})(EventEmitter);



const BinaryTreeNodeUI = (function (docObj) {
    class BinaryTreeNodeUI {
        static createNodeUI(parentNode, value) {
            var num = this;

            if(document.getElementsByClassName('binaryTree')[num].childNodes[1] === undefined) {
                this.node = document.createElement('div');
                this.node.className = 'node';
                this.node.innerText = value;
                this.node.style.textAlign = 'center';
                let left = document.createElement('div');
                left.className = 'left';
                let right = document.createElement('div');
                right.className = 'right';
                let child = document.createElement('div');
                child.className = 'child';
                child.append(left);
                child.append(right);

                this.binaryTree = document.getElementsByClassName('binaryTree' + num)[0];
                this.binaryTree.setAttribute('data', value);
                this.binaryTree.append(this.node);
                this.binaryTree.append(child);
            } else {
                let firstElement = true;
                function rec(elem) {
                    if(value < +elem.getAttribute('data')) {
                        if(firstElement) {
                            elem = elem.childNodes[2];
                            firstElement = false;
                        } else {
                            elem = elem.childNodes[1];
                        }
                       elem = elem.childNodes[0];
                       if(elem.getAttribute('data') === null) {
                           elem.setAttribute('data', value);
                           let node = document.createElement('div');
                           node.className = 'node';
                           node.innerText = value;
                           node.style.textAlign = 'center';
                           let left = document.createElement('div');
                           left.className = 'left';
                           let right = document.createElement('div');
                           right.className = 'right';
                           let child = document.createElement('div');
                           child.className = 'child';
                           child.append(left);
                           child.append(right);

                           elem.append(node);
                           elem.append(child);
                       } else {
                           rec(elem)
                       }
                    }

                    if(value > +elem.getAttribute('data')) {
                        if(firstElement) {
                            elem = elem.childNodes[2];
                            firstElement = false;
                        } else {
                            elem = elem.childNodes[1];
                        }
                        elem = elem.childNodes[1];
                        if(elem.getAttribute('data') === null) {
                            elem.setAttribute('data', value);
                            let node = document.createElement('div');
                            node.className = 'node';
                            node.innerText = value;
                            node.style.textAlign = 'center';
                            let left = document.createElement('div');
                            left.className = 'left';
                            let right = document.createElement('div');
                            right.className = 'right';
                            let child = document.createElement('div');
                            child.className = 'child';
                            child.append(left);
                            child.append(right);

                            elem.append(node);
                            elem.append(child);
                        } else {
                            rec(elem)
                        }
                    }

                }

                rec(document.getElementsByClassName('binaryTree')[num])

            }
        }

        static deleteNodeUI(numStack, val) {
            let str = 'binaryTree ' + numStack;

            let firstElement = true;
            let tempEmptyElement;
            function rec(elem) {
                if (+val === +elem.getAttribute('data')) {

                    alert('нельзя удалить корневой элемент')
                } else {
                    if (+val < +elem.getAttribute('data')) {
                        if (firstElement) {
                            firstElement = false;
                            elem = elem.childNodes[2];
                            elem = elem.childNodes[0];
                            if (+val === +elem.getAttribute('data')) {
                                tempEmptyElement = elem;
                            } else {
                                rec(elem)
                            }
                        } else {
                                elem = elem.childNodes[1];
                                elem = elem.childNodes[0];
                                if (+val === +elem.getAttribute('data')) {
                                    tempEmptyElement = elem;
                                } else {
                                    rec(elem)
                                }
                        }
                    }


                    if (+val > +elem.getAttribute('data')) {
                        if (firstElement) {
                            firstElement = false;
                            elem = elem.childNodes[2];
                            elem = elem.childNodes[1];
                            if (+val === +elem.getAttribute('data')) {
                                tempEmptyElement = elem;
                            } else {
                                rec(elem)
                            }
                        } else {

                            elem = elem.childNodes[1];
                            elem = elem.childNodes[1];
                            if (+val === +elem.getAttribute('data')) {
                                tempEmptyElement = elem;
                            } else {
                                rec(elem)
                            }

                        }
                    }


                }
            }
            rec(document.getElementsByClassName('binaryTree' + numStack)[0]);
            let temp = tempEmptyElement.childNodes[1];

            //если узел не имеет потомков
            if(temp.getAttribute('class') === 'node') {
                temp.remove();
            } else {
                if((temp.childNodes[0].getAttribute('data') === null) && (temp.childNodes[1].getAttribute('data') === null)) {temp

                    temp = temp.parentNode;
                    temp.removeAttribute('data')
                    temp.innerHTML = '';
                }
            }

            //если узел имеет только правого потомка
            if((temp.childNodes[0].getAttribute('data') === null) && (temp.childNodes[1].getAttribute('data') !== null)) {
               let child = temp.childNodes[1];
               let parent = temp.parentNode.parentNode;
               temp = temp.parentNode;
               temp.remove();
               parent.append(child);
            }

            //если узел имеет только левого потомка
            if((temp.childNodes[0].getAttribute('data') !== null) && (temp.childNodes[1].getAttribute('data') === null)) {
                let child = temp.childNodes[0];
                let parent = temp.parentNode.parentNode;
                temp = temp.parentNode;
                let side = temp.getAttribute('class');
                temp.remove();
                child.setAttribute('class', side);
                if(side === 'right') {
                    parent.append(child);
                } else {
                    parent.prepend(child);
                }

            }

            //если узел имеет и левого и правого потомка
            if((temp.childNodes[0].getAttribute('data') !== null) && (temp.childNodes[1].getAttribute('data') !== null)) {
                let parent = temp.parentNode;
                let child = temp.childNodes[1];
                if(child.childNodes[1].childNodes[0].getAttribute('data') !== null) {
                    let value;
                    function rec(elem) {
                        if(elem.childNodes[1].childNodes[0].getAttribute('data') === null) {
                            value = elem.getAttribute('data');
                            elem.removeAttribute('data');
                            elem.innerHTML = '';
                        } else {
                            rec(elem.childNodes[1].childNodes[0]);
                        }
                    }
                    rec(child);
                    parent.setAttribute('data', value);
                    parent.childNodes[0].innerText = value;
                } else {
                    let left = temp.childNodes[0];
                    let right = temp.childNodes[1];
                    let parent = temp.parentNode.parentNode;
                    let side = temp.parentNode.getAttribute('class');
                    temp.parentNode.remove();
                    right.setAttribute('class', side);
                    if(side === 'right') {
                        parent.append(right);
                        parent.childNodes[1].childNodes[1].childNodes[0].remove();
                        parent.childNodes[1].childNodes[1].prepend(left);
                    } else {
                        let div = document.createElement('div');
                        div.className = 'left';
                        parent.prepend(right);
                        parent.childNodes[0].childNodes[1].childNodes[0].remove();
                        parent.childNodes[0].childNodes[1].prepend(left);
                    }
                }
            }
        }

        constructor(parentNode, value, num) {
            this.binaryTree = document.getElementsByClassName('binaryTree' + num)[0];

            this.nodeEl = docObj.createElement('div');
            this.nodeEl.className = 'binaryTree-node-ui ';
            this.nodeEl.innerText = value;
            this.stac.append(this.nodeEl);
        }
    }

    return BinaryTreeNodeUI;
})(document);

