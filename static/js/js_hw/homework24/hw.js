let current_formula = '';
let next_sybmol_rewrite = false;
let operation = '';
let calculator = document.querySelector('.box');
let display = calculator.querySelector('.display input');
display.value = '0';



calculator.addEventListener('click', function (event) {
    event.preventDefault();

    let pushed_button = event.target;
    if (pushed_button.classList.contains('button')){

        // pushed regular button
        if (pushed_button.classList.contains('black') && pushed_button.value !== 'C') {

            if (operation){
                if (operation === '='){
                    current_formula = '';
                }
                else{
                    current_formula = display.value + operation;

                }
                    display.value = '0';
                    operation = '';

            }

            // '.' pushed
            if (pushed_button.value === '.' && display.value.indexOf('.') === -1) { // multiple '.' check
                display.value += pushed_button.value;
            }

            else if (display.value === '0') {
                display.value = '';
            }

            if (pushed_button.value !== '.'){
                display.value += pushed_button.value;
            }


        }

        // 'C' pushed
        else if (pushed_button.value === 'C') {
            display.value = '0';
            operation = '';
            current_formula = '';
        }

        // operation button
        if (pushed_button.classList.contains('pink')) {
            if (current_formula && !operation){
                display.value = eval(current_formula+display.value).toString();
                current_formula = display.value;
            }
            operation = pushed_button.value;
        }

        // '=' button
        if (pushed_button.classList.contains('orange')) {
            if (current_formula && !operation){
                display.value = eval(current_formula+display.value).toString();
                current_formula = display.value;

            }
            operation = '=';
        }

        // screen restrictions
        if (+display.value > 9999999999999999){
            display.value = 'Error';
        }
        if (display.value.length > 16){
            display.value = display.value.slice(0, 16);
        }
        console.log('========================');
        console.log(`current screen => [${display.value}]`);
        console.log(`pushed => [${pushed_button.value}]`);
        console.log(`operation => [${operation}]`);
        console.log(`current_formula => [${current_formula}]`);
        console.log('========================');

    }
});

