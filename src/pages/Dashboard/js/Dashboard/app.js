
$(document).ready(function() {
	// Initialize the dashboard
	if ($('html').attr('data-bs-theme') == 'dark') {
		$('.darkmode').removeClass('hide');
		$('.lightmode').addClass('hide');
	}
	if ($('html').attr('data-bs-theme') == 'light') {
		$('.lightmode').addClass('hide');
		$('.darkmode').removeClass('hide');
	}
});

$('a').click(function() {
	if (this.classList.contains('sidebar-toggle')) {
		$('#sidebar').hasClass('collapse') ? $('#sidebar').removeClass('collapse') : $('#sidebar').addClass('collapse');
		return;
	}
	if (this.id == 'themeToggle') {
		if ($('html').attr('data-bs-theme') == 'dark') {
			$('.darkmode').addClass('hide');
			$('.lightmode').removeClass('hide');
			$('html').attr('data-bs-theme', 'light')
		} else {
			$('.lightmode').addClass('hide');
			$('.darkmode').removeClass('hide');
			$('html').attr('data-bs-theme', 'dark');
		}

		return;
	}
	if ($(this).attr('data-bs-toggle') == 'dropdown') {
		$(this).attr('aria-expanded')=='false' ? $(this).attr('aria-expanded', 'true') : $(this).attr('aria-expanded', 'false');
		return;
	}
});