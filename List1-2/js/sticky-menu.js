$(document).ready(function () {
    let NavY = $(".menu").offset().top;
    let stickyNav = function () {
        let ScrollY = $(window).scrollTop();

        if (ScrollY >= NavY) {
            $(".menu").addClass("sticky");
        } else {
            $(".menu").removeClass("sticky");
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