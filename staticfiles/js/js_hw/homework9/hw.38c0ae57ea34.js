`#### Технические требования:
- В папке \`tabs\` лежит разметка для вкладок. Нужно, чтобы по нажатию на вкладку отображался конкретный текст для нужной вкладки. При этом остальной текст должен быть скрыт. В комментариях указано, какой текст должен отображаться для какой вкладки. 
- Разметку можно менять, добавлять нужные классы, id, атрибуты, теги.
- Нужно предусмотреть, что текст на вкладках может меняться, и что вкладки могут добавляться и удаляться. При этом нужно, чтобы функция, написанная в джаваскрипте, из-за таких правок не переставала работать.`;


let ul_target = document.querySelector('.tabs-content');
let target_li = ul_target.children;
let tabs = document.querySelector('.tabs');

// hide all elements
for(let x of Array.from(target_li)) {
    x.setAttribute('hidden', 'true')
};


class TabManager{
    constructor(ul){
        this._ul = ul;
        ul.onclick = this.onClick.bind(this)
    }

    onClick(event){
        if (this._ul.querySelector('.active')){ // clear current active tab
            let active_tab = this._ul.querySelector('.active');
            active_tab.classList.remove("active");
            let active_text = getTextNode(active_tab.textContent);
            active_text.setAttribute('hidden', 'true')
        }

        let target = event.target;
        target.classList.add("active");
        let node_to_show = getTextNode(target.textContent);
        node_to_show.removeAttribute('hidden')

    };
}


function getTextNode(target_name) {
    // returns node from corresponded tab BY COMMENT
    let target = target_name;
    let target_node;
    for(let x of Array.from(ul_target.childNodes)) {
       if (x.textContent.trim() === target) { // text in comments should be equal to text in tab
           target_node = x.nextSibling.nextSibling;
           break
       }
    }
    return target_node;
}

new TabManager(tabs);
