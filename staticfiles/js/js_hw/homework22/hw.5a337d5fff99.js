let startbutton = document.querySelector('#draw-circle-button');
function createCircle(radius){
    let circle = document.createElement('div');
    circle.style.height = `${radius}px`;
    circle.style.width = `${radius}px`;
    circle.style.borderRadius = '50%';

    circle.style.backgroundColor = `rgb(${(Math.random()*255).toFixed(0)}, ${(Math.random()*255).toFixed(0)}, ${(Math.random()*255).toFixed(0)})`
    return circle;

}



startbutton.addEventListener('click', function start () {
    let container = document.createElement('div');
    let input = document.createElement('input');
    input.setAttribute('type', 'number');
    input.setAttribute('placeholder', 'Diameter');

    let circlebutton = document.createElement('button');
    circlebutton.innerHTML = 'Draw';
    circlebutton.classList.add('button');
    document.body.append(container);
    container.append(input);
    container.append(circlebutton);
    startbutton.parentNode.removeChild(startbutton);


    circlebutton.addEventListener('click', function () {
        let diameter = input.value;
        if (container.lastChild !== circlebutton){
            container.removeChild(container.lastChild);
        }
        let circle_container = document.createElement('div');
        container.append(circle_container);

        circle_container.style.display = 'grid';
        circle_container.style.gridTemplateColumns = `repeat(10, ${diameter}px)`;
        for (let i=0; i<100; i++){
            circle_container.append(createCircle(diameter))
        }

        circle_container.onclick = function (event) {
            this.removeChild(event.target);
        }
});


});


