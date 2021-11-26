let name = 'ФедОр';
let surname = 'иванов';

let nameTransformed = name[0].toUpperCase() + name.substr(1).toLowerCase();
let sunameTransformed = surname[0].toUpperCase() + surname.substr(1).toLowerCase();

let message = nameTransformed == name && sunameTransformed == surname ?
  'Имя осталось без изменений:' : 'Имя было преобразовано:';
console.log(message, nameTransformed, sunameTransformed);
