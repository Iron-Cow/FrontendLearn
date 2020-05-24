let current_formula = '';
let operation = '';
let calculator = document.querySelector('.box');
let display = calculator.querySelector('.display input');
let memory_indicator = calculator.querySelector('.memory_indicator');
let memory = 0;
let mrc_button = false;
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
                    if (display.value !== 'Error'){
                    current_formula = display.value + operation;
                    }else{
                        current_formula += operation;
                    }
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
                ccurrent_formula = display.value;
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

        // 'm' button
        if (pushed_button.classList.contains('gray')) {
            if (pushed_button.value.length === 2){
            memory += eval(pushed_button.value[1] + display.value);}
            else if (pushed_button.value.length === 3){
               if(!mrc_button){
                   display.value = memory.toString();
                   mrc_button = true;
               } else{
                   memory = 0
               };
            }

        }

        // screen restrictions
        if (+display.value > 9999999999999999){
            display.value = 'Error';
            current_formula = '0';
        }
        if (display.value.length > 16){
            display.value = display.value.slice(0, 16);
        }

        (memory === 0) ? memory_indicator.textContent = '' : memory_indicator.textContent = 'M';

        if (pushed_button.value !== 'mrc'){
            mrc_button = false
        }




        console.log('========================');
        console.log(`current screen => [${display.value}]`);
        console.log(`pushed => [${pushed_button.value}]`);
        console.log(`operation => [${operation}]`);
        console.log(`current_formula => [${current_formula}]`);
        console.log(`memory => [${memory}]`);
        console.log('========================');

    }
});

