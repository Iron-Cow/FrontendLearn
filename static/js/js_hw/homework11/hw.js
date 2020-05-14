`## Задание

Реализовать функцию подсветки нажимаемых клавиш

#### Технические требования:
- В файле \`index.html\` лежит разметка для кнопок. 
- Каждая кнопка содержит в себе название клавиши на клавиатуре
- По нажатию указанных клавиш - та кнопка, на которой написана эта буква, должна окрашиваться в синий цвет. При этом, если какая-то другая буква уже ранее была окрашена в синий цвет - она становится черной. Например по нажатию \`Enter\` первая кнопка окрашивается в синий цвет. Далее, пользователь нажимает \`S\`, и кнопка \`S\` окрашивается в синий цвет, а кнопка \`Enter\` опять становится черной.
`;

let current_letter = null;
let btns = document.querySelectorAll('.btn');
let letters = Array.from(btns).map(el => el.textContent);

document.addEventListener('keypress', function (event) {
    let result = event.key[0].toUpperCase() + event.key.slice(1);
    if (letters.includes(result)) {
        for (let btn of btns) {
            if (current_letter) {
                current_letter.style.backgroundColor = '';
            }
            if (btn.textContent === result) {
                btn.style.backgroundColor = 'blue';
                current_letter = btn;
                break
            }
        }
    }
});
