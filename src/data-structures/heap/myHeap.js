import Comparator from '../../utils/comparator/Comparator.js';

export class Heap {
    constructor(comparatorFunction) {
        if (new.target === Heap) {
          throw new TypeError('Cannot construct Heap instance directly');
        }

        // Array representation of the heap.
        this.heapContainer = [];
        this.compare = new Comparator(comparatorFunction);
    }

    getLeftChildIndex(parentIndex) {
        return parentIndex * 2 + 1;
    }

    getRightChildIndex(parentIndex) {
        return parentIndex * 2 + 2;
    }

    getParentIndex(childIndex) {
        return Math.floor((childIndex - 1) / 2);
    }

    hasParent(childIndex) {
        return this.getParentIndex(childIndex) >= 0;
    }

    hasLeftChildren(parentIndex) {
        return this.getLeftChildIndex(parentIndex) < this.heapContainer.length;
    }

    hasRightChildren(parentIndex) {
        return this.getRightChildIndex(parentIndex) < this.heapContainer.length;
    }

    leftChildren(parentIndex) {
        return this.hasLeftChildren(parentIndex)
        ? this.heapContainer[this.getLeftChildIndex(parentIndex)] : null;
    }

    rightChildren(parentIndex) {
        return this.hasRightChildren(parentIndex)
        ? this.heapContainer[this.getRightChildIndex(parentIndex)] : null;
    }

    parent(childIndex) {
        return this.hasParent(childIndex)
        ? this.heapContainer[this.getParentIndex(childIndex)] : null;
    }

    isEmpty() {
        return !this.heapContainer.length;
    }

    toString() {
        return this.heapContainer.toString();
    }

    swap(indexOne, indexTwo) {
        const tmp = this.heapContainer[indexTwo];
        this.heapContainer[indexTwo] = this.heapContainer[indexOne];
        this.heapContainer[indexOne] = tmp;
    }

    peek() {
        if (this.heapContainer.length === 0) {
            return null;
        }
        return this.heapContainer[0];
        //return !this.heapContainer.length ? null : this.heapContainer[0];
    }

    poll() {
        if (this.heapContainer === 0) {
            return null;
        }

        if (this.heapContainer.length === 1) {
            return this.heapContainer.pop();
        }

        const item = this.heapContainer[0];
        this.heapContainer[0] = this.heapContainer.pop();
        this.heapifyDown();
        return item;
    }

    add(item) {
        this.heapContainer.push(item);
        this.heapifyUp();
        return this;
    }

    find(item, comparator = this.compare) {
        const foundItemIndices = [];
        for (let itemIndex = 0; itemIndex < this.heapContainer.length; itemIndex += 1) {
            if (comparator.equal(item, this.heapContainer[itemIndex])) {
                foundItemIndices.push(itemIndex);
            }
        }
        return foundItemIndices;
    }

    /**
    * Checks if pair of heap elements is in correct order.
    * For MinHeap the first element must be always smaller or equal.
    * For MaxHeap the first element must be always bigger or equal.
    *
    * @param {*} firstElement
    * @param {*} secondElement
    * @return {boolean}
    */
    /* istanbul ignore next */
    pairIsInCorrectOrder(firstElement, secondElement) {
        throw new Error(`
        You have to implement heap pair comparision method
        for ${firstElement} and ${secondElement} values.
        `);
    }

    heapifyDown(customStartIndex = 0) {
        let currentIndex = customStartIndex;
        let nextIndex = null;
        while (this.hasLeftChildren(currentIndex)) {
            if
            (
                this.hasRightChildren(currentIndex)
                && !this.pairIsInCorrectOrder(this.leftChildren(currentIndex), this.rightChildren(currentIndex))
            ) {
                nextIndex = this.getRightChildIndex(currentIndex);
            } else {
                nextIndex = this.getLeftChildIndex(currentIndex);
            }

            if (this.pairIsInCorrectOrder(this.heapContainer[currentIndex], this.heapContainer[nextIndex])) {
                break;
            }

            this.swap(currentIndex, nextIndex);
            currentIndex = nextIndex;
        }
    }

    heapifyUp(customStartIndex) {
        let currentIndex = customStartIndex || this.heapContainer.length - 1;
        while (this.hasParent(currentIndex)
        && !this.pairIsInCorrectOrder(this.parent(currentIndex), this.heapContainer[currentIndex])) {
            this.swap(currentIndex, this.getParentIndex(currentIndex));
            currentIndex = this.getParentIndex(currentIndex);
        }
    }

    remove(item, comparator = this.compare) {
        const numberOfItemsToRemove = this.find(item, comparator).length;

        for (let iteration = 0; iteration < numberOfItemsToRemove; iteration += 1) {
            const indexToRemove = this.find(item, comparator).pop();
            if (indexToRemove === this.heapContainer.length - 1) {
                this.heapContainer.pop();
            } else {
                this.heapContainer[indexToRemove] = this.heapContainer.pop();
                if (
                    this.hasLeftChildren(indexToRemove) && (!this.hasParent(indexToRemove)
                    || this.pairIsInCorrectOrder(this.parent(indexToRemove), this.heapContainer[indexToRemove]))
                ) {
                    this.heapifyDown(indexToRemove);
                } else {
                    this.heapifyUp(indexToRemove);
                }
            }
        }
        return this;
    }
}

export class MinHeap extends Heap {
    pairIsInCorrectOrder(firstElement, secondElement) {
        return this.compare.lessThanOrEqual(firstElement, secondElement);
    }
}

export class MaxHeap extends Heap {
    pairIsInCorrectOrder(firstElement, secondElement) {
        return this.compare.greaterThanOrEqual(firstElement, secondElement);
    }
}
