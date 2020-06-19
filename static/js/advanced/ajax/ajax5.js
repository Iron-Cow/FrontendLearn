window.onload = function () {



// // Пример использования:
// setCookie('user', 'John', {secure: true, 'max-age': 3600});
    const button = document.querySelector("#contact-button");
    button.addEventListener('click', function (event) {
        setCookie('experiment', 'novalue', {secure: true, 'max-age': 3000});
        (getCookie('new-user') === undefined) ?
            setCookie('new-user', 'true') :
            setCookie('new-user', 'false');
        console.log(getCookie('experiment'));
        console.log(getCookie('new-user'));
        alert(`current cookies -> ${document.cookie}`);

    })

};


function getCookie(name) {
        let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
    }
function deleteCookie(name) {
  setCookie(name, "", {
    'max-age': -1
  })
}

function setCookie(name, value, options = {}) {

  options = {
    path: '/',
    // // при необходимости добавьте другие значения по умолчанию
    // ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}
