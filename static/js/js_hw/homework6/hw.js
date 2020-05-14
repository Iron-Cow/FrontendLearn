`#### Технические требования:
- Написать функцию \`filterBy()\`, которая будет принимать в себя 2 аргумента. Первый аргумент - массив, который будет содержать в себе любые данные, второй аргумент - тип данных.
- Функция должна вернуть новый массив, который будет содержать в себе все данные, которые были переданы в аргумент, за исключением тех, тип которых был передан вторым аргументом. То есть, если передать массив ['hello', 'world', 23, '23', null], и вторым аргументом передать 'string', то функция вернет массив [23, null]. 
`;

let arr = ['hello', 'world', 23, '23', null, {name: 1, val: 2}];
console.log(`given arr - ${arr.map(el => String(el))}`);

let dataType = prompt('insert datatype for filter', 'null');
console.log(`given datatype - ${dataType}`);


function filterBy(arr, dataType) {
    // return new array with all elements from <arr> !EXCEPT! elements with chosen <dataType>
    return arr.filter((element) =>
        (dataType === 'null') ? (element !== null) :
        (dataType !== 'object') ? (typeof element !== dataType) : // null === object // true
        (typeof element !== dataType || element === null)
    );
}
console.log('result:');
console.log(filterBy(arr, dataType));
