(function ($) {

    'use strict';

    const scripts = {
        init: () => {
            scripts.dropdownInvert();
            scripts.onResize();
        },

        dropdownInvert: () => {
            let $wrap = $('.thegem-te-currency-switcher-dropdown');
            let $items = $('.dropdown-item__wrapper', $wrap);
            $items.removeClass('invert');

            $items.each(function(i, el) {
                let clientRect = el.getBoundingClientRect();
                let itemWidth = $(el)[0].clientWidth;
                let itemLeftPosition = clientRect.x + pageXOffset;

                if (Math.round(window.innerWidth - itemLeftPosition) > Math.round(itemWidth)) {
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
                    scripts.dropdownInvert();
                }, 250);
            });
        },
    };

    // Run the function
    $(function () {
        scripts.init();
    });
})(jQuery);