(function ($) {

    'use strict';

    const $body = $('body');
    const $wrapper = $('.thegem-template-header');
    const $cart = $('.thegem-te-cart');

    const _helpers = {
        getScrollY : () => {
            return window.pageYOffset || document.documentElement.scrollTop;
        },
        setBodyLocked: (elem) => {
            $body.data('scroll-position', _helpers.getScrollY());
            $body.addClass('cart-scroll-locked');

            let isNoStickyItem = $(elem).closest("#site-header").length;
            let $vcRow = $(elem).closest(".vc_row");

            if (isNoStickyItem){
                $body.addClass('is-no-sticky');
            } else {
                $body.removeClass('is-no-sticky');
            }

            $vcRow.addClass('set-index');
        },
        unsetBodyLocked: () => {
            setTimeout(function (){
                $body.removeClass('cart-scroll-locked is-no-sticky');
                $('.vc_row', $wrapper).removeClass('set-index');
            }, 1000);

            if ($body.data('scroll-position')) {
                window.scrollTo(0, $body.data('scroll-position'))
            }
        },
        isMobileCart: () => {
            let result = false;
            if ($cart.hasClass('mobile-view')) {
                result = true;
            }

            return result;
        }
    };

    const cartScripts = {
        init: () => {
            cartScripts.setLayoutView();
            cartScripts.invert();
            cartScripts.mobileCart();
            cartScripts.onResize();
        },

        setLayoutView: () => {
            let viewportWidth = window.innerWidth;

            $cart.each(function (i, el) {
                if (viewportWidth < 992) {
                    $(this).removeClass('desktop-view').addClass('mobile-view');
                } else {
                    $(this).removeClass('mobile-view').addClass('desktop-view');
                }
            });
        },

        invert: () => {
            let $items = $('.minicart', $cart);
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

        mobileCart: () => {
            window.isMobileCart = _helpers.isMobileCart();

            $cart.each(function (i, el) {
                let $item = $(el);
                let $minicart = $('.minicart', $item);
                let $overlay = $('.mobile-minicart-overlay', $item);

                $item.off('click touchend', '.menu-item-cart > a')
                if (!window.isMobileCart) return;

                $item.on('click touchend', '.menu-item-cart > a', function(e) {
                    e.preventDefault();

                    _helpers.setBodyLocked(this);
                    $overlay.addClass('active');
                    $minicart.addClass('active');
                });

                $(document).on('click touchend', '.mobile-cart-header-close, .mobile-minicart-overlay', function(e) {
                    e.preventDefault();

                    _helpers.unsetBodyLocked();
                    $overlay.removeClass('active');
                    $minicart.removeClass('active');
                });
            });
        },

        onResize: () => {
            let resizeTimer;
            $(window).on('resize', function(e) {
                clearTimeout(resizeTimer);

                resizeTimer = setTimeout(function() {
                    cartScripts.setLayoutView();
                    cartScripts.invert();
                    cartScripts.mobileCart();
                }, 250);
            });
        },
    }

    // Run the function
    $(function () {
        cartScripts.init();
    });
})(jQuery);
