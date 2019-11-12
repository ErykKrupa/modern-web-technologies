$(document).ready(function () {
    var NavY = $('.menu').offset().top;
    var stickyNav = function () {
        var ScrollY = $(window).scrollTop();

        if (ScrollY >= NavY) {
            $('.menu').addClass('sticky');
            // $('.spacer').css('height', '108px');
        } else {
            $('.menu').removeClass('sticky');
            // $('.spacer').css('height', '0px');
        }
    };
    stickyNav();
    $(window).scroll(function () {
        stickyNav();
    });
    $(window).resize(function () {
        stickyNav();
    });
});