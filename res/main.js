var s,
    app = {

    settings : {
        textFadeSpeed: 2000 // How fast to rotate text on the homepage
    },
    init: function() {
        //Global settings
        s = this.settings;

        //initalize
        this.initalizers();
        
        this.backgroundVideo();
        
        this.mailChimpAjax();
        this.keepSettings();

        //Settings -> can be removed in your production code and change any on click actions into the keep settings function
        this.settingOptions();
    },

    

    initalizers: function(){

        //initalize onepage scroll
        $(".main").onepage_scroll({
            sectionContainer: "section"
        });

        // Wait until video has loaded before fading it in.
        $(window).load( function(){
            $('#big-video-wrap').show().animate({opacity:1});
        });

        // Text slider on homepage turn on rotation
        $(".demo1 .rotate").textrotator({
            animation: "fade",
            speed: s.textFadeSpeed
        });

    },
    backgroundVideo : function() {

        $('body').vide({
          mp4: 'video/landingvid.mp4',
          ogv: 'video/background-video.ogv',
          poster: 'img/background.jpg'
        }, {
          volume: 1,
           playbackRate: 1,
           muted: true,
           loop: true,
           autoplay: true,
           position: '50% 50%', // Similar to the CSS `background-position` property.
           posterType: 'jpg', // Poster image type. "detect" — auto-detection; "none" — no poster; "jpg", "png", "gif",... - extensions.
           resizing: true, // Auto-resizing, read: https://github.com/VodkaBears/Vide#resizing
           bgColor: 'transparent', // Allow custom background-color for Vide div,
           className: 'bg-video-container' // Add custom CSS class to Vide div
        });


    },
    
   

    mailChimpAjax: function() {

    var self = this,
        mailForm = $('#mc-embedded-subscribe-form');

        $('#mc-embedded-subscribe-form button[type="submit"]').bind('click', function ( event ) {
            event.preventDefault();
            self.register(mailForm);
        });

    },
    register: function(form){
        var $message = form.parent().siblings('.sign-up-message');

        $.ajax({
            type: form.attr('method'),
            url: form.attr('action'),
            data: form.serialize(),
            cache       : false,
            dataType    : 'json',
            contentType: "application/json; charset=utf-8",
            error       : function(err) {
                console.log(" Could not connect to the registration server. Please try again later. ", err);
                $message.text('There was an error submitting your email, please try again').removeClass('hidden').addClass(' error animated fadeInDown');
            },
            success     : function(data) {
                console.log("success");
                if (data.result != "success") {

                    $message.text('There was an error submitting your email, please try again').removeClass('hidden').addClass(' error animated fadeInDown');

                } else {
                    $message.html('Thank you. Your email was successfully submitted');
                    $message.removeClass('hidden').addClass(' animated fadeInDown');
                }
            }
        });//end ajax
    }// end register
};

$(document).ready(function(){
    app.init();
});
