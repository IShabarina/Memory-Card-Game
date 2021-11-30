// Танк едет по дороге, на которой могут быть противотанковые мины.
// Дорога должна быть представлена в виде массива roadMines
// из 10 boolean - элементов.Если элемент равен true, то это мина.

let roadMines = [false, false, false, true, false, false, false, false, false, false];
let lives = 1;

for (let i = 0; i < roadMines.length; ++i) {
  console.log(`Танк переместился на позицию ${i + 1}`);

  if (roadMines[i] == true) {
    if (lives !== 0) {
      console.log('Танк поврежден');
    } else {
      console.log('Танк уничтожен');
      break;
    }
    --lives;
  }
}

// Вариант 2
// let i = 0;

// while (i < roadMines.length) {
//   console.log(`Танк переместился на позицию ${i + 1}`);
//   if (roadMines[i] == true) {
//     if (lives != 0) {
//       console.log('Танк поврежден');
//     } else {
//       console.log('Танк уничтожен');
//       break;
//     }
//     --lives;
//   }
//   ++i;
// }


