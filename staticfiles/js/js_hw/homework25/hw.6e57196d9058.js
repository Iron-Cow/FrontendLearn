let slider_window = document.body.querySelector('.slider-window');
let slider = document.body.querySelector('#slider');
let thumb = slider.querySelector('.thumb');
let shiftX;
// let picture_label = thumb.querySelectorAll('.picture');
let picture1 = thumb.querySelector('.picture1');
let picture2 = thumb.querySelector('.picture2');
let picture3 = thumb.querySelector('.picture3');

let left_arrow = document.body.querySelector('#leftarrow');
let right_arrow = document.body.querySelector('#rightarrow');
let current_picture = 0;


let picture_size_px = 200;
let radio_panel = document.body.querySelector('.radio_buttons');


// slider setup
slider_window.style.width = picture_size_px * 2 + 'px';
slider_window.style.height = picture_size_px + 'px';
slider.style.width = picture_size_px * 10 + 'px';
slider.style.height = picture_size_px + 'px';
thumb.style.width = picture_size_px * 6 + 'px';
thumb.style.height = picture_size_px + 'px';
thumb.style.left = thumb.clientWidth/3 + 'px';



function setThumbPictures(currentPic, picArray) {
    let indexes = [
        (currentPic-1 + picArray.length)%picArray.length,
        (currentPic + picArray.length)%picArray.length,
        (currentPic+1 + picArray.length)%picArray.length];


    picture1.style.backgroundImage = `url(${picArray[indexes[0]]})`;
    picture2.style.backgroundImage = `url(${picArray[indexes[1]]})`;
    picture3.style.backgroundImage = `url(${picArray[indexes[2]]})`;
    for (let radio of radio_panel.children){
        radio.classList.remove('radioactive');
    }
    radio_panel.children[currentPic].classList.add('radioactive')
}
setThumbPictures(current_picture, picArray);

function moveleft(thumb, slider) {
    let step = -2;
    let multiplicator = -1;
    let slide = setInterval(function() {

    shiftX = thumb.getBoundingClientRect().left - slider.getBoundingClientRect().left - thumb.clientWidth/3;
    console.log(shiftX);



    if (shiftX <= multiplicator * thumb.clientWidth/3) {
        clearInterval(slide);
        thumb.style.left = thumb.clientWidth/3 + 'px';
        current_picture = (current_picture + picArray.length + 1)%picArray.length;
        console.log(current_picture);
        setThumbPictures(current_picture, picArray);
        return;
    }

    // отрисовать анимацию на момент timePassed, прошедший с начала анимации
    thumb.style.left = +thumb.style.left.slice(0, -2) + step + 'px';

}, 5);
}
function moveright(thumb, slider) {
    let step = 2;
    let multiplicator = 1;
    let slide = setInterval(function() {


    shiftX = thumb.getBoundingClientRect().left - slider.getBoundingClientRect().left - thumb.clientWidth/3;
    console.log(shiftX);

    if (shiftX >= multiplicator * thumb.clientWidth/3) {
        clearInterval(slide);
        thumb.style.left = thumb.clientWidth/3 + 'px';
        current_picture = (current_picture + picArray.length - 1)%picArray.length;
        setThumbPictures(current_picture, picArray);
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

right_arrow.addEventListener('click', function () {
    moveleft(thumb, slider)
});

left_arrow.addEventListener('click', function () {
    moveright(thumb, slider)
});

radio_panel.addEventListener('click', function (event) {
    if (event.target.classList.contains('radio_button')){
        current_picture = [...event.target.parentElement.children].indexOf(event.target);
        setThumbPictures(current_picture, picArray);
    }
});