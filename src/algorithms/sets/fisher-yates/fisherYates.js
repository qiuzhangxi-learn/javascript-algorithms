/**
 * @param {*[]} originalArray
 * @return {*[]}
 */
export default function fisherYates(originalArray) {
  // Clone array from preventing original array from modification (for testing purpose).
  const array = originalArray.slice(0);

  for (let i = (array.length - 1); i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    //swap it with the current element.
    //新的 ES6 允许我们一次分配两个变量。当我们想要交换两个变量的值时，这特别方便，因为我们可以在一行代码中完成。这是使用此功能的相同功能的较短形式。
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }

  return array;
}
