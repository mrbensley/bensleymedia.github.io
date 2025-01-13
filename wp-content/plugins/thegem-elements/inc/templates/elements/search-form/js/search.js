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

	function initSearchForm() {

		const $searchForm = $(this),
			$ajaxSearchParams = $('.ajax-search-params', $searchForm),
			postTypes = $ajaxSearchParams.data('post-types'),
			postTypesPpp = $ajaxSearchParams.data('post-types-ppp'),
			resultTitle = $ajaxSearchParams.data('result-title'),
			showAllText = $ajaxSearchParams.data('show-all'),
			$searchSubmitIcon = $('.search-submit', $searchForm),
			$searchInput = $('.search-field', $searchForm),
			$searchResults = $('.ajax-search-results', $searchForm),
			$selectCategory = $('.select-category', $searchForm),
			$searchButtons = $('.search-buttons', $searchForm);

		let ajax, ajaxActive = false;

		const checkWidth = () => {
			$searchForm.removeClass('columns-2').removeClass('columns-3').removeClass('columns-4');
			if ($searchForm.width() >= 1240) {
				$searchForm.addClass('columns-4');
			} else if ($searchForm.width() >= 930) {
				$searchForm.addClass('columns-3');
			} else if ($searchForm.width() >= 620) {
				$searchForm.addClass('columns-2');
			}
			if ($searchButtons.length) {
				$searchInput.css('padding-right', ($searchButtons.outerWidth() + 5) + 'px');
			}
		};

		const maybeInvert = () => {
			formRect = $searchForm.get(0).getBoundingClientRect();
			if(formRect.top > 0 && formRect.top < $(window).height()) {
				resultsRect = $searchResults.get(0).getBoundingClientRect();
				if(resultsRect.bottom > $(window).height()) {
					$searchForm.addClass('invert-results');
					resultsRect = $searchResults.get(0).getBoundingClientRect();
					if(resultsRect.top < 0) {
						$searchForm.removeClass('invert-results');
					}
				}
			}
		};

		const ajaxMiniSearch = (query) => {
			if (ajaxActive) {
				ajax.abort();
			}
			$searchForm.addClass('ajax-loading');

			let productCategory = $selectCategory.length ? $selectCategory.find('.current .text').data('term') : '';

			ajax = $.ajax({
				type: 'post',
				url: thegem_search_form_data.ajax_url,
				data: {
					action: 'thegem_ajax_search_form',
					search: query,
					post_types: postTypes,
					post_types_ppp: postTypesPpp,
					product_category: productCategory,
					result_title: resultTitle,
					show_all_text: showAllText,
				},
				beforeSend: function () {
					if (localCache.exist(query + productCategory)) {
						$searchForm.removeClass('ajax-loading');
						$searchForm.addClass('visible');
						maybeInvert();
						$searchResults.html(localCache.get(query + productCategory));
						return false;
					} else {
						ajaxActive = true;
					}
				},
				success: function (response) {
					ajaxActive = false;
					$searchResults.html(response);
					$searchForm.removeClass('ajax-loading');
					$searchForm.addClass('visible');
					maybeInvert();
					localCache.set(query + productCategory, response);
				}
			});
		};

		const clearAjaxMinisearch = () => {
			$searchInput.val('');
			$searchResults.html('');
			$searchSubmitIcon.removeClass('clear');
			$searchForm.removeClass('ajax-loading');
			if (ajaxActive) {
				ajax.abort();
				ajaxActive = false;
			}
		};

		const submitAjax = () => {
			let query = $searchInput.val();

			if (query.length > 0) {
				$searchSubmitIcon.addClass('clear');
			} else {
				$searchSubmitIcon.removeClass('clear');
			}

			if (query.length > 2) {
				ajaxMiniSearch(query);
			} else {
				if (ajaxActive) {
					ajax.abort();
					ajaxActive = false;
				}
				$searchResults.html('');
				$searchForm.removeClass('ajax-loading');
			}
		};

		$searchForm.on('submit', function (e) {
			// e.preventDefault();
			// submitAjax();
			// $searchInput.blur();
		});

		$searchInput.on('keyup', function () {
			submitAjax();
		});

		$searchInput.on('focus', function () {
			$selectCategory.removeClass('active');
		});

		$searchSubmitIcon.on('click', function () {
			if ($(this).hasClass('clear')) {
				clearAjaxMinisearch();
			}
		});

		$('.hamburger-toggle, #thegem-perspective .perspective-menu-close, .vertical-toggle').click(function () {
			clearAjaxMinisearch();
		});

		$selectCategory.on('click', function () {
			$(this).toggleClass('active');
		});

		$selectCategory.on('click', '.term', function () {
			if (!$(this).hasClass('active')) {
				$selectCategory.find('.current .text').html($(this).html()).data('term', $(this).data('term'));
				$selectCategory.find('.term').removeClass('active');
				$(this).addClass('active');
				submitAjax();
			}
		});

		$('body').on('click', function () {
			$searchForm.removeClass('visible');
			$searchForm.removeClass('invert-results');
			$selectCategory.removeClass('active');
		});

		$searchForm.on('click', function (e) {
			e.stopPropagation();
			$(this).addClass('visible');
			maybeInvert();
		});

		checkWidth();

		$(window).on('resize', function () {
			checkWidth();
		});
	}


	$.fn.initSearchForms = function () {
		$(this).each(initSearchForm);
	};

	$(function () {
		$('.thegem-te-search-form.ajax-search-form').initSearchForms();
	});

})(jQuery);
