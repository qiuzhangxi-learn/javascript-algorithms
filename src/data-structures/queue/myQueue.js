
import List from '../linked-list/myLinkedList.js';

export default class myQueue {
    constructor() {
      // We're going to implement Queue based on LinkedList since the two
      // structures are quite similar. Namely, they both operate mostly on
      // the elements at the beginning and the end. Compare enqueue/dequeue
      // operations of Queue with append/deleteHead operations of LinkedList.
      this.linkedList = new List();
    }

    //isEmpty
    isEmpty() {
        return !this.linkedList.head;
    }

    //peek
    peek() {
        if (this.isEmpty()) {
            return null;
        }
        return this.linkedList.head.value;
    }

    //enqueue
    enqueue(value) {
        this.linkedList.append(value);
        return this;
    }

    //dequeue
    dequeue() {
        const removedHead = this.linkedList.deleteHead();
        return removedHead ? removedHead.value : null;
    }

    //toString
    toString(callback) {
        // Return string representation of the queue's linked list.
        return this.linkedList.toString(callback);
      }
}
