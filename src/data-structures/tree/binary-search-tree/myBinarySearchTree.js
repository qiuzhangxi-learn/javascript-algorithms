import BinarySearchTreeNode from "./myBinarySearchTreeNode.js";


export default class BinarySearchTree {
    constructor(value = null, nodeValueCompareFunction = null) {
        this.root = new BinarySearchTreeNode(value, nodeValueCompareFunction);
        // Steal node comparator from the root.
        this.nodeComparator = this.root.nodeComparator;
    }

    insert(value) {
        return this.root.insert(value);
    }

    contains(value) {
        return this.root.contains(value);
    }

    remove(value) {
        return this.root.remove(value);
    }

    toString() {
        return this.root.toString();
    }
}
