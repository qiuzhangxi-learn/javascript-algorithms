//https://zhuanlan.zhihu.com/p/94432288
//https://www.jianshu.com/p/1308dce00ad0

//x&(-x)：保留二进制下最后出现的1的位置，其余位置置0（即一个数中最大的2的n次幂的因数
//对于x&(-x)
//-x的运算是，所有位置取反+1，即变形如下（Ā表示所有位置取反）：
//偶数：(Ā)0(11…1) + 1 = (Ā)1(00…0)
//奇数：(Ā)0 + 1 = (Ā)1

//所以，x&(-x)即：
//偶数：(Ā)1(00…0) & (A)1(00…0) = (00…0)1(00…0)
//奇数：(Ā)1 & (A)1 = (00…0)1


//x&(x-1)：消除二进制下最后出现1的位置，其余保持不变

export default class FenwickTree {
    /**
     * Constructor creates empty fenwick tree of size 'arraySize',
     * however, array size is size+1, because index is 1-based.
     *
     * @param  {number} arraySize
     */
    constructor(inputArray) {
      this.inputArray = inputArray;
      this.arraySize = inputArray.length;

      // Fill tree array with zeros.
      this.treeArray = Array(this.arraySize + 1).fill(0);
      this.buildBITree(this.inputArray);
    }

    buildBITree(inputArray) {
        for (let i = 1; i < this.arraySize + 1; i += 1) {
            this.increase(i, inputArray[i - 1]);
        }
    }

    /**
     * Adds value to existing value at position.
     *
     * @param  {number} position
     * @param  {number} value
     * @return {FenwickTree}
     */
    //i += (i & -i)
    //i = 1
    //1, 2(1 += 1 & -1), 4(2 += 2&-2), 8(4 += 4&-4), 16(8 += 8&-8)

    // i = 2
    // 2, 4, 8, 16

    // i =3
    // 3， 4( 3 += 3& -3), 8(4 += 4&-4), 16

    // i = 5
    // 5, 6(5 += 5&-5), 8(6 += 6&-6)
    increase(position, value) {
      if (position < 1 || position > this.arraySize) {
        throw new Error('Position is out of allowed range');
      }
      this.inputArray[position - 1] += value;
      for (let i = position; i <= this.arraySize; i += (i & -i)) {
        this.treeArray[i] += value;
      }

      return this;
    }

    //理论上不应该有update 因为这个树只能增减哎变化，不能随意变化
    update(position, value) {
        if (position < 1 || position > this.arraySize) {
            throw new Error('Position is out of allowed range');
        }
        const valueChange = value - this.inputArray[position - 1];
        for (let i = position; i <= this.arraySize; i += (i & -i)) {
            this.treeArray[i] += valueChange;
        }
    }

    /**
     * Query sum from index 1 to position.
     *
     * @param  {number} position
     * @return {number}
     */
    //i -= (i & -i)

    //i = 7
    //treeArray[7] + treeArray[ 6(7 -= (7&-7))] + treeArray[6 - 2 ] + treeArray[4]
    query(position) {
      if (position < 1 || position > this.arraySize) {
        throw new Error('Position is out of allowed range');
      }

      let sum = 0;

      for (let i = position; i > 0; i -= (i & -i)) {
        sum += this.treeArray[i];
      }

      return sum;
    }

    /**
     * Query sum from index leftIndex to rightIndex.
     *
     * @param  {number} leftIndex
     * @param  {number} rightIndex
     * @return {number}
     */
    queryRange(leftIndex, rightIndex) {
      if (leftIndex > rightIndex) {
        throw new Error('Left index can not be greater than right one');
      }

      if (leftIndex === 1) {
        return this.query(rightIndex);
      }

      return this.query(rightIndex) - this.query(leftIndex - 1);
    }
  }
