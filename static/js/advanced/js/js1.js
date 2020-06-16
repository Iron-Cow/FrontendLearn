function HamburgerException(msg) {
    this.error = "Hamburger Exception";
    this.massage = msg;
}

function Hamburger(size, stuffing) {
    try {
        if (typeof (size) !== "object") {
            throw new HamburgerException("Hamburger size - has wrong data type. Еnter object");
        }
        if (typeof (stuffing) !== "object") {
            throw new HamburgerException("Hamburger stuffing - has wrong data type. Еnter object");
        }
        if (size.name !== "SIZE_SMALL" && size.name !== "SIZE_LARGE") {
            throw new HamburgerException("The first argument is size. Enter size");
        }
        if (stuffing.name !== "CHEESE" && stuffing.name !== "SALAD" && stuffing.name !== "POTATO") {
            throw new HamburgerException("The second argument is stuffing. Enter stuffing");
        }
        this._size = size;
        this._stuffing = stuffing;
    }
    catch (HamburgerException) {
        return HamburgerException.massage;
    }
    finally {
        this._topping = [];
    }
}

Hamburger.prototype.getSize = function () {
    return this._size.name;
};
Hamburger.prototype.getStuffing = function () {
    return this._stuffing.name;
};
Hamburger.prototype.addTopping = function (topping) {
    try {
        if (!topping) {
            throw new HamburgerException("Enter topping");
        }
        this._topping.forEach(function (elem) {
            if (topping.name === elem.name) {
                throw new HamburgerException("Duplicate topping. Сan only one");
            }
        });
        this._topping.push(topping);
    }
    catch (error) {
        return error.message;
    }
};
Hamburger.prototype.removeTopping = function (removeTopping) {
    try {
        if (!removeTopping) {
            throw new HamburgerException("Enter topping");
        }
        this._topping.some(function (elem) {
            return removeTopping.name === elem.name;
        });
        const result = this._topping.filter(elem => elem.name !== removeTopping.name);
        this._topping = result;
    }
    catch (error) {
        return error.message;
    }
};
Hamburger.prototype.getToppings = function () {
    let arrTopping = [];
    this._topping.forEach(function (elem) {
        arrTopping.push(elem.name);
    });
    return arrTopping;
};
Hamburger.prototype.calculatePrice = function () {
    const calcToppingPrice = this._topping.reduce(function (sum, current) {
        return sum += current.price;
    }, 0);
    const priceCalc = this._size.price + this._stuffing.price + calcToppingPrice;
    return priceCalc;
};
Hamburger.prototype.calculateCalories = function () {
    const calcToppingCalories = this._topping.reduce(function (sum, current) {
        return sum += current.calories;
    }, 0);
    const caloriesCalc = this._size.calories + this._stuffing.calories + calcToppingCalories;
    return caloriesCalc;
};

Hamburger.SIZE_SMALL = { name: "SIZE_SMALL", price: 50, calories: 20 };
Hamburger.SIZE_LARGE = { name: "SIZE_LARGE", price: 100, calories: 40 };
Hamburger.STUFFING_CHEESE = { name: "CHEESE", price: 10, calories: 20 };
Hamburger.STUFFING_SALAD = { name: "SALAD", price: 20, calories: 5 };
Hamburger.STUFFING_POTATO = { name: "POTATO", price: 15, calories: 10 };
Hamburger.TOPPING_MAYO = { name: "TOPPING_MAYO", price: 20, calories: 5 };
Hamburger.TOPPING_SPICE = { name: "TOPPING_SPICE", price: 15, calories: 0 };

const hamburger = new Hamburger(Hamburger.SIZE_LARGE, Hamburger.STUFFING_POTATO);
hamburger.addTopping(Hamburger.TOPPING_MAYO);
hamburger.addTopping(Hamburger.TOPPING_SPICE);
console.log(`Hamburger topping: ${hamburger.getToppings()}`);
hamburger.removeTopping(Hamburger.TOPPING_SPICE);
console.log(`Hamburger topping: ${hamburger.getToppings()}`);
console.log(`Hamburger price: ${hamburger.calculatePrice()}UAH`);
console.log(`Hamburger calories: ${hamburger.calculateCalories()}`);
console.log(`Hamburger size: ${hamburger.getSize()}`);
console.log(`Hamburger stuffing: ${hamburger.getStuffing()}`);
