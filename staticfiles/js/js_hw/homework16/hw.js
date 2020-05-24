document.addEventListener("DOMContentLoaded", function(event) {
    let factorial = function(n){
        if (n === 1){return 1}
        else{return (n * factorial(n-1))}
    };

    while (true){
        let number = prompt('insert number to calculate factorial (number will be rounded to integer', '');
        if (isNaN(Number(number)) || Number(number) < 1 ){
         alert('Not correct')
        }else{
            alert(factorial(parseInt(number)));
            break;
        }
    }
});