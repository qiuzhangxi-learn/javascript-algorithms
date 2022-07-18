import List from "./myLinkedList.js";

const myList = new List();
// a->null
myList.prepend('a');

//b->a->null
myList.prepend('b');

//b->a->c->null
myList.append('c');

//b->a->d->c->null
myList.insert('d', 2);

//b->a->d->e->c->null
myList.insert2('e', 3);


const findNode = myList.find({ value: 'e' });
console.log("findNode:", findNode);

const findNode2 = myList.find({ value: 'g' });
console.log("findNode:", findNode2);

//b->a->d->e->c->f->g->null
myList.fromArray(['f', 'g']);

//revert g->f->c->e->d->a->b->null
myList.reverse();


//f->c->e->d->a->b->null
myList.deleteHead();

//f->c->e->d->a->null
myList.deleteTail();

//f->c->d->a->null
myList.delete('e');

//f->c->a->null
myList.deleteByIndex(2);

//c->a->null
myList.deleteByIndex2(0);

//q->c->a->null;
myList.prepend('q');

//q->a->null
myList.deleteByIndex2(1);







const length = myList.length();
const myListArray = myList.toValueArray();
const myListString = myList.toString();
console.log(length);
console.log(myList);
console.log(myListArray);
console.log(myListString);



