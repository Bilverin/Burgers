$(document).ready(function() {

	$('.js-composition-toggle li a').click(function(){

		$('.js-composition-toggle li a').removeClass('active');
		$(this).addClass('active');

		return false;
	});

	$('.js-burgerToggle').click(function(){
		$(this).toggleClass('active');
		$('.header-menu').toggleClass('active');

		return false;
	});

});