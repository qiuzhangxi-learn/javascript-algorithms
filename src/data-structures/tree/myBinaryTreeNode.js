import Comparator from "../../utils/comparator/Comparator.js";
import HashTable from "../hash-table/myHashTable.js";


export default class BinaryTreeNode {
    constructor(value = null) {
        this.left = null;
        this.right = null;
        this.parent = null;
        this.value = value;
        this.meta = new HashTable();
        this.nodeComparator = new Comparator();
    }

    get leftHeight() {
        if (!this.left) {
            return 1;
        }
        return this.left.height + 1;
    }

    get rightHeight() {
        if (!this.right) {
            return 1;
        }
        return this.right.height + 1;
    }

    get height() {
        return Math.max(this.leftHeight, this.rightHeight);
    }

    get height2() {
        if (this.left && this.right) {
            return Math.max(this.left.height2, this.right.height2) + 1;
        }

        if (this.left && !this.right) {
            return this.left.height2 + 1;
        }

        if (!this.left && this.right) {
            return this.right.height2 + 1;
        }
        return 1;
    }

    get balanceFactor() {
        return this.leftHeight - this.rightHeight;
    }


    //深度的定义：某节点的深度是指从根节点到该节点的最长简单路径边的条数。
    //高度的定义：高度是指从该节点到叶子节点的最长简单路径边的条数。
    //树的高度=树的深度=层数
    //注意：leetcode中都是以节点为一度，维基百科是以边为一度，以leetcode的为主；
    nodeHeight(node) {
        if (!node) {
            return 0;
        }
        return Math.max(this.nodeHeight(node.left), this.nodeHeight(node.right)) + 1;
    }

    nodeDeep(node) {
        if (!node) {
            return 0;
        }
        return this.nodeDeep(node.parent) + 1;
    }

    nodeLeftHeight(node) {
        if (!node || !node.left) {
            return 0;
        }
        return Math.max(this.nodeHeight(node.left.left), this.nodeHeight(node.left.right)) + 1;
    }

    nodeRightHeight(node) {
        if (!node || !node.right) {
            return 0;
        }
        return Math.max(this.nodeHeight(node.right.left), this.nodeHeight(node.right.right)) + 1;
    }

    get uncle() {
        if (!this.parent) {
            return undefined;
        }

        if (!this.parent.parent) {
            return undefined;
        }

        if (!this.parent.parent.left || !this.parent.parent.right) {
            return undefined;
        }

        if (this.nodeComparator.equal(this.parent, this.parent.parent.left)) {
            return this.right;
        }

        return this.left;
    }

    get sibling() {
        if (!this.parent) {
            return undefined;
        }
        if (this.parent.left && this.parent.right) {
            if (this.nodeComparator.equal(this, this.parent.left)) {
                return this.parent.right;
            } else {
                return this.parent.left;
            }
        }
        return undefined;
    }

    setValue(value) {
        this.value = value;
        return this;
    }

    setLeft(node) {
        if (this.left) {
            this.left.parent = null;
        }

        this.left = node;

        if (this.left) {
            this.left.parent = this;
        }
        return this;
    }

    setRight(node) {
        if (this.right) {
            this.right.parent = null;
        }

        this.right = node;

        if (this.right) {
            this.right.parent = this;
        }
        return this;
    }

    removeChild(nodeToRemove) {
        if (this.left && this.nodeComparator.equal(this.left, nodeToRemove)) {
            this.left = null;
            return true;
        }

        if (this.right && this.nodeComparator.equal(this.right, nodeToRemove)) {
            this.right = null;
            return true;
        }
        return false;
    }

    replaceChild(nodeToReplace, replacementNode) {
        //cannot replace null or replace by null
        if (!nodeToReplace || !replacementNode) {
            return false;
        }

        if (this.left && this.nodeComparator.equal(this.left, nodeToReplace)) {
            this.left = replacementNode;
            return true;
        }

        if (this.right && this.nodeComparator.equal(this.right, nodeToReplace)) {
            this.right = replacementNode;
            return true;
        }
        return false;
    }

    static copyNode(sourceNode, targetNode) {
        targetNode.setValue(sourceNode.value);
        targetNode.setLeft(sourceNode.left);
        targetNode.setRight(sourceNode.right);
    }

    traverseInOrder() {
        let traverse = [];

        // Add left node.
        if (this.left) {
          traverse = traverse.concat(this.left.traverseInOrder());
        }

        // Add root.
        traverse.push(this.value);

        // Add right node.
        if (this.right) {
          traverse = traverse.concat(this.right.traverseInOrder());
        }

        return traverse;
    }

    toString() {
        return this.traverseInOrder().toString();
    }

    isParentLeftChild() {
        if (this.parent && this.parent.left && this.nodeComparator.equal(this, this.parent.left)) {
            return true;
        }
        return false;
    }

    isParentRightChild() {
        if (this.parent && this.parent.right && this.nodeComparator.equal(this, this.parent.right)) {
            return true;
        }
        return false;
    }
}
