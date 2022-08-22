
import KnapsackItem from "./KnapsackItem.js"
import Knapsack from "./myKnapsack.js"


    const possibleKnapsackItems = [
        new KnapsackItem({ value: 1, weight: 1 }),
        new KnapsackItem({ value: 4, weight: 3 }),
        new KnapsackItem({ value: 5, weight: 4 }),
        new KnapsackItem({ value: 7, weight: 5 }),
    ];
  
      const maxKnapsackWeight = 7;
  
      const knapsack = new Knapsack(possibleKnapsackItems, maxKnapsackWeight);
  
      knapsack.solveZeroOneKnapsackProblem();
      console.log(knapsack.selectedItems);