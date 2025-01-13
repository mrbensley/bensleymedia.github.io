if (window.parent.vc && window.theGemHeading) {
    window.parent.vc.events.on('app.render', function () {
        window.theGemHeading.initialize();
    });

    window.parent.vc.events.on('shortcodeView:updated', function (event) {
        let element = event.view.el.querySelector('.'+window.theGemHeading.animateClass);
        window.theGemHeading.prepareAnimation(element);
        window.theGemHeading.startAnimation(element);
    });
}