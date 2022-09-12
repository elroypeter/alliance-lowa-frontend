/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($("#spinner").length > 0) {
                $("#spinner").removeClass("show");
            }
        }, 1);
    };
    spinner();

    // Initiate the wowjs
    new WOW().init();

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $(".sticky-top").addClass("shadow-sm").css("top", "0px");
        } else {
            $(".sticky-top").removeClass("shadow-sm").css("top", "-100px");
        }
    });

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $(".back-to-top").fadeIn("slow");
        } else {
            $(".back-to-top").fadeOut("slow");
        }
    });

    window.backToTop = () => {
        $(".back-to-top").click(function () {
            $("html, body").animate(
                {
                    scrollTop: 0,
                },
                1500,
                "easeInOutExpo"
            );
            return false;
        });
    };

    // toggle side menu
    window.toggleNav = () => {
        $(".navbar-toggler").click(function () {
            $(".sidebar").toggleClass("open");
            $(".navbar-toggler").toggleClass("open");
        });
    };

    // Facts counter
    $("[data-toggle='counter-up']").counterUp({
        delay: 10,
        time: 2000,
    });

    // Header carousel
    window.headerCarousel = (navText) => {
        $(".header-carousel").owlCarousel({
            autoplay: true,
            smartSpeed: 1500,
            items: 1,
            dots: true,
            loop: true,
            nav: true,
            navText: navText,
        });
    };

    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            "<i class='bi bi-arrow-left'></i>",
            "<i class='bi bi-arrow-right'></i>",
        ],
        responsive: {
            0: {
                items: 1,
            },
            768: {
                items: 2,
            },
        },
    });

    // Portfolio isotope and filter
    var portfolioIsotope = $(".portfolio-container").isotope({
        itemSelector: ".portfolio-item",
        layoutMode: "fitRows",
    });

    $("#portfolio-flters li").on("click", function () {
        $("#portfolio-flters li").removeClass("active");
        $(this).addClass("active");

        portfolioIsotope.isotope({
            filter: $(this).data("filter"),
        });
    });
})(jQuery);

// Google translate
function setCookie(key, value, expiry) {
    var expires = new Date();
    expires.setTime(expires.getTime() + expiry * 24 * 60 * 60 * 1000);
    document.cookie = key + "=" + value + ";expires=" + expires.toUTCString();
}

function googleTranslateElementInit() {
    setCookie("googtrans", "/en/fr", 1);
    new google.translate.TranslateElement(
        {
            pageLanguage: "fr/en",
            includedLanguages: "fr,en",
        },
        "google_translate_element"
    );
}

window.onload((e) => {
    googleTranslateElementInit();
});
