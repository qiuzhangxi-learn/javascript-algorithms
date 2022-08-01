import BinarySearchTree from "./myBinarySearchTree.js";


// 8
const myBinarySearchTree = new BinarySearchTree(8);
console.log('tree Node:', myBinarySearchTree.root.value);
console.log('tree:', myBinarySearchTree.root.toString());

//      8
// 3
myBinarySearchTree.insert(3);
console.log('tree Node:', myBinarySearchTree.root.value);
console.log('tree:', myBinarySearchTree.root.toString());


//          8
//      3
//1
myBinarySearchTree.insert(1);
console.log('tree Node:', myBinarySearchTree.root.value);
console.log('tree:', myBinarySearchTree.root.toString());

//          8
//      3
//1        6
myBinarySearchTree.insert(6);
console.log('tree Node:', myBinarySearchTree.root.value);
console.log('tree:', myBinarySearchTree.root.toString());

//          8
//      3
//1        6
//       4
myBinarySearchTree.insert(4);
console.log('tree Node:', myBinarySearchTree.root.value);
console.log('tree:', myBinarySearchTree.root.toString());

//          8
//      3
//1        6
//       4   7
myBinarySearchTree.insert(7);
console.log('tree Node:', myBinarySearchTree.root.value);
console.log('tree:', myBinarySearchTree.root.toString());


//          8
//      3           10
//1        6
//       4   7
myBinarySearchTree.insert(10);
console.log('tree Node:', myBinarySearchTree.root.value);
console.log('tree:', myBinarySearchTree.root.toString());

//          8
//      3           10
//1        6            14
//       4   7
myBinarySearchTree.insert(14);
console.log('tree Node:', myBinarySearchTree.root.value);
console.log('tree:', myBinarySearchTree.root.toString());

//          8
//      3           10
//1        6            14
//       4   7       13
myBinarySearchTree.insert(13);
console.log('tree Node:', myBinarySearchTree.root.value);
console.log('tree:', myBinarySearchTree.root.toString());

//          8
//      3           10
//1        6            14
//       4   7       13
//                 12
myBinarySearchTree.insert(12);
console.log('tree Node:', myBinarySearchTree.root.value);
console.log('tree:', myBinarySearchTree.root.toString());

console.log('treeHeight:', myBinarySearchTree.root.height);
console.log('treeHeight2:', myBinarySearchTree.root.height2);
console.log('treeHeightForNodeTree:', myBinarySearchTree.root.nodeHeight(myBinarySearchTree.root));
console.log('treeHeightForSpecialNode:', myBinarySearchTree.root.nodeHeight(myBinarySearchTree.find(6)));
console.log('treeDeepForNodeTree:', myBinarySearchTree.root.nodeDeep(myBinarySearchTree.root));
console.log('treeDeepForSpecialNode:', myBinarySearchTree.root.nodeDeep(myBinarySearchTree.find(6)));

// console.log('remove 1');
// myBinarySearchTree.root.remove(1);
// console.log('tree:', myBinarySearchTree.root.toString());

// console.log('remove 3');
// myBinarySearchTree.root.remove(3);
// console.log('tree:', myBinarySearchTree.root.toString());

// console.log('remove 6');
// myBinarySearchTree.root.remove(6);
// console.log('tree:', myBinarySearchTree.root.toString());
