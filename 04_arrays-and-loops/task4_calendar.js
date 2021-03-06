// Сгенерировать массив чисел 1–31 включительно (числа месяца).
// Вывести с помощью console.log
// для каждого из чисел строку ${число} января, ${день недели}.

let number = [];
let week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
let dayOfWeek = 'Вторник';

// Вариант 1
// let d = week.indexOf(dayOfWeek); //1

// for (i = 0; i < 31; ++i) {
//   number[i] = i + 1;
//   console.log(number[i], 'января, ', week[d]);
//   if (d < 6) {
//     ++d;
//   } else {
//     d = 0;
//   }
// }


// Вариант 2

for (i = 0; i < 31; ++i) {
  number[i] = i + 1;
  const index = number[i] % 7;
  console.log(number[i], 'января, ', week[Math.abs(index - 1 + week.indexOf(dayOfWeek))]);
}
