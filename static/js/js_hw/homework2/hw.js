// ## Теоретический вопрос
//
// 1. Описать своими словами в несколько строчек, зачем в программировании нужны циклы.
//
// ## Задание
//
// Реализовать программу на Javascript, которая будет находить все числа кратные 5 (делятся на 5 без остатка) в заданном диапазоне.
//
// #### Технические требования:
// - Считать с помощью модального окна браузера число, которое введет пользователь.
// - Вывести в консоли все числа кратные 5, от 0 до введенного пользователем числа. Если таких чисел нету - вывести в консоль фразу `Sorry, no numbers'
// - Обязательно необходимо использовать синтаксис ES6 (ES2015) при создании переменных.
//
// #### Не обязательное задание продвинутой сложности:
// - Проверить, что введенное значение является целым числом. Если данное условие не соблюдается, повторять вывод окна на экран до тех пор, пока не будет введено целое число.
// - Считать два числа, `m` и `n`. Вывести в консоль все простые числа (http://ru.math.wikia.com/wiki/%D0%9F%D1%80%D0%BE%D1%81%D1%82%D0%BE%D0%B5_%D1%87%D0%B8%D1%81%D0%BB%D0%BE) в диапазоне от `m` до `n` (меньшее из введенных чисел будет `m`, бОльшее будет `n`). Если хотя бы одно из чисел не соблюдает условие валидации, указанное выше, вывести сообщение об ошибке, и спросить оба числа заново.
//
// #### Литература:
// - [Циклы while, for](https://learn.javascript.ru/while-for)

console.log("first task");
while (true){
    let num1;
    num1 = +prompt("input number: ");
    if (isNaN(num1) || ((num1 ^ 0) !== num1)){
        alert("Please input only integers!");
        // num1 = +prompt("input first number: ");
        continue;
    }
    console.log(`num = ${num1}`);


    if (num1 < 5){
        console.log('Sorry, no numbers!');
    }
    else{
        for (let i = 0; i < num1; i++){
            if (i % 5 === 0){
                console.log(i)
            }
        }

        }

    break
}
console.log("");

alert("first task done");
console.log("second task");


while (true){
    let m;
    let n;
    let num1;
    let num2;
    num1 = +prompt("input first number: ");
    if (isNaN(num1) || ((num1 ^ 0) !== num1) || num1 < 0){
        alert("Please input only positive integers!");
        // num1 = +prompt("input first number: ");
        continue;
    }
    num2 = +prompt("input second number: ");

    if (isNaN(num2) || (num2 ^ 0) !== num2 || num2 < 0){
        alert("Please input only positive integers!");
        // num1 = +prompt("input first number: ");
        // num2 = +prompt("input second number: ");
        continue;
    }


    if (num1 < num2){
        m = num1;
        n = num2;
    }
    else{
        m = num2;
        n = num1;
    }

    console.log(`m = ${num1}`);
    console.log(`n = ${num2}`);
    for (let num = m; num < n;  num++){
        let count = 0;
        for (let i = num - 1; i > 1; i--){
            if (num % i === 0){
                count ++
            }
        }
        if (count === 0){
            console.log(num)
        }
    }
    break
}