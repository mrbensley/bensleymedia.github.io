(function ($) {
	function initCategoriesGallery() {
		if (window.tgpLazyItems !== undefined) {
			var isShowed = window.tgpLazyItems.checkGroupShowed(this, function (node) {
				initCategoriesGallery.call(node);
			});
			if (!isShowed) {
				return;
			}
		}

		var $widgetItem = $(this);

		if ($widgetItem.hasClass('inited')) {
			return;
		}

		if (!$(this).hasClass('layout-type-carousel')) {
			var $gridElement = $('.categories-set', $widgetItem);
			$gridElement.closest('.portfolio-preloader-wrapper').prev('.preloader').remove();

			if ($widgetItem.hasClass('loading-animation')) {
				var itemsAnimations = $widgetItem.itemsAnimations({
					itemSelector: '.products-category-item',
					scrollMonitor: true
				});

				itemsAnimations.show();
			}
		}

		$widgetItem.addClass('inited');

		if ($widgetItem.hasClass('counts-visible-hover') && !$widgetItem.hasClass('caption-container-preset-bold')) {

			$('.products-category-item', $widgetItem).hover(function () {
				var countHeight = $(this).find('.category-count-inside').outerHeight();
				if ($widgetItem.hasClass('caption-container-preset-transparent') && $widgetItem.hasClass('caption-container-vertical-position-bottom')) {
					$(this).find('.category-overlay-inner-inside .category-overlay-separator').css("transform", "translateY(-" + countHeight + "px)");
					$(this).find('.category-overlay-inner-inside .category-title').css("transform", "translateY(-" + countHeight + "px)");
					$(this).find('.category-overlay-inner-inside .category-count').css("transform", "translateY(0)");
				} else if (!($widgetItem.hasClass('caption-container-preset-transparent') && $widgetItem.hasClass('caption-container-vertical-position-top'))) {
					$(this).find('.category-overlay-inner-inside .category-overlay-separator').css("transform", "translateY(-" + countHeight / 2 + "px)");
					$(this).find('.category-overlay-inner-inside .category-title').css("transform", "translateY(-" + countHeight / 2 + "px)");
					$(this).find('.category-overlay-inner-inside .category-count').css("transform", "translateY(" + countHeight / 2 + "px)");
				}
			}, function () {
				if (!$widgetItem.hasClass('caption-container-preset-bold')) {
					$(this).find('.category-overlay-inner-inside > *').css("transform", "");
				}
			});
		}
	}

	function updateCategoriesGallery() {
		if (window.tgpLazyItems !== undefined) {
			var isShowed = window.tgpLazyItems.checkGroupShowed(this, function (node) {
				updateCategoriesGallery.call(node);
			});
			if (!isShowed) {
				return;
			}
		}

		var $portfolio = $(this);
		var $galleryElement = $('.categories-set', $portfolio);

		var isTouch = window.gemSettings.isTouch,
			autoplay = true,
			animationSpeed = $portfolio.attr("data-autoscroll-speed"),
			slideBy = 'page',
			animationEffect = $portfolio.attr("data-sliding-animation"),
			isArrows = $portfolio.attr("data-arrows") === '1',
			isDots = $portfolio.attr("data-dots") === '1',
			isLoop = $portfolio.attr("data-loop") === '1',
			$carouselItem = $('.extended-carousel-item', $galleryElement);

		if (animationSpeed == '0') {
			autoplay = false
		}

		if (animationEffect == 'one-by-one') {
			slideBy = 1
		}

		//Init preview carousel
		$carouselItem.owlCarousel({
			loop: isLoop,
			items: 1,
			rewind: false,
			mouseDrag: true,
			autoplay: autoplay,
			autoplayTimeout: animationSpeed,
			slideTransition: 'ease',
			slideBy: slideBy,
			dots: isDots,
			nav: isArrows,
			responsive: {
				0: {
					items: $portfolio.data('columns-mobile'),
					margin: $portfolio.hasClass("item-separator") ? 0 : $portfolio.data("margin-mobile"),
				},
				768: {
					items: $portfolio.data('columns-tablet'),
					margin: $portfolio.hasClass("item-separator") ? 0 : $portfolio.data("margin-tablet"),
				},
				992: {
					items: $portfolio.data('columns-desktop'),
					margin: $portfolio.hasClass("item-separator") ? 0 : $portfolio.data("margin-desktop"),
				},
			},
			onInitialized: function () {
				changedArrows();

				$galleryElement.closest('.portfolio-preloader-wrapper').prev('.preloader').remove();
				if ($portfolio.hasClass('loading-animation')) {
					var itemsAnimations = $portfolio.itemsAnimations({
						itemSelector: '.products-category-item',
						scrollMonitor: true
					});
					itemsAnimations.show();
				}

				if (window.tgpLazyItems !== undefined) {
					window.tgpLazyItems.scrollHandle();
				}
			},
			onChange: function () {
				if (window.tgpLazyItems !== undefined) {
					window.tgpLazyItems.scrollHandle();
				}
			}
		});

		// Changed arrows
		function changedArrows() {
			$('.slider-prev-icon', $portfolio).appendTo($('.owl-nav .owl-prev', $galleryElement));
			$('.slider-next-icon', $portfolio).appendTo($('.owl-nav .owl-next', $galleryElement));

			var dotsHeight = $('.owl-dots', $portfolio).outerHeight() + parseInt($('.owl-dots', $portfolio).css('marginTop'));
			$('.owl-nav .owl-prev', $galleryElement).css('top', 'calc(50% - '+dotsHeight+'px/2)');
			$('.owl-nav .owl-next', $galleryElement).css('top', 'calc(50% - '+dotsHeight+'px/2)');
		}

		// Resize and orientation changes
		window.addEventListener("resize", function () {
			isTouch = window.gemSettings.isTouch;

			$carouselItem.trigger('refresh.owl.carousel');

		}, false);
	}

	$.fn.initCategoriesGalleries = function () {
		$(this).each(initCategoriesGallery);
	};

	$.fn.updateCategoriesGalleries = function () {
		$(this).each(updateCategoriesGallery);
	};

	$(document).ready(function () {
		$('body:not(.elementor-editor-active) .products-categories-widget').initCategoriesGalleries();
		$('body:not(.elementor-editor-active) .products-categories-widget.layout-type-carousel').updateCategoriesGalleries();

		document.body.addEventListener('touchstart', function (e) {
			$('.products-categories-widget .products-category-item').removeClass('hover-effect');
		}, { passive: true });

		$('.products-categories-widget .products-category-item').each(function() {
			this.addEventListener('touchstart', function(e) {
				$('.products-categories-widget .products-category-item').not(this).removeClass('hover-effect');
				$(this).addClass('hover-effect');
			}, { passive: true });
		});
	});

})(jQuery);