let first_number = "";
let second_number = "";
let operation = "";

while (true){

    if (isNaN(first_number) || first_number === '') {
        first_number = prompt('input first number', '');
        continue;
    }
    else if (isNaN(second_number) || second_number === '') {
        second_number = prompt('input second number', '');
        continue;
    }
    else if (![`+`, `-`, `*`, `/`].includes(operation)) {
        operation = prompt('input operation from `+`, `-`, `*`, `/`', '');
        continue;
    }
    let result = eval(first_number+operation+second_number);
    console.log(`${first_number} ${operation} ${second_number} = ${result}`);
    break
}