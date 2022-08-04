
import Comparator from "../../../utils/comparator/Comparator.js";
import BinaryTreeNode from "../myBinaryTreeNode.js";

export default class BinarySearchTreeNode extends BinaryTreeNode {
    constructor(value = null, compareFunction = null) {
        super(value);
        // This comparator is used to compare node values with each other.
        this.compareFunction = compareFunction;
        this.nodeValueComparator = new Comparator(compareFunction);
    }

    insert(value) {
        //insert root value
        if (this.nodeValueComparator.equal(this.value, null)) {
            this.value = value;
            return this;
        }

        if (this.nodeValueComparator.lessThan(value, this.value)) {
            if (this.left) {
                return this.left.insert(value);
            }

            const newNode = new BinarySearchTreeNode(value);
            this.setLeft(newNode);

            return newNode;
        }


        if (this.nodeValueComparator.greaterThan(value, this.value)) {
            if (this.right) {
                return this.right.insert(value);
            }

            const newNode = new BinarySearchTreeNode(value);
            this.setRight(newNode);

            return newNode;
        }

        return this;
    }

    find(value) {
        if (this.nodeValueComparator.equal(value, this.value)) {
            return this;
        }

        if (this.nodeValueComparator.lessThan(value, this.value)) {
            return this.left.find(value);
        }

        if (this.nodeValueComparator.greaterThan(value, this.value)) {
            return this.right.find(value);
        }

        return null;
    }

    findMin() {
        if (!this.left) {
          return this;
        }

        return this.left.findMin();
    }

    contains(value) {
        return !!this.find(value);
    }

    remove(value) {
        const nodeToRemove = this.find(value);

        if (!nodeToRemove) {
            throw new Error('Item not found in the tree');
        }

        const { parent } = nodeToRemove;

        //no child
        if (!nodeToRemove.left && !nodeToRemove.right) {
            if (parent) {
                parent.removeChild(nodeToRemove);
            } else {
                //root
                nodeToRemove.setValue(undefined);
            }
        } else if (nodeToRemove.left && nodeToRemove.right) {
            // left right child
            const nextBiggerNode = nodeToRemove.right.findMin();

            // find min node in right child branch

            // in the left branch, remove it and replace nodeToRemove
            if (!this.nodeValueComparator.equal(nodeToRemove.right, nextBiggerNode)) {
                this.remove(nextBiggerNode.value);
                nodeToRemove.setValue(nextBiggerNode.value);
            } else {
                //in the right branch, that means no left branch
                nodeToRemove.setValue(nodeToRemove.right.value);
                nodeToRemove.setRight(nodeToRemove.right.right);
            }
        } else {
            // left or right child, just use it replace nodeToRemove
            const childNode = nodeToRemove.left || nodeToRemove.right;
            if (parent) {
                parent.replaceChild(nodeToRemove, childNode);
            } else {
                BinaryTreeNode.copyNode(childNode, nodeToRemove);
            }
        }
        // Clear the parent of removed node.
        nodeToRemove.parent = null;

        return true;
    }

    successor(value) {
        const nodeToSuccesor = this.find(value);
        if (!nodeToSuccesor) {
            throw new Error('Item not found in the tree');
        }
        let currentNode = nodeToSuccesor.right;

        if (!currentNode) {
            return nodeToSuccesor.parent;
        }
        while (currentNode.left) {
            currentNode = currentNode.left;
        }
        return currentNode;
    }
}
