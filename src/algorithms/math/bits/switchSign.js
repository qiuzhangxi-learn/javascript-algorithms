/**
 * Switch the sign of the number using "Twos Complement" approach.
 * @param {number} number
 * @return {number}
 */
export default function switchSign(number) {
  return ~number + 1;
}

//无符号数（补码）=原码
//有符号数（补码）= 原码取反（符号位保留） + 1
//有符号数（原码）= （有符号数补码 - 1）取反（符号位保留）

//假如这个有符号数是正数
//0......0....101
//1......1....010 + 1
//1......1....011
//1......1....011 - 1
//1......1....010
//1......0....101


//假如这个有符号数是负数
//1......0....101
//1......1....010 + 1
//1......1....011
//0......0....100 + 1
//0......0....101
