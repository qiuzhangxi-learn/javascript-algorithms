
import KnapsackItem from "./KnapsackItem.js";
import Knapsack from "./myKnapsack.js";


// const possibleKnapsackItems = [
//     new KnapsackItem({ value: 1, weight: 1 }),
//     new KnapsackItem({ value: 4, weight: 3 }),
//     new KnapsackItem({ value: 5, weight: 4 }),
//     new KnapsackItem({ value: 7, weight: 5 }),
// ];

const possibleKnapsackItems = [
    new KnapsackItem({ value: 5, weight: 1 }),
    new KnapsackItem({ value: 1, weight: 1 }),
    new KnapsackItem({ value: 7, weight: 1 }),
    new KnapsackItem({ value: 4, weight: 1 }),
    new KnapsackItem({ value: 4, weight: 1 }),
    new KnapsackItem({ value: 4, weight: 1 }),
];

const maxKnapsackWeight = 3;

const knapsack = new Knapsack(possibleKnapsackItems, maxKnapsackWeight);

knapsack.solveZeroOneKnapsackProblem();
console.log(knapsack.selectedItems);

// const possibleKnapsackItems = [
//     new KnapsackItem({ value: 84, weight: 7 }), // v/w ratio is 12
//     new KnapsackItem({ value: 5, weight: 2 }), // v/w ratio is 2.5
//     new KnapsackItem({ value: 12, weight: 3 }), // v/w ratio is 4
//     new KnapsackItem({ value: 10, weight: 1 }), // v/w ratio is 10
//     new KnapsackItem({ value: 20, weight: 2 }), // v/w ratio is 10
// ];

// const maxKnapsackWeight = 15;

// const knapsack = new Knapsack(possibleKnapsackItems, maxKnapsackWeight);

// knapsack.solveUnBoundedKnapsackProblem();
// console.log(knapsack.selectedItems);
