export class DoubleLinkedListNode {
    constructor(value, next = null, previous = null) {
      this.value = value;
      this.next = next;
      this.previous = previous;
    }

    nodeToString(callback) {
      return callback ? callback(this.value) : `${this.value}`;
    }
}

export default class DoublyList {
    constructor() {
        /** @var LinkedListNode */
        this.head = null;
        this.tail = null;
    }

    //length
    length() {
        let count = 0;
        if (!this.head) {
            return count;
        }
        let currentNode = this.head;
        while (currentNode) {
            count += 1;
            currentNode = currentNode.next;
        }
        return count;
    }

    //prepend
    prepend(value) {
        const newNode = new DoubleLinkedListNode(value, this.head);
        if (this.head) {
            this.head.previous = newNode;
        }
        this.head = newNode;
        if (!this.tail) {
            this.tail = this.head;
        }
        return this;
    }

    //append
    append(value) {
        const newNode = new DoubleLinkedListNode(value, null, this.tail);
        if (!this.tail) {
            this.head = newNode;
            this.tail = newNode;
            return this;
        }
        this.tail.next = newNode;
        this.tail = newNode;
        return this;
    }

    //insert
    insert(value, rawIndex) {
        const index = rawIndex < 0 ? 0 : rawIndex;
        if (index === 0) {
            this.prepend(value);
            return this;
        }
        let count = 1;
        let currentNode = this.head;
        const newNode = new DoubleLinkedListNode(value);
        while (currentNode) {
            if (count === rawIndex) break;
            currentNode = currentNode.next;
            count += 1;
        }
        if (currentNode) {
            newNode.next = currentNode.next;
            newNode.previous = currentNode;
            currentNode.next = newNode;
            if (newNode.next) {
                newNode.next.previous = newNode;
            }
        } else {
            //tail
            if (!this.tail) {
                //no node
                this.append(value);
            } else {
                //tail
                newNode.previous = this.tail;
                this.tail.next = newNode;
                this.tail = newNode;
            }
        }
        return this;
    }

    //deleteHead
    deleteHead() {
        if (!this.head) {
            return null;
        }
        const deleteNode = this.head;
        if (!this.head.next) {
            this.head = null;
            this.tail = null;
            return deleteNode;
        } else {
            const newHead = this.head.next;
            newHead.previous = null;
            this.head = newHead;
        }

        return deleteNode;
    }

    //deleteTail
    deleteTail() {
        if (!this.head) {
            return null;
        }
        let currentNode = this.head;
        const deletedNode = this.tail;
        if (!this.head.next) {
            deletedNode = this.head;
            this.head = null;
            this.tail = null;
            return deletedNode;
        }

        while (currentNode) {
            if (!currentNode.next?.next) break;
            currentNode = currentNode.next;
        }
        currentNode.next = null;
        this.tail = currentNode;
        return deletedNode;
    }

    //delete
    deleteByValue(value) {
        if (!this.head) {
            return null;
        }
        let currentNode = this.head;
        let deletedNode = null;
        // head match
        if (currentNode.value === value) {
            deletedNode = currentNode;
            this.deletedHead();
            return deletedNode;
        }
        while (currentNode.next) {
            if (currentNode.next.value === value) {
                deletedNode = currentNode.next;
                if (!currentNode.next?.next) {
                    this.deleteTail();
                } else {
                    const nextNode = currentNode.next.next;
                    currentNode.next = nextNode;
                    nextNode.previous = currentNode;
                }
                return deletedNode;
            }
            currentNode = currentNode.next;
        }
        //no mtach
        return deletedNode;
    }

    //deleteByIndex
    deleteByIndex(rawIndex) {
        if (!this.head) {
            return null;
        }
        const index = rawIndex < 0 ? -1 : rawIndex;
        if (rawIndex === -1) return null;
        let currentNode = this.head;
        let deletedNode = null;
        if (rawIndex === 0) {
            return this.deleteHead();
        }
        let count = 1;
        while (currentNode.next) {
            if (count === index) {
                if (!currentNode.next?.next) {
                    return this.deleteTail();
                } else {
                    deletedNode = currentNode.next;
                    const nextNode = currentNode.next.next;
                    currentNode.next = nextNode;
                    nextNode.previous = currentNode;
                    return deletedNode;
                }
            }
            count += 1;
            currentNode = currentNode.next;
        }
        // no match index
        return deletedNode;
    }

    //find
    find(value) {
        if (!this.head) {
            return null;
        }
        let currentNode = this.head;
        while (currentNode) {
            if (currentNode.value === value) {
                return currentNode;
            }
            currentNode = currentNode.next;
        }
        return null;
    }

    //reverse
    reverse() {
        let preNode = null;
        let nextNode = null;
        let currentNode = this.head;
        while (currentNode) {
            nextNode = currentNode.next;
            preNode = currentNode.previous;

            currentNode.next = preNode;
            currentNode.previous = nextNode;

            preNode = currentNode;
            currentNode = nextNode;
        }
        this.tail = this.head;
        this.head = preNode;

        return this;
    }

    //fromArray
    fromArray(values) {
        values.forEach((value) => this.append(value));
    }

    //toNodeArray
    toNodeArray() {
        const nodes = [];
        let currentNode = this.head;
        while (currentNode) {
            nodes.push(currentNode);
            currentNode = currentNode.next;
        }
        return nodes;
    }

    //toValueArray
    toValueArray() {
        const nodes = [];
        let currentNode = this.head;
        while (currentNode) {
            nodes.push(currentNode.value);
            currentNode = currentNode.next;
        }
        return nodes;
    }

    //toString
    toString() {
        return this.toNodeArray().map((node) => node.nodeToString()).toString();
    }
}


