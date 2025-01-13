(function ($) {

    'use strict';

    const $navigate = $('.thegem-te-menu-secondary');

    const menuScripts = {
        init: () => {
            menuScripts.menuHover();
            menuScripts.invert();
            menuScripts.onResize();
        },

        menuHover: () => {
            let $item = $('.nav-menu > li', $navigate);

            $item.hover(function() {
                $item.children('ul').removeClass('open');

                $(this).children('ul').addClass('open');
            });
        },

        invert: () => {
            let $items = $('.nav-menu > li > ul, .dropdown-item__wrapper', $navigate);
            $items.removeClass('invert');

            $items.each(function(i, el) {
                let clientRect = el.getBoundingClientRect();
                let itemWidth = $(el).width();
                let itemLeftPosition = clientRect.x + pageXOffset;

                if (window.innerWidth - itemLeftPosition > itemWidth) {
                    $(el).removeClass('invert');
                } else {
                    $(el).addClass('invert');
                }
            });
        },

        onResize: () => {
            let resizeTimer;
            $(window).on('resize', function(e) {
                clearTimeout(resizeTimer);

                resizeTimer = setTimeout(function() {
                    menuScripts.invert();
                }, 250);
            });
        },
    };

    // Run the function
    $(function () {
        menuScripts.init();
    });
})(jQuery);