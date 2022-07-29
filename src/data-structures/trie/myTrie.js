//feature:
//1. Node:{a. currentNode character b. isCompleteWord c. children}
//2. head character:*
import HashTable from "../hash-table/myHashTable.js";

//（前序)遍历字典树
function depthPreWords(currentNode, currentString, AllWords) {
    if (currentNode.isCompleteWord) {
        AllWords.push(currentString);
    }
    if (!currentNode.hasChildren()) {
        return;
    }

    if (currentNode.hasChildren()) {
        currentNode.suggestChildrenNode().forEach((Node) => {
            const newCurrentString = currentString.concat(Node.character);
            depthPreWords(Node, newCurrentString, AllWords);
        });
    }
}



// Character that we will use for trie tree root.
export default class TrieNode {
    constructor(character, isCompleteWord = false) {
        this.character = character;
        this.isCompleteWord = isCompleteWord;
        this.children = new HashTable();
    }

    getChild(character) {
        return this.children.get(character);
    }

    // has this character
    hasChild(character) {
        return this.children.has(character);
    }

    //has one child character
    hasChildren() {
        return this.children.getKeys().length !== 0;
    }

    addChild(character, isCompleteWord = false) {
        if (!this.hasChild(character)) {
            this.children.set(character, new TrieNode(character, isCompleteWord));
        }
        const childNode = this.children.get(character);
        childNode.isCompleteWord = childNode.isCompleteWor || isCompleteWord;
        return childNode;
    }

    removeChild(character) {
        const childNode = this.getChild(character);
        //happy
        //happ
        if (
            childNode
            && !childNode.isCompleteWord
            && !childNode.hasChildren()
          ) {
            this.children.delete(character);
        }

        return this;
    }

    suggestChildren() {
        return [...this.children.getKeys()];
    }

    suggestChildrenNode() {
        return [...this.children.getValues()];
    }

    toString() {
        let childrenAsString = this.suggestChildren().toString();
        childrenAsString = childrenAsString ? `:${childrenAsString}` : '';
        const isCompleteString = this.isCompleteWord ? '*' : '';
        return `${this.character}${isCompleteString}${childrenAsString}`;
    }
}

const HEAD_CHARACTER = '*';
export class Trie {
    constructor() {
        this.head = new TrieNode(HEAD_CHARACTER);
    }

    addWord(word) {
        const characters = Array.from(word);
        let currentNode = this.head;
        for (let charIndex = 0; charIndex < characters.length; charIndex += 1) {
            const isComplete = charIndex === characters.length - 1;
            currentNode = currentNode.addChild(characters[charIndex], isComplete);
        }
        return this;
    }

    deleteWord(word) {
        const depthFirstDelete = (currentNode, charIndex = 0) => {
            if (charIndex >= word.length) {
                // Return if we're trying to delete the character that is out of word's scope.
                return;
            }

            const character = word[charIndex];
            const nextNode = currentNode.getChild(character);

            if (nextNode == null) {
                // Return if we're trying to delete a word that has not been added to the Trie.
                return;
            }

            // Go deeper.
            depthFirstDelete(nextNode, charIndex + 1);

            // Since we're going to delete a word let's un-mark its last character isCompleteWord flag.
            if (charIndex === (word.length - 1)) {
                nextNode.isCompleteWord = false;
            }

            // childNode is deleted only if:
            // - childNode has NO children
            // - childNode.isCompleteWord === false
            currentNode.removeChild(character);
        };

        // Start depth-first deletion from the head node.
        depthFirstDelete(this.head);

        return this;
    }

    getLastCharacterNode(word) {
        if (word === '*') {
            return this.head;
        }
        const characters = Array.from(word);
        let currentNode = this.head;
        for (let charIndex = 0; charIndex < characters.length; charIndex += 1) {
            if (!currentNode.hasChild(characters[charIndex])) {
              return null;
            }
            currentNode = currentNode.getChild(characters[charIndex]);
        }
        return currentNode;
    }

    suggestNextCharacters(word) {
        const lastCharacter = this.getLastCharacterNode(word);
        if (!lastCharacter) {
            return null;
        }
        return lastCharacter.suggestChildren();
    }

    doesWordExist(word) {
        const lastCharacter = this.getLastCharacterNode(word);
        return !!lastCharacter && lastCharacter.isCompleteWord;
    }

    suggestNextAllWords(word) {
        const nextAllWords = [];
        const currentNode = this.getLastCharacterNode(word);
        depthPreWords(currentNode, word, nextAllWords);
        return nextAllWords;
    }
}

