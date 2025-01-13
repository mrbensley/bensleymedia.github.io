(function() {
    var fullwithData = {
        page: null,
        pageWidth: 0,
        pageOffset: {},
        fixVcRow: true,
        pagePaddingLeft: 0
    };

    function updateFullwidthData() {
        fullwithData.pageOffset = fullwithData.page.getBoundingClientRect();
        fullwithData.pageWidth = parseFloat(fullwithData.pageOffset.width);
        fullwithData.pagePaddingLeft = 0;

        if (fullwithData.page.className.indexOf('vertical-header') != -1) {
            fullwithData.pagePaddingLeft = 45;
            if (fullwithData.pageWidth >= 1600) {
                fullwithData.pagePaddingLeft = 360;
            }
            if (fullwithData.pageWidth < 980) {
                fullwithData.pagePaddingLeft = 0;
            }
        }
    }

    function gem_fix_fullwidth_position(element) {
        if (element == null) {
            return false;
        }

        if (fullwithData.page == null) {
            fullwithData.page = document.getElementById('page');
            updateFullwidthData();
        }

        /*if (fullwithData.pageWidth < 1170) {
            return false;
        }*/

        if (!fullwithData.fixVcRow) {
            return false;
        }

        if (element.previousElementSibling != null && element.previousElementSibling != undefined && element.previousElementSibling.className.indexOf('fullwidth-block') == -1) {
            var elementParentViewportOffset = element.previousElementSibling.getBoundingClientRect();
        } else {
            var elementParentViewportOffset = element.parentNode.getBoundingClientRect();
        }

        /*if (elementParentViewportOffset.top > window.gemOptions.clientHeight) {
            fullwithData.fixVcRow = false;
            return false;
        }*/

        if (element.className.indexOf('vc_row') != -1) {
            var elementMarginLeft = -21;
            var elementMarginRight = -21;
        } else {
            var elementMarginLeft = 0;
            var elementMarginRight = 0;
        }

        var offset = parseInt(fullwithData.pageOffset.left + 0.5) - parseInt((elementParentViewportOffset.left < 0 ? 0 : elementParentViewportOffset.left) + 0.5) - elementMarginLeft + fullwithData.pagePaddingLeft;
        var offsetKey = window.gemSettings.isRTL ? 'right' : 'left';

        element.style.position = 'relative';
        element.style[offsetKey] = offset + 'px';
        element.style.width = fullwithData.pageWidth - fullwithData.pagePaddingLeft + 'px';

        if (element.className.indexOf('vc_row') == -1) {
            element.setAttribute('data-fullwidth-updated', 1);
        }

        if (element.className.indexOf('vc_row') != -1 && element.className.indexOf('vc_section') == -1 && !element.hasAttribute('data-vc-stretch-content')) {
            var el_full = element.parentNode.querySelector('.vc_row-full-width-before');
            var padding = -1 * offset;
            0 > padding && (padding = 0);
            var paddingRight = fullwithData.pageWidth - padding - el_full.offsetWidth + elementMarginLeft + elementMarginRight;
            0 > paddingRight && (paddingRight = 0);
            element.style.paddingLeft = padding + 'px';
            element.style.paddingRight = paddingRight + 'px';
        }
    }

    window.gem_fix_fullwidth_position = gem_fix_fullwidth_position;

    document.addEventListener('DOMContentLoaded', function() {
        var classes = [];

        if (window.gemSettings.isTouch) {
            document.body.classList.add('thegem-touch');
        }

        if (window.gemSettings.lasyDisabled && !window.gemSettings.forcedLasyDisabled) {
            document.body.classList.add('thegem-effects-disabled');
        }
    });

    if (window.gemSettings.parallaxDisabled) {
        var head  = document.getElementsByTagName('head')[0],
            link  = document.createElement('style');
        link.rel  = 'stylesheet';
        link.type = 'text/css';
        link.innerHTML = ".fullwidth-block.fullwidth-block-parallax-fixed .fullwidth-block-background { background-attachment: scroll !important; }";
        head.appendChild(link);
    }
})();

(function() {
    setTimeout(function() {
        var preloader = document.getElementById('page-preloader');
        if (preloader != null && preloader != undefined) {
            preloader.className += ' preloader-loaded';
        }
    }, window.pagePreloaderHideTime || 1000);
})();
