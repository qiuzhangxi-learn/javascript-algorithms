/**
 * @param {number} lineNumber - zero based.
 * @return {number[]}
 */
//note:
//这是打印每一行的
export default function pascalTriangle(lineNumber) {
  const currentLine = [1];

  const currentLineSize = lineNumber + 1;

  for (let numIndex = 1; numIndex < currentLineSize; numIndex += 1) {
    // See explanation of this formula in README.
    currentLine[numIndex] = (currentLine[numIndex - 1] * (lineNumber - numIndex + 1)) / numIndex;
  }

  return currentLine;
}

//note:
//https://www.geeksforgeeks.org/pascal-triangle/
//method1 第二层循环里进行公式计算
// C(line, i)   = line! / ( (line-i)! * i! )      start index: 0
// O(n^3) time complexity Auxiliary Space: O(1)


//method2 二维数组
//（O(n^2) 时间和 O(n^2) 额外空间）
//arr[line][i] = arr[line-1][i-1] + arr[line-1][i];


//method3
//  第二层循环里进行公式计算
// C(line, i)   = line! / ( (line-i)! * i! )
// C(line, i-1) = line! / ( (line - i + 1)! * (i-1)! )
// We can derive following expression from above two expressions.
// C(line, i) = C(line, i-1) * (line - i + 1) / i
// So C(line, i) can be calculated from C(line, i-1) in O(1) time
// ( O(n^2) time and O(1)或 O(n) extra space )
// function printPascal(n)
// {
//     for(line = 1; line <= n; line++)
//     {

//     var C=1;// used to represent C(line, i)
//     for(i = 1; i <= line; i++)
//     {
//         // The first value in a line is always 1
//         document.write(C+" ");
//         C = C * (line - i) / i;
//     }
//     document.write("<br>");
//     }
// }
