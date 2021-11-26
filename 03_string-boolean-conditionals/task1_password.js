let password = '____-----';
let passwordValidator = (password.length >= 4 && (password.includes("_") || password.includes("-"))) ? 'Пароль надёжный' : 'Пароль недостаточно надёжный';
console.log(passwordValidator);
