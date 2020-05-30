let underline = $('.underline');
let overline = $('.overline');
let triangle;
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


$('.section_linesymbol_tab').click(
    function () {
        $(this).siblings().removeClass('greentext');
        $(this).addClass('greentext');
        let width = $(this).width();
        let padding = +$(this).css('padding-left').slice(0, -2);
        // console.log();
        $(overline).width(width + 2*padding);
        overline.css('left', `${+$(this).position()['left']}px`);
    }
);

$('.section_linesymbol_tab')[0].click();

// for (let category in load1){
//         console.log(category);
//         console.log(load1[category]);
//
// }

// fill  amazing pics

let categories = {
        'GraphicDesign': 'Graphic Design',
        'WebDesign': 'Web Design',
        'LandingPages': 'Landing Pages',
        'Wordpress': 'Wordpress',
};


function fill_pics_amazing(load, target_parent=$('.amazingwork_picturesblock'), sample=null) {
        if (!sample){
                sample = document.createElement('div');
                sample.classList.add('amazingwork_picturesblock_picture');
                let pic = document.createElement('img');
                pic.setAttribute('alt', 'awsome_pic');
                sample.append(pic);
        }
        // console.log(sample);
        for (let category in load) {
                for (let picture_link of load[category]){
                        let clone = sample.cloneNode(true);
                        clone.firstChild.setAttribute('src', picture_link);
                        clone.classList.add(category);


                        target_parent.append(clone);
                        // console.log(picture_link)
                }
        }
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


// console.log(hover_sample);
// $('.amazingwork_picturesblock_picture')[0].append(hover_sample);



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