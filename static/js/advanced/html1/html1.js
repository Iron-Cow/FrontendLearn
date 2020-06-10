function add_burger_active () {
   this.firstElementChild.classList.add("active_burger");
   this.nextElementSibling.classList.remove("hidden_dropdown");
   this.removeEventListener('click', add_burger_active);
   this.addEventListener('click', remove_burger_active)
}

function remove_burger_active () {
   this.firstElementChild.classList.remove("active_burger");
   this.nextElementSibling.classList.add("hidden_dropdown");

   this.removeEventListener('click', remove_burger_active);
   this.addEventListener('click', add_burger_active)
}

document.querySelector('.navigation__burger').addEventListener('click', add_burger_active);