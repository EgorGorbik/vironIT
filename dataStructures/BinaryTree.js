class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }

    contains(data) {
        function searchNode(node, data) {
            if(node == null) {
                return null;
            }

            if(node.data === data) {
                return true
            }

            if(data < node.data) {
                searchNode(node.left, data)
            }

            if(data > node.data) {
                searchNode(node.right, data)
            }

            return false;
        }
        console.log(searchNode(this.root, data));
    }

    add(data) {
        let node = this.root;
        if(node === null) {
            this.root = new Node(data);
            return;
        } else {
            let searchTree = function searchTree(node) {
                if(data < node.data) {
                    if(node.left === null) {
                        node.left = new Node(data);
                        return;
                    } else if(node.left !== null) {
                        return searchTree(node.left);
                    }
                } else if(data > node.data) {
                    if(node.right === null) {
                        node.right = new Node(data);
                        return;
                    } else if(node.right !== null) {
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


var n = new BinaryTree();
n.add(2);
n.add(3);
n.add(5);
n.remove(3);
n.contains(3);
n.contains(2);
