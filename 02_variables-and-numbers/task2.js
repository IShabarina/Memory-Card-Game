// 2 округление и сравнение дробных чисел

let a = 13.890123;
let b = 2.891564;
let n = 3; // точность

let firstFractionalPart = Math.round(a % 1 * Math.pow(10, n));
let secondFractionalPart = Math.round(b % 1 * Math.pow(10, n));

console.log('Дробная часть чисел', firstFractionalPart, secondFractionalPart);
console.log('Дробная часть числа а > числа b', firstFractionalPart > secondFractionalPart);
console.log('Дробная часть числа а < числа b', firstFractionalPart < secondFractionalPart);
console.log('Дробная часть числа а >= числа b', firstFractionalPart >= secondFractionalPart);
console.log('Дробная часть числа а <= числа b', firstFractionalPart <= secondFractionalPart);
console.log('Дробная часть числа а = числа b', firstFractionalPart === secondFractionalPart);
console.log('Дробная часть числа а не равна числа b', firstFractionalPart !== secondFractionalPart);
