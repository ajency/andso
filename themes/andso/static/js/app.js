var $ = jQuery.noConflict();

$(document).ready(function(){
    $('.navbar-toggler').click(function(){
        $(this).toggleClass('on');
        $('#header-menu').toggleClass('active');
    });

    if($('.sticky-sidebar').length){
        var sticky_offset = $('#header .header-navbar').height() + 40;
        $('.sticky-sidebar').theiaStickySidebar({
            // Settings
            additionalMarginTop: sticky_offset,
        });
    }

    // This button will increment the value
    $('.plus-btn').click(function(e){
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        fieldName = 'qty';
        // Get its current value
        var currentVal = parseInt($('input[name='+fieldName+']').val());
        // If is not undefined
        if (!isNaN(currentVal)) {
            // Increment
            $('input[name='+fieldName+']').val(currentVal + 1);
        } else {
            // Otherwise put a 0 there
            $('input[name='+fieldName+']').val(1);
        }
    });
    
    // This button will decrement the value till 0
    $(".minus-btn").click(function(e) {
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        fieldName = 'qty';
        // Get its current value
        var currentVal = parseInt($('input[name='+fieldName+']').val());
        // If it isn't undefined or its greater than 0
        if (!isNaN(currentVal) && currentVal > 1) {
            // Decrement one
            $('input[name='+fieldName+']').val(currentVal - 1);
        } else {
            // Otherwise put a 0 there
            $('input[name='+fieldName+']').val(1);
        }
    });

    init_product_gallery();

    $(document).on('click', '.add-to-fav,.loop-add-to-fav', function(){
        $(this).toggleClass('added');
        $('i', this).toggleClass('pulse');
        $this = $('i', this);
        setTimeout(function(){
            $this.toggleClass('animated');
        },250);
        $( this ).removeClass('hovered');
    });

    $( ".add-to-fav,.loop-add-to-fav" ).hover(
    function() {
        $( this ).addClass('hovered');
    }, function() {
        $( this ).removeClass('hovered');
    }
    );

    if($('#related-products').length){
        $("#related-products ul.products").slick({
            infinite: false,
            arrows: true,
            dots: false,
            slidesToShow: 4,
            responsive: [{
                breakpoint: 991,
                settings: {
                slidesToShow: 3,
                }
        
            }, {    
                breakpoint: 767,
                settings: {
                slidesToShow: 2,
                },                        
            }, {    
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                }                       
            }]
        });
    }

    if($('.price-range-slider').length){
        $(".price-range-slider").ionRangeSlider();
    }

    color_switcher();

    $(document).on('click', '.res-sortby-btn', function(){
        $(this).toggleClass('active');        
        $('.sort-by-dropdown').toggleClass('opened');        
    });

    // Open close filter sibebar
    $(document).on('click', '.res-filter-btn', function(){
        $('.sidebar-filters').toggleClass('active');
    });
    $(document).on('click', '.close-menu-popup,.filter-products', function(){
        $('.sidebar-filters').toggleClass('active');
    });

    let price_slider = $(".price-range-slider").data("ionRangeSlider");

    //reset form
    $(document).on('click', '.clear-filters', function(){
        $('.filter-widget input[type=checkbox]').prop('checked',false);
        price_slider.reset();
    });

    $('#loop-product-quickview').on('show.bs.modal', function (event) {
        setTimeout(function(){
            loop_quick_view_gallery();
        },250);        
    });

    $(".banner-inner").slick({
        infinite: false,
        arrows: true,
        dots: true,
        slidesToShow: 1,
    });

    $(".testimoails-wrap").slick({
        infinite: true,
        arrows: true,
        dots: false,
        slidesToShow: 3,
        responsive: [{    
            breakpoint: 767,
            settings: {
                slidesToShow: 1,
                arrows: true,
            },                        
        }]
    });

    $(".product-slider ul.products").slick({
        infinite: false,
        arrows: true,
        dots: false,
        slidesToShow: 4,
        responsive: [{
            breakpoint: 991,
            settings: {
            slidesToShow: 3,
            }
    
        }, {    
            breakpoint: 767,
            settings: {
            slidesToShow: 2,
            },                        
        }, {    
            breakpoint: 576,
            settings: {
                slidesToShow: 1,
            }                       
        }]
    });

    $(document).on('click', '.nav-item a', function(){
        setTimeout(function(){
            $('.product-slider ul.products').slick('refresh');
        },150); 
    });

    init_slider();

    $('.zoom').magnify();

});

function init_slider() {
    var $theWindowSize = $(window).width();
    if($theWindowSize < 768 && !$(".explore-wrap.slick-initialized").length) {
        $(".explore-wrap").slick({
            infinite: true,
            arrows: true,
            dots: false,
            slidesToShow: 3,
            responsive: [{    
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    arrows: true,
                    centerMode: true,
                    centerPadding: '40px',
                },                        
            }]
        });
    } else {
        if($(".explore-wrap").hasClass('slick-initialized')) {
            $(".explore-wrap").slick('unslick');
        }
    }
}

objectFitImages();

$(window).scroll(function(){
    var sticky = $('#header'),
        scroll = $(window).scrollTop();

    if (scroll >= 35) sticky.addClass('header-sticky');
    else sticky.removeClass('header-sticky');
});


function init_product_gallery(){
    // Init empty gallery array
    var container = [];
    var gallery;

    // Loop over gallery items and push it to the array
    $('#gallery').find('figure').each(function() {
        var $link = $(this).find('a'),
        item = {
            src: $link.attr('href'),
            w: $link.data('width'),
            h: $link.data('height'),
            title: $link.data('caption')
        };
        container.push(item); 
    });

    // Define click event on gallery item
    $('.product-image a').click(function(event) {

        // Prevent location change
        event.preventDefault();

        // Define object and gallery options
        var $pswp = $('.pswp')[0],
        options = {
            index: $(this).parent('figure').index(),
            bgOpacity: 0.85,
            showHideOpacity: true,
            closeOnScroll: false,
        };

        // Initialize PhotoSwipe
        gallery = new PhotoSwipe($pswp, PhotoSwipeUI_Default, container, options);
        gallery.init();
      });

      var gallery
}

function color_switcher(){
    $('.color-val').text($('input[name="color"]:checked').data('colorname'));
    $('input[name="color"]').on('change', function(){
        var colorname = $(this).data('colorname');        
        $('.color-val').text(colorname);
    });
}

function loop_quick_view_gallery(){
    $('.quick-view-gallery').slick({
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
    });
}

$(window).resize(function() {
    init_slider();
});