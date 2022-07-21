import Comparator from "../../utils/comparator/Comparator.js";
import PriorityQueue from "./myPriorityQueue.js";

// 0(top) 1 2  ...
const priorityQueue = new PriorityQueue();

priorityQueue.add({ name: 'a' }, 2);
console.log(priorityQueue.peek());

priorityQueue.add({ name: 'b' }, 3);
console.log(priorityQueue.peek());

priorityQueue.add({ name: 'b' }, 5);
console.log(priorityQueue.peek());

priorityQueue.add({ name: 'c' }, 2);
console.log(priorityQueue.peek());

priorityQueue.remove({ name: 'a' }, new Comparator((a, b) => {
    if (a.name === b.name) {
        return 0;
    }
    return a.name < b.name ? -1 : 1;
}));
console.log(priorityQueue.peek());
console.log("riorityQueue.heapContainer[0]", priorityQueue.heapContainer[0]);
console.log("riorityQueue.heapContainer[1]", priorityQueue.heapContainer[1]);

priorityQueue.add({ name: 'd' }, 8);
console.log(priorityQueue.peek());

priorityQueue.add({ name: 'e' }, 1);
console.log(priorityQueue.peek());
