window.onload = function () {
    let burger = document.querySelector('.header__burger')
   burger.addEventListener('click', function () {
       let linkbar = document.querySelector('.header__linkbar');
       (linkbar.classList.contains('hidden_dropdown')) ?
           linkbar.classList.remove('hidden_dropdown') :
           linkbar.classList.add('hidden_dropdown');
   });
    document.querySelector('.linkbar__item').onclick = function () {
        burger.click()
    };

    //replace big numbers like   1234567890 -> 1,234,567,890
    // function numberWithCommas(x) {
    //     return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    // }

    let buttons_numbers = document.querySelectorAll('.revolution__button-left')
    for (let b of buttons_numbers){
        b.innerHTML = (+b.innerHTML).toLocaleString('en-IN');
    }


};