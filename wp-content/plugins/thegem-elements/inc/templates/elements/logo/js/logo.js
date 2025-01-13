(function ($) {

    'use strict';

    const $logo = $('.thegem-te-logo');
    const tabletLandscapeMaxWidth = 1212;
    const tabletLandscapeMinWidth = 980;
    const tabletPortraitMaxWidth = 979
    const tabletPortraitMinWidth = 768;

    const logoScripts = {
        init: () => {
            logoScripts.setLayoutView();
            logoScripts.onResize();
        },

        setLayoutView: () => {
            let viewportWidth = window.innerWidth;

            $logo.each(function (i, el) {
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
                    logoScripts.setLayoutView();
                }, 250);
            });
        },
    }

    // Run the function
    $(function () {
        logoScripts.init();
    });
})(jQuery);