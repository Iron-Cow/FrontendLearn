`#### Технические требования:
- Написать функцию \`createNewUser()\`, которая будет создавать и возвращать объект \`newUser\`.
- При вызове функция должна спросить у вызывающего имя и фамилию.
- Используя данные, введенные пользователем, создать объект \`newUser\` со свойствами \`firstName\` и \`lastName\`.
- Добавить в объект \`newUser\` метод \`getLogin()\`, который будет возвращать первую букву имени пользователя, соединенную с фамилией пользователя, все в нижнем регистре (например, \`Ivan Kravchenko → ikravchenko\`).
- Создать пользователя с помощью функции \`createNewUser()\`. Вызвать у пользователя функцию \`getLogin()\`. Вывести в консоль результат выполнения функции.

#### Не обязательное задание продвинутой сложности:
- Сделать так, чтобы свойства \`firstName\` и \`lastName\` нельзя было изменять напрямую. Создать функции-сеттеры \`setFirstName()\` и \`setLastName()\`, которые позволят изменить данные свойства.
`;

let createNewUser = function () {
    let User = {
        firstName: '',
        lastName: '',
        getLogin(){
            console.log(`${this.firstName.slice(0,1)}${this.lastName}`)
        },
        setFirstName(name){
            this.firstName = name;
        },
        setLastName(name){
            this.lastName = name;
        }

    };
    User.setFirstName(prompt("Insert first name"));
    User.setLastName(prompt("Insert last name"));
    return User

};
let newUser = createNewUser();
newUser.getLogin();
