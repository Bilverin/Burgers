$(document).ready(function() {

	$('.owl-slider').owlCarousel({
		loop: true,
		margin: 10,
		navRewind: false,
		nav : true,
		navText: ["<img src='assets/templates/html/assets/img/slider-arrow-left.png'>","<img src='assets/templates/html/assets/img/slider-arrow-right.png'>"],
		responsive: {
			0: {
				items: 1
			},
			600: {
				items: 1
			},
			1000: {
				items: 1
			}
		}
	});

	$('.owl-news').owlCarousel({
		items:5,
		margin:50,
		autoWidth:true,
		navText: ["<img src='assets/templates/html/assets/img/news-arrow-left.png'>","<img src='assets/templates/html/assets/img/news-arrow-right.png'>"]
	});

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

		var popupLink = $(this).attr('href');
		$('.' + popupLink).addClass('active-popup').fadeIn();
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

$(window).on('load', function() {
	// preloader
	$('.preloader').fadeOut();
});

// Карусель с вертикальной прокруткой (прожарка)
(function ($) {
	var slides = $('.roasting-slider-item');
	var backgrounds = $('.roasting-slider-photo figure');
	var count = slides.length;
	var oldState = 0;
	var dots;
	// Создаёт точки
	function makeDots(container, slides) {
		slides.each(function (index) {
			var dot = $('<li>').attr('class', index === 0 ? 'active' : '');
			container.append(dot);
		});
		return container.find('li');
	}
	// Обновляет класс слайда: 0 - prev, 1 - active, 2 - next
	function updateSlide(slide, newState) {
		var className = 'roasting-slider-item '
			+ (newState === 0 ? 'prev' : newState === 1 ? 'active' : 'next');
		slide.attr('class', className);
	}
	// Обновляет класс точки
	function updateDot(dot, isActive) {
		var className = isActive ? 'active' : '';
		dot.attr('class', className);
	}
	// Обновляет класс фона
	function updateBg(bg, isVisible) {
		var className = isVisible ? 'active' : '';
		bg.attr('class', className);
	}
	// Обновляет слайды, если новое состояние отличается от старого
	function updateSlides(slides, newState) {
		if (oldState === newState) {
			return;
		}

		slides.each(function (index) {
			var state = index === newState ? 1 : index < newState ? 0 : 2;
			updateSlide($(this), state);
		});

		backgrounds.each(function (index) {
			updateBg($(this), index <= newState)
		});

		dots.each(function (index) {
			updateDot($(this), index === newState)
		});

		oldState = newState;
	}
	// Обновляет размер карусельки
	function updateCarousel() {
		var maxHeight = 0;
		slides.each(function () {
			var h = $(this).height();
			maxHeight = h > maxHeight ? h : maxHeight;
		});
		$('.roasting-slider').height(maxHeight);
	}
	// Выдаёт номер следующего слайда
	function getNext(state) {
		return state < count - 1 ? state + 1 : state;
	}
	// Выдаёт номер предыдущего слайда
	function getPrev(state) {
		return state > 0 ? state - 1 : state;
	}
	// Создаём точки
	dots = makeDots($('.roasting-slider-nav ul'), slides);
	// Подключаем свайп
	$('.roasting-slider').swipe({
		swipe: function (event, direction) {
			if (direction === 'up') {
				updateSlides(slides, getNext(oldState));
				if (oldState === count - 1) {
					$('.roasting-slider').swipe('option', 'allowPageScroll', 'vertical');
					setTimeout(function () {
						$('.roasting-slider').swipe('option', 'allowPageScroll', 'none');
					}, 800);
				}
			} else if (direction === 'down') {
				updateSlides(slides, getPrev(oldState));
				if (oldState === 0) {
					$('.roasting-slider').swipe('option', 'allowPageScroll', 'vertical');
					setTimeout(function () {
						$('.roasting-slider').swipe('option', 'allowPageScroll', 'none');
					}, 800);
				}
			}
		}
	});
	// Инициализация карусели
	updateCarousel();
	$(window).resize(updateCarousel);
})(jQuery);

// Типа параллакса что-то
(function ($) {
	var figure = $('.wr-burgerPlace-intro > figure');
	var figure_2 = $('.wr-company-mission > figure');
	var wnd = $(window);
	// Обновляет положение фигурки
	// newState - новое значение скролла
	function updateFigure(newState) {
		var posY = newState < 900 ? newState > 50 ?
			newState * 0.5 - 225 : 0 - 4 * newState : 225;
		figure.css('transform', 'translate(100%, ' + posY + 'px)');
		figure_2.css('transform', 'translate(100%, ' + (posY - 100) + 'px)');
	}
	$(window).scroll(function () {
		var offset = wnd.scrollTop();
		updateFigure(offset);
	});
})(jQuery);
