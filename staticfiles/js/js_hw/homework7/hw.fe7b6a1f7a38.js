`## Задание

Реализовать функцию, которая будет получать массив элементов и выводить их на страницу в виде списка.

#### Технические требования:
- Создать функцию, которая будет принимать на вход массив.
- Каждый из элементов массива вывести на страницу в виде пункта списка
- Необходимо использовать шаблонные строки и функцию \`map\` массива для формирования контента списка перед выведением его на страницу.
- Примеры массивов, которые можно выводить на экран: 
   \`\`\`javascript
   ['hello', 'world', 'Kiev', 'Kharkiv', 'Odessa', 'Lviv']
   \`\`\`
   
   \`\`\`javascript
   ['1', '2', '3', 'sea', 'user', 23]
   \`\`\`
- Можно взять любой другой массив.

#### Не обязательное задание продвинутой сложности:
- ??? Очистить страницу через 10 секунд. Показывать таймер обратного отсчета (только секунды) перед очищением страницы.
- Если внутри массива одним из элементов будет еще один массив или объект, выводить его как вложенный список.`;

// test cases
let arr1 = ['hello', 'world', 'Kiev', 'Kharkiv', 'Odessa', 'Lviv'];
let arr2 = ['1', '2', '3', 'sea', 'user', 23, '22'];
let arr3 = [4, 'hello', [3, null, undefined, '88', 'boba', [1, 2]], {'name': 'aaa', 'bbb': 'adfasdf'}];
let arr4 = [];

let div = document.createElement('div');
div.innerHTML += 'array -> [4, \'hello\', [3, null, undefined, \'88\', \'boba\', [1, 2]], {\'name\': \'aaa\', \'bbb\': \'adfasdf\'}];';
document.body.append(div);

function list_generator(iterable, parent_list=document.body) {

    let ul = document.createElement('ul');
    Object.entries(iterable).map(function(item) {  // ['index': 'value'] or ['key': 'value'] for objects
        if (item[1] === null){
            let li = document.createElement('li');
            li.innerHTML = `null`;
            ul.appendChild(li);
        }else if (typeof item[1] === 'object'){
            list_generator(item[1], ul);
        }else{
            let li = document.createElement('li');
            (Array.isArray(iterable)) ? li.innerHTML = `${item[1]}` : li.innerHTML = `${item[0]}: ${item[1]}`; // check for key from obj
            ul.appendChild(li);
        }
    });
    parent_list.appendChild(ul);
}

list_generator(arr3, div);

// -------------- timer section
let head = document.createElement('h1');
head.innerHTML = "Seconds to remove";
div.append(head);

let timer = document.createElement('h1');
timer.innerHTML = 5;
timer.style.color = 'red';
div.append(timer);

function deleteall(timer, div) {
    if (+timer.innerHTML > 0){
        setTimeout(function () {
            timer.innerHTML = timer.textContent - 1;
            deleteall(timer, div);
        }, 1000)
    }else{
        div.remove()
    }
}
deleteall(timer, div);
