$(document).ready(function() {

	$('.js-composition-toggle li a').click(function(){

		$('.js-composition-toggle li a').removeClass('active');
		$(this).addClass('active');

		return false;
	});

	$('.js-burgerToggle').click(function(){
		$(this).toggleClass('active');
		$('.wr-navigation').toggleClass('active');
		$('body').toggleClass('ov-hidden');

		return false;
	});

});