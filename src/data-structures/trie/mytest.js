import { Trie } from "./myTrie.js";



const myTrie = new Trie();
myTrie.addWord('to');
myTrie.addWord('happy');
myTrie.addWord('effect');
myTrie.addWord('tea');
myTrie.addWord('ted');
myTrie.addWord('ten');
myTrie.addWord('inn');
console.log(myTrie.getLastCharacterNode('*'));
console.log(myTrie.suggestNextCharacters('*'));
console.log(myTrie.suggestNextAllWords('*'));
console.log(myTrie.doesWordExist('tea'));
console.log(myTrie.suggestNextAllWords('t'));

