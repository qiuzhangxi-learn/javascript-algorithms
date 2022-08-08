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

    // remove(value) {
    //     //利用替代再删除
    //     const nodeToReplace = this.find(value);
    //     let replaceNode = null;
    //     if (nodeToReplace.left && nodeToReplace.right) {
    //         replaceNode = this.successor(value);
    //     }
    //     if (!nodeToReplace.left && !nodeToReplace.right) {
    //         replaceNode = null;
    //     }
    //     if (nodeToReplace.left) {
    //         replaceNode = nodeToReplace.left;
    //     } else {
    //         replaceNode = nodeToReplace.right;
    //     }

    //     const deleteAndReplaceBlack = ((replaceNode == null || this.isNodeBlack(replaceNode)) && this.isNodeBlack(nodeToReplace));

    //     //删除的是叶子节点
    //     if (!replaceNode) {
    //         if (this.nodeComparator.equal(nodeToReplace, this.root)) {
    //             this.root = null;
    //         } else {
    //             //case1 deleteAndReplaceBlack
    //             if (deleteAndReplaceBlack) {
    //                 this.fixDoubleBlack(nodeToReplace);
    //             } else {
    //                 //case2 nodeToReplace or replaceNode is red, but not both
    //                 // if (nodeToReplace.uncle) {
    //                 //     this.makeNodeRed(nodeToReplace.uncle);
    //                 // }
    //             }

    //             //delete node
    //             if (nodeToReplace.isParentLeftChild()) {
    //                 nodeToReplace.parent.left = null;
    //             } else {
    //                 nodeToReplace.parent.right = null;
    //             }
    //         }
    //         return;
    //     }

    //     //删除的是非叶子节点,且有两个child
    //     if (nodeToReplace.left && nodeToReplace.right) {
    //         this.swapNodeValue(nodeToReplace, replaceNode);
    //         this.remove(replaceNode.value);
    //     }
    //     //删除的是非叶子节点,且只有1个child
    //     if (this.nodeComparator.equal(nodeToReplace, this.root)) {
    //         this.root = replaceNode;
    //     }
    // }

    remove(value) {
        let nodeToReplace = this.find(value);
        // const copyNodeToReplace = new BinarySearchTreeNode();
        // copyNodeToReplace.value = nodeToReplace.value;
        // copyNodeToReplace.left = nodeToReplace.left;
        // copyNodeToReplace.right = nodeToReplace.right;
        // copyNodeToReplace.parent = nodeToReplace.parent;
        // copyNodeToReplace.meta = nodeToReplace.meta;
        // copyNodeToReplace.nodeComparator = nodeToReplace.nodeComparator;

        let replaceNode = null;
        if (nodeToReplace.left && nodeToReplace.right) {
            //in this case(have right branch), the successor node must be have one or no child
            const successorNode = this.successor(value);
            nodeToReplace = successorNode;
            if (successorNode.left) {
                replaceNode = successorNode.left;
            } else {
                replaceNode = successorNode.right;
            }
        }
        if (!nodeToReplace.left && !nodeToReplace.right) {
            replaceNode = null;
        }
        if (nodeToReplace.left && !nodeToReplace.right) {
            replaceNode = nodeToReplace.left;
        }
        if (!nodeToReplace.left && nodeToReplace.right) {
            replaceNode = nodeToReplace.right;
        }

        const deleteAndReplaceBlack = ((replaceNode == null || this.isNodeBlack(replaceNode)) && this.isNodeBlack(nodeToReplace));

        //case1 delete leaf node
        if (!replaceNode) {
            if (deleteAndReplaceBlack) {
                //case 1.2 deleteAndReplaceBlack
                this.fixDoubleBlack(nodeToReplace);
            }
            //case 1.3 delete and replace one red one black
            //because null node always is black node, so if leaf node is red, just delete. That does not change black deep.
        } else {
            //case 2 delete node that have one children(those nodes have two children will be recursed to leaf node or have one children)
            if (deleteAndReplaceBlack) {
                //case a deleteAndReplaceBlack
                this.fixDoubleBlack(nodeToReplace);
            } else {
                //case b delete and replace one red one black
                // if delete node is red, no need to change
                // if delete node is black, just need to make replace node as black node
                this.makeNodeBlack(replaceNode);
            }
        }
        super.remove(value);
    }

    fixDoubleBlack(nodeToReplace) {
        if (!nodeToReplace.parent) {
            //no the second branch, so even though one branch's black deep reduce one, that is fine.
            return;
        }
        if (!nodeToReplace.sibling) {
            //case 1 no sibling
            //because one branch's black deep reduce one, so the other also branch need to reduce.
            //just recurse to the parent of nodeToReplace
            this.fixDoubleBlack(nodeToReplace.parent);
        } else {
            //case 2 have sibling

            if (this.isNodeBlack(nodeToReplace.sibling) && (this.haveRedLeftChildren(nodeToReplace.sibling)
            || this.haveRedRightChildren(nodeToReplace.sibling))) {
                //case 2.1 sibling is black node and at least one of sibling's children is red
                // one brach black deep +1 by this red node, that leads to balance

                if (this.nodeComparator.equal(nodeToReplace.sibling, nodeToReplace.left)) {
                    if (this.haveRedLeftChildren(nodeToReplace.sibling)) {
                        //case 2.1.1 sibling is black left node and have left red or both red children
                        //make this left node as black children
                        this.makeNodeBlack(nodeToReplace.sibling.left);
                        //perform right right rotation
                        this.rotateRightRight(nodeToReplace.sibling.parent);
                    } else {
                        //case 2.1.2 sibling is black left node and just have right red children
                        //make this red left children as black children
                        this.makeNodeBlack(nodeToReplace.sibling.left);
                        //perform left right rotation
                        this.rotateLeftLeft(nodeToReplace.sibling);
                        this.rotateRightRight(nodeToReplace.sibling.parent);
                    }
                } else {
                    if (this.haveRedRightChildren(nodeToReplace.sibling)) {
                        //case 2.1.3 sibling is black right node and have right red or both red children
                        //make this right node as black children
                        this.makeNodeBlack(nodeToReplace.sibling.right);
                        //perform left left rotation
                        this.rotateLeftLeft(nodeToReplace.sibling.parent);
                    } else {
                        //case 2.1.4 sibling is black left node and just have right red children
                        //make this red right children as black children
                        this.makeNodeBlack(nodeToReplace.sibling.right);
                        //perform right left rotation
                        this.rotateRightRight(nodeToReplace.sibling);
                        this.rotateLeftLeft(nodeToReplace.sibling.parent);
                    }
                }
            }
            if (this.isNodeBlack(nodeToReplace.sibling) && !this.haveRedLeftChildren(nodeToReplace.sibling)
            && !this.haveRedRightChildren(nodeToReplace.sibling)) {
                //case 2.2 sibling is black node and both two children are black
                //one branch black deep reduce one by make black Node as red node
                // first change the sibling to red
                this.makeNodeRed(nodeToReplace.sibling);
                if (this.isNodeRed(nodeToReplace.sibling.parent)) {
                    // if nodeToReplace.sibling.parent is red,
                    //let it also to be black so the higher and other branch black deep increase one so that the tree balance
                    this.makeNodeBlack(nodeToReplace.sibling.parent);
                } else {
                    // if nodeToReplace.sibling.parent is black, keep recurse to make other branch black deep increase one so that the tree balance
                    this.fixDoubleBlack(nodeToReplace.sibling.parent);
                }
            }
        }
    }

    haveRedLeftChildren(node) {
        if (node && node.left && this.isNodeRed(node.left)) {
            return true;
        }
        return false;
    }

    haveRedRightChildren(node) {
        if (node && node.right && this.isNodeRed(node.right)) {
            return true;
        }
        return false;
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
        } else if (!node.uncle || this.isNodeBlack(node.uncle)) {
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
        // must firstly detach the node
        rootNode.setLeft(null);

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
        // must firstly detach the node
        rootNode.setRight(null);

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
        return this.rotateRightRight(rootNode);
    }

    rotateRightLeft(rootNode) {
        this.rotateRightRight(rootNode.right);
        return this.rotateLeftLeft(rootNode);
    }

    toString() {
        if (this.root.value) {
            return this.toStringWithMeta(COLOR_PROP_NAME);
        }
        return null;
    }
}
