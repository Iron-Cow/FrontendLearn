window.onload = function () {
   document.querySelector('.header__burger').addEventListener('click', function () {
       let linkbar = document.querySelector('.header__linkbar');
       (linkbar.classList.contains('hidden_dropdown')) ?
           linkbar.classList.remove('hidden_dropdown') :
           linkbar.classList.add('hidden_dropdown');
   })
};