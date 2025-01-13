(function ($) {
	function initProductGallery() {
		if (window.tgpLazyItems !== undefined) {
			var isShowed = window.tgpLazyItems.checkGroupShowed(this, function (node) {
				initProductGallery.call(node);
			});
			if (!isShowed) {
				return;
			}
		}

		var $portfolio = $(this);
		tabsMinHeight($portfolio);

		if ($('.portfolio-filter-tabs', $portfolio).length) {
			$('.portfolio-filter-tabs-content', $portfolio).css('min-height', $('.portfolio-filter-tabs-content', $portfolio).height());

			$('.portfolio-filter-tabs-list-tab', $portfolio).on('click', function (e) {
				if (!$(this).hasClass('active')) {
					$('.portfolio-filter-tabs-list-tab', $portfolio).removeClass('active');
					$(this).addClass('active');
					var num = $(this).data('num');
					$('.extended-products-grid-carousel-item', $portfolio).hide();
					$('.extended-products-grid-carousel-item[data-num="'+num+'"]', $portfolio).show();

					$('.portfolio-filter-tabs-content', $portfolio).css('min-height', '');
					$('.portfolio-filter-tabs-content', $portfolio).css('min-height', $('.portfolio-filter-tabs-content', $portfolio).height());

					var uid = $portfolio.data('portfolio-uid');
					var queryParams = new URLSearchParams(window.location.search);
					queryParams.set(uid + '-tab', num);
					history.replaceState(null, null, "?" + queryParams.toString());
					if ($portfolio.hasClass('loading-animation')) {
						$portfolio.addClass('animation-update');
					}
				}
			});
		}

		updateProductGallery($portfolio);
	}

	function updateProductGallery($portfolio) {

		$portfolio.find('.extended-products-grid-carousel-item').each(function () {
			var $tabItem = $(this);
			var $galleryElement = $('.portfolio-set', $tabItem);

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
				onRefreshed: function () {
					if ($portfolio.hasClass('loading-animation') && $portfolio.hasClass('animation-update')) {
						$portfolio.removeClass('animation-update');
						if ($portfolio.itemsAnimations('instance').getAnimationName() != 'disabled') {
							$portfolio.itemsAnimations('instance').reinitItems($('.portfolio-item', $carouselItem));
							$portfolio.itemsAnimations('instance').show($('.portfolio-item', $carouselItem));
						}
					}
				},
				onInitialized: function () {
					$tabItem.addClass('inited');
					changedArrows();

					$galleryElement.closest('.portfolio-preloader-wrapper').prev('.preloader').remove();

					if ($('.portfolio-filter-tabs', $portfolio).length) {
						tabsMinHeight($portfolio);
					}

					if ($portfolio.find('.extended-products-grid-carousel-item').length == $portfolio.find('.extended-products-grid-carousel-item.inited').length) {
						$portfolio.initExtendedPortfolioGrids();
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
				$('.slider-prev-icon', $tabItem).appendTo($('.owl-nav .owl-prev', $galleryElement));
				$('.slider-next-icon', $tabItem).appendTo($('.owl-nav .owl-next', $galleryElement));

				var dotsHeight = $('.owl-dots', $tabItem).outerHeight() + parseInt($('.owl-dots', $tabItem).css('marginTop'));
				$('.owl-nav .owl-prev', $galleryElement).css('top', 'calc(50% - '+dotsHeight+'px/2)');
				$('.owl-nav .owl-next', $galleryElement).css('top', 'calc(50% - '+dotsHeight+'px/2)');
			}

			// Resize and orientation changes
			window.addEventListener("resize", function () {
				isTouch = window.gemSettings.isTouch;

				$carouselItem.trigger('refresh.owl.carousel');

				if ($('.portfolio-filter-tabs', $portfolio).length) {
					tabsMinHeight($portfolio);
				}
			}, { passive: true });
		})
	}

	function tabsMinHeight($portfolio) {
		$('.portfolio-filter-tabs-content', $portfolio).css('min-height', '');
		$('.portfolio-filter-tabs-content', $portfolio).css('min-height', $('.portfolio-filter-tabs-content', $portfolio).height());
	}

	$.fn.initProductGalleries = function () {
		var $portfolio = $(this);
		if ($(this).hasClass('product-carousel-inited')) {
			return;
		}
		$(this).addClass('product-carousel-inited');
		setTimeout(function () {
			$portfolio.addClass('ready');
		}, 500);
		function initGallery() {
			$portfolio.each(initProductGallery);
		}
		waitForFunction(initGallery);
	};

	function waitForFunction(runFunction){
		if (typeof owlCarousel === undefined || typeof initExtendedPortfolioGrids === undefined) {
			setTimeout( waitForFunction(runFunction), 100);
			return;
		}
		runFunction();
	}

	$(document).ready(function () {
		$('body:not(.vc_editor) .extended-products-grid-carousel').initProductGalleries();
	});

})(jQuery);