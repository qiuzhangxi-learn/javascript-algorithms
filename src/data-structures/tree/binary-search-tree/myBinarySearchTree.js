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

    find(value) {
        return this.root.find(value);
    }

    contains(value) {
        return this.root.contains(value);
    }

    remove(value, withSuccessor = true) {
        return this.root.remove(value, withSuccessor);
    }

    toString() {
        return this.root.toString();
    }

    toStringWithMeta(metaName) {
        return this.root.toStringWithMeta(metaName);
    }

    height() {
        return this.root.height2();
    }

    deep() {
        return this.height();
    }

    successor(value) {
        return this.root.successor(value);
    }

    predecessor(value) {
        return this.root.predecessor(value);
    }

    paintTree(metaName) {
        //including null
        const treeArray = this.root.printTree(metaName);
        const nodeNumbers = treeArray.length;
        let result = '**************************************************@*********************************************************************************\r\n*************************@*************************************************************@*******************************************\r\n**************@*********************@************************************@****************************@*************************\r\n********@************@**********@********@************************@************@*************@****************@******************\r\n****@******@*****@******@****@***@****@****@******************@*******@****@*****@******@********@*******@*************@*****\r\n';
        const matchChart = '@';

        for (let i = 0; i < nodeNumbers; i += 1) {
            if (treeArray[i] === null) {
                result = result.replace(matchChart, ' ');
            } else {
                result = result.replace(matchChart, treeArray[i]);
            }
        }
        return result;
    }
}
