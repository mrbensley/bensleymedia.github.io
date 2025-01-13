(function($) {

	$.fn.iconsPicker = function() {
		$(this).each(function() {
			var $el = $(this);
			if ($(this).next('.icons-picker-button').length == 0) {
				$('<button class="icons-picker-button">'+thegem_iconsPickerData.buttonTitle+'</button>').insertAfter(this);
			}
			if ($(this).prev('.icons-picker-selected').length == 0) {
				$('<span class="icons-picker-selected icon-'+$el.data('iconpack')+'">'+($el.val() ? '&#x'+$el.val()+';' : '')+'</span>').insertBefore(this);
			}
			var $button = $(this).next('.icons-picker-button');
			var $icon = $(this).prev('.icons-picker-selected');
			$el.off('change');
			$el.on('change', function(e) {
				$icon.removeClass('icon-elegant icon-material icon-fontawesome icon-thegemdemo icon-userpack thegem-header').addClass('icon-'+$el.data('iconpack')).html($el.val() ? '&#x'+$el.val()+';' : '');
			}).trigger('change');
			$button.off('click');
			$button.on('click', function(e) {
				e.preventDefault();

				if (window.thegemThemeOptions) {
					window.thegemThemeOptions.init();

					var realNameIcon = $(e.target).parent().find('input').attr('name').replace(/_(thegem_header|[^_]*)$/, '_');

					var packs = [];

					if (realNameIcon == "icon_") {
						$("select[name=pack] option, select[name=icon_pack] option").each(function() {packs.push(this.value);});
						window.thegemThemeOptions.iconPicker({
							packs: packs,
							pack: $el.data('iconpack'),
							icon: $el.val(),
							set: function(pack, icon) {
								$("select[name=pack], select[name=icon_pack]").val(pack).change();
								setTimeout(function() {
									$("input.icons-picker[name=icon_" + pack.replace('-','_') + ']').val(icon);
									$("input.icons-picker").trigger('change');
								});
							}
						});
					}

					var pairs = [
						['search_icon_pack','search_icon_'],
						['close_icon_pack','close_icon_'],
						['menu_custom_pack','menu_custom_icon_'],
						['wishlist_add_icon_pack','wishlist_add_icon_'],
						['wishlist_added_icon_pack','wishlist_added_icon_'],
						['signin_icon_pack','signin_icon_'],
						['signout_icon_pack','signout_icon_'],
						['arrows_prev_icon_pack','arrows_prev_icon_'],
						['arrows_next_icon_pack','arrows_next_icon_'],
						['info_content_author_icon_pack','info_content_author_icon_'],
						['info_content_date_icon_pack','info_content_date_icon_'],
						['info_content_time_icon_pack','info_content_time_icon_'],
						['info_content_comments_icon_pack','info_content_comments_icon_'],
						['info_content_likes_icon_pack','info_content_likes_icon_']
					];

					// pf custom meta icons select
					const custom_pair = $el[0].name;
					if (custom_pair !== undefined && custom_pair.length > 0){
						const index = custom_pair.lastIndexOf('_');
						const namePack = custom_pair.slice(0, index) + '_pack';
						if (namePack != 'icon_pack') {
							const pair = [namePack, custom_pair.slice(0, index) + '_'];
							pairs.push(pair);
						}
					}

					// console.log(pairs)

					var namePack, nameIcon;
					var parent = $el.closest(".wpb_el_type_thegem_icon").parent();
					for(var idx in pairs) {
						namePack = pairs[idx][0];
						nameIcon = pairs[idx][1];

						if (realNameIcon == nameIcon) {

							$("select[name="+namePack+"] option").each(function() {packs.push(this.value);});
							window.thegemThemeOptions.iconPicker({
								packs: packs,
								pack: $el.data('iconpack'),
								icon: $el.val(),
								set: function(pack, icon) {
									parent.find("select[name="+namePack+"]").val(pack).change();
									setTimeout(function() {
										parent.find("input.icons-picker[name=" + nameIcon + pack.replace('-','') + ']').val(icon).trigger('change');
									});
								}
							});
							break;
						}
					}					
				} else {
					var width = $(window).width(),
					H = $(window).height(),
					W = ( 833 < width ) ? 833 : width,
					adminbar_height = 0;

					if ( $('#wpadminbar').length ) {
						adminbar_height = parseInt( $('#wpadminbar').css('height'), 10 );
					}

					tb_show(thegem_iconsPickerData.buttonTitle, thegem_iconsPickerData.ajax_url +'?'+ $.param({security:thegem_iconsPickerData.ajax_nonce, action:'thegem_icon_list', iconpack:$el.data('iconpack'), width: W - 80, height: H - 85 - adminbar_height}));
					$(document).off('click', '.icons-list li');
					$(document).one('click', '.icons-list li', function() {
						$el.val($('.code', this).text()).trigger('change');
						tb_remove();
					});
				}
			});
		});
	};
	$(function() {
		$('.icons-picker').iconsPicker();
	});
})(jQuery);
