let links = $('li.tabs-title');
let result_tabs = $('ul.tabs-content li');
console.log(result_tabs);


for (let i=0; i<links.length; i++ ){
    // adding li(s) additional classes
    $(result_tabs[i]).addClass(`${$(links[i]).text()} result_tab`);
    $(links[i]).addClass(`${$(links[i]).text()}`);

    // hide all result items
    $(result_tabs[i]).attr('hidden', 'true')

}

$('ul.tabs li.tabs-title').click(function () {
    console.log(1);
    $(this).addClass('active');
    $(this).siblings().removeClass('active');

    let chosen_article = $(this).attr('class').split(" ")[1];
    let target_tab = $(`ul.tabs-content li.${chosen_article}`);

    target_tab.removeAttr('hidden');
    target_tab.siblings().attr('hidden', 'true');


});

