document.addEventListener("DOMContentLoaded", function(event) {

    let fibonacci = function(first, second, n){
        if (n === 0){return first}
        else if (n === 1){return second}
        else if (n > 0){
            let next = first + second,
                f = second,
                s = next;
            return fibonacci(f, s, n-1)
        }
        else if (n < 0){
            let next = -first + second,
                f = next,
                s = first;
            console.log([first, second, n]);
            return fibonacci(f, s, n+1)
        }
    };

    while (true){
        let number = prompt('insert n-element to calculate fibonacci sequence (number will be rounded to integer)', '');
        if (isNaN(Number(number))){
            alert('Not correct, start from beginning');
            continue}
        let first = prompt('insert first number (number will be rounded to integer)', '');
        if (isNaN(Number(first))){
            alert('Not correct, start from beginning');
            continue}
        let second = prompt('insert second number (number will be rounded to integer)', '');
        if (isNaN(Number(second))){
            alert('Not correct, start from beginning');
            continue
        }else{
            alert(fibonacci(+first, +second, +number));
            // alert(factorial(parseInt(number)));
            break;
        }
    }
});