import { MinHeap, MaxHeap } from "./myHeap.js";

const minHeap = new MinHeap();

//  9
//9
minHeap.add(9);

//  9
//5
//5,9
minHeap.add(5);

//      5
// 9        26
//5,9,26
minHeap.add(26);


//        5
//  9            26
// 17
//5,9,26,17
minHeap.add(17);


//        5
//   9            26
// 17 8
//5,8,26,17,9
minHeap.add(8);

//          5
//      8           26
// 17       9     20
//5,8,20,17,9,26
minHeap.add(20);


//          5
//      8           20
// 17       9     26    3
//3,8,5,17,9,26,20
minHeap.add(3);

//          3
//      8           5
// 17       9     26    20

console.log("minHeap:::::::::", minHeap);











const minHeapString = minHeap.toString();
console.log('minHeapString:', minHeapString);

const minHeapPoll = minHeap.poll();
console.log('minHeapPoll:', minHeapPoll);
console.log('minHeapString:', minHeap.toString());

const minHeapPeek = minHeap.peek();
console.log('minHeapPeek:', minHeapPeek);



const maxHeap = new MaxHeap();

//  9
//9
maxHeap.add(9);
console.log('String:', maxHeap.toString());

//  9
//5
//9,5
maxHeap.add(5);
console.log('String:', maxHeap.toString());

//      9
// 5        26
//26,5,9
maxHeap.add(26);
console.log('String:', maxHeap.toString());


//        26
//  5            9
// 17
//26,17,9,5
maxHeap.add(17);
console.log('String:', maxHeap.toString());


//        26
//   17            9
// 5 8
//26,17,9,5,8
maxHeap.add(8);
console.log('String:', maxHeap.toString());

//        26
//   17            9
// 5  8         28
//28,17,26,5,8,9
maxHeap.add(28);
console.log('String:', maxHeap.toString());

//        28
//   17            26
// 5  8         9
//28,17,26,5,8,9,3
maxHeap.add(3);
console.log('String:', maxHeap.toString());

//        28
//   17            26
// 5  8         9      3



const maxHeapString = maxHeap.toString();
console.log('maxHeapString:', maxHeapString);

const maxHeapPoll = maxHeap.poll();
console.log('maxHeapPoll:', maxHeapPoll);
console.log('maxHeapString:', maxHeap.toString());

const maxHeapPeek = maxHeap.peek();
console.log('maxHeapPeek:', maxHeapPeek);
