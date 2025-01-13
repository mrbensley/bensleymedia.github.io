(function ($) {
	"use strict";

	function replaceTexts() {
		let options = window.TheGemTemplatesEditorTexts;
		console.log(options.texts.vc_welcome_header);
		$('.vc_welcome-header', '#vc_no-content-helper').html(options.texts.vc_welcome_header).addClass('header-template-welcome-text');
	}

	$(document).on('ready', function () {
		setTimeout(replaceTexts, 0);
		//replaceTexts();
	});

	$(window).on('load', function() {
		if ($('body').hasClass('vc_editor')) {
			setTimeout(replaceTexts, 0);
			//replaceTexts();
		}
	});

})(window.jQuery);


