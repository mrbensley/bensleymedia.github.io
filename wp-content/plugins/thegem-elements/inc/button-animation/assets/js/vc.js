if (window.parent.vc && window.theGemButtonAnimation) {
    window.parent.vc.events.on('shortcodeView:updated', function (event) {
        let element = event.view.el.querySelector('.'+window.theGemButtonAnimation.animateClass);
        window.theGemButtonAnimation.startAnimation(element);
    });

    window.parent.vc.events.on('app.render', function () {
        window.theGemButtonAnimation.initialize();
    });
}