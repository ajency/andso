var $ = jQuery.noConflict();

$(document).ready(function(){
    $('.navbar-toggler').click(function(){
        $(this).toggleClass('on');
        $('#header-menu').toggleClass('active');
    });

    if($('.sticky-sidebar').length){
        var sticky_offset = $('#header .header-navbar').height() + 10;
        $('.sticky-sidebar').theiaStickySidebar({
            // Settings
            additionalMarginTop: sticky_offset,
        });
    }

    // $(document).on('click', '.minus-btn', function(e){
    //     e.preventDefault();
    //     var qty = $('.qty').val();
    //     if(qty != 1){
    //         nqty = parseInt(qty) + 1;
    //         $('.qty').val(nqty);
    //     }        
    // });
    // $(document).on('click', '.plus-btn', function(e){
    //     e.preventDefault();
    //     var qty = $('.qty').val();
    //     if(qty != 1){
    //         $('.qty').val();
    //     }
    // });

});

$(window).scroll(function(){
    var sticky = $('#header'),
        scroll = $(window).scrollTop();

    if (scroll >= 35) sticky.addClass('header-sticky');
    else sticky.removeClass('header-sticky');
});