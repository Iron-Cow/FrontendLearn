let object = {
    name: 'nelia',
    age: 23,
    course: ['html', 'css', 'js'],
    tabel: {
        hw1: 100,
        hw2: [98, Date]
    }
};

function extend(obj, to) {
    if (obj == null || typeof obj != "object") {
        return obj;
    }
    if (obj.constructor !== Object && obj.constructor !== Array) {
        return obj;
    }

    if ( obj.constructor === Function || obj.constructor === String || obj.constructor === Number || obj.constructor === Boolean) {
        return new obj.constructor(obj);
    }

    to = to || new obj.constructor();

    for (let name in obj) {
        to[name] = typeof to[name] == "undefined" ? extend(obj[name], null) : to[name];
    }
    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }

    return to;
}
let clone = extend(object);
console.log(clone);
console.log(1);
