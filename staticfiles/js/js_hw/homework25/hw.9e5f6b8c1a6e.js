let slider = document.body.querySelector('#slider');
let thumb = slider.querySelector('.thumb');
thumb.style.left = thumb.clientWidth/3 + 'px';
let shiftX;
let current_picture = 0;
let picArray = [
    '../../../img/js_tasks/hw25/1.jpg',
    '../../img/js_tasks/hw25/2.jpg',
    '../../img/js_tasks/hw25/3.jpg',
    '../../img/js_tasks/hw25/4.jpg',
    '../../img/js_tasks/hw25/5.jpg',
    '../../img/js_tasks/hw25/6.jpg',
];

function setThumbPictures(currentPic, picArray) {
    thumb.firstElementChild.style.backgroundImage = picArray[currentPic-1]
}
// setThumbPictures(current_picture, picArray);
slider.style.backgroundImage = `url("${picArray[0]}")`;
console.log(slider.style.backgroundImage);

function moveleft(thumb, slider) {
    let step = -1;
    let multiplicator = -1;
    let slide = setInterval(function() {


    shiftX = thumb.getBoundingClientRect().left - slider.getBoundingClientRect().left - thumb.clientWidth/3;
    console.log(shiftX);



    if (shiftX <= multiplicator * thumb.clientWidth/3) {
        clearInterval(slide);
        thumb.style.left = thumb.clientWidth/3 + 'px';
        return;
    }

    // отрисовать анимацию на момент timePassed, прошедший с начала анимации
    thumb.style.left = +thumb.style.left.slice(0, -2) + step + 'px';

}, 5);
}
function moveright(thumb, slider) {
    let step = 1;
    let multiplicator = 1;
    let slide = setInterval(function() {


    shiftX = thumb.getBoundingClientRect().left - slider.getBoundingClientRect().left - thumb.clientWidth/3;
    console.log(shiftX);

    if (shiftX >= multiplicator * thumb.clientWidth/3) {
        clearInterval(slide);
        thumb.style.left = thumb.clientWidth/3 + 'px';
        return;
    }

    // отрисовать анимацию на момент timePassed, прошедший с начала анимации
    thumb.style.left = +thumb.style.left.slice(0, -2) + step + 'px';

}, 5);
}

thumb.onmousedown = function(event) {
    event.preventDefault(); // предотвратить запуск выделения (действие браузера)

    shiftX = event.clientX - thumb.getBoundingClientRect().left;
    // shiftY здесь не нужен, слайдер двигается только по горизонтали

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(event) {
        let newLeft = event.clientX - shiftX - slider.getBoundingClientRect().left;

        // курсор вышел из слайдера => оставить бегунок в его границах.
        if (newLeft < 0) {
            newLeft = 0;
        }
        let rightEdge = slider.offsetWidth - thumb.offsetWidth;
        if (newLeft > rightEdge) {
            newLeft = rightEdge;
        }

        thumb.style.left = newLeft + 'px';
    }
    function onMouseUp() {
        shiftX = thumb.getBoundingClientRect().left - slider.getBoundingClientRect().left - thumb.clientWidth/3;
        console.log(thumb.style.left);
        console.log(shiftX);




        if (shiftX < -20){
            moveleft(thumb, slider);
        }
        else if (shiftX > 20){
            moveright(thumb, slider);
        }
        else{
            thumb.style.left = thumb.clientWidth/3 + 'px';
        }




        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mousemove', onMouseMove);
    }

};

thumb.ondragstart = function() {
    return false;
};

