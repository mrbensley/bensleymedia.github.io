(function ($) {

    'use strict';

    const menuScripts = {
        init: () => {
            menuScripts.setLayoutView();
            menuScripts.onResize();
        },

        setLayoutView: () => {
            let tabletLandscapeMaxWidth = 1212,
                tabletLandscapeMinWidth = 980,
                tabletPortraitMaxWidth = 979,
                tabletPortraitMinWidth = 768,
                viewportWidth = window.innerWidth;

            document.documentElement.style.setProperty('--scrollbar-width', (window.innerWidth - document.body.clientWidth) + "px");

            $('.thegem-te-menu nav').each(function (i, el) {
                if ($(this).data("tablet-landscape") === 'default' && viewportWidth >= tabletLandscapeMinWidth && viewportWidth <= tabletLandscapeMaxWidth) {
                    $(this).removeClass('mobile-view').addClass('desktop-view');
                } else if ($(this).data("tablet-portrait") === 'default' && viewportWidth >= tabletPortraitMinWidth && viewportWidth <= tabletPortraitMaxWidth) {
                    $(this).removeClass('mobile-view').addClass('desktop-view');
                } else if (viewportWidth <= tabletLandscapeMaxWidth) {
                    $(this).removeClass('desktop-view').addClass('mobile-view');
                } else {
                    $(this).removeClass('mobile-view').addClass('desktop-view');
                }
            });
        },

        onResize: () => {
            let resizeTimer;
            $(window).on('resize', function(e) {
                clearTimeout(resizeTimer);

                resizeTimer = setTimeout(function() {
                    menuScripts.setLayoutView();
                }, 250);
            });
        },
    };

    // Run the function
    $(function () {
        menuScripts.init();
    });
})(jQuery);