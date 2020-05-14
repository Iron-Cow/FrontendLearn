`## Задание

Дополнить функцию \`createNewUser()\` методами подсчета возраста пользователя и его паролем.

#### Технические требования:
- Возьмите выполненное домашнее задание номер 4 (созданная вами функция \`createNewUser()\`) и дополните ее следующим функционалом:
   1. При вызове функция должна спросить у вызывающего дату рождения (текст в формате \`dd.mm.yyyy\`) и сохранить ее в поле \`birthday\`.
   2. Создать метод \`getAge()\` который будет возвращать сколько пользователю лет.
   3. Создать метод \`getPassword()\`, который будет возвращать первую букву имени пользователя в верхнем регистре, соединенную с фамилией (в нижнем регистре) и годом рождения. (например, \`Ivan Kravchenko 13.03.1992 → Ikravchenko1992\`).
- Вывести в консоль результат работы функции \`createNewUser()\`, а также функций \`getAge()\` и \`getPassword()\` созданного объекта.
`;

let createNewUser = function () {
    let User = {
        firstName: 'Alan',
        lastName: 'White',
        birthday: new Date(),
        getLogin(){
            console.log(`${this.firstName.slice(0,1)}${this.lastName}`)
        },
        getAge(){
            let now = new Date();
            if (this.birthday > now) {
                console.log('User didn\'t born yet');
                return;
            }

            console.log(now.getFullYear() - this.birthday.getFullYear());
        },
        getPassword(){
            console.log(`${this.firstName.slice(0,1).toUpperCase()}${this.lastName.toLowerCase()}${this.birthday.getFullYear()}`)

        },
        setFirstName(name){
            this.firstName = name;
        },
        setLastName(name){
            this.lastName = name;
        },
        setBirthday(){
            //format validation
            let dataRegExp = /\d\d\.\d\d\.\d\d\d\d/; // required date input format

            // data validation
            let user_bd = prompt("Insert user birthday in dd.mm.yyyy format");
            //date variables parsing (month format - 0-11)
            let [year, month, day] = [+user_bd.slice(-4), +user_bd.slice(3, 5)-1, +user_bd.slice(0, 2)];
            if (dataRegExp.test(user_bd) && user_bd.length === 10 // format check
                && (month >= 0 && month < 12) // correct month check
                && day <= new Date(year, month+1, 0).getDate() // input day in range of chosen month dates
            ) {
        User.birthday = new Date(year, month, day);
    }else{
        alert('wrong format!');
        this.setBirthday();
    }
        }

    };
    // User.setFirstName(prompt("Insert first name"));
    // User.setLastName(prompt("Insert last name"));
    User.setBirthday();

    return User
};
let newUser = createNewUser();
// newUser.getLogin();
newUser.getAge();
newUser.getPassword();
