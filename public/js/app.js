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

    $(document).on('click', '.add-to-fav', function(){
        $(this).toggleClass('added');
        $('i', this).toggleClass('pulse');
        $this = $('i', this);
        setTimeout(function(){
            $this.toggleClass('animated');
        },250);
        $( this ).removeClass('hovered');
    });

    $( ".add-to-fav" ).hover(
    function() {
        $( this ).addClass('hovered');
    }, function() {
        $( this ).removeClass('hovered');
    }
    );

    

});

$(window).scroll(function(){
    var sticky = $('#header'),
        scroll = $(window).scrollTop();

    if (scroll >= 35) sticky.addClass('header-sticky');
    else sticky.removeClass('header-sticky');
});


function init_product_gallery(){
    // Init empty gallery array
    var container = [];

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
            closeOnScroll: false
        };

        // Initialize PhotoSwipe
        var gallery = new PhotoSwipe($pswp, PhotoSwipeUI_Default, container, options);
        gallery.init();
    });
}