// С помощью цикла создать перевёрнутый вариант
// произвольной строки

let str = 'Привет, мир!!!';
let flipStr = '';

for (i = str.length - 1; i >= 0; i--) {
  flipStr = flipStr + str[i];
}

console.log(flipStr);
