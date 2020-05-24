// `## Задание
//
// Создать поле для ввода цены с валидацией.
//
// #### Технические требования:
// - При загрузке страницы показать пользователю поле ввода (\`input\`) с надписью \`Price\`. Это поле будет служить для ввода числовых значений
// - Поведение поля должно быть следующим:
//    - При фокусе на поле ввода - у него должна появиться рамка зеленого цвета. При потере фокуса она пропадает.
//    - Когда убран фокус с поля - его значение считывается, над полем создается \`span\`, в котором должен быть выведен текст: \`Текущая цена: ${значение из поля ввода}\`. Рядом с ним должна быть кнопка с крестиком (\`X\`). Значение внутри поля ввода окрашивается в зеленый цвет.
//    - При нажатии на \`Х\` - \`span\` с текстом и кнопка \`X\` должны быть удалены. Значение, введенное в поле ввода, обнуляется.
//    - Если пользователь ввел число меньше 0 - при потере фокуса подсвечивать поле ввода красной рамкой, под полем выводить фразу - \`Please enter correct price\`. \`span\` со значением при этом не создается.
// - В папке \`img\` лежат примеры реализации поля ввода и создающегося \`span\`.`;

let div = document.createElement('div');
div.innerHTML += '<h1>hello</h1>';
div.style.backgroundColor = 'yellow';
document.body.append(div);

let input = document.createElement('input');
input.setAttribute('type', 'number');
div.append(input);

let span = document.createElement('span');
span.innerText = 'Current price: ';

let price = document.createElement('span');
let error = document.createElement('p');
let button = document.createElement('button');
button.innerText = 'X';
span.append(price);
span.append(button);

input.before(span);
input.after(error);
error.innerHTML = 'Please enter correct price!';
    error.setAttribute('hidden', 'true');
    span.setAttribute('hidden', 'true');

input.addEventListener('focus', function () {
    input.style.border = '6px solid green';
    error.setAttribute('hidden', 'true');
    span.setAttribute('hidden', 'true');
});

input.addEventListener('blur', function () {
    input.style.border = '';
    let price_get = input.value;
    if (+price_get == '') {input.value = '0';}
    if (+price_get < 0) {
        error.removeAttribute('hidden');
        input.style.border = '6px solid red';
    }
    else{
        span.removeAttribute('hidden');
        price.innerHTML = input.value;
    }
});

button.addEventListener('click', function () {
    span.setAttribute('hidden', 'true');
    input.value = '0';
});