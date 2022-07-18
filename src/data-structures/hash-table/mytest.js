
import HashTable from './myHashTable.js';


const hashTable = new HashTable();

hashTable.set('a', 123);
hashTable.set('b', 456);
hashTable.set('c', 789);
hashTable.set('d', 111);

hashTable.delete('d');

const keys = hashTable.getKeys();
const values = hashTable.getValues();
console.log('keys:', keys);
console.log('values:', values);
