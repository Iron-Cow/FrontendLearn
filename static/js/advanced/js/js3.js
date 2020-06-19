let table = document.createElement('table');
table.classList.add('switcher__table');
// table.setAttribute('border', '1px');

document.body.append(table);


let row_sample = document.createElement('tr');
let cell_sample = document.createElement('td');
cell_sample.classList.add('switcher__cell');
cell_sample.classList.add('color_white');

// filling the row
for(let i=0; i<30; i++){
    let clone_cell = cell_sample.cloneNode(true);
    row_sample.append(clone_cell)
}

// filling the table
for(let i=0; i<30; i++){
    let clone_row = row_sample.cloneNode(true);
    table.append(clone_row)
}

let switcher_dict = {
    'color_black': 'color_white',
    'color_white': 'color_black'
};

table.addEventListener('click', function (event) {
    if (event.target.classList.contains('color_black')) {
        event.target.classList.replace('color_black', 'color_white');
        console.log(1);
    } else if (event.target.classList.contains('color_white')) {
        event.target.classList.replace('color_white', 'color_black');
    }
});

document.body.addEventListener('click', function (event) {
    if (event.target.closest('.switcher__table') == null){
        (table.classList.contains('reversed-colors')) ?
            table.classList.remove('reversed-colors') :
            table.classList.add('reversed-colors');
        console.log('color changed')


    }
});