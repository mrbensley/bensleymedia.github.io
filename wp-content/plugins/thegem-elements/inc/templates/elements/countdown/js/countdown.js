(function($) {

	function countdown_init_time(timestamp){

		var now = new Date();
		var currentTime = now.getTime();
		var eventTime = timestamp * 1000;

		if((eventTime - currentTime) < 0){
			eventTime = currentTime;
		}

		var remTime = eventTime - currentTime;
		var s = Math.floor(remTime / 1000);
		var m = Math.floor(s / 60);
		var h = Math.floor(m / 60);
		var d = Math.floor(h / 24);

		h %= 24;
		m %= 60;
		s %= 60;

		h = h + 100;
		m = m + 100;
		s = s + 100;

		return [d, h, m, s];

	}

	function countdown(elem, odometerDays, odometerHours, odometerMinutes, odometerSeconds, $rCanvas){

		var elEventDate = elem.attr('data-eventdate'),
				initTime = countdown_init_time(elEventDate),
				elD = initTime[0],
				elH = initTime[1],
				elM = initTime[2],
				elS = initTime[3];

		if($('.countdown-days', elem) && odometerDays){
			$('.countdown-days', elem).text(elD);
			odometerDays.value = elD;
		}
		if($('.countdown-hours', elem) && odometerHours){
			$('.countdown-hours', elem).text(elH.toString().padStart(2, "0"));
			odometerHours.value = elH;
		}
		if($('.countdown-minutes', elem) && odometerMinutes){
			$('.countdown-minutes', elem).text(elM.toString().padStart(2, "0"));
			odometerMinutes.value = elM;
		}
		if($('.countdown-seconds', elem) && odometerSeconds){
			$('.countdown-seconds', elem).text(elS.toString().padStart(2, "0"));
			odometerSeconds.value = elS;
		}

		setTimeout(function() {
			countdown(elem, odometerDays, odometerHours, odometerMinutes, odometerSeconds, $rCanvas);
		}, 1000);
	}
	$(function() {
		$('.thegem-te-countdown').each(function() {

			var $glEvent = $(this);

			var elEventDate = $glEvent.attr('data-eventdate'),
				initTime = countdown_init_time(elEventDate),
				elD = initTime[0],
				elH = initTime[1]-100,
				elM = initTime[2]-100,
				elS = initTime[3]-100;

			var odometerDays = new Odometer({ auto: false, value: elD, el: $('.countdown-days', $glEvent).get(0), duration: 1000, theme: 'minimal'});
			var odometerHours = new Odometer({ auto: false, value: elH+100, el: $('.countdown-hours', $glEvent).get(0), duration: 1000, theme: 'minimal' });
			var odometerMinutes = new Odometer({ auto: false, value: elM+100, el: $('.countdown-minutes', $glEvent).get(0), duration: 1000, theme: 'minimal' });
			var odometerSeconds = new Odometer({ auto: false, value: elS+100, el: $('.countdown-seconds', $glEvent).get(0), duration: 1000, theme: 'minimal' });

			countdown($glEvent, odometerDays, odometerHours, odometerMinutes, odometerSeconds, '');
		});
	});

	if(window.parent && window.parent.vc) {
		window.parent.vc.events.on( 'shortcodeView:ready:thegem_te_countdown', function(model) {
			var $glEvent = model.view.$el.find('.thegem-te-countdown');
			var odometerDays = new Odometer({ auto: false, el: jQuery('.countdown-days', $glEvent).get(0), duration: 1000, theme: 'minimal'});
			var odometerHours = new Odometer({ auto: false, el: jQuery('.countdown-hours', $glEvent).get(0), duration: 1000, theme: 'minimal' });
			var odometerMinutes = new Odometer({ auto: false, el: jQuery('.countdown-minutes', $glEvent).get(0), duration: 1000, theme: 'minimal' });
			var odometerSeconds = new Odometer({ auto: false, el: jQuery('.countdown-seconds', $glEvent).get(0), duration: 1000, theme: 'minimal' });
			countdown($glEvent, odometerDays, odometerHours, odometerMinutes, odometerSeconds, '');
		});
	}
})(jQuery);
