`#### Технические требования:
- В файле \`index.html\` лежит разметка для двух полей ввода пароля. 
- По нажатию на иконку рядом с конкретным полем - должны отображаться символы, которые ввел пользователь, иконка меняет свой внешний вид.
- Когда пароля не видно - иконка поля должна выглядеть, как та, что в первом поле (Ввести пароль)
- Когда нажата иконка, она должна выглядеть, как та, что во втором поле (Ввести пароль)
- По нажатию на кнопку Подтвердить, нужно сравнить введенные значения в полях
- Если значения совпадают - вывести модальное окно (можно alert) с текстом - \`You are welcome\`;
- Если значение не совпадают - вывести под вторым полем текст красного цвета  \`Нужно ввести одинаковые значения\`
- После нажатия на кнопку страница не должна перезагружаться
- Можно менять разметку, добавлять атрибуты, теги, id, классы и так далее.`;


let switch_classes = {'fa-eye': 'password', 'fa-eye-slash': 'text'};
let form = document.querySelector('.password-form');
let input1  = form.querySelectorAll('label input')[0];
let input2  = form.querySelectorAll('label input')[1];
let error  = form.querySelector('#error');


form.addEventListener("click", function (event) {
    if (event.target.classList[0] === 'btn'){

        if (input1.value === input2.value){
            error.innerText = '';
            alert('You are welcome');
        }else {
            error.innerText = 'Нужно ввести одинаковые значения';
        }
        event.preventDefault();
    }
    else if(
        Array.from(event.target.classList).filter(value => /^fa-eye/.test(value)).length > 0
    ){
        let current_class = Array.from(event.target.classList).filter(value => /^fa-eye/.test(value))[0];
        let other_class = Object.keys(switch_classes).filter(value => value !== current_class)[0];
        let input = event.target.previousElementSibling;

        event.target.classList.remove(current_class);
        event.target.classList.add(other_class);
        input.setAttribute('type', switch_classes[other_class]);
        event.preventDefault()
    }
});

input1.addEventListener("focus", function (event) {
    error.innerText = '';
});
input2.addEventListener("focus", function (event) {
    error.innerText = '';
});