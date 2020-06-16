function HamburgerException (message, element) {
    this.message = (element)? `${message} -> (${element})` : `${message}`;
    this.name = "Исключение, определенное пользователем";
}

const SIZE_SMALL = 'small';
const SIZE_LARGE = 'large';

const STUFFING_CHEESE = 'STUFFING_CHEESE';
const STUFFING_SALAD = 'STUFFING_SALAD';
const STUFFING_POTATO = 'STUFFING_POTATO';

const TOPPING_MAYO = 'TOPPING_MAYO';
const TOPPING_SPICE = 'TOPPING_SPICE';



class Hamburger{
    constructor(size, stuffing){
        //constants
        this.SIZE_SMALL = 'small';
        this.SIZE_LARGE = 'large';

        this.STUFFING_CHEESE = 'STUFFING_CHEESE';
        this.STUFFING_SALAD = 'STUFFING_SALAD';
        this.STUFFING_POTATO = 'STUFFING_POTATO';

        this.TOPPING_MAYO = 'TOPPING_MAYO';
        this.TOPPING_SPICE = 'TOPPING_SPICE';

            // containers
        this._sizeOptions = [
            this.SIZE_SMALL,
            this.SIZE_LARGE
        ];
        this._stuffingOptions = [
            this.STUFFING_CHEESE,
            this.STUFFING_SALAD,
            this.STUFFING_POTATO
        ];
        this._toppingOptions = [
            this.TOPPING_MAYO,
            this.TOPPING_SPICE
        ];

        this._addedToppings = [];
        this._menu = new Map([
            [this.SIZE_SMALL, {price: 50, calories: 20}],
            [this.SIZE_LARGE, {price: 100, calories: 40}],
            [this.STUFFING_CHEESE, {price: 10, calories: 20}],
            [this.STUFFING_SALAD, {price: 20, calories: 5}],
            [this.STUFFING_POTATO, {price: 15, calories: 10}],
            [this.TOPPING_MAYO, {price: 15, calories: 0}],
            [this.TOPPING_SPICE, {price: 20, calories: 5}]
        ]);

        try{
            if (!this._sizeOptions.includes(size)){
                throw new HamburgerException('invalid size', size)
            }else if (!this._stuffingOptions.includes(stuffing)){
                throw new HamburgerException('invalid stuffing', stuffing)
            }
            else{
                this._size = size;
                this._stuffing = stuffing;
                console.log('Burger initiated');
            }
        }catch (e) {
            throw (e.message)
        }

    };

    get size(){
        return this._size
    }

    get stuffing(){
        return this._stuffing
    }

    addTopping(topping){
        try{
            if (!this._toppingOptions.includes(topping)){
                throw new HamburgerException('invalid topping', topping)
            }else if (this._addedToppings.includes(topping)){
                throw new HamburgerException('duplicate topping', topping)
            }
            else{
                this._addedToppings.push(topping);
                console.log(`topping ${topping} added`);
            }
        }catch (e) {
            throw (e.message)
        }
    }

    removeTopping(topping){
        try{
            if (!this._toppingOptions.includes(topping)){
                throw new HamburgerException('invalid topping', topping)
            }else if (!this._addedToppings.includes(topping)){
                throw new HamburgerException('No such topping', topping)
            }
            else{
                this._addedToppings = this._addedToppings.filter((x) => x !== topping);
                console.log(`topping ${topping} removed`);
            }
        }catch (e) {
            throw (e.message)
        }
    }

    get addedToppings(){
        return this._addedToppings
    }

    calculatePrice(){
        let priceSum = 0;
        console.log('----calculating price---');

        for (let burgerPart of [this.size, this.stuffing].concat(this.addedToppings)){
            console.log(burgerPart, this._menu.get(burgerPart).price);
            priceSum += this._menu.get(burgerPart).price;
        }
        console.log('total -> ', priceSum);
        return priceSum
    }

    calculateCalories(){
        let calories = 0;
        console.log('----calculating calories----');

        for (let burgerPart of [this.size, this.stuffing].concat(this.addedToppings)){
            calories += this._menu.get(burgerPart).calories;
            console.log(burgerPart, this._menu.get(burgerPart).calories);

        }
        console.log('total -> ', calories);
        return calories
    }



}

let hamburger = new Hamburger(SIZE_LARGE, STUFFING_CHEESE);
console.log(hamburger.size);
console.log(hamburger.stuffing);

hamburger.addTopping(TOPPING_MAYO);
hamburger.addTopping(TOPPING_SPICE);
hamburger.removeTopping(TOPPING_MAYO);
// hamburger.removeTopping(TOPPING_MAYO);
hamburger.addTopping(TOPPING_MAYO);

console.log(hamburger.addedToppings);
console.log(hamburger.calculateCalories());
console.log(hamburger.calculatePrice());


// let hamburger_wrong1 = new Hamburger(SIZE_SMALL, 'bbb');
// let hamburger_wrong2 = new Hamburger("aaa", STUFFING_CHEESE);


// - Некая сеть фастфудов предлагает два вида гамбургеров:
//     - маленький (50 гривен, 20 калорий)
//     - большой (100 гривен, 40 калорий)
// - Гамбургер должен включать одну дополнительную начинку (обязательно):
//     - сыр (+ 10 гривен, + 20 калорий)
//     - салат (+ 20 гривен, + 5 калорий)
//     - картофель (+ 15 гривен, + 10 калорий)
// - Дополнительно, в гамбургер можно добавить приправу (+ 15 гривен, 0 калорий) и полить майонезом (+ 20 гривен, + 5 калорий).
