import DoublyList from "./myDoubleLinkedList.js";

const myDoubleList = new DoublyList();
// null<-a->null
myDoubleList.prepend('a');

//null<-b<=>a->null
myDoubleList.prepend('b');

//null<-b<=>a<=>c->null
myDoubleList.append('c');

//null<-b<=>a<=>d<=>c->null
myDoubleList.insert('d', 2);

//null<-b<=>a<=>d<=>e<=>c->null
myDoubleList.insert('e', 3);


// const findNode = myDoubleList.find('e');
// console.log("findNode:", findNode);

// const findNode2 = myDoubleList.find('g');
// console.log("findNode:", findNode2);

//null<-b<=>a<=>d<=>e<=>c<=>f<=>g->null
myDoubleList.fromArray(['f', 'g']);

//revert null<-g<=>f<=>c<=>e<=>d<=>a<=>b->null
myDoubleList.reverse();


//null<-f<=>c<=>e<=>d<=>a<=>b->null
myDoubleList.deleteHead();

//null<-f<=>c<=>e<=>d<=>a->null
myDoubleList.deleteTail();

//null<-f<=>c<=>d<=>a->null
myDoubleList.deleteByValue('e');

//null<-f<=>c<=>a->null
myDoubleList.deleteByIndex(2);

//null<-c<=>a->null
myDoubleList.deleteByIndex(0);

//null<-q<=>c<=>a->null;
myDoubleList.prepend('q');

//null<-q<=>a->null
myDoubleList.deleteByIndex(1);







const length = myDoubleList.length();
const myListArray = myDoubleList.toValueArray();
const myListString = myDoubleList.toString();
console.log('length:', length);
// console.log(myDoubleList);
console.log(myListArray);
console.log(myListString);



