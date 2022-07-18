import Stack from "./myStack.js";




const stack = new Stack();

//a
stack.push('a');

//a<-b  (Head)
stack.push('b');

//a<-b<-c
stack.push('c');

//a<-b<-c<-d
stack.push('d');


//isEmpty
const isEmpty = stack.isEmpty();

//d
const stackPeek = stack.peek();

//a<-b<-c,  d
const popHead = stack.pop();




console.log('isEmpty:', isEmpty);
console.log('stackPeek:', stackPeek);
console.log('popHead:', popHead);
const stackString = stack.toString();
console.log('stackString:', stackString);
