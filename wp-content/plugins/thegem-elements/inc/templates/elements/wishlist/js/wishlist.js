(function ($) {

    'use strict';

    const $wishlist = $('.thegem-te-wishlist');

    const wishlistScripts = {
        init: () => {
            wishlistScripts.getAjaxCount();
        },

        getAjaxCount: () => {
            $(document).on( 'added_to_wishlist removed_from_wishlist', function() {
                $.get( yith_wcwl_l10n.ajax_url, {
                    action: 'yith_wcwl_update_wishlist_count'
                }, function( data ) {
                    if (data.count > 0) {
                        $('.wishlist-items-count').show().html( data.count );
                    } else {
                        $('.wishlist-items-count').hide();
                    }
                });
            });
        },
    }

    // Run the function
    $(function () {
        wishlistScripts.init();
    });
})(jQuery);