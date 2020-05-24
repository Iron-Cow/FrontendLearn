let arr = ['coco', 'candy', 'apple', fruits = {name : 'apple', weight : 100}, sweets = {name : 'candy', weight: 100 }];
function filterCollection(array, searchWord, theSwitch, ...field) {
    let newArr = [];
    let _searchWord = searchWord.split(' ');
    for (let i = 0; i < array.length; i++) {

        for (let j = 0; j < _searchWord.length; j++) {

            for (let k = 0; k < field.length; k++) {
                if (field[k] === _searchWord[j] && typeof array[i] === 'object') {
                    newArr.push(field[k]);
                    if (theSwitch === false && newArr.length === 1) break;
                }
            }

            if ( array[i] === _searchWord[j]) {
                newArr.push(array[i]);
                if (theSwitch === false && newArr.length === 1) break;
            }
        }

        if (theSwitch === false && newArr.length === 1) break;
    }

    return newArr;
}
console.log(filterCollection(arr, 'candy coco', true, fruits.name, sweets.name));
