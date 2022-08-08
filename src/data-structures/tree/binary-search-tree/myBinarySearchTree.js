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

    remove(value) {
        return this.root.remove(value);
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

    printTree() {
        const treeArray = this.root.TreeStructure();
        //including null
        const nodeNumbers = treeArray.length;
        let result = '**************************************************~*********************************************************************************\r\n*************************!*************************************************************@********************************************\r\n**************#**************************$**********************************%*********************************^*********************\r\n********&************q*************w***********e******************t*************y*****************u*****************i*************\r\n**o*******p********[****]******a********s*****d****f************g******h******j*****k***********z******x******c*********v********\r\n';
        const matchAlpha = '~!@#$%^&qwetyuiop[]asdfghjklzxcvbm';

        for (let i = 0; i < nodeNumbers; i += 1) {
            if (treeArray[i] === 'null') {
                result = result.replace(matchAlpha.charAt(i), ' ');
            }
            result = result.replace(matchAlpha.charAt(i), treeArray[i].toString());
            //result[index] = treeArray[i].toString();
        }
        return result;
    }
}
