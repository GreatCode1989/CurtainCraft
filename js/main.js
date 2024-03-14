$(function() {
    // Modals for 'Our works'
    $('.fancy').fancybox();

    // Copywrite year

    var today = new Date();
    $('.footer__copywrite-year').text(today.getFullYear());

    // Main slider in section Work

    function worksSlider() {
        if ($(window).innerWidth() < 768 && !($('.work__slider.slick-initialized').length)) {
            $('.work__slider').slick({
                arrows: false,
                dots: true,
                responsive: [
                    {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        centerMode: true,
                        variableWidth: true
                    }
                    }
                ]
            });
        }
    };

    worksSlider();
    $(window).resize(worksSlider);

    // Scroll to top
    $(window).scroll(function() {
        if ($(window).scrollTop() > 500) {
          $('.scroll-up').fadeIn(300);
        } else {
          $('.scroll-up').fadeOut(300);
        }
    });
    
    $('.scroll-up').on('click', function() {
        $('html, body').animate({scrollTop:0}, '300');
    });

    // Keep-in-touch appearance

    $(window).scroll(function() {
        if ($(window).scrollTop() > 500) {
          $('.keep-in-touch').fadeIn(300);
        } else {
          $('.keep-in-touch').fadeOut(300);
        }
    });

    // Mobile menu

    $('body').on('click', '.mobile-menu__btn', function() {
        $('.mobile-menu').addClass('mobile-menu--active');
        $('body').addClass('mobile-menu--open');
    });

    $('body').on('click', '.mobile-menu__close', function() {
        $('.mobile-menu').removeClass('mobile-menu--active');
        $('body').removeClass('mobile-menu--open');
    });

    $('body').on('click', '.mobile-menu__link--anchor', function(e){
        $('.mobile-menu').removeClass('mobile-menu--active');
        $('body').removeClass('mobile-menu--open');
        var anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top
        }, 500);
        e.preventDefault();
        return false;
    });

    // Portfolio sliders

    function portfolioSlider() {
        if ($(window).innerWidth() < 768 && !($('.portfolio__block.slick-initialized').length)) {
            $('.portfolio__block').slick({
                arrows: false,
                dots: true,
                slidesToShow: 2,
                responsive: [
                    {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        centerMode: true,
                        variableWidth: true
                    }
                    }
                ]
            });
        } else if ($(window).innerWidth() > 767 && ($('.portfolio__block.slick-initialized').length)) {
            $('.portfolio__block').slick('unslick');
        }
    };

    portfolioSlider();
    $(window).resize(portfolioSlider);

    // Show all and hide button

    if ($('.curtains').length) {
        var fullText = $('.curtains__about').html();
        $('.curtains__text-all').html(fullText);
        var croppedText =  fullText.slice(0, 232) + '...';  
        function hideText() {
            if ($(window).innerWidth() < 768 && !($('.curtains.hide').length)) {                                
                $('.curtains__about').html(croppedText);
                $('.curtains').addClass('hide');
                $('.btn__hide').hide(200);
                $('.btn__show').show(200);
            } else if ($(window).innerWidth() > 767 && ($('.curtains.hide').length)) {                                
                $('.curtains__about').html(fullText);
                $('.curtains').removeClass('hide');
            }
        }

        hideText();
        $(window).resize(hideText);

        $('body').on('click', '.btn__show', function(evt) {
            evt.preventDefault();
            $('.curtains__about').html(fullText);
            $('.curtains').removeClass('hide');
            $('.btn__show').hide(200);
            $('.btn__hide').show(200);
        });

        $('body').on('click', '.btn__hide', function(evt) {
            evt.preventDefault();
            $('.curtains__about').html(croppedText);
            $('.curtains').addClass('hide');
            $('.btn__hide').hide(200);
            $('.btn__show').show(200);
            
        });
    }

    // Smooth scroll

    $('body').on('click', '.smooth-scroll', function(e) {
        var anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top
        }, 800);
        e.preventDefault();
    });    

    // Input phone mask

    $('.input__phone').inputmask("+38 (999)-999-99-99");

    // Main banner arrow

    $('body').on('click', '.main__arrow-svg', function() {
        $('html, body').animate({scrollTop:950}, '500');
    });

    $('body').on('click', '#send .btn', function() {
        $.fancybox.close();
        $.fancybox.close();
    })

    // Отправка заявки с главной

    $('#form').trigger('reset');

    $('#form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            url: 'send.php',
            type: 'POST',
            contentType: false,
            processData: false,
            data: new FormData(this),
            success: function(msg) {
                if (msg == 'ok') {
                    $('.message-sent').trigger('click');
                    $('#form').trigger('reset'); // очистка формы
                } else {
                    alert('Ошибка');
                }
            }
        });
    });

    // Отправка заявки со страницы заявки

    $('#order-form').trigger('reset');

    $('#order-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            url: 'order.php',
            type: 'POST',
            contentType: false,
            processData: false,
            data: new FormData(this),
            success: function(msg) {
                //console.log(msg);
                if (msg == 'ok') {
                    $('.message-sent').trigger('click');
                    $('#order-form').trigger('reset'); // очистка формы
                } else {
                    alert('Ошибка');
                }
            }
        });
    });

    // Отправка заявки на обратный звонок

    $('#keep-in-touch__form').trigger('reset');

    $('#keep-in-touch__form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            url: 'keep-in-touch.php',
            type: 'POST',
            contentType: false,
            processData: false,
            data: new FormData(this),
            success: function(msg) {
                //console.log(msg);
                if (msg == 'ok') {
                    $('.message-sent').trigger('click');
                    $('#keep-in-touch__form').trigger('reset'); // очистка формы
                } else {
                    alert('Ошибка');
                }
            }
        });
    });

    // Модалка Задать вопрос на странице Портфолио

    $('#question__form').trigger('reset');

    $('#question__form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            url: 'question.php',
            type: 'POST',
            contentType: false,
            processData: false,
            data: new FormData(this),
            success: function(msg) {
                //console.log(msg);
                if (msg == 'ok') {
                    $('.message-sent').trigger('click');
                    $('#question__form').trigger('reset'); // очистка формы
                } else {
                    alert('Ошибка');
                }
            }
        });
    });


});