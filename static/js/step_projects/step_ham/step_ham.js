let underline = $('.underline');
let overline = $('.overline');
let triangle;

let categories = {
        'GraphicDesign': 'Graphic Design',
        'WebDesign': 'Web Design',
        'LandingPages': 'Landing Pages',
        'Wordpress': 'Wordpress',
};

$('.topheager_linksbar_link').hover(
    function () {
        $(this).addClass('greentext');
        let width = $(this).width();
        $(underline).width(width);
        underline.css('left', `${$(this).position()['left']}px`);
        underline.css('margin-left', `${$(this).css("margin-left")}`);
    },
    function () {
        $(underline).width(0);
        $(this).removeClass('greentext');
    }
);


function addTriangle(thisEl){
        triangle = document.createElement('div');
        triangle.classList.add('pseudotriangle');
        triangle.style.width = '26px';
        triangle.style.height = '13px';
        triangle.style.backgroundColor = '#18cfab';
        triangle.style.top = '100%';
        triangle.style.left = '50%';
        triangle.style.position = 'absolute';
        triangle.style.transform = 'translateX(-50%)';
        triangle.style.clipPath = 'polygon(0 0, 100% 0, 50% 100%)';
        thisEl.append(triangle);
}
addTriangle( $('.ourservices_tab')[0]);


$('.ourservices_tab').click(
    function () {
        $(this).siblings().removeClass('ourservices_tab_active');
        $(this).addClass('ourservices_tab_active');
        let index = $(this).index();
        $('.ourservices_posts').children().removeClass('ourservices_post_active');
        $('.ourservices_post')[+index].classList.add('ourservices_post_active');

        // console.log(index);
        triangle.remove();
        addTriangle($(this));
    });

// category change
let amazingwork_picturesblock = $('.amazingwork_picturesblock');
let amazingwork_tabbar_tab = $('.amazingwork_tabbar_tab');
$(amazingwork_tabbar_tab).click(
    function () {
        $(this).siblings().removeClass('greentext');
        $(this).addClass('greentext');
        let width = $(this).width();
        let padding = +$(this).css('padding-left').slice(0, -2);
        // console.log();
        $(overline).width(width + 2*padding);
        overline.css('left', `${+$(this).position()['left']}px`);

        // category filtering
        let pic_categories = Array.from(this.classList.values()).filter((x) => Object.keys(categories).includes(x));
        console.log(pic_categories);
        $(amazingwork_picturesblock).children().addClass("hidden_element");
        for (let category of pic_categories){
                $('.' + category).removeClass('hidden_element')
        }


    }
);

$('.amazingwork_tabbar_tab')[0].click();


// fill  amazing pics

function set_hover(){
        $('.amazingwork_picturesblock_picture').hover(
            function () {
                $(this).children(0).css('display', 'none');
                let pic_category = Array.from(this.classList.values()).filter((x) => Object.keys(categories).includes(x))[0];

                $(this).append(hover_generate(pic_category));
                 $(this).css('border-top', '3px solid #18cfab')

            },
            function () {
                $('.amazingwork_picturesblock_picture_hover').remove();
                $(this).children(0).css('display', 'block');
                $(this).css('border-top', 'none')
            }
        );
}


function fill_pics_amazing(load, target_parent=$('.amazingwork_picturesblock'), sample=null) {
        if (!sample){
                sample = document.createElement('div');
                sample.classList.add('amazingwork_picturesblock_picture');
                let pic = document.createElement('img');
                pic.setAttribute('alt', 'awsome_pic');
                sample.append(pic);
        }
        // console.log(sample);

                // category filtering
        let pic_categories = Array.from($('.amazingwork_tabbar .greentext').attr("class").split(' ').values()).filter((x) => Object.keys(categories).includes(x));
        console.log(pic_categories);
        $(amazingwork_picturesblock).children().addClass("hidden_element");
        for (let category of pic_categories){
                $('.' + category).removeClass('hidden_element')
        }

        for (let category in load) {
                for (let picture_link of load[category]){
                        let clone = sample.cloneNode(true);
                        clone.firstChild.setAttribute('src', picture_link);
                        clone.classList.add(category);
                        target_parent.append(clone);
                        if (!pic_categories.includes(category)) {
                                clone.classList.add('hidden_element')
                        };
                        // console.log(picture_link)
                }
        }
        set_hover();
}
fill_pics_amazing(load1);



// block on hover
function hover_generate(category){
        let hover_sample = document.createElement('div');
        hover_sample.classList.add('amazingwork_picturesblock_picture_hover');

                let hover_sample_buttons = document.createElement('div');
                hover_sample_buttons.classList.add('amazingwork_picturesblock_picture_hover_buttons');
                hover_sample.append(hover_sample_buttons);
                        let download_button = document.createElement('a');
                        download_button.classList.add('amazingwork_picturesblock_picture_hover_button');
                                let download_button_img = document.createElement('img');
                                download_button.append(download_button_img);

                        let search_button = download_button.cloneNode(true);

                        download_button.classList.add('amazingwork_picturesblock_picture_hover_button_download');
                        download_button.firstChild.setAttribute('src', hover_pics['download']);
                        search_button.classList.add('amazingwork_picturesblock_picture_hover_button_search');
                        search_button.firstChild.setAttribute('src', hover_pics['search']);
                        hover_sample_buttons.append(download_button);
                        hover_sample_buttons.append(search_button);

                let hover_sample_slogan = document.createElement('div');
                hover_sample_slogan.classList.add('amazingwork_picturesblock_picture_hover_slogan');
                hover_sample_slogan.innerText = 'creative design';
                hover_sample.append(hover_sample_slogan);

                let hover_sample_category = document.createElement('div');
                hover_sample_category.classList.add('amazingwork_picturesblock_picture_hover_category');
                hover_sample_category.innerText = category;
                hover_sample.append(hover_sample_category);
        return hover_sample
}



