import Queue from "./myQueue.js";




const queue = new Queue();

//a
queue.enqueue('a');

//a<-b
queue.enqueue('b');

//a<-b<-c
queue.enqueue('c');

//a<-b<-c<-d
queue.enqueue('d');


//isEmpty
const isEmpty = queue.isEmpty();
//a
const queuePeek = queue.peek();

//a,  b<-c<d
const dequeueHead = queue.dequeue();




console.log('isEmpty:', isEmpty);
console.log('queuePeek:', queuePeek);
console.log('dequeueHead:', dequeueHead);
const queueString = queue.toString();
console.log('queueString:', queueString);
