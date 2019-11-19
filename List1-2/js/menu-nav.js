jQuery(function ($) {
    $("#top-link").attr("href", "#");
    $("#about-me-link").attr("href", "#");
    $("#projects-link").attr("href", "#");
    $("#interests-link").attr("href", "#");
    $("#top-link").click(function () {
        $.scrollTo($("#top").offset().top - 100, 800);
    });
    $("#about-me-link").click(function () {
        $.scrollTo($("#about-me").offset().top - 100, 800);
    });
    $("#projects-link").click(function () {
        $.scrollTo($("#projects").offset().top - 100, 800);
    });
    $("#interests-link").click(function () {
        $.scrollTo($("#interests").offset().top - 100, 800);
    });
});