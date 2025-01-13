(function($) {
	$(function() {

		let selectedTemplateType = () => {
			let $typeSelect = $('select[name=template_type]');

			let $isHeader = $('.thegem-templates-new-popup .show-is-header');
			$typeSelect.val() === 'header' ? $isHeader.show() : $isHeader.hide();
			$(document).on('change', 'select[name=template_type]', function () {
				$typeSelect.val() === 'header' ? $isHeader.show() : $isHeader.hide();
			});

			let $isFooter = $('.thegem-templates-new-popup .show-is-footer');
			$typeSelect.val() === 'footer' ? $isFooter.show() : $isFooter.hide();
			$(document).on('change', 'select[name=template_type]', function () {
				$typeSelect.val() === 'footer' ? $isFooter.show() : $isFooter.hide();
			});

			let $isTitle = $('.thegem-templates-new-popup .show-is-title');
			$typeSelect.val() === 'title' ? $isTitle.show() : $isTitle.hide();
			$(document).on('change', 'select[name=template_type]', function () {
				$typeSelect.val() === 'title' ? $isTitle.show() : $isTitle.hide();
			});

			let $isMegamenu = $('.thegem-templates-new-popup .show-is-megamenu');
			$typeSelect.val() === 'megamenu' ? $isMegamenu.show() : $isMegamenu.hide();
			$(document).on('change', 'select[name=template_type]', function () {
				$typeSelect.val() === 'megamenu' ? $isMegamenu.show() : $isMegamenu.hide();
			});

			let $isSingleProduct = $('.thegem-templates-new-popup .show-is-single-product');
			$typeSelect.val() === 'single-product' ? $isSingleProduct.show() : $isSingleProduct.hide();
			$(document).on('change', 'select[name=template_type]', function () {
				$typeSelect.val() === 'single-product' ? $isSingleProduct.show() : $isSingleProduct.hide();
			});

			let $isSinglePost = $('.thegem-templates-new-popup .show-is-single-post');
			$typeSelect.val() === 'single-post' ? $isSinglePost.show() : $isSinglePost.hide();
			$(document).on('change', 'select[name=template_type]', function () {
				$typeSelect.val() === 'single-post' ? $isSinglePost.show() : $isSinglePost.hide();
			});

			let $isPortfolio = $('.thegem-templates-new-popup .show-is-portfolio');
			$typeSelect.val() === 'portfolio' ? $isPortfolio.show() : $isPortfolio.hide();
			$(document).on('change', 'select[name=template_type]', function () {
				$typeSelect.val() === 'portfolio' ? $isPortfolio.show() : $isPortfolio.hide();
			});

			let $isProductArchive = $('.thegem-templates-new-popup .show-is-product-archive');
			$typeSelect.val() === 'product-archive' ? $isProductArchive.show() : $isProductArchive.hide();
			$(document).on('change', 'select[name=template_type]', function () {
				$typeSelect.val() === 'product-archive' ? $isProductArchive.show() : $isProductArchive.hide();
			});

			let $isCart = $('.thegem-templates-new-popup .show-is-cart');
			$typeSelect.val() === 'cart' ? $isCart.show() : $isCart.hide();
			$(document).on('change', 'select[name=template_type]', function () {
				$typeSelect.val() === 'cart' ? $isCart.show() : $isCart.hide();
			});

			let $isCheckout = $('.thegem-templates-new-popup .show-is-checkout');
			$typeSelect.val() === 'checkout' ? $isCheckout.show() : $isCheckout.hide();
			$(document).on('change', 'select[name=template_type]', function () {
				$typeSelect.val() === 'checkout' ? $isCheckout.show() : $isCheckout.hide();
			});

			let $isCheckoutThanks = $('.thegem-templates-new-popup .show-is-checkout-thanks');
			$typeSelect.val() === 'checkout-thanks' ? $isCheckoutThanks.show() : $isCheckoutThanks.hide();
			$(document).on('change', 'select[name=template_type]', function () {
				$typeSelect.val() === 'checkout-thanks' ? $isCheckoutThanks.show() : $isCheckoutThanks.hide();
			});

			let $isBlogArchive = $('.thegem-templates-new-popup .show-is-blog-archive');
			$typeSelect.val() === 'blog-archive' ? $isBlogArchive.show() : $isBlogArchive.hide();
			$(document).on('change', 'select[name=template_type]', function () {
				$typeSelect.val() === 'blog-archive' ? $isBlogArchive.show() : $isBlogArchive.hide();
			});

			let $isPopup = $('.thegem-templates-new-popup .show-is-popup');
			let $isNotPopup = $('.thegem-templates-new-popup .show-not-popup');
			$typeSelect.val() === 'popup' ? $isPopup.show() : $isPopup.hide();
			$typeSelect.val() === 'popup' ? $isNotPopup.hide() : $isNotPopup.show();
			$(document).on('change', 'select[name=template_type]', function () {
				$typeSelect.val() === 'popup' ? $isPopup.show() : $isPopup.hide();
				$typeSelect.val() === 'popup' ? $isNotPopup.hide() : $isNotPopup.show();
			});

			let $isLoopItem = $('.thegem-templates-new-popup .show-is-loop-item');
			$typeSelect.val() === 'loop-item' ? $isLoopItem.show() : $isLoopItem.hide();
			$(document).on('change', 'select[name=template_type]', function () {
				$typeSelect.val() === 'loop-item' ? $isLoopItem.show() : $isLoopItem.hide();
			});

		}

		let openTemplatesNewPopup = () => {
			$(document).on('click', '.page-title-action:first', function(e) {
				e.preventDefault();
				if($('#thegem-templates-new-popup').length) {
					$.fancybox.open($('#thegem-templates-new-popup').text(), {
						modal: true
					});

					selectedTemplateType();
				}
			});

			selectedTemplateType();
		}

		let openTemplatesImportPopup = () => {
			$(document).on('click', '#thegem-templates-import-link', function(e) {
				e.preventDefault();
				var $button = $(this);
				if($('#thegem-templates-import-popup').length) {
					$.fancybox.close();
					$.fancybox.open($('#thegem-templates-import-popup[data-template-type="'+$(this).data('target-template-type')+'"]').text(), {
						modal: true,
						afterShow: function(instance, current) {
							const url = new URL(window.location.href);
							const targetTemplateType = url.href.split(/[=#]/)[2];
							if (url.hash === '#open-modal-import') {
								if(targetTemplateType === 'teams') {
									$('.thegem-templates-import-nav [data-cat-slug="teams"]', current.$content).trigger( "click" );
								}
								if(targetTemplateType === 'testimonials') {
									$('.thegem-templates-import-nav [data-cat-slug="testimonials"]', current.$content).trigger( "click" );
								}
							}
						}
					});
				}

				let $grid = $('.thegem-templates-import-grid');
				let $images = $('.template-preview-image img', $grid).slice(0, 10);
				let length = $images.length;
				$images.each(function(i, el) {
					if( $(el).length && $(el)[0].complete ) {
						length--;
						if( length === 0 ) {
							$grid.removeClass('loading');
						}
					} else {
						$(el).on('load error', function () {
							length--;
							if( length === 0 ) {
								$grid.removeClass('loading');
							}
						})
					}
				});

				let $filterItem = $('.thegem-templates-import-grid-wrap > .template');
				let $navItem = $('.thegem-templates-import-nav > ul > li');
				$navItem.on('click', 'a', function(e) {
					e.preventDefault();

					$('a', $navItem).removeClass('active');
					$(this).addClass('active');

					$filterItem.hide();
					let current = $(this).data('cat-slug');
					if (current !== '*') {
						$filterItem.filter(`[data-categories~=${current}]`).show();
					} else {
						$filterItem.show();
					}
				});
			});
		}

		let openTemplatesSettingsPopup = () => {
			$(document).on('click', '#thegem-templates-setting-submit', function(e) {
				e.preventDefault();
				let post_title = $('#thegem-templates-new-name').val();
				$.fancybox.close();
				$.fancybox.open($('#thegem-templates-settings-popup[data-template-type="'+$(this).data('target-template-type')+'"]').text(), {
					modal: true,
					afterShow: function(instance, current) {
						$('#thegem-templates-settings-form input[name="post_data[post_title]"]').val(post_title);
					}
				});
			});

		}

		openTemplatesNewPopup();
		openTemplatesImportPopup();
		openTemplatesSettingsPopup();

		const url = new URL(window.location.href);
		const targetTemplateType = url.href.split(/[=#]/)[2];

		if (url.hash === '#open-modal') {
			$(".page-title-action:first").trigger( "click" );
		}
		if (url.hash === '#open-modal-import') {
			$(".page-title-action:first").trigger( "click" );
			if(targetTemplateType === 'mobile-menu') {
				$('#thegem-templates-import-link[data-target-template-type="header"]').trigger( "click" );
			} else if(targetTemplateType === 'teams') {
				$('#thegem-templates-import-link[data-target-template-type="loop-item"]').trigger( "click" );
			} else if(targetTemplateType === 'testimonials') {
				$('#thegem-templates-import-link[data-target-template-type="loop-item"]').trigger( "click" );
			} else {
				$('#thegem-templates-import-link[data-target-template-type="'+targetTemplateType+'"]').trigger( "click" );
			}
		}
		if (url.hash === '#open-modal-proceed') {
			$(".page-title-action:first").trigger( "click" );
			$('#thegem-templates-setting-submit[data-target-template-type="'+targetTemplateType+'"]').trigger( "click" );
		}

		$(document).on('click', '.thegem-templates-import-popup .thegem-templates-modal-back', function(e) {
			e.preventDefault();
			if($('#thegem-templates-new-popup').length) {
				$.fancybox.close();
				$.fancybox.open($('#thegem-templates-new-popup').text(), {
					modal: true
				});
			}

			selectedTemplateType();
		});

		$(document).on('click', '.thegem-templates-import-popup .thegem-potfolio-template-insert', function(e) {
			var insertDetailsLink = $(this).data('import-details-link');
			var insertSimpleLink = $(this).data('link');
			e.preventDefault();
			if($('#thegem-templates-import-portfolio-details-popup').length) {
				$.fancybox.close();
				$.fancybox.open($('#thegem-templates-import-portfolio-details-popup').text(), {
					modal: true,
					afterShow: function(instance, current) {
						$('#thegem-templates-import-portfolio').data('details-link', insertDetailsLink);
						$('#thegem-templates-import-portfolio').data('simple-link', insertSimpleLink);
						$('.thegem-templates-loading').remove();
					}
				});
			}
		});

		$(document).on('click', '.thegem-templates-import-popup .thegem-loop-item-template-insert', function(e) {
			var needImportData = $(this).closest('.thegem-templates-import-grid-wrap').data('need-import');
			var needWooData = $(this).closest('.thegem-templates-import-grid-wrap').data('need-woo');
			var insertDetailsLink = $(this).data('import-details-link');
			var insertSimpleLink = $(this).data('link');
			var insertId = $(this).data('id');
			if(needImportData[insertId] === 1) {
				e.preventDefault();
				if($('#thegem-templates-import-loop-item-details-popup').length) {
					$.fancybox.close();
					$.fancybox.open($('#thegem-templates-import-loop-item-details-popup').text(), {
						modal: true,
						afterShow: function(instance, current) {
							$('#thegem-templates-import-loop-item').data('details-link', insertDetailsLink);
							$('#thegem-templates-import-loop-item').data('simple-link', insertSimpleLink);
							$('.thegem-templates-loading').remove();
						}
					});
				}
			} else if(needWooData[insertId] === 1) {
				e.preventDefault();
				if($('#thegem-templates-import-loop-item-need-woo-popup').length) {
					$.fancybox.close();
					$.fancybox.open($('#thegem-templates-import-loop-item-need-woo-popup').text(), {
						modal: true,
						afterShow: function(instance, current) {
							/*$('#thegem-templates-import-loop-item').data('details-link', insertDetailsLink);
							$('#thegem-templates-import-loop-item').data('simple-link', insertSimpleLink);*/
							$('.thegem-templates-loading').remove();
						}
					});
				}
			} else {
				window.location = insertSimpleLink;
			}
		});

		$(document).on('click', '#thegem-templates-import-portfolio', function(e) {
			$('body').prepend('<div class="thegem-templates-loading" />');
			const detailsCheck = $('#thegem-templates-import-details').is(':checked');
			if(detailsCheck) {
				window.location = $('#thegem-templates-import-portfolio').data('details-link');
			} else {
				window.location = $('#thegem-templates-import-portfolio').data('simple-link');
			}
		});

		$(document).on('click', '#thegem-templates-import-loop-item', function(e) {
			$('body').prepend('<div class="thegem-templates-loading" />');
			const detailsCheck = $('#thegem-templates-import-details').is(':checked');
			if(detailsCheck) {
				window.location = $('#thegem-templates-import-loop-item').data('details-link');
			} else {
				window.location = $('#thegem-templates-import-loop-item').data('simple-link');
			}
		});


		/*
		$(document).on('click', '.thegem-templates-import-popup .thegem-template-preview-link', function(e) {
			e.preventDefault();
			var previewLink = $(this).attr('href');
			var importLink = $(this).closest('.thegem-temlate').find('.thegem-templates-insert-link').attr('href');
			if($('#thegem-templates-preview-popup').length) {
				$.fancybox.close();
				$.fancybox.open($('#thegem-templates-preview-popup').text(), {
					modal: true,
					afterLoad: function(e) {
						$('.thegem-templates-preview-popup .thegem-templates-import-link').attr('href', importLink);
						$('<iframe src="'+previewLink+'"></iframe>').appendTo($('.thegem-templates-preview-popup .thegem-template-preview'));
					}
				});
			}
		});

		$(document).on('click', '.thegem-templates-preview-popup .thegem-templates-import-back', function(e) {
			e.preventDefault();
			if($('#thegem-templates-import-popup').length) {
				$.fancybox.close();
				$.fancybox.open($('#thegem-templates-import-popup').text(), {
					modal: true
				});
			}
		});
		*/

		$(document).on('click', '.thegem-templates-modal-close', function(e) {
			e.preventDefault();
			$.fancybox.close();
		});

		$(document).on('click', '.template-preview-actions .thegem-templates-insert-link', function(e) {
			$('body').prepend('<div class="thegem-templates-loading" />');
		});

	});
})(jQuery)
