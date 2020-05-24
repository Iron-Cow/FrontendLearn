$(document).ready(function () {
    $('.navigation').on('click', '.nav__mainlinks_item', function (event) {
    event.preventDefault();
    let link = $(this).attr('href');
    let top_side = $(link).offset().top;
    console.log(top_side);

    //анимируем переход на расстояние - top за 1500 мс
    $('body,html').animate({scrollTop: top_side}, 1500);

    });

    // creating button to go up

    let upbutton = document.createElement('a');
    document.body.append(upbutton);
    upbutton.classList.add('go-up-button');
    // upbutton.classList.add('hide_button');
    upbutton.innerText = 'Go ↑ Up';

    // on scolling button go up
    $(window).scroll(function() {
        if ($(window).scrollTop() > window.innerHeight) {
            $('.go-up-button').addClass('show_button')
        }else{
            $('.go-up-button').removeClass('show_button')
        }
    });
    
    // button go up action
    $(document).on('click', '.go-up-button',function () {
        $('body,html').animate({scrollTop: 0}, 2000);

    });


    let switcher = {'Hide': 'Show', 'Show': 'Hide'};
    // hide news button
    let hidebutton = $('.footer_hidenews');
    hidebutton.click(function () {
        $('#NEWS').slideToggle(1000);
        $('.footer_hidenews span').text(switcher[$('.footer_hidenews span').text()])
    })

});





