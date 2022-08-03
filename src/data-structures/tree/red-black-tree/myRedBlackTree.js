import BinarySearchTree from "../binary-search-tree/myBinarySearchTree.js";


const RED_BLACK_TREE_COLORS = {
    red: 'red',
    black: 'black',
};

  // Color property name in meta information of the nodes.
  const COLOR_PROP_NAME = 'color';


export default class RedBlackTree extends BinarySearchTree {
    isNodeRed(node) {
        return node.meta.get(COLOR_PROP_NAME) === RED_BLACK_TREE_COLORS.red;
    }

    isNodeBlack(node) {
        return node.meta.get(COLOR_PROP_NAME) === RED_BLACK_TREE_COLORS.black;
    }

    makeNodeRed(node) {
        node.meta.set(COLOR_PROP_NAME, RED_BLACK_TREE_COLORS.red);
        return node;
    }

      /**
       * @param {BinarySearchTreeNode|BinaryTreeNode} node
       * @return {BinarySearchTreeNode}
       */
      makeNodeBlack(node) {
        node.meta.set(COLOR_PROP_NAME, RED_BLACK_TREE_COLORS.black);
        return node;
    }

    insert(value) {
        const insertNode = super.insert(value);

        //set color
        if (this.nodeComparator.equal(insertNode, this.root)) {
            this.makeNodeBlack(insertNode);
        } else {
            this.makeNodeRed(insertNode);
        }

        this.balance(insertNode);
        return insertNode;
    }

    remove(value) {
        //利用替代再删除
        const nodeToReplace = this.find(value);
        let replaceNode = null;
        if (nodeToReplace.left && nodeToReplace.right) {
            replaceNode = this.successor(value);
        }
        if (!nodeToReplace.left && !nodeToReplace.right) {
            replaceNode = null;
        }
        if (nodeToReplace.left) {
            replaceNode = nodeToReplace.left;
        } else {
            replaceNode = nodeToReplace.right;
        }

        const deleteAndReplaceBlack = ((replaceNode == null || this.isNodeBlack(replaceNode)) && this.isNodeBlack(nodeToReplace));

        //删除的是叶子节点
        if (!replaceNode) {
            if (this.nodeComparator.equal(nodeToReplace, this.root)) {
                this.root = null;
            } else {
                //case1 deleteAndReplaceBlack
                if (deleteAndReplaceBlack) {
                    this.fixDoubleBlack(nodeToReplace);
                } else {
                    //case2 nodeToReplace or replaceNode is red, but not both
                    // if (nodeToReplace.uncle) {
                    //     this.makeNodeRed(nodeToReplace.uncle);
                    // }
                }

                //delete node
                if (nodeToReplace.isParentLeftChild()) {
                    nodeToReplace.parent.left = null;
                } else {
                    nodeToReplace.parent.right = null;
                }
            }
            return;
        }

        //删除的是非叶子节点,且有两个child
        if (nodeToReplace.left && nodeToReplace.right) {
            this.swapNodeValue(nodeToReplace, replaceNode);
            this.remove(replaceNode.value);
        }
        //删除的是非叶子节点,且只有1个child
        if (this.nodeComparator.equal(nodeToReplace, this.root)) {
            this.root = replaceNode;
        } else {
            
        }
    }


    balance(node) {
        //root
        if (this.nodeComparator.equal(node, this.root)) {
            return;
        }

        //parent is blackNode
        if (this.isNodeBlack(node.parent)) {
            return;
        }

        //before the first and second filter, this node must have grandParentNode
        //if nodeParent is red node, the node must have grandParent
        const grandParent = node.parent.parent;

        if (node.uncle && this.isNodeRed(node.uncle)) {
            this.makeNodeBlack(node.parent);
            this.makeNodeBlack(node.uncle);
            this.makeNodeRed(grandParent);
            if (this.nodeComparator.equal(grandParent, this.root)) {
                this.makeNodeBlack(this.root);
                return;
            }
            this.balance(grandParent);
        } else if (!node.uncle || this.isNodeBlack(node.black)) {
            if (grandParent) {
                let newGrandParent;
                if (this.nodeComparator.equal(node.parent, grandParent.left)) {
                    if (this.nodeComparator.equal(node, node.parent.left)) {
                        newGrandParent = this.rotateRightRight(grandParent);
                    } else {
                        newGrandParent = this.rotateLeftRight(grandParent);
                    }
                } else {
                    if (this.nodeComparator.equal(node, node.parent.right)) {
                        newGrandParent = this.rotateLeftLeft(grandParent);
                    } else {
                        newGrandParent = this.rotateRightLeft(grandParent);
                    }
                }

                if (newGrandParent && !newGrandParent.parent) {
                    this.root = newGrandParent;
                    this.makeNodeBlack(this.root);
                }
                this.balance(newGrandParent);
            }
        }
    }

    swapParentChild(oldChild, newChild, parent) {
        if (parent) {
            const site = oldChild.isParentLeftChild() ? 'left' : 'right';
            if (site === 'left') {
                parent.setLeft(newChild);
            } else {
                parent.setRight(newChild);
            }
        } else if (oldChild === this.root) {
            this.root = newChild;
        }
    }

    swapNodeColor(firstNode, secondNode) {
        const firstColor = firstNode.meta.get(COLOR_PROP_NAME);
        const secondColor = secondNode.meta.get(COLOR_PROP_NAME);

        firstNode.meta.set(COLOR_PROP_NAME, secondColor);
        secondNode.meta.set(COLOR_PROP_NAME, firstColor);
    }

    rotateRightRight(rootNode) {
        // Detach left node from root node.
        const leftNode = rootNode.left;
        const grandParent = rootNode.parent;

        // Make left node to be a child of rootNode's parent.
        this.swapParentChild(rootNode, leftNode, grandParent);

        //leftNode children
        //because of rightRotation, if right children, need to move to rootNode left
        //if left children, no need to change
        rootNode.setLeft(leftNode.right);

        // Attach rootNode to the right of leftNode.
        leftNode.setRight(rootNode);
        this.swapNodeColor(rootNode, leftNode);
        return leftNode;
    }

    rotateLeftLeft(rootNode) {
        // Detach left node from root node.
        const rightNode = rootNode.right;
        const grandParent = rootNode.parent;

        // Make left node to be a child of rootNode's parent.
        this.swapParentChild(rootNode, rightNode, grandParent);

        //rightNode children
        //because of leftRotation, if left children, need to move to rootNode right
        //if right children, no need to change
        rootNode.setRight(rightNode.left);

        // Attach rootNode to the right of leftNode.
        rightNode.setLeft(rootNode);
        this.swapNodeColor(rootNode, rightNode);
        return rightNode;
    }

    rotateLeftRight(rootNode) {
        this.rotateLeftLeft(rootNode.left);
        this.rotateRightRight(rootNode);
    }

    rotateRightLeft(rootNode) {
        this.rotateRightRight(rootNode.right);
        this.rotateRightRight(rootNode);
    }
}
