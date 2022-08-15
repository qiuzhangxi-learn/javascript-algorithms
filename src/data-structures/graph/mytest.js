import { Graph } from "./myGrap.js";



// const myGraph = new Graph();

// myGraph.addVertex('A');
// myGraph.addVertex('B');
// myGraph.addVertex('C');
// myGraph.addVertex('D');
// myGraph.addVertex('E');
// console.log('myGraph.getAllVertex:', myGraph.getAllVertex());


// myGraph.addEdge('A', 'B');
// console.log('myGraph.getAdjacencyMatrix()', myGraph.getAdjacencyMatrix());

// myGraph.addEdge('A', 'D');
// console.log('myGraph.getAdjacencyMatrix()', myGraph.getAdjacencyMatrix());

// myGraph.addEdge('B', 'D');
// console.log('myGraph.getAdjacencyMatrix()', myGraph.getAdjacencyMatrix());

// myGraph.addEdge('B', 'C');
// console.log('myGraph.getAdjacencyMatrix()', myGraph.getAdjacencyMatrix());

// myGraph.addEdge('B', 'E');
// console.log('myGraph.getAdjacencyMatrix()', myGraph.getAdjacencyMatrix());

// myGraph.addEdge('D', 'C');
// console.log('myGraph.getAdjacencyMatrix()', myGraph.getAdjacencyMatrix());

// myGraph.addEdge('C', 'E');
// console.log('myGraph.getAdjacencyMatrix()', myGraph.getAdjacencyMatrix());

// myGraph.removeEdge('B', 'D');
// console.log('myGraph.getAdjacencyMatrix()', myGraph.getAdjacencyMatrix());

// myGraph.removeVertex('E');
// console.log('myGraph.getAdjacencyMatrix()', myGraph.getAdjacencyMatrix());


const myGraph = new Graph(true);

myGraph.addVertex('A');
myGraph.addVertex('B');
myGraph.addVertex('C');
myGraph.addVertex('D');
myGraph.addVertex('E');
console.log('myGraph.getAllVertex:', myGraph.getAllVertex());


myGraph.addEdge('A', 'B');
console.log('myGraph.getAdjacencyMatrix()', myGraph.getAdjacencyMatrix());

myGraph.addEdge('A', 'D');
console.log('myGraph.getAdjacencyMatrix()', myGraph.getAdjacencyMatrix());

myGraph.addEdge('B', 'D');
console.log('myGraph.getAdjacencyMatrix()', myGraph.getAdjacencyMatrix());

myGraph.addEdge('B', 'C');
console.log('myGraph.getAdjacencyMatrix()', myGraph.getAdjacencyMatrix());

myGraph.addEdge('E', 'B');
console.log('myGraph.getAdjacencyMatrix()', myGraph.getAdjacencyMatrix());

myGraph.addEdge('D', 'C');
console.log('myGraph.getAdjacencyMatrix()', myGraph.getAdjacencyMatrix());

myGraph.addEdge('E', 'C');
console.log('myGraph.getAdjacencyMatrix()', myGraph.getAdjacencyMatrix());

myGraph.removeEdge('B', 'D');
console.log('myGraph.getAdjacencyMatrix()', myGraph.getAdjacencyMatrix());

myGraph.removeVertex('E');
console.log('myGraph.getAdjacencyMatrix()', myGraph.getAdjacencyMatrix());

myGraph.reverseAllEdges();
console.log('myGraph.getAdjacencyMatrix()', myGraph.getAdjacencyMatrix());
