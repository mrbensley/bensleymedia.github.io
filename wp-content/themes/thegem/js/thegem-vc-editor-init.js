(function () {
	//'use strict';

	function thegemTEEnvents( model ) {
		var $shortcodeOutput = model.view.$el.children('[data-editor-container-class]').first();
		if($shortcodeOutput && $shortcodeOutput.data('editor-container-class')) {
			model.view.$el.addClass($shortcodeOutput.data('editor-container-class'));
		}
	}

	//window.vc.events.on( 'shortcodeView:ready:thegem_te_logo_test', thegemTEEnvents );
	window.vc.events.on( 'shortcodeView:ready:thegem_te_logo', thegemTEEnvents );
	window.vc.events.on( 'shortcodeView:ready:thegem_te_menu', thegemTEEnvents );
	window.vc.events.on( 'shortcodeView:ready:thegem_te_cart', thegemTEEnvents );
	window.vc.events.on( 'shortcodeView:ready:thegem_te_search', thegemTEEnvents );
	window.vc.events.on( 'shortcodeView:ready:thegem_te_icon', thegemTEEnvents );
	window.vc.events.on( 'shortcodeView:ready:thegem_te_button', thegemTEEnvents );
	window.vc.events.on( 'shortcodeView:ready:thegem_te_socials', thegemTEEnvents );
	window.vc.events.on( 'shortcodeView:ready:thegem_te_divider', thegemTEEnvents );
	window.vc.events.on( 'shortcodeView:ready:thegem_te_wishlist', thegemTEEnvents );
	window.vc.events.on( 'shortcodeView:ready:thegem_te_account', thegemTEEnvents );
	window.vc.events.on( 'shortcodeView:ready:thegem_te_infotext', thegemTEEnvents );
	window.vc.events.on( 'shortcodeView:ready:thegem_te_menu_secondary', thegemTEEnvents );
	window.vc.events.on( 'shortcodeView:ready:thegem_te_countdown', thegemTEEnvents );
	window.vc.events.on( 'shortcodeView:ready:thegem_te_search_form', thegemTEEnvents );
	window.vc.events.on( 'shortcodeView:ready:thegem_te_switcher', thegemTEEnvents );
	window.vc.events.on( 'shortcodeView:ready:thegem_te_language_switcher', thegemTEEnvents );
	window.vc.events.on( 'shortcodeView:ready:thegem_te_currency_switcher', thegemTEEnvents );
	window.vc.events.on( 'shortcodeView:ready:thegem_te_signin', thegemTEEnvents );

	window.vc.events.on( 'shortcodeView:ready:thegem_te_product_add_to_cart', thegemTEEnvents );
	window.vc.events.on( 'shortcodeView:ready:thegem_te_product_add_to_wishlist', thegemTEEnvents );
	window.vc.events.on( 'shortcodeView:ready:thegem_te_product_attribute', thegemTEEnvents );
	window.vc.events.on( 'shortcodeView:ready:thegem_te_product_breadcrumbs', thegemTEEnvents );
	window.vc.events.on( 'shortcodeView:ready:thegem_te_product_categories', thegemTEEnvents );
	window.vc.events.on( 'shortcodeView:ready:thegem_te_product_description', thegemTEEnvents );
	window.vc.events.on( 'shortcodeView:ready:thegem_te_product_gallery', thegemTEEnvents );
	window.vc.events.on( 'shortcodeView:ready:thegem_te_product_navigation', thegemTEEnvents );
	window.vc.events.on( 'shortcodeView:ready:thegem_te_product_price', thegemTEEnvents );
	window.vc.events.on( 'shortcodeView:ready:thegem_te_product_rating', thegemTEEnvents );
	window.vc.events.on( 'shortcodeView:ready:thegem_te_product_sharing', thegemTEEnvents );
	window.vc.events.on( 'shortcodeView:ready:thegem_te_product_size_guide', thegemTEEnvents );
	window.vc.events.on( 'shortcodeView:ready:thegem_te_product_sku', thegemTEEnvents );
	window.vc.events.on( 'shortcodeView:ready:thegem_te_product_tabs', thegemTEEnvents );
	window.vc.events.on( 'shortcodeView:ready:thegem_te_product_tags', thegemTEEnvents );
	window.vc.events.on( 'shortcodeView:ready:thegem_te_product_title', thegemTEEnvents );

	window.vc.events.on( 'shortcodeView:ready:gem_button', thegemTEEnvents );

	window.vc.events.on( 'shortcodeView:ready:vc_row_inner', thegemTEEnvents );
	window.vc.events.on( 'shortcodeView:ready:vc_column_text', thegemTEEnvents );
	window.vc.events.on( 'shortcodeView:ready:gem_heading', thegemTEEnvents );
	window.vc.events.on( 'shortcodeView:ready:gem_divider', thegemTEEnvents );
	window.vc.events.on( 'shortcodeView:ready:gem_image', thegemTEEnvents );

	window.vc.events.on("app.render", function() {

		jQuery('.vc_show-mobile .vc_dropdown-more .thegem-template-preview-settings').remove();

		function TheGemUpdateContent(content) {
			for(window.vc.createOverlaySpinner(); window.vc.shortcodes.models.length;) vc.shortcodes.models[0].destroy();
			window.vc.shortcodes.reset([], { silent: !0 });
			_.delay(function() {
				var models = content.length ? window.vc.builder.parse([], content) : [];
				models.length && _.each(models, function(model) {
					window.vc.builder.create(model)
				});
				window.vc.builder.render(function() {
					_.delay(function() {
						window.vc.undoRedoApi.unlock();
						window.vc.removeOverlaySpinner();
					}, 100)
				});
			}, 50);
		}
		jQuery(document).on('click', '.thegem-template-preview-settings-apply', function(e) {
			e.preventDefault();
			var $postTypeSelect = jQuery('.thegem-template-preview-settings-select-posttype').first();
			var $postSelect = jQuery('.thegem-template-preview-settings-select-post').first();
			var posttype = $postTypeSelect.val();
			var post_id = $postSelect.val();
			var template_id = $postTypeSelect.data('post-id');
			var width = jQuery('.thegem-template-preview-settings-width').length ? jQuery('.thegem-template-preview-settings-width').val() : '';
			var $taxSelect = jQuery('.thegem-template-preview-settings-select-tax').first();
			var $termSelect = jQuery('.thegem-template-preview-settings-select-term').first();
			var tax = $taxSelect.val();
			var term_id = $termSelect.val();
			var $productSelect = jQuery('.thegem-template-preview-settings-select-product').first();
			var product_id = $productSelect.val();
			var $portfolioSelect = jQuery('.thegem-template-preview-settings-select-portfolio').first();
			var portfolio_id = $portfolioSelect.val();
			if($taxSelect.length) {
				template_id = $taxSelect.data('post-id');
			}
			if($productSelect.length) {
				template_id = $productSelect.data('post-id');
			}
			if($portfolioSelect.length) {
				template_id = $portfolioSelect.data('post-id');
			}
			jQuery.ajax({
				type: 'post',
				dataType: 'json',
				url: thegem_admin_functions_data.ajax_url,
				data: { action: 'thegem_template_preview_settings_apply', posttype: posttype, post_id: post_id, template_id: template_id, width: width, tax: tax, term_id: term_id, product_id: product_id, portfolio_id: portfolio_id },
				success: function (response) {
					if(response.status == 'success') {
						window.vc.undoRedoApi.lock();
						var content = window.vc.undoRedoApi.get();
						TheGemUpdateContent(content);
					}
				}
			});
			var default_width = '400px';
			if(width !== '') {
				var width_is_percet = substr(width, -1) === '%';
				width = parseFloat(width) + (width_is_percet ? '%' : 'px');
				default_width = width;
			}
			vc.$frame_body.find('.thegem-template-wrapper.thegem-template-loop-item').css('width', default_width);
		});
		jQuery(document).on('change', '.thegem-template-preview-settings-select-posttype', function() {
			var posttype = jQuery(this).val();
			var post_id = jQuery(this).data('post-id');
			jQuery.ajax({
				type: 'post',
				dataType: 'json',
				url: thegem_admin_functions_data.ajax_url,
				data: { action: 'thegem_template_preview_settings_get_posts', posttype: posttype, post_id: post_id },
				success: function (response) {
					if(response.status == 'success') {
						var $postSelect = jQuery('.thegem-template-preview-settings-select-post');
						$postSelect.empty();
						response.items.forEach((element) => {
							$postSelect.append('<option value="'+element.id+'"'+(element.disabled ? ' disabled="disabled"' : '')+'>'+element.title+'</option>');
							jQuery('option',$postSelect).eq(0).attr('selected', 'selected');
						});
					}
				}
			});
		});
		jQuery('.thegem-template-preview-settings-select-posttype').trigger('change');
		jQuery(document).on('change', '.thegem-template-preview-settings-select-tax', function() {
			var tax = jQuery(this).val();
			var post_id = jQuery(this).data('post-id');
			jQuery.ajax({
				type: 'post',
				dataType: 'json',
				url: thegem_admin_functions_data.ajax_url,
				data: { action: 'thegem_template_preview_settings_get_terms', tax: tax, post_id: post_id },
				success: function (response) {
					if(response.status == 'success') {
						var $termSelect = jQuery('.thegem-template-preview-settings-select-term');
						$termSelect.empty();
						response.items.forEach((element) => {
							$termSelect.append('<option value="'+element.id+'"'+(element.disabled ? ' disabled="disabled"' : '')+'>'+element.title+'</option>');
							jQuery('option',$termSelect).eq(0).attr('selected', 'selected');
						});
					}
				}
			});
		});
		jQuery('.thegem-template-preview-settings-select-tax').trigger('change');
	});

})();
