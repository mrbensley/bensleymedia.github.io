(function($) {
	$(function() {
		$(document).on('click', '.thegem-menu-custom.thegem-menu-custom--clickable ul.nav-menu-custom a' ,function(e) {
			var $link = $(this);
			var $menuItem = $link.closest('li');
			var $subMenu = $('> ul', $menuItem);
			console.log([$link, $menuItem, $subMenu]);

			if($subMenu.length) {
				event.preventDefault();
				var $subMenus = $('ul', $menuItem);
				if($menuItem.hasClass('collapsed')) {
					$subMenus.slideUp();
					$menuItem.removeClass('collapsed');
				} else {
					$subMenu.slideDown();
					$menuItem.addClass('collapsed');
				}
			}
		});
	});
})(jQuery);