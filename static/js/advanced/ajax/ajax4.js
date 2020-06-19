window.onload = function () {
    const button = document.getElementById("button");
    button.addEventListener('click', function () {
        button.remove();

        add();
        async function add() {
            let ip = await fetch("https://api.ipify.org/?format=json");
            let data = await ip.json();
            let adressJSON = await fetch(`http://ip-api.com/json/${data.ip}?fields=1572889&lang=ru` );

            let adress = await adressJSON.json();
                        console.log(adress);

            let newDiv = document.createElement("div");
            newDiv.className = "film-list";
            if(adress.district === "") {
                adress.district = "неизвестно";
            }
            newDiv.innerHTML = `
            <p class="film-item">Континент: ${adress.continent}</p>
            <p class="film-item">Страна: ${adress.country}</p>
            <p class="film-item">Регион: ${adress.regionName}</p>
            <p class="film-item">Город: ${adress.city}</p>
            <p class="film-item">Район: ${adress.district}</p>`;
            document.body.appendChild(newDiv);
        }
    });
};
