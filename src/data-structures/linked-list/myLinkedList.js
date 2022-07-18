//ListNode
export class LinkedListNode {
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }

    nodeToString(callback) {
        return callback ? callback(this.value) : `${this.value}`;
    }
}

// List
export default class List {
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
        //update head
        const newNode = new LinkedListNode(value, this.head);
        this.head = newNode;

        //update tail
        if (!this.tail) {
            this.tail = this.head;
        }

        return this;
    }

    //append
    append(value) {
        const newNode = new LinkedListNode(value);
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
    //no suppose for rawIndex +1 <= length
    //insert 10 11 12  insert[0, 1, 2, ... , length, length+1...]
    insert(value, rawIndex) {
        const index = rawIndex < 0 ? 0 : rawIndex;
        if (rawIndex === 0) {
            this.prepend(value);
            return this;
        }
        let count = 1;
        let currentNode = this.head;
        const newNode = new LinkedListNode(value);
        while (currentNode) {
            if (count === index) break;
            currentNode = currentNode.next;
            count += 1;
        }

        if (currentNode) {
            newNode.next = currentNode.next;
            currentNode.next = newNode;
        } else {
            if (this.tail) {
                this.tail.next = newNode;
                this.tail = newNode;
            } else {
                this.head = newNode;
                this.tail = newNode;
            }
        }
        return this;
    }

    //insert
    //suppose for rawIndex +1 <= length
    // insert 10 11 12  insert[0, 1, 2, ... , length]
    insert2(value, rawIndex) {
        const index = rawIndex < 0 ? 0 : rawIndex;
        if (rawIndex === 0) {
            this.prepend(value);
            return this;
        }
        let count = 1;
        let currentNode = this.head;
        const newNode = new LinkedListNode(value);
        while (currentNode) {
            if (count === index) break;
            currentNode = currentNode.next;
            count += 1;
        }
        newNode.next = currentNode.next;
        currentNode.next = newNode;
        if (!newNode.next) {
            this.tail = newNode;
        }
        return this;
    }

    //deleteHead
    deleteHead() {
        if (!this.head) {
            return null;
        }
        const deletedHead = this.head;
        if (this.head.next) {
            this.head = this.head.next;
        } else {
            this.head = null;
            this.tail = null;
        }
        return deletedHead;
    }

    //deleteTail
    deleteTail() {
        if (!this.tail) {
            return null;
        }
        const deleteTail = this.tail;
        if (!this.head.next) {
            this.head = null;
            this.tail = null;
        }
        let currentNode = this.head;
        while (currentNode.next) {
            if (currentNode.next?.next) {
                currentNode = currentNode.next;
            } else {
                currentNode.next = null;
            }
        }
        this.tail = currentNode;
        return deleteTail;
        // let newTail = currentNode;
        // while(currentNode.next) {
        //     newTail = currentNode;
        //     currentNode = currentNode.next;
        // }
        // newTail.next = null;
        // this.tail = newTail;
    }

    //suppose delete the first node with the value
    delete(value) {
        if (!this.head) {
            return null;
        }
        let currentNode = this.head;
        let deletedNode = null;

        // head match
        if (currentNode.value === value) {
            deletedNode = currentNode;
            this.deleteHead();
            return deletedNode;
        }
        while (currentNode) {
            //no match
            if (!currentNode.next) {
                return null;
            }
            if (currentNode.next.value === value) {
                deletedNode = currentNode.next;
                //tail match
                if (!currentNode.next.next) {
                    this.deleteTail();
                } else {
                    currentNode.next = currentNode.next.next;
                }
                return deletedNode;
            }
            currentNode = currentNode.next;
        }
        return deletedNode;
    }

    //delete by index and use length
    deleteByIndex(rawIndex) {
        const index = rawIndex < 0 ? 0 : rawIndex;
        let deleteNode = null;
        const length = this.length();
        if (rawIndex > length - 1) {
            return deleteNode;
        }
        let currentNode = this.head;
        if (index === 0) {
            deleteNode = this.head;
            this.deleteHead();
            return deleteNode;
        }
        if (index === length - 1) {
            deleteNode = this.tail;
            this.deleteTail();
            return deleteNode;
        }
        let count = 1;
        while (currentNode) {
            if (count === index) {
                deleteNode = currentNode.next;
                currentNode.next = currentNode.next.next;
                return deleteNode;
            }
            count += 1;
            currentNode = currentNode.next;
        }
        return deleteNode;
    }

    //delete by index and no use length
    deleteByIndex2(rawIndex) {
        const index = rawIndex < 0 ? 0 : rawIndex;
        let deleteNode = null;
        const currentNode = this.head;
        if (index === 0) {
            deleteNode = this.head;
            this.deleteHead();
            return deleteNode;
        }
        let count = 1;
        while (currentNode?.next) {
            if (count === index) {
                //tail
                if (!currentNode.next?.next) {
                    deleteNode = this.tail;
                    this.deleteTail();
                    return deleteNode;
                }
                deleteNode = currentNode.next;
                currentNode.next = currentNode.next.next;
                return deleteNode;
            }
            count += 1;
            currentNode = currentNode.next;
        }
        return deleteNode;
    }

    //find by the first node with the value
    find({ value = undefined, callback = undefined }) {
        if (!this.head) {
            return null;
        }
        let currentNode = this.head;
        while (currentNode) {
            if (callback && callback(currentNode.value)) {
                return currentNode;
              }

            if (currentNode.value === value) {
                return currentNode;
            }
            currentNode = currentNode.next;
        }
        return null;
    }

    //reverse list
    reverse() {
        let preNode = null;
        let nextNode = null;
        let currentNode = this.head;
        while (currentNode) {
            nextNode = currentNode.next;
            currentNode.next = preNode;

            preNode = currentNode;
            currentNode = nextNode;
        }
        this.tail = this.head;
        this.head = preNode;
        return this;
    }

    fromArray(values) {
        values.forEach((value) => this.append(value));
    }

    toValueArray() {
        const nodes = [];
        let currentNode = this.head;
        while (currentNode) {
            nodes.push(currentNode.value);
            currentNode = currentNode.next;
        }
        return nodes;
    }

    toNodeArray() {
        const nodes = [];
        let currentNode = this.head;
        while (currentNode) {
            nodes.push(currentNode);
            currentNode = currentNode.next;
        }
        return nodes;
    }

    toString() {
        return this.toNodeArray().map((node) => node.nodeToString()).toString();
    }
}

