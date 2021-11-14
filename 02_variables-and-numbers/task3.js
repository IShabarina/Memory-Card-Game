// 3 генератор нечётных случайных чисел между n и m

let n = -3;
let m = -10;

let range = Math.abs(Math.max(m, n) - (Math.min(m, n)));
let min = Math.min(n, m);
let RandomInRange = (Math.round(Math.random() * (range - 2))) + min;

console.log('Случайное нечётное число', RandomInRange + ((RandomInRange % 2) + 1));

