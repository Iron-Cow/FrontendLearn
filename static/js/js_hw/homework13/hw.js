let change_button = document.querySelector('.colorbutton');
let target_text = document.querySelector('.text_flow');

const
    body_dark = '#111111';
    body_bright = '#ffffff';
    text_dark = '#ffff11';
    text_bright = '#003300';



let scheme_set = function () {
if (localStorage.getItem('js_hw_13_color_scheme') !== 'bright'){
    document.body.style.backgroundColor =  body_dark;
    target_text.style.color = text_dark;
}else {
    document.body.style.backgroundColor = body_bright;
    target_text.style.color = text_bright
}
};

let scheme_switch = function () {
    if (localStorage.getItem('js_hw_13_color_scheme')){
        localStorage.removeItem('js_hw_13_color_scheme')
    }else{
        localStorage.setItem('js_hw_13_color_scheme', 'bright')
    };
    scheme_set()
};

scheme_set();
change_button.addEventListener('click', scheme_switch);