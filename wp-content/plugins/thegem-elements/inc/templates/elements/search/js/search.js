(function ($) {

	let localCache = {
		data: {},
		remove: function (url) {
			delete localCache.data[url];
		},
		exist: function (url) {
			return localCache.data.hasOwnProperty(url) && localCache.data[url] !== null;
		},
		get: function (url) {
			return localCache.data[url];
		},
		set: function (url, cachedData, callback) {
			localCache.remove(url);
			localCache.data[url] = cachedData;
			if ($.isFunction(callback)) callback(cachedData);
		}
	};

	function initSearchIcon() {
		const $search = $(this);
		const $wrapper = $search.parents('.thegem-template-header').length ? $search.parents('.thegem-template-header') : $search.parent();
		const $buttonSearch = $('.thegem-te-search__item', $search);

		if ($buttonSearch.closest('.te-menu-item-fullscreen-search').length) {

			const $fullscreenSearch = $('.thegem-fullscreen-search', $search);
			const $fullscreenSearchInput = $('.thegem-fullscreen-searchform-input', $search);
			const $fullscreenSearchResults = $fullscreenSearch.find('.sf-result');
			const $fullscreenSearchClose = $fullscreenSearch.find('.sf-close');

			$('#page').append($fullscreenSearch);

			let ajax, ajaxActive = false;

			const fullscreenSearchTop = () => {
				let searchTop;

				searchTop = $wrapper.offset().top + $wrapper.outerHeight() - $(window).scrollTop();
				$fullscreenSearch.css('top', searchTop);
			};

			const ajaxSearch = (query) => {

				const postTypes = $fullscreenSearch.data('post-types'),
					postTypesPpp = $fullscreenSearch.data('post-types-ppp'),
					resultTitle = $fullscreenSearch.data('result-title'),
					showAllText = $fullscreenSearch.data('show-all');

				if (!$fullscreenSearchInput.hasClass('styled')) {
					let styles = $fullscreenSearchInput.data('styles');
					styles.forEach(function (style) {
						$('head').append('<link rel="stylesheet" type="text/css" href="' + style + '">');
					});
					$fullscreenSearchInput.addClass('styled');
				}

				if (ajaxActive) {
					ajax.abort();
				} else {
					$fullscreenSearchResults.prepend('<div class="preloader-new"><div class="preloader-spin"></div></div>');
				}

				ajax = $.ajax({
					type: 'post',
					url: thegem_scripts_data.ajax_url,
					data: {
						action: 'thegem_ajax_search',
						search: query,
						post_types: postTypes,
						post_types_ppp: postTypesPpp,
						result_title: resultTitle,
						show_all_text: showAllText,
					},
					beforeSend: function () {
						if (localCache.exist(query)) {
							$fullscreenSearchResults.find('.preloader-new').remove();
							$fullscreenSearchResults.find('.result-sections').html(localCache.get(query));
							return false;
						} else {
							ajaxActive = true;
						}
					},
					success: function (response) {
						ajaxActive = false;
						$fullscreenSearchResults.find('.preloader-new').remove();
						$fullscreenSearchResults.find('.result-sections').html(response);
						localCache.set(query, response);
					}
				});
			};

			$buttonSearch.on('click', 'a', function (e) {
				e.preventDefault();
				fullscreenSearchTop();

				$buttonSearch.toggleClass('active');
				$fullscreenSearch.toggleClass('active');

				if (ajaxActive) {
					ajax.abort();
					ajaxActive = false;
				}

				$fullscreenSearchInput.val('');

				if ($('#site-header').hasClass('fixed')) {
					setTimeout(function () {
						$fullscreenSearchInput.focus();
					}, 500);
				} else {
					if ($(window).scrollTop() == 0) {
						$('html, body').stop().animate({
							scrollTop: 0
						}, 500);
					}
					$fullscreenSearchInput.focus();
				}

				$fullscreenSearchResults.find('.preloader-new').remove();
				$fullscreenSearchResults.find('.result-sections').html('');

				let scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
				$('.header-background, .top-area, .block-content, #page-title').css('padding-right', scrollbarWidth);

				$('body').toggleClass('fullscreen-search-opened');
			});

			if ($fullscreenSearch.hasClass('ajax-search')) {

				$fullscreenSearchInput.on('keyup', function () {
					let query = $(this).val();

					if (query.length > 2) {
						ajaxSearch(query);
					} else {
						if (ajaxActive) {
							ajax.abort();
							ajaxActive = false;
						}
						$fullscreenSearchResults.find('.preloader-new').remove();
						$fullscreenSearchResults.find('.result-sections').html('');
					}
					return false;
				});

				$('.top-search-item', $fullscreenSearch).on('click', function (e) {
					e.preventDefault();
					let query = $(this).data('search');
					ajaxSearch(query);
					$fullscreenSearchInput.val(query);
					return false;
				});
			}

			$fullscreenSearchClose.on('click', function (e) {
				e.preventDefault();
				$buttonSearch.removeClass('active');
				$fullscreenSearch.removeClass('active');
				$('.header-background, .top-area, .block-content, #page-title').css('padding-right', 0);
				$('body').removeClass('fullscreen-search-opened');
				if (ajaxActive) {
					ajax.abort();
					ajaxActive = false;
				}
				$fullscreenSearchInput.val('');
				$fullscreenSearchResults.find('.preloader-new').remove();
				$fullscreenSearchResults.find('.result-sections').html('');
			});

			$(document).keyup(function (e) {
				if (e.key === "Escape") {
					$fullscreenSearchClose.trigger('click');
				}
			});

		} else {

			const $miniSearch = $('.minisearch', $search);
			$('.thegem-te-search-hide').css('display', '');

			if ($buttonSearch.offset().left - $('#page').offset().left + $miniSearch.outerWidth() > $('#page').width()) {
				$miniSearch.addClass('invert');
			}

			$buttonSearch.on('click', 'a', function (e) {
				e.preventDefault();

				$buttonSearch.toggleClass('active');

				$('.sf-input', $buttonSearch).focus();
			});

			$(document).on('click', function (e) {
				if (!$(e.target).parents('.thegem-te-search__item').length) {
					$('.thegem-te-search__item').removeClass('active');
				}
			});
		}
	}


	$.fn.initSearchIcons = function () {
		$(this).each(initSearchIcon);
	};

	$(function() {
		$('.thegem-te-search').initSearchIcons();

		if (navigator.appVersion.indexOf("Win") != -1) {
			$('body').addClass('platform-Windows');
		}
	});


})(jQuery);
