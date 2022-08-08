import BinarySearchTree from "../binary-search-tree/myBinarySearchTree.js";

export default class AvlTree extends BinarySearchTree {
    /**
     * @param {*} value
     */
    insert(value) {
      // Do the normal BST insert.
      super.insert(value);

      // Let's move up to the root and check balance factors along the way.
      let currentNode = this.root.find(value);
      while (currentNode) {
        this.balance(currentNode);
        currentNode = currentNode.parent;
      }
    }

    /**
     * @param {*} value
     * @return {boolean}
     */
    remove(value) {
      // Do standard BST removal.
      super.remove(value);

      // Balance the tree starting from the root node.
      this.balance(this.root);
    }

    /**
     * @param {BinarySearchTreeNode} node
     */
    balance(node) {
      // If balance factor is not OK then try to balance the node.
      if (node.balanceFactor > 1) {
        // Left rotation.
        if (node.left.balanceFactor > 0) {
          // Left-Left rotation
          this.rotateRightRight(node);
        } else if (node.left.balanceFactor < 0) {
          // Left-Right rotation.
          this.rotateLeftRight(node);
        }
      } else if (node.balanceFactor < -1) {
        // Right rotation.
        if (node.right.balanceFactor < 0) {
          // Right-Right rotation
          this.rotateLeftLeft(node);
        } else if (node.right.balanceFactor > 0) {
          // Right-Left rotation.
          this.rotateRightLeft(node);
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

    /**
     * @param {BinarySearchTreeNode} rootNode
     */
    //RR
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
    }

    //LL
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
    }

    //LR
    //1. L之后 root-L的高度不变
    //2. R之后以rootNode为点 左边树-1 右边+1 就平衡了
    rotateLeftRight(rootNode) {
        this.rotateLeftLeft(rootNode.left);
        this.rotateRightRight(rootNode);
    }

    rotateRightLeft(rootNode) {
        this.rotateRightRight(rootNode.right);
        this.rotateRightRight(rootNode);
    }
}
