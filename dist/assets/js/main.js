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

	// popups
	$('.js-section-popup').click(function(e){
		e.preventDefault();

		var vacancyLink = $(this).attr('href');
		$('.' + vacancyLink).addClass('active-popup').fadeIn();
		$('.popup-company-vacancy').fadeIn();
		$('body').addClass('ov-hidden');
		
	});
	$('.js-section-popup-change').click(function(e){
		e.preventDefault();

		var vacancyLink = $(this).attr('href'),
			activePopup = $('.active-popup');
		$(activePopup).removeClass('active-popup').fadeOut();
		$('.' + vacancyLink).addClass('active-popup').fadeIn();
		
	});
	$('.js-popup-close').click(function(e){
		e.preventDefault();

		var activePopup = $('.active-popup');
		$(activePopup).removeClass('active-popup');
		$(this).parent().fadeOut(400);
		$('.popup-company-vacancy .container').fadeOut(400);
		$('body').removeClass('ov-hidden');
	});

});