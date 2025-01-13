(function ($) {
	function initPortfolioCarousel() {
		if (window.tgpLazyItems !== undefined) {
			var isShowed = window.tgpLazyItems.checkGroupShowed(this, function (node) {
				initPortfolioCarousel.call(node);
			});
			if (!isShowed) {
				return;
			}
		}

		var $portfolio = $(this);
		var $galleryElement = $('.portfolio-set', $portfolio);

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
					margin: $portfolio.data("margin-mobile"),
				},
				768: {
					items: $portfolio.data('columns-tablet'),
					margin: $portfolio.data("margin-tablet"),
				},
				992: {
					items: $portfolio.data('columns-desktop'),
					margin: $portfolio.data("margin-desktop"),
				},
			},
			onRefreshed: function () {
				if ($portfolio.hasClass('loading-animation') && $portfolio.hasClass('animation-update')) {
					$portfolio.removeClass('animation-update');
					if ($portfolio.itemsAnimations('instance').getAnimationName() != 'disabled') {
						$portfolio.itemsAnimations('instance').reinitItems($('.portfolio-item', $portfolio));
						$portfolio.itemsAnimations('instance').show($('.portfolio-item', $portfolio));
					}
				}
			},
			onInitialized: function () {
				changedArrows();

				$portfolio.closest('.portfolio-preloader-wrapper').prev('.preloader').remove();

				$portfolio.initExtendedPortfolioGrids();
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

	$.fn.initPortfolioCarousels = function () {
		var $portfolio = $(this);
		if ($(this).hasClass('portfolio-carousel-inited')) {
			return;
		}
		$(this).addClass('portfolio-carousel-inited');
		setTimeout(function () {
			$portfolio.addClass('ready');
		}, 500);
		function initGallery() {
			$portfolio.each(initPortfolioCarousel);
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
		$('body:not(.vc_editor) .extended-carousel-grid:is(.extended-portfolio-carousel, .extended-posts-carousel)').initPortfolioCarousels();
	});

})(jQuery);