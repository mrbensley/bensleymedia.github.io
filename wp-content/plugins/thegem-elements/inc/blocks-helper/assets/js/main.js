(function ($) {
    "use strict";

    function replaceTexts() {
        let options = window.TheGemBlocksHelperOptions;
        $('>span', '#vc_templates-more-layouts').html(options.texts.vc_templates_more_layouts);
        //$('.vc_welcome-header', '#vc_no-content-helper').html(options.texts.vc_welcome_header);
        $('p.vc_ui-help-block', '#vc_no-content-helper').html(options.texts.vc_ui_help_block);
    }

    $(document).on('ready', function () {
        setTimeout(replaceTexts,0);
        //replaceTexts();
    });

    $(window).on('load', function() {
        if ($('body').hasClass('vc_editor')) {
            setTimeout(replaceTexts,0);
            //replaceTexts();
        }
    });

})(window.jQuery);