/////// add more pictures


let loads_left = [load2, load3];
$('#amazingwork_button').click(function () {
        let load = loads_left.shift();
        fill_pics_amazing(load);
        console.log(loads_left);
        if (loads_left.length === 0){
                $(this).remove();
                console.log(1)
        }
});


// breaking news hover
$('.breakingnews_postgrid_post').hover(
    function () {
        $(this).addClass('breakingnews_postgrid_post_active')
    },
    function () {
        $(this).removeClass('breakingnews_postgrid_post_active')

    }
);



//people say
let peoplesay_base = [
        {
                'text': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio eligendi fugit nostrum reprehenderit, similique vero. Consequuntur corporis debitis, distinctio ducimus eos est hic inventore iusto labore laboriosam libero minus molestiae nobis odit optio quam quia quisquam ratione repudiandae sunt voluptas?',
                'name': 'Biba Boba',
                'position': 'Python developer',
        },
    {
                'text': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci alias, at autem, commodi cumque distinctio dolores enim explicabo fuga ipsum minus nulla perspiciatis reiciendis, reprehenderit sit tempore voluptatibus. Distinctio iste iusto laborum perferendis repellat veniam?',
                'name': 'Dom Dang',
                'position': 'JAVA developer',
        },
    {
                'text': 'Integer dignissim, augue tempus ultricies luctus, quam dui laoreet sem, non dictum odio nisi quis massa. Morbi pulvinar odio eget aliquam facilisis. Tempus ultricies luctus, quam dui laoreet sem, non dictum odio nisi quis massa. Morbi pulvinar odio eget aliquam facilisis.',
                'name': 'Hasan Ali',
                'position': 'UX Designer',
        },
    {
                'text': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque deleniti distinctio illum ipsa, laboriosam laborum nobis nostrum sed soluta! Adipisci asperiores blanditiis enim et illo iste, nam, nisi quis sit sunt suscipit, voluptatum! Ad asperiores assumenda consequatur debitis dolor odit quam! Beatae consequatur, distinctio, id iure mollitia neque omnis pariatur possimus praesentium, rem saepe sunt unde vel veniam voluptates voluptatum!',
                'name': 'Aldababsekh Boba',
                'position': 'C++ developer',
        },
];
for (let i=0; i<peoplesay_base.length; i++){
    peoplesay_base[i]['img'] = $('.peoplesay_carousel_people_option img')[i].getAttribute('src');
}

let chosen_img = 2;

    function change_people_say_pic(index){
            let model = peoplesay_base[index];
            $('.peoplesay_text').text(model['text']);
            $('.peoplesay_chosenblock_name').text(model['name']);
            $('.peoplesay_chosenblock_position').text(model['position']);
            $('.peoplesay_chosenblock_picture img').attr('src', model['img']);
    };

$('.peoplesay_carousel_people_option').click(function () {
    let index = $(this).index();
    chosen_img = index;
    change_people_say_pic(index);
   $(this).siblings().removeClass('peoplesay_carousel_people_option_active');
   $(this).addClass('peoplesay_carousel_people_option_active');
        // console.log($(this));
});

$('#peoplesay_carousel_right').click(function () {
  chosen_img = (chosen_img - 1 + peoplesay_base.length) % peoplesay_base.length;
  $('.peoplesay_carousel_people_option')[chosen_img].click();
  // change_people_say_pic(chosen_img);
});

$('#peoplesay_carousel_left').click(function () {
  chosen_img = (chosen_img + 1) % peoplesay_base.length;
  $('.peoplesay_carousel_people_option')[chosen_img].click();
  // change_people_say_pic(chosen_img);
});


//masonry

    let $grid = $('.galery_pictures_grid');

$grid.imagesLoaded( function() {
  // init Masonry after all images have loaded
  $grid.masonry({
      // set itemSelector so .grid-sizer is not used in layout
      itemSelector: '.galery_pictures_grid_slide',
      // use element for option
      columnWidth: '.grid-sizer',
      horizontalOrder: true,
      percentPosition: true,
      gutter: 17,
    });

});


$('.galery_loadbutton').click(function () {
    sample = document.createElement('div');
    sample.classList.add('galery_pictures_grid_slide');
    sample.classList.add('grid-sizer');
    let pic = document.createElement('img');
    pic.setAttribute('alt', '');
    sample.append(pic);
        // console.log(sample);

                // category filtering

            let picture_link = galery_load.shift();
            let clone = sample.cloneNode(true);
            clone.firstChild.setAttribute('src', picture_link);
            // clone.classList.add(category);
            $('.galery_pictures_grid').append(clone);
            $grid.imagesLoaded( function() {
                $('.galery_pictures_grid').masonry('appended', [clone]);
            });
        if (galery_load.length === 0){
            $(this).remove();
        }


        // console.log(picture_link)




});
let masonryUpdate = function() {
    setTimeout(function() {
        $('.galery_pictures_grid').masonry();
    }, 0);
};
$(document).on('click', masonryUpdate);
$(document).on('imageLoad', masonryUpdate);




//
//
//
