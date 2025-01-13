(function ($) {

    function galleryImagesLoaded($box, image_selector, callback) {

        function check_image_loaded(img) {
            return img.getAttribute('loading') === 'lazy' || img.getAttribute('src') === '' || (img.complete && img.naturalWidth !== undefined && img.naturalWidth !== 0);
        }

        var $images = $(image_selector, $box).filter(function () {
                return !check_image_loaded(this);
            }),
            images_count = $images.length;

        if (images_count == 0) {
            return callback();
        }

        if (window.gemBrowser.name == 'ie' && !isNaN(parseInt(window.gemBrowser.version)) && parseInt(window.gemBrowser.version) <= 10) {
            function image_load_event() {
                images_count--;
                if (images_count == 0) {
                    callback();
                }
            }

            $images.each(function () {
                if (check_image_loaded(this)) {
                    return;
                }

                var proxyImage = new Image();
                proxyImage.addEventListener('load', image_load_event);
                proxyImage.addEventListener('error', image_load_event);
                proxyImage.src = this.src;
            });
            return;
        }

        $images.on('load error', function () {
            images_count--;
            if (images_count == 0) {
                callback();
            }
        });
    }

    function updateProductGallery() {
        if (window.tgpLazyItems !== undefined) {
            var isShowed = window.tgpLazyItems.checkGroupShowed(this, function (node) {
                updateProductGallery.call(node);
            });
            if (!isShowed) {
                return;
            }
        }

        var $galleryElement = $(this);

        galleryImagesLoaded($galleryElement, 'img', function () {
            var isTouch = window.gemSettings.isTouch,
                isMobile = $(window).width() < 768 && /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? true : false,
                isTabletPortrait = $(window).width() === 820 && isTouch && window.matchMedia("(orientation: portrait)") ? true : false,
                isRtl = $("body").hasClass("rtl") ? true : false,
                itemsCount = 4,
                animationSpeed = 300,
                itemClass = '.owl-item',
                itemClassActive = '.owl-item.active',
                isVertical = $galleryElement.data("thumb") === 'vertical',
                isThumbsOnMobile = $galleryElement.data("thumb-on-mobile") == '1',
                isDots = $galleryElement.data("thumb") === 'dots',
                isThumb = $galleryElement.data("thumb") !== 'single',
                isHover = $galleryElement.data("type") === 'hover',
                isZoom = $galleryElement.data("zoom") == '1',
                isFancy = $galleryElement.data("fancy") == '1',
                isAutoHeight = $galleryElement.data("auto-height") == '1',
                isVideoAutoplay = $galleryElement.data("video-autoplay") == '1',
                isLoop = $galleryElement.data("loop") == '1',
                isSquareImg = $galleryElement.data("square-img") == '1',
                isSingle = $galleryElement.data("thumb") === 'single',
                singleItemsCount = $galleryElement.data("items-count"),
                singleItemsGaps = $galleryElement.data("items-gaps"),

                $galleryPreviewWrap = $('.product-gallery-slider-wrap', $galleryElement),
                $galleryPreviewCarousel = $('.product-gallery-slider', $galleryElement),
                $galleryPreviewItem = $('.product-gallery-slider-item', $galleryElement),
                $galleryPreviewItemVideo = $('.product-gallery-slider-item.item--video', $galleryElement),
                $galleryPreviewZoom = $('.product-gallery-image.init-zoom', $galleryElement),
                $galleryPreviewFancy = $('.product-gallery-slider-wrap.init-fancy', $galleryElement),
                $galleryPreviewFancyLink = $('.fancy-product-gallery', $galleryPreviewItem),

                $galleryThumbsWrap = $('.product-gallery-thumbs-wrap', $galleryElement),
                $galleryThumbsCarousel = $('.product-gallery-thumbs', $galleryElement),
                $galleryThumbsItem = $('.product-gallery-thumb-item', $galleryThumbsCarousel),

                itemsCountMax = $galleryThumbsItem.length > itemsCount,
                isTrueCount = $galleryPreviewItem.length > 1,
                isYoutube = $galleryPreviewItemVideo.data("video-type") === 'youtube',
                isVimeo = $galleryPreviewItemVideo.data("video-type") === 'vimeo',
                isSelfVideo = $galleryPreviewItemVideo.data("video-type") === 'self',
                youtubePlayer,
                youtubePlayerState,
                vimeoPlayer,
                selfPlayer,
                stageHeight;

            $galleryElement.prev('.preloader').remove();
            $('.product-gallery-skeleton-thumbs').remove();

            if (window.tgpLazyItems !== undefined) {
                window.tgpLazyItems.scrollHandle();
            }

            //Init preview carousel
            $galleryPreviewCarousel.owlCarousel({
                loop: (isLoop && isTrueCount) ? true : false,
                items: isSingle ? singleItemsCount : 1,
                margin: (isSingle && singleItemsCount > 1) ? singleItemsGaps : 0,
                rtl: isRtl ? true : false,
                rewind: false,
                mouseDrag: (isZoom || isFancy || !isTrueCount) ? false : true,
                smartSpeed: animationSpeed,
                autoHeight: isAutoHeight ? true : false,
                slideTransition: 'ease',
                responsive:{
                    0:{
                        items: 1,
                        margin: 0,
                        nav: false,
                        dots: isTrueCount ? true : false,
                    },
                    820:{
                        nav: (isTrueCount && !isTouch) ? true : false,
                        dots: (isTrueCount && isThumb && isDots) || (!isVertical && isTabletPortrait) ? true : false,
                    }
                },
                onInitialized: function () {
                    initApiVideos();

                    if (isVertical && isTrueCount && !(isMobile && !isThumbsOnMobile) && !isDots) {
                        initVerticalGallery();
                    } else {
                        resizeVerticalGallery();
                    }

                    hideThumbsOnMobile();

                    initZoomMagnifier();

                    changedArrowsColor();

                    changedCursorColor();

                    showZoomIcon();

                    // Single gallery items > 1
                    setTimeout(() => {
                        $galleryPreviewItem.css('opacity', 1)
                    }, 0)
                }
            }).on('changed.owl.carousel', function (el) {
                syncGallerysOnInit(el);

                changedApiVideoPlayer(el);
            });

            //Init thumbs carousel
            $galleryThumbsCarousel.owlCarousel({
                loop: false,
                margin: 15,
                rtl: isRtl ? true : false,
                nav: $galleryThumbsItem.length > 1 && (!isTouch || (isMobile && isVertical && isThumbsOnMobile)) ? true : false,
                dots: false,
                slideBy: 1,
                rewind: false,
                smartSpeed: animationSpeed,
                items: itemsCount,
                slideTransition: 'ease',
                touchDrag: (itemsCountMax && !isVertical) ? true : false,
                mouseDrag: (itemsCountMax && !isVertical) ? true : false,
                onInitialized: function (el) {
                    setCurrentThumb(el);

                    if (isVertical && isTrueCount && !(isMobile && !isThumbsOnMobile) && !isDots) {
                        initVerticalGallery();
                    } else {
                        resizeVerticalGallery();
                    }

                    if(isTouch && isVertical) {
                        $galleryThumbsCarousel.addClass('navs-visible');
                    } else {
                        $galleryThumbsCarousel.removeClass('navs-visible');
                    }

                    changedArrowsColor();
                }
            }).on('click', itemClass, function (el) {
                clickThumbNavigate(el);
            }).on('mouseenter', itemClass, function (el) {
                hoverThumbNavigate(el);
            });

            //Synchronize main and thumb gallerys
            function syncGallerysOnInit(el) {
                var loop = $galleryPreviewCarousel.data('owl.carousel').options.loop;
                var current, currentItem, index;

                if (loop) {
                    var count = el.item.count - 1;
                    current = Math.round(el.item.index - (el.item.count / 2) - .5);

                    if (current < 0) {
                        current = count;
                    }
                    if (current > count) {
                        current = 0;
                    }
                } else {
                    current = el.item.index;
                }

                //Huck < 3 items if init loop
                // if ($galleryThumbsItem.length < 3) {
                //     index = current - 1;
                // } else {
                //     index = current;
                // }
                //currentItem = $galleryThumbsCarousel.find('.owl-item').removeClass("current-thumb").eq(index);
                currentItem = $galleryThumbsCarousel.find('.owl-item').removeClass("current-thumb").eq(current);
                currentItem.addClass('current-thumb');

                if (!currentItem.hasClass('active')) {
                    $galleryThumbsCarousel.trigger('to.owl.carousel', [current, animationSpeed, true]);
                }
            }

            // Set current thumb on init
            function setCurrentThumb(el) {
                var currentItem = $(el.target).find(itemClass).eq(this._current);
                currentItem.addClass('current-thumb');
            }

            // Thumb navigation on click
            function clickThumbNavigate(el) {
                el.preventDefault();

                var item = $(el.target).parents(itemClass);
                var itemIndex = $(el.target).parents(itemClass).index();
                var itemIndexNext = $(el.target).parents(itemClassActive).next();
                var itemIndexPrev = $(el.target).parents(itemClassActive).prev();

                $galleryPreviewCarousel.trigger('to.owl.carousel', [itemIndex, animationSpeed, true]);

                //Huck for prev/next thumbs
                if(itemIndexNext[0] !== undefined) {
                    if(item.next().length !== 0 && itemIndexNext[0].className === 'owl-item') {
                        $galleryThumbsCarousel.trigger('next.owl.carousel');
                    }
                    if(item.prev().length !== 0 && itemIndexPrev[0].className === 'owl-item') {
                        $galleryThumbsCarousel.trigger('prev.owl.carousel');
                    }
                }
            }

            // Thumb navigation on hover
            function hoverThumbNavigate(el) {
                el.preventDefault();

                var itemIndex = $(el.target).parents(itemClass).index();

                if (isHover){
                    $galleryPreviewCarousel.trigger('to.owl.carousel', [itemIndex, animationSpeed, true]);
                }
            }

            //Calc padding and translate in vertical gallery
            function initVerticalGallery() {
                var thumbWrapWidth;
                var thumbWidth = $galleryThumbsItem.width();

                var imgWidth = $('img', $galleryPreviewCarousel)[0].clientWidth;

                if (isSquareImg) {
                    $('.product-gallery-thumbs.owl-carousel').css('width', 'calc(80% - 3px)');
                    thumbWrapWidth = Math.round(imgWidth - thumbWidth - 15);
                    stageHeight = Math.round(imgWidth - thumbWidth - 22);
                    $galleryPreviewItemVideo.css('height', Math.round(stageHeight + 6));
                } else {
                    $('.product-gallery-thumbs.owl-carousel').css('width', 'calc(95% - 2px)');
                    thumbWrapWidth = $galleryThumbsWrap.width();
                }

                if (isAutoHeight) {
                    $galleryElement.css('height', 'auto').css('overflow', '');
                } else {
                    $galleryElement.css('min-height', thumbWrapWidth-30);
                }

                var translate = Math.round(-thumbWidth/2) + 'px';
                $galleryThumbsWrap.css('transform', 'rotate3d(0, 0, 1, 90deg) translate('+translate+','+translate+') translate3d(0,0,0)');

                // Thumbs right position
                if ($galleryElement.data("thumb-position") == 'right') {
                    $galleryElement.css('padding-right', Math.round(thumbWidth + 15));

                    setTimeout(() => {
                        const previewWrapWidth = $galleryPreviewWrap.width();
                        $galleryThumbsWrap.css({'left': previewWrapWidth + 15});
                    }, 250)
                } else {
                    $galleryElement.css('padding-left', Math.round(thumbWidth + 15));
                }

                $galleryPreviewCarousel.trigger('refresh.owl.carousel');
            }

            function resizeVerticalGallery() {
                $galleryElement.css('padding', '0');
                $galleryThumbsWrap.css('transform', 'rotate() translate(0,0) translate3d(0,0,0)');
                $galleryPreviewCarousel.trigger('refresh.owl.carousel');
            }

            // Init Zoom
            function initZoomMagnifier() {
                if (isTouch || isMobile || !isZoom) {
                    $galleryPreviewZoom.trigger('zoom.destroy');

                    $('.img-responsive', $galleryPreviewWrap).on('click', function(e) {
                        e.preventDefault();
                        $(this).parent('a.fancy-product-gallery').trigger('click');
                    });
                } else {
                    $galleryPreviewZoom.zoom({
                        duration: 300,
                        touch: false,
                        callback: function(){
                            $(this).on('click', function(e) {
                                e.preventDefault();
                                $(this).siblings('a.fancy-product-gallery').trigger('click');
                            });
                        }
                    });
                }
            }

            // Show zoom icon on mobile
            function showZoomIcon() {
                if (isTouch || isMobile) {
                    $('.product-gallery-fancy', $galleryPreviewFancy).addClass('show');
                }
            }

            // Api videos init
            function initApiVideos() {
                //huck for height video
                if (isVertical && !isSquareImg){
                    stageHeight = $galleryElement.innerWidth() - 30;
                } else if (!isVertical) {
                    stageHeight = $galleryElement.innerHeight();
                }

                if (isTabletPortrait && !isSquareImg) {
                    stageHeight = $galleryElement.innerWidth() - 40;
                }

                if (isDots || isMobile) {
                    stageHeight = $galleryElement.innerHeight() - 38;
                }

                $galleryPreviewItemVideo.css('height', stageHeight);

                if (isYoutube) {
                    $.getScript("https://www.youtube.com/iframe_api", function() {
                        onYouTubeIframeAPIReady();
                    });
                }

                if (isVimeo) {
                    $.getScript("https://player.vimeo.com/api/player.js", function() {
                        onVimeoIframeAPIReady();
                    });
                }

                if (isSelfVideo) {
                    onSelfVideoAPIReady();
                }
            }

            // Init youtube api video
            function onYouTubeIframeAPIReady() {
                var youtubeVideoId = $('#productYoutubeVideo').attr('data-yt-id');

                if (youtubeVideoId !== undefined && youtubeVideoId !== null){
                    window.YT.ready(function() {
                        youtubePlayer = new YT.Player('productYoutubeVideo', {
                            videoId: youtubeVideoId,
                            height: stageHeight,
                            width: '100%',
                            playerVars: {
                                'controls': 2,
                                'loop': 1,
                                'showinfo': 0,
                                'autohide': 1,
                                'iv_load_policy': 3,
                                'rel': 0,
                                'disablekb': 1,
                                'modestbranding': 1,
                                'mute': 1,
                                'autoplay': isVideoAutoplay ? 1 : 0
                            },
                            events: {
                                'onStateChange': function () {
                                    youtubePlayerState = youtubePlayer.getPlayerState();

                                    if (youtubePlayerState === -1){
                                        $galleryPreviewItemVideo.removeClass('overlay');
                                    } else {
                                        $galleryPreviewItemVideo.addClass('overlay');
                                    }
                                }
                            }
                        });
                    });
                } else {
                    return false;
                }
            }

            // Init vimeo api video
            function onVimeoIframeAPIReady() {
                var vimeoVideoId = $('#productVimeoVideo').attr('data-vm-id');

                if (vimeoVideoId !== undefined && vimeoVideoId !== null){
                    var options = {
                        id: vimeoVideoId,
                        height: stageHeight,
                        width: '100%',
                        loop: true,
                        muted: 0,
                        autoplay: isVideoAutoplay ? 1 : 0
                    };
                    vimeoPlayer = new Vimeo.Player('productVimeoVideo', options);
                    $galleryPreviewItemVideo.addClass('overlay');
                } else {
                    return false;
                }
            }

            // Init self api video
            function onSelfVideoAPIReady() {
                selfPlayer = document.getElementById('productSelfVideo');

                if (selfPlayer !== undefined && selfPlayer !== null){
                    selfPlayer.disablePictureInPicture = true;
                    selfPlayer.controls = !isVideoAutoplay;
                }

                $(selfPlayer).css('height', stageHeight);
                setTimeout(() => {
                    $(selfPlayer).css('opacity', '1');
                }, 250)
            }

            // Api videos changes in viewport
            function changedApiVideoPlayer(el) {
                var current = el.item.index;

                //Youtube player stop/play onChange
                if (youtubePlayer !== undefined && youtubePlayer !== null) {
                    var isYoutube = $(el.target).find(itemClass).eq(current).find("#productYoutubeVideo").length !== 0;
                    if (isYoutube){
                        youtubePlayer.playVideo();
                    } else if (youtubePlayerState === 1) {
                        youtubePlayer.pauseVideo();
                    }
                }

                //Vimeo player stop/play onChange
                if (vimeoPlayer !== undefined && vimeoPlayer !== null) {
                    var isVimeo = $(el.target).find(itemClass).eq(current).find("#productVimeoVideo").length !== 0;
                    if (isVimeo){
                        vimeoPlayer.play();
                    } else {
                        vimeoPlayer.pause();
                    }
                }

                //Self player stop/play onChange
                if (selfPlayer !== undefined && selfPlayer !== null) {
                    var isSelf = $(el.target).find(itemClass).eq(current).find("#productSelfVideo").length !== 0;
                    if (isSelf){
                        selfPlayer.play();
                        selfPlayer.controls = false;
                    } else {
                        selfPlayer.pause();
                    }
                }
            }

            // Changed elements color
            function changedCursorColor() {
                if (isFancy && !isMobile && !isTouch){
                    var svgColor = '191822FF';
                    var svgBorder = 0.3;

                    if ($galleryPreviewFancy.attr('data-color') !== ''){
                        svgColor = $galleryPreviewFancy.attr('data-color').slice(1);
                        svgBorder = 0;
                    }

                    if (isZoom) {
                        $galleryPreviewFancy[0].style.cursor = 'url("data:image/svg+xml,%3Csvg version=\'1.1\' width=\'20\' height=\'20\' xmlns=\'http://www.w3.org/2000/svg\' xmlns:xlink=\'http://www.w3.org/1999/xlink\' x=\'0px\' y=\'0px\' viewBox=\'0 0 19 19\' style=\'enable-background:new 0 0 19 19;\' xml:space=\'preserve\'%3E%3Cstyle type=\'text/css\'%3E .st0%7Bopacity:'+svgBorder+';fill:%23FFFFFF;%7D .st1%7Bfill:%23'+svgColor+';%7D%0A%3C/style%3E%3Cpath class=\'st0\' d=\'M19,19h-8v-3h2.9l-4-4L12,9.9l4,4V11h3V19z M12,18h6v-6h-1v4.3l-5-5L11.3,12l5,5H12V18z M8,19H0v-8h3v2.9l4-4 L9.1,12l-4,4H8V19z M1,18h6v-1H2.7l5-5L7,11.3l-5,5V12H1V18z M7,9.1l-4-4V8H0V0h8v3H5.1l4,4L7,9.1z M2,2.7l5,5L7.7,7l-5-5H7V1H1v6h1 V2.7z M12,9.1L9.9,7l4-4H11V0h8v8h-3V5.1L12,9.1z M11.3,7L12,7.7l5-5V7h1V1h-6v1h4.3L11.3,7z\'/%3E%3Cpath class=\'st1\' d=\'M2.5,15.1v-3.6h-2v7h7v-2H3.9L8.4,12L7,10.6L2.5,15.1z M3.9,2.5h3.6v-2h-7v7h2V3.9L7,8.4L8.4,7L3.9,2.5z M10.6,12l4.5,4.5h-3.6v2h7v-7h-2v3.6L12,10.6L10.6,12z M12,8.4l4.5-4.5v3.6h2v-7h-7v2h3.6L10.6,7L12,8.4z\'/%3E%3C/svg%3E"), auto';
                    } else {
                        $.each($galleryPreviewFancyLink, function(i) {
                            $galleryPreviewFancyLink[i].style.cursor = 'url("data:image/svg+xml,%3Csvg version=\'1.1\' width=\'20\' height=\'20\' xmlns=\'http://www.w3.org/2000/svg\' xmlns:xlink=\'http://www.w3.org/1999/xlink\' x=\'0px\' y=\'0px\' viewBox=\'0 0 19 19\' style=\'enable-background:new 0 0 19 19;\' xml:space=\'preserve\'%3E%3Cstyle type=\'text/css\'%3E .st0%7Bopacity:'+svgBorder+';fill:%23FFFFFF;%7D .st1%7Bfill:%23'+svgColor+';%7D%0A%3C/style%3E%3Cpath class=\'st0\' d=\'M19,19h-8v-3h2.9l-4-4L12,9.9l4,4V11h3V19z M12,18h6v-6h-1v4.3l-5-5L11.3,12l5,5H12V18z M8,19H0v-8h3v2.9l4-4 L9.1,12l-4,4H8V19z M1,18h6v-1H2.7l5-5L7,11.3l-5,5V12H1V18z M7,9.1l-4-4V8H0V0h8v3H5.1l4,4L7,9.1z M2,2.7l5,5L7.7,7l-5-5H7V1H1v6h1 V2.7z M12,9.1L9.9,7l4-4H11V0h8v8h-3V5.1L12,9.1z M11.3,7L12,7.7l5-5V7h1V1h-6v1h4.3L11.3,7z\'/%3E%3Cpath class=\'st1\' d=\'M2.5,15.1v-3.6h-2v7h7v-2H3.9L8.4,12L7,10.6L2.5,15.1z M3.9,2.5h3.6v-2h-7v7h2V3.9L7,8.4L8.4,7L3.9,2.5z M10.6,12l4.5,4.5h-3.6v2h7v-7h-2v3.6L12,10.6L10.6,12z M12,8.4l4.5-4.5v3.6h2v-7h-7v2h3.6L10.6,7L12,8.4z\'/%3E%3C/svg%3E"), auto';
                        });
                    }

                    if ($('#productSelfVideo').length > 0){
                        $('#productSelfVideo')[0].style.cursor = 'url("data:image/svg+xml,%3Csvg version=\'1.1\' width=\'20\' height=\'20\' xmlns=\'http://www.w3.org/2000/svg\' xmlns:xlink=\'http://www.w3.org/1999/xlink\' x=\'0px\' y=\'0px\' viewBox=\'0 0 19 19\' style=\'enable-background:new 0 0 19 19;\' xml:space=\'preserve\'%3E%3Cstyle type=\'text/css\'%3E .st0%7Bopacity:'+svgBorder+';fill:%23FFFFFF;%7D .st1%7Bfill:%23'+svgColor+';%7D%0A%3C/style%3E%3Cpath class=\'st0\' d=\'M19,19h-8v-3h2.9l-4-4L12,9.9l4,4V11h3V19z M12,18h6v-6h-1v4.3l-5-5L11.3,12l5,5H12V18z M8,19H0v-8h3v2.9l4-4 L9.1,12l-4,4H8V19z M1,18h6v-1H2.7l5-5L7,11.3l-5,5V12H1V18z M7,9.1l-4-4V8H0V0h8v3H5.1l4,4L7,9.1z M2,2.7l5,5L7.7,7l-5-5H7V1H1v6h1 V2.7z M12,9.1L9.9,7l4-4H11V0h8v8h-3V5.1L12,9.1z M11.3,7L12,7.7l5-5V7h1V1h-6v1h4.3L11.3,7z\'/%3E%3Cpath class=\'st1\' d=\'M2.5,15.1v-3.6h-2v7h7v-2H3.9L8.4,12L7,10.6L2.5,15.1z M3.9,2.5h3.6v-2h-7v7h2V3.9L7,8.4L8.4,7L3.9,2.5z M10.6,12l4.5,4.5h-3.6v2h7v-7h-2v3.6L12,10.6L10.6,12z M12,8.4l4.5-4.5v3.6h2v-7h-7v2h3.6L10.6,7L12,8.4z\'/%3E%3C/svg%3E"), auto';
                    }
                }
            }

            // Changed arrows color
            function changedArrowsColor() {
                $('.owl-carousel .owl-nav', $galleryElement).css('color', $galleryElement.attr('data-colors'));
            }

            // Hide thumbs if mobile device OR thumb-type = dots
            function hideThumbsOnMobile() {
                if (!isTrueCount || isDots || (isMobile && !isThumbsOnMobile) || (!isVertical && isTabletPortrait)) {
                    $galleryThumbsCarousel.hide();
                    $('.owl-dots', $galleryPreviewCarousel).show();
                } else {
                    $galleryThumbsCarousel.show();
                    $('.owl-dots', $galleryPreviewCarousel).hide();
                }
            }

            // Resize and orientation changes
            let resizeTimer;
            $(window).on('resize', function(e) {
                clearTimeout(resizeTimer);

                resizeTimer = setTimeout(function() {
                    isTouch = window.gemSettings.isTouch;

                    if (window.outerWidth < 768 && /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                        isMobile = true;
                    } else {
                        isMobile = false;
                    }

                    if (window.outerWidth == 820 && isTouch && window.matchMedia("(orientation: portrait)")) {
                        isTabletPortrait = true;
                    } else {
                        isTabletPortrait = false;
                    }

                if (isVertical && isTrueCount && !(isMobile && !isThumbsOnMobile) && !isDots) {
                        initVerticalGallery();
                    } else {
                        resizeVerticalGallery();
                    }

                    hideThumbsOnMobile();

                    $galleryPreviewCarousel.trigger('refresh.owl.carousel');
                    $galleryThumbsCarousel.trigger('refresh.owl.carousel');
                }, 250);
            });
        });
    }

    $.fn.updateProductGalleries = function () {
        $('.product-gallery', this).each(updateProductGallery);

        $('.variations_form').each(function () {
            $(this).on('show_variation', function (event, variation) {
                if (variation.image_id) {
                    const $productContent = $(this).closest('.thegem-template-wrapper');
                    const $gallery = $productContent.find('.thegem-te-product-gallery').eq(0);
                    const $mainCarousel = $gallery.find('.product-gallery-slider');
                    if ($gallery.length) {
                        const $galleryItem = $gallery.find('.product-gallery-slider-item[data-image-id="' + variation.image_id + '"]').parent('.owl-item').index();
                        $mainCarousel.trigger('to.owl.carousel', [$galleryItem, 300, true]);
                    }
                    if($gallery.hasClass('product-gallery--native')) {
                        var $form             = $(this),
                            $product_gallery  = $gallery.find( '.woocommerce-product-gallery__wrapper' ),
                            $gallery_img      = $gallery.find( 'li:eq(0) img' ),
                            $product_img_wrap = $product_gallery
                                .find( '.woocommerce-product-gallery__image, .woocommerce-product-gallery__image--placeholder' )
                                .eq( 0 ),
                            $product_img      = $product_img_wrap.find( '.wp-post-image' ),
                            $product_link     = $product_img_wrap.find( 'a' ).eq( 0 );

                        if ( variation && variation.image && variation.image.src && variation.image.src.length > 1 ) {
                            // See if the gallery has an image with the same original src as the image we want to switch to.
                            var galleryHasImage = $gallery.find( 'li img[data-o_src="' + variation.image.gallery_thumbnail_src + '"]' ).length > 0;

                            // If the gallery has the image, reset the images. We'll scroll to the correct one.
                            if ( galleryHasImage ) {
                                $form.wc_variations_image_reset();
                            }

                            // See if gallery has a matching image we can slide to.
                            var slideToImage = $gallery.find( 'li img[src="' + variation.image.gallery_thumbnail_src + '"]' );

                            if ( slideToImage.length > 0 ) {
                                slideToImage.trigger( 'click' );
                                $form.attr( 'current-image', variation.image_id );
                                window.setTimeout( function() {
                                    $( window ).trigger( 'resize' );
                                    $product_gallery.trigger( 'woocommerce_gallery_init_zoom' );
                                }, 20 );
                                return;
                            }

                            $product_img.wc_set_variation_attr( 'src', variation.image.src );
                            $product_img.wc_set_variation_attr( 'height', variation.image.src_h );
                            $product_img.wc_set_variation_attr( 'width', variation.image.src_w );
                            $product_img.wc_set_variation_attr( 'srcset', variation.image.srcset );
                            $product_img.wc_set_variation_attr( 'sizes', variation.image.sizes );
                            $product_img.wc_set_variation_attr( 'title', variation.image.title );
                            $product_img.wc_set_variation_attr( 'data-caption', variation.image.caption );
                            $product_img.wc_set_variation_attr( 'alt', variation.image.alt );
                            $product_img.wc_set_variation_attr( 'data-src', variation.image.full_src );
                            $product_img.wc_set_variation_attr( 'data-large_image', variation.image.full_src );
                            $product_img.wc_set_variation_attr( 'data-large_image_width', variation.image.full_src_w );
                            $product_img.wc_set_variation_attr( 'data-large_image_height', variation.image.full_src_h );
                            $product_img_wrap.wc_set_variation_attr( 'data-thumb', variation.image.src );
                            $gallery_img.wc_set_variation_attr( 'src', variation.image.gallery_thumbnail_src );
                            $product_link.wc_set_variation_attr( 'href', variation.image.full_src );
                        } else {
                            $form.wc_variations_image_reset();
                        }
                    }
                }
            });
        });
    };

    $('body').updateProductGalleries();

})(jQuery);
