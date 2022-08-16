import Comparator from "../../utils/comparator/Comparator.js";
import HashTable from "../hash-table/myHashTable.js";
import Queue from "../queue/myQueue.js";


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
        if (!node) {
            return 0;
        }
        return this.nodeHeight(node.left);
    }

    nodeRightHeight(node) {
        if (!node) {
            return 0;
        }
        return this.nodeHeight(node.right);
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
            return this.parent.parent.right;
        }

        return this.parent.parent.left;
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
            this.left.parent = this;
            return true;
        }

        if (this.right && this.nodeComparator.equal(this.right, nodeToReplace)) {
            this.right = replacementNode;
            this.right.parent = this;
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

    traverseInOrderWithMeta(metaName) {
        let traverse = [];

        // Add left node.
        if (this.left) {
          traverse = traverse.concat(this.left.traverseInOrderWithMeta(metaName));
        }

        const node = { value: this.value };
        node[metaName] = this.meta.get(metaName);
        // Add root.
        traverse.push(node);

        // Add right node.
        if (this.right) {
          traverse = traverse.concat(this.right.traverseInOrderWithMeta(metaName));
        }

        return traverse;
    }

    toString() {
        return this.traverseInOrder().toString();
    }

    toStringWithMeta(metaName) {
        if (metaName === 'color') {
            return this.traverseInOrderWithMeta(metaName).map((node) => `${node.value}` + (node[metaName] === 'red' ? '-red' : '')).toString();
        }
        return this.traverseInOrderWithMeta(metaName).map((node) => `${node.value}-` + node[metaName]).toString();
    }

    TreeStructure() {
        const result = [];
        const queue = new Queue();
        queue.enqueue(this);
        while (!queue.isEmpty()) {
            const currentNode = queue.dequeue();
            result.push(currentNode.value);
            if (currentNode.left) {
                result.push(currentNode.left.value);
            }
            if (currentNode.right) {
                result.push(currentNode.right.value);
            }
        }
        return result;
    }

    //including null
    printTree(metaName = null) {
        const treeHeight = this.height;
        const treeArray = Array(2 ** treeHeight - 1).fill(null);

        const traverseInOrderWithMeta = (node, nodeIndex, meta) => {
            if (node.left) {
                traverseInOrderWithMeta(node.left, nodeIndex * 2 + 1, meta);
            }
            if (metaName) {
                treeArray[nodeIndex] = node.value.toString() + (node.meta.get(meta) === 'red' ? 'R' : '');
            } else {
                treeArray[nodeIndex] = node.value.toString();
            }

            if (node.right) {
                traverseInOrderWithMeta(node.right, nodeIndex * 2 + 2, meta);
            }
        };

        traverseInOrderWithMeta(this, 0, metaName);
        return treeArray;
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
