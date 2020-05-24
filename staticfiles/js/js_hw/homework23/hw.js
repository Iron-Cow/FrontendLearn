let slider = document.body.querySelector('#slider');
let thumb = slider.querySelector('.thumb');

let table_size = document.body.querySelector('.table_size span');
let bombs_number = document.body.querySelector('.bombs_number span');
let minesweeper_board = document.body.querySelector('.minesweeper_board');
let COORDINATES_SHIFT = [[0, 1], [0, -1], [1, 1], [1, -1], [1, 0], [-1, 0], [-1, 1], [-1, -1]];
let current_layout = generate_game_field(+table_size.textContent, +bombs_number.textContent);
let new_game_button = document.body.querySelector('.new_game');
let game_result_element = document.body.querySelector('.game-result');
let bombs_left =  document.body.querySelector('.bombs_left_section span.bombs_left');
let bombs_from =  document.body.querySelector('.bombs_left_section span.bombs_from');

new_game_button.addEventListener('click', function () {
    new_game(minesweeper_board);
    new_game_button.style.visibility = 'hidden'
});



thumb.onmousedown = function(event) {
  event.preventDefault(); // предотвратить запуск выделения (действие браузера)

  let shiftX = event.clientX - thumb.getBoundingClientRect().left;
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
    table_size.textContent = Math.round((newLeft/(slider.offsetWidth)).toFixed(2) * 12 + 8);
    bombs_number.textContent = Math.trunc((table_size.textContent * table_size.textContent) / 6)
  }
  function onMouseUp() {
    document.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('mousemove', onMouseMove);
  }

};

thumb.ondragstart = function() {
  return false;
};

minesweeper_board.onmousedown = function(event) {
    event.preventDefault();
};

minesweeper_board.oncontextmenu = function(event) {
    event.preventDefault();
};

minesweeper_board.addEventListener('click', clack) ;

function clack (event) {
    event.preventDefault();
    if (event.target.classList[0] === 'minesweeper_cell') {
       open_cell(event.target)
    }
};

minesweeper_board.addEventListener('contextmenu', rclick);
function rclick(event) {
    event.preventDefault();
    if (event.target.classList[0] === 'minesweeper_cell'){
        if (event.target.innerText){
         event.target.innerText = '';
         bombs_left.innerHTML = +bombs_left.innerHTML + 1;


        }else{
            if (+bombs_left.innerHTML > 0){ event.target.innerText = '🚩';
               event.target.style.color = 'black';
               bombs_left.innerHTML = +bombs_left.innerHTML - 1;}

        }
    }
}

function digitDoubleCLick(event) {
    event.preventDefault();
     if (event.target.classList[0] === 'minesweeper_cell' && event.target.innerText !== '🚩' && +event.target.innerText > 0) {
        let el_index = Array.from(event.target.parentNode.children).indexOf(event.target);
        let row_index = Array.from(event.target.parentNode.parentNode.children).indexOf(event.target.parentNode);

        let surround_fields = get_surround_fields(current_layout, el_index, row_index);
        let surround_flags = 0;
        for (let f_coord of surround_fields){
            [x, y] = f_coord;
            if (minesweeper_board.children[y].children[x].innerHTML === '🚩'){
                surround_flags += 1
            }
        }
         if (+event.target.innerHTML === surround_flags){
             for (let cell_around of surround_fields){
                    let [x, y] = cell_around;
                    open_cell(minesweeper_board.children[y].children[x])
                }
         }

     }
}
minesweeper_board.addEventListener('dblclick', digitDoubleCLick);

function generate_game_field(size, bombs) {
    // field generation
    let field = [];
    for (let row=0; row<size; row++){
        let new_row = [];
        for (let element=0; element<size; element++){
            new_row.push(0);
        }
        field.push(new_row)
    }

    // field filling by bombs
    for (let bomb=0; bomb<bombs; bomb++) {
        while (1){
            let random_row = Math.round(Math.random() * (size-1));
            let random_element = Math.round(Math.random() * (size-1));
            if (+(field[random_row][random_element]) === 0){
                field[random_row][random_element] = 1;
                break
            }
        }
    }
    return field
}
 function open_cell(target){
            new_game_button.style.visibility = 'visible';
            let el_index = Array.from(target.parentNode.children).indexOf(target);
            let row_index = Array.from(target.parentNode.parentNode.children).indexOf(target.parentNode);

            if (target.innerText !== '🚩'){
                if (current_layout[row_index][el_index] === 1 ){
                    target.innerText = '💣';
                    target.style.border = 'none';
                    game_lose()



                }else if (current_layout[row_index][el_index] === 0) {
                    current_layout[row_index][el_index] = 'o';
                    target.style.border = 'none';
                    let bombs_around = get_surround_bombs(current_layout, el_index, row_index);
                    if (bombs_around !== 0) {target.innerText = bombs_around}
                    else{
                    for (let cell_around of get_surround_fields(current_layout, el_index, row_index)){
                            let [x, y] = cell_around;
                            open_cell(minesweeper_board.children[y].children[x])
                        }
                    }
                }
            }
            check_win(current_layout) ? game_win(): 1;
    }

function get_surround_fields(field, x, y) {
    let target = [x, y];
    let fields_to_check = [];
    for (let shift of COORDINATES_SHIFT) {
        fields_to_check.push(shift.map(function (e, i) {
            let cell = [e, target[i]].reduce((x, y) => x + y, 0);

            return cell
        }))
    }
    fields_to_check = fields_to_check.filter((x) =>
        x[0] >= 0 && x[0] < field[0].length &&
        x[1] >= 0 && x[1] < field.length
    );
    return fields_to_check
}
function get_surround_bombs(field, x, y){
    let fields_to_check = get_surround_fields(field, x, y);
    let surround_bombs = 0;
    for (let cell of fields_to_check){
        [x, y] = cell;
        if (field[y][x] === 1){
            surround_bombs++
        }
    }
    return surround_bombs
}

function new_game(field_element) {
    field_element.innerHTML = '';
    current_layout = generate_game_field(+table_size.textContent, +bombs_number.textContent);
    for (let row of current_layout){
        let rowel = document.createElement('div');
        minesweeper_board.append(rowel);
        rowel.classList.add('minesweeper_row');
        rowel.style.gridTemplateColumns = `repeat(${+table_size.textContent}, auto)`;

        for (let el of row ){
            let el_el = document.createElement('div');
            rowel.append(el_el);
            el_el.classList.add('minesweeper_cell');
        }
    }
    minesweeper_board.addEventListener('click', clack);
    minesweeper_board.addEventListener('contextmenu', rclick);
    minesweeper_board.addEventListener('dblclick', digitDoubleCLick);


    game_result_element = document.createElement('div');
    minesweeper_board.append(game_result_element);
    game_result_element.classList.add('game-result');
    game_result_element.style.visibility = 'hidden';
    bombs_left.innerHTML = +bombs_number.innerHTML
    bombs_from.innerHTML = "/" + bombs_number.innerHTML

}

function game_finish() {
    game_result_element.style.visibility = 'visible';
    minesweeper_board.removeEventListener('click', clack);
    minesweeper_board.removeEventListener('contextmenu', rclick);
    minesweeper_board.removeEventListener('dblclick', digitDoubleCLick);

}

function game_win() {
    game_finish();
    game_result_element.style.color = 'green';

    game_result_element.innerText = 'You Won!'
}

function game_lose() {
    game_finish();
        game_result_element.style.color = 'red';
    game_result_element.innerText = 'You Lost!'
}

function check_win(field) {
    for (let row of field){
        for (let el of row){
            if (el === 0){
                return false
            }
        }
    }
    return true
}


