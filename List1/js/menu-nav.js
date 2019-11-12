jQuery(function($) {
    $.scrollTo(0);
    $('#top-link').click(function() {
        $.scrollTo($('#top').offset().top - 100, 800);
    });
    $('#about-me-link').click(function() {
        $.scrollTo($('#about-me').offset().top - 100, 800);
    });
    $('#projects-link').click(function() {
        $.scrollTo($('#projects').offset().top - 100, 800);
    });
    $('#interests-link').click(function() {
        $.scrollTo($('#interests').offset().top - 100, 800);
    });

    $('.scrollUp').click(function() { $.scrollTo($('body'), 1000); });
});

$(window).scroll(function() {
    if($(this).scrollTop()>300)
        $('.scrollUp').fadeIn();
    else
        $('.scrollUp').fadeOut();
});