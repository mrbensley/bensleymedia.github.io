(function() {

    function TheGemButtonAnimation() {
        this.animateClass = 'thegem-button-animate';
        this.animatedClass = 'thegem-button-animated';
    }

    TheGemButtonAnimation.prototype = {
        initialize: function () {
            let items =  document.querySelectorAll('.'+this.animateClass);

            items.forEach((item)=>{
                if (this.isElementVisible(item)) this.startAnimation(item);
            });

            if ('IntersectionObserver' in window) {
                let intersectionObserver = new IntersectionObserver((entries, observer)=>{
                    entries.forEach((entry)=> {
                        if (entry.isIntersecting) {
                            this.startAnimation(entry.target);
                            intersectionObserver.unobserve(entry.target);
                        }
                    });
                });

                items.forEach((item)=>intersectionObserver.observe(item));
            } else {
                items.forEach((item)=>this.startAnimation(item));
            }
        },

        isElementVisible: function (element) {
            let rect     = element.getBoundingClientRect(),
                vWidth   = window.innerWidth || document.documentElement.clientWidth,
                vHeight  = window.innerHeight || document.documentElement.clientHeight,
                efp      = (x, y) => document.elementFromPoint(x, y);

            if (rect.right < 0 || rect.bottom < 0 || rect.left > vWidth || rect.top > vHeight) return false;
            return (element.contains(efp(rect.left,  rect.top)) ||  element.contains(efp(rect.right, rect.top)) ||  element.contains(efp(rect.right, rect.bottom)) ||  element.contains(efp(rect.left,  rect.bottom)));
        },

        startAnimation: function (element) {
            if (element && !element.classList.contains(this.animatedClass)) {
                element.classList.add(this.animatedClass);
                element.classList.remove(this.animateClass);
            }
        }
    };

    window.theGemButtonAnimation= new TheGemButtonAnimation();
    document.addEventListener('DOMContentLoaded', function() {
        window.theGemButtonAnimation.initialize();
    });
})();