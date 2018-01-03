$(document).ready(function() {

	$('.owl-slider').owlCarousel({
		loop: true,
		margin: 10,
		navRewind: false,
		autoHeight: true,
		dotsEach: true,
		pagination : true,
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

	$("#date").mask("99.99.9999",{placeholder:"дд.мм.гггг"});
	$("#tel").mask("9 (999) 9999999");

});

// Карусель с вертикальной прокруткой (прожарка)
(function ($) {
	var slides = $('.roasting-slider-item');
	var titles = $('.roasting-titles a');
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
	// Листаем по клику
	titles.each(function (index) {
		$(this).click(function (event) {
			event.preventDefault();
			updateSlides(slides, index);
			titles.removeClass('active')
			.eq(index).addClass('active');
		});
	});
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
	var figure = $('.wr-burgerPlace-intro > .container figure');
	var figure_2 = $('.wr-company-mission > .container figure');
	var wnd = $(window);
	// Обновляет положение фигурки
	// newState - новое значение скролла
	function updateFigure(newState) {
		var posY = newState < 900 ? newState > 100 ?
			newState * 0.5 - 150 : 0 - 1 * newState : 300;
		figure.css('transform', 'translate(0, ' + posY + 'px)');
		figure_2.css('transform', 'translate(0, ' + (posY - 100) + 'px)');
	}
	$(window).scroll(function () {
		var offset = wnd.scrollTop();
		updateFigure(offset);
	});
})(jQuery);


// Модуль управления картой
(function ($) {
	if($('.side-map').length) {
		ymaps.ready(init);
	}
	// Большая ли карта
	var isBigMap = $('body').hasClass('big-map');
	// Координаты мест
	var coords = [];
	// Информация о местах
	var items = $('.place-info');
	// Скрываем элементы на небольших картах
	if (!isBigMap) {
		items.hide().eq(0).show();
	}
	// Загружаем координаты
	items.each(function (index) {
		var coordData = $(this).data('coord');
		var coord = coordData.split(',').map(function (item) {
			return parseFloat(item.trim());
		});
		coords.push(coord);
	});
	// Находим центр карты
	var mapCenter = $('#side-map').data('position');
	if(typeof mapCenter === 'undefined') {
		mapCenter = '55.74159657, 37.62564850';
	}
	var mapCenterPosition = mapCenter.split(',').map(function (item) {
		return parseFloat(item.trim());
	});
	// Инициализация
	function init(){
		var myMap = new ymaps.Map("side-map", {
			center: mapCenterPosition,
			zoom: 13,
			controls: [],
			behaviors: []
		}, {
			maxZoom: 14,
			minZoom: 14
		});
		// Блокировка
		var isMapBlocked = true;
		myMap.events.add('click', function () {
			if (isMapBlocked) {
				myMap.behaviors.enable(['drag']);
				isMapBlocked = false;
			} else {
				myMap.behaviors.disable(['drag']);
				isMapBlocked = true;
				$('#map-hint').fadeIn();
			}
		});
		$('#map-hint').click(function (event) {
			myMap.behaviors.enable(['drag']);
			isMapBlocked = false;
			$(this).fadeOut();
		});
		// Номер активной метки
		var current = 0;
		// Создаём метки на карте
		var placeMarks = coords.map(function (coord, index) {
			var placemark = new ymaps.Placemark(coord, {}, {
	        iconLayout: 'default#image',
	        iconImageHref: 'assets/templates/html/assets/img/marker.png',
	        iconImageSize: [26, 36],
	        iconImageOffset: [-19, -36]
	    });
			placemark.events.add('click', function () {
				if (current === index) {
					return;
				}

				updatePlacemark(index);
				updateItems(index);
				current = index;
			});
			return placemark;
		});
		// Обновляем метки
		function updatePlacemark(index) {
			var pmOld = placeMarks[current];
			var pmNew = placeMarks[index];
			pmOld.options.set('iconImageHref', 'assets/templates/html/assets/img/marker.png');
			pmOld.options.set('iconImageSize', [26, 36]);
			pmOld.options.set('iconImageOffset', [-19, -36]);
			pmNew.options.set('iconImageHref', 'assets/templates/html/assets/img/marker-active.png');
			pmNew.options.set('iconImageSize', [52, 72]);
			pmNew.options.set('iconImageOffset', [-36, -72]);
		}
		// Обновляем итемы
		function updateItems(index) {
			if (isBigMap) {
				items.eq(current).removeClass('active');
				items.eq(index).addClass('active');
			} else {
				items.eq(current).hide();
				items.eq(index).show();
			}
		}
		// Обратная связка с картой
		if (isBigMap) {
			items.each(function (index) {
				$(this).click(function (event) {
					updatePlacemark(index);
					updateItems(index);
					current = index;
					myMap.setCenter(coords[index]);
				});
			});
		}
		// Делаем первую метку крупной
		updatePlacemark(0);
		// Размещаем метки на карте
		placeMarks.forEach(function (pm) {
			myMap.geoObjects.add(pm);
		});
	}
})(jQuery);

// центрирование карусели новостей
(function ($) {
	var windowWidth = $(window).width(),
		newsCarousel = $('.company-news .owl-carousel .owl-stage-outer'),
		containerWidth = $('.wr-company-news .container').width();

	var newsCarouselPaddings = (windowWidth - containerWidth)/2;
	newsCarousel.css('padding-left', newsCarouselPaddings).css('padding-right', newsCarouselPaddings);

	$(window).resize(function() {
		containerWidth = $('.wr-company-news .container').width();
		newsCarouselPaddings = (windowWidth - containerWidth)/2;
		newsCarousel.css('padding-left', newsCarouselPaddings).css('padding-right', newsCarouselPaddings);
	})
})(jQuery);


$(window).load(function() {
	$('.preloader').hide();
});

//прячем меню  при прокрутке вниз, показывем при прокрутке ввех
var lastScrollTop = 0;
$(window).scroll(function(event){
   var st = $(this).scrollTop();
   if (st > lastScrollTop){
       // код для прокрутки вниз
       $('.wr-header').addClass('hide-header');
   } else {
      // код для прокрутки вверх
      $('.wr-header').removeClass('hide-header');
   }
   lastScrollTop = st;
});

//добавляем фон шапке на странице "о компании"
$(window).scroll(function(){
	var positionHead =  $('.company-intro h1').offset().top;
	if (($(window).scrollTop() + $(window).height()) > positionHead + 100){
		$('.light .app .wr-header').addClass('white');
	} else {
		$('.light .app .wr-header').removeClass('white');
	}
});
