(function ($) {

    'use strict';

    $.fn.initPortfolioGallery = function () {
        $(this).each(function() {
            const $carousel = $(this);
            const $navigation = $carousel.next('.portfolio-carousel-nav');
            const itemsDesktop = $carousel.data('items-desktop');
            const itemsTablet = $carousel.data('items-tablet');
            const itemsMobile = $carousel.data('items-mobile');
            const marginDesktop = $carousel.data('margin-desktop');
            const marginTablet = $carousel.data('margin-tablet');
            const marginMobile = $carousel.data('margin-mobile');
            const autoplay = $carousel.data('autoplay');
            const autoplaySpeed = $carousel.data('autoplay-speed');
            const dots = $carousel.data('dots');
            const loop = $carousel.data('loop');
            const length = $carousel.data('length');
            const resolution = $(window).width()

            $carousel.owlCarousel({
                loop: loop || false,
                mouseDrag: false,
                nav: false,
                dots: dots || false,
                autoplay: autoplay || false,
                autoplayTimeout: autoplaySpeed || 5000,
                autoplayHoverPause: true,
                responsive: {
                    0: {
                        items: 1,
                        margin: 0,
                    },
                    360: {
                        items: itemsMobile,
                        margin: marginMobile,
                    },
                    768: {
                        items: itemsTablet,
                        margin: marginTablet,
                    },
                    1024: {
                        items: itemsDesktop,
                        margin: marginDesktop,
                    }
                }
            });

            $('.nav-prev', $navigation).on('click', 'a', function (e) {
                e.preventDefault();
                $carousel.trigger('prev.owl.carousel', [300]);
            });

            $('.nav-next', $navigation).on('click', 'a', function (e) {
                e.preventDefault();
                $carousel.trigger('next.owl.carousel', [300]);
            });

            $('[data-fancybox]').fancybox({
                beforeClose: function() {
                    $carousel.trigger('refresh.owl.carousel')
                },
            });

            if (!loop) {
                if (resolution >= 1024 && length <= itemsDesktop) {
                    $navigation.hide()
                }

                if ((resolution < 1024 && resolution >= 768) && length <= itemsTablet) {
                    $navigation.hide()
                }

                if (resolution < 768 && length <= itemsMobile) {
                    $navigation.hide()
                }
            }
        });
    }

    $(function() {
        $('.portfolio-carousel').initPortfolioGallery();
    });
})(jQuery);
