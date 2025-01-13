(function($) {

	$.fn.updateFeaturedPostsSlider = function() {
		$('.gem-featured-posts-slider', this).each(function() {
			var $this = $(this),
				$itemsCarousel = $('.gem-featured-posts-slider-carousel', $this),
				$item = $('article', $itemsCarousel),
				slidingEffect = $this.attr('data-sliding-effect'),
				autoScroll = $this.attr('data-auto-scroll') > 0 ? $this.attr('data-auto-scroll') : false,
				paginator = JSON.parse($this.attr('data-paginator'));

			var sliderConfig = {
				auto: autoScroll,
				circular: true,
				infinite: true,
				responsive: true,
				width: '100%',
				height: 'auto',
				align: 'center',
				items: 1,
				swipe: true,
				scroll : {
					items		 : 1,
					pauseOnHover  : true
				}
			};

			if (paginator.type == 'arrows') {
				var $nav = $('.gem-featured-posts-slider-nav', $this);
				sliderConfig.prev = $('.gem-featured-posts-slide-prev', $nav);
				sliderConfig.next = $('.gem-featured-posts-slide-next', $nav);
			}

			if (paginator.type == 'bullets') {
				var $dots = $('.gem-featured-posts-slider-dots', $this);
				sliderConfig.pagination = {
					container: $dots
				};
			}

			switch (slidingEffect) {
				case 'slide':
					sliderConfig.scroll.fx = 'scroll';
					break;
				case 'fade':
					sliderConfig.scroll.fx = 'crossfade';
					sliderConfig.scroll.duration = 1000;
					break;
			}

			$this.prev('.preloader').remove();
			$itemsCarousel.carouFredSel(sliderConfig);

			$('article', $this).each(function () {
				$(this).css('background-image', $(this).data('background'));
			});
		});
	}

	$(function() {

		$('.gem-featured-posts-slider').each(function() {

			var $this = $(this);
			var paginator = JSON.parse($this.attr('data-paginator'));
			var $items = $('article', $this);

			var $wrap = $('<div class="gem-featured-posts-slider-wrap"/>').appendTo($this);
			var $item = $('<div class="gem-featured-posts-slider-carousel"/>').appendTo($wrap);

			switch (paginator.type) {
				case 'arrows':
					var $nav = $('<div class="gem-featured-posts-slider-nav"/>').appendTo($wrap);
					$nav.addClass('size-'+paginator.size.replace('_', '-'));
					$nav.addClass('style-'+paginator.style.replace('_', '-'));
					$nav.addClass('position-'+paginator.position.replace('_', '-'));
					$nav.addClass('style-icon-'+paginator.icon);

					$('<a href="#" class="gem-featured-posts-slide-prev"></a>').appendTo($nav);
					$('<a href="#" class="gem-featured-posts-slide-next"></a>').appendTo($nav);
					break;
				case 'bullets':
					var $dots = $('<div class="gem-featured-posts-slider-dots"/>').appendTo($wrap)
					$dots.addClass('size-'+paginator.size.replace('_', '-'));
					$dots.addClass('style-'+paginator.style.replace('_', '-'));
					break;
			}

			$items.appendTo($item);

		});

		$('body').updateFeaturedPostsSlider();

	});

})(jQuery);