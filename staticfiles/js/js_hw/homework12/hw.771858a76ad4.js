
`#### Технические требования:
- В папке \`banners\` лежит HTML код и папка с картинками.
- При запуске программы на экране должна отображаться первая картинка.
- Через 10 секунд вместо нее должна быть показана вторая картинка.
- Еще через 10 секунд - третья.
- Еще через 10 секунд - четвертая.
- После того, как покажутся все картинки - этот цикл должен начаться заново.
- При запуске программы где-то на экране должна появиться кнопка с надписью \`Прекратить\`.
- По нажатию на кнопку \`Прекратить\` цикл завершается, на экране остается показанной та картинка, которая была там при нажатии кнопки.
- Рядом с кнопкой \`Прекратить\` должна быть кнопка \`Возобновить показ\`, при нажатии которой цикл продолжается с той картинки, которая в данный момент показана на экране.
- Разметку можно менять, добавлять нужные классы, id, атрибуты, теги.

#### Не обязательное задание продвинутой сложности:
- При запуске программы на экране должен быть таймер с секундами и миллисекундами, показывающий сколько осталось до показа следующей картинки.
- Делать скрытие картинки и показывание новой картинки постепенным (анимация fadeOut / fadeIn) в течение 0.5 секунды.
`;

const timeInterval = 5;
let timerStep = 100;
let timer = 0;
let run = true;
let images = document.querySelectorAll('.image-to-show');
const imagesNumber = images.length;
let currentPicture = imagesNumber-1;

const clock = document.createElement('h1');
clock.innerHTML = timeInterval.toFixed(3);
clock.style.color = 'gray';
document.body.append(clock);

const btnRun = document.createElement('button');
btnRun.innerHTML = 'Run';
btnRun.style.width = '50%';
btnRun.style.height = '40px';
btnRun.style.marginTop = '5px';
btnRun.setAttribute('hidden', 'true');
document.body.append(btnRun);

const btnStop = document.createElement('button');
btnStop.innerHTML = 'Stop';
btnStop.style.width = '50%';
btnStop.style.height = '40px';
btnStop.style.marginTop = '5px';
document.body.append(btnStop);


for (let i=1; i<images.length; i++){
    images[i].setAttribute('hidden', 'true')
}
console.log(images[3]);

setTimeout(function f() {
        if (run){
            timer += timerStep;
            let newTime = timeInterval - timer % (timeInterval*1000) / 1000;
            clock.innerHTML = newTime.toFixed(3);
        }
        setTimeout(f, timerStep)
    }, timerStep);

setTimeout(function ff() {
    timer = 0;


    console.log(currentPicture);
    if (run){
    images[currentPicture % imagesNumber].setAttribute('hidden', 'true');
    currentPicture++;
    console.log(currentPicture);
    images[currentPicture % imagesNumber].removeAttribute('hidden');
}
    setTimeout(ff, timeInterval * 1000)
},0);



btnStop.addEventListener('click', () =>{
    run = false;
    clock.setAttribute('hidden', 'true');
    btnStop.setAttribute('hidden', 'true');
    btnRun.removeAttribute('hidden')
});
btnRun.addEventListener('click', () =>{
    run = true;
    clock.removeAttribute('hidden')
    btnRun.setAttribute('hidden', 'true');
    btnStop.removeAttribute('hidden')
});


