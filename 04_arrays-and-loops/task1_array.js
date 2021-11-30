// генератор массивов длиной count со случайными числами
//  от n до m

let a = [];
let n = -3;
let m = -5;
let count = 100;

let max = Math.max (n, m);
let min = Math.min (n, m);

//Вариант 1
// for (let i =0; i < count; ++i) {
//   a[i] = Math.floor(Math.random() * (max - min) + min);
// }
// console.log('Массив длиной', count, ':', a);

//Вариант 2
while (count > 0) {
  count -= 1;
  a.push(Math.floor(Math.random() * (max - min + 1) + min));
}
console.log('Массив длиной', a.length, ':', a);



