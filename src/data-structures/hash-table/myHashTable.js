import List from "../linked-list/myLinkedList.js";

// Hash table size directly affects on the number of collisions.
// The bigger the hash table size the less collisions you'll get.
// For demonstrating purposes hash table size is small to show how collisions


// are being handled.
const defaultHashTableSize = 32;

export default class HashTable {
  /**
   * @param {number} hashTableSize
   */
  constructor(hashTableSize = defaultHashTableSize) {
    // Create hash table of certain size and fill each bucket with empty linked list.
    this.buckets = Array(hashTableSize).fill(null).map(() => new List());

    // Just to keep track of all actual keys in a fast way.
    this.keys = {};
  }

  /**
   * Converts key string to hash number.
   *
   * @param {string} key
   * @return {number}
   */
  hash(key) {
    // For simplicity reasons we will just use character codes sum of all characters of the key
    // to calculate the hash.
    //
    // But you may also use more sophisticated approaches like polynomial string hash to reduce the
    // number of collisions:
    //
    // hash = charCodeAt(0) * PRIME^(n-1) + charCodeAt(1) * PRIME^(n-2) + ... + charCodeAt(n-1)
    //
    // where charCodeAt(i) is the i-th character code of the key, n is the length of the key and
    // PRIME is just any prime number like 31.
    const hash = Array.from(key).reduce(
      (hashAccumulator, keySymbol) => (hashAccumulator + keySymbol.charCodeAt(0)),
      0,
    );

    // Reduce hash number so it would fit hash table size.
    return hash % this.buckets.length;
  }

  /**
   * @param {string} key
   * @param {*} value
   */
  set(key, value) {
    const keyHash = this.hash(key);
    this.keys[key] = keyHash;
    const bucketLinkedList = this.buckets[keyHash];
    const node = bucketLinkedList.find({ callback: (nodeValue) => nodeValue.key === key });

    if (!node) {
        // Insert new node.
        bucketLinkedList.append({ key, value });
    } else {
        // Update value of existing node.
        node.value.value = value;
    }
  }

  /**
   * @param {string} key
   * @return {*}
   */
  delete(key) {
    const keyHash = this.hash(key);
    delete this.keys[key];
    const bucketLinkedList = this.buckets[keyHash];
    const node = bucketLinkedList.find({ callback: (nodeValue) => nodeValue.key === key });

    if (node) {
        //这里的delete函数里的compare为什么不用设置专门对象的比较？
        //正常 const a = { key:'a'} 和 const b = {key: 'b'}是不相等的
        //但是如果是用同一个变量就相等了。用value来delete来比较是因为 node用的是比较list上的变量 和这里的node的变量是一样的
        return bucketLinkedList.delete(node.value);
    }
    return null;
  }

  /**
   * @param {string} key
   * @return {*}
   */
  get(key) {
    const keyHash = this.hash(key);
    const bucketLinkedList = this.buckets[keyHash];
    const node = bucketLinkedList.find({ callback: (nodeValue) => nodeValue.key === key });

    return node ? node.value.value : undefined;
  }

  /**
   * @param {string} key
   * @return {boolean}
   */
  has(key) {
    return Object.hasOwnProperty.call(this.keys, key);
  }

  /**
   * @return {string[]}
   */
  getKeys() {
    return Object.keys(this.keys);
  }

  /**
   * Gets the list of all the stored values in the hash table.
   *
   * @return {*[]}
   */
   getValues() {
    return this.buckets.reduce((values, bucket) => {
      const bucketValues = bucket.toNodeArray()
        .map((linkedListNode) => linkedListNode.value.value);
      return values.concat(bucketValues);
    }, []);
  }
}
