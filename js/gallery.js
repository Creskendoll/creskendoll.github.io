$(document).ready(function () {

    var maxSlidePx = 0;
    var thumbnailURLS = [];
    var slideBy = 410;

    // reading the JSON and filling up the gallery with thumbnails
    var populateGallery = function () {
        $.when($.getJSON("src/pictureURLS.json", function (data) {
            var galleryPics = data.galleryPics; 
            $.each(galleryPics, function (index, obj) {
                thumbnailURLS.push({"small": obj.small, "large": obj.original}); 
            });
        })).done(function () { 
            generateImages(thumbnailURLS);
        });
    }

    var generateImages = function (urls) {
        $.each(urls, function (index, picURL) {
            var img = $("<img />").attr({class: "galleryIMG", src: picURL.small, index: index, alt: "Gallery Image"})
            .on('load', function() {
                if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
                    console.log("Couldn't fetch image: ", picURL.small);
                } else {
                    $("#gallery-items").append(img);
                    maxSlidePx += slideBy;
                }
            }); 
        });
    }
    
    populateGallery();

    // set up boundary conditions
    
    var slideGallery = function (offset) {
        // sliding right is in -
        var slider = $("#gallery-items");
        var sliderPos = parseInt(slider.css('left'));

        if (sliderPos % slideBy == -0) {
            if (sliderPos + offset >= 0) {
                slider.css('left', '0px');
            } else if (sliderPos + offset <= -maxSlidePx) {
                slider.css('left', -maxSlidePx+'px');
            } else {
                slider.css('left', (sliderPos + offset)+'px');
            }
        }
    }

    // gallery buttons
    $(document).on('click', "#arrowRight", function (e) {
        slideGallery(-slideBy);
    });

    $(document).on('click', "#arrowLeft", function (e) {
        slideGallery(slideBy);
    });

    $(document).on('click', 'img.galleryIMG', function () {
        $('#modal-loading').css('display', 'block');
        
        $('#modal').css("display", "block");
        
        var largeURL = thumbnailURLS[$(this).attr('index')].large
        
        var img = $("<img />").attr({id: "modalIMG", class: "modal-content", src: largeURL, alt: "Large Image"})
        .on('load', function() {
            if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
                console.log("Couldn't fetch image: ", picURL);
            } else {
                $('#modal-loading').css('display', 'none');
                $('#modalIMG').replaceWith(img);
            }
        }); 
    });

    var slideCoeff = 2;
    $(document).on('touchstart', '.slider', function (ie) {
        // store the initial position the touch occurs
        var touchStart = ie.originalEvent.touches[0].pageX;
        var elmStart = $(this).offset();
        var touchStartX = touchStart - elmStart.left;

        $(document).on('touchmove', '.slider', function (e) {
            // find the movement relative to the initial touch
            var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
            var elm = $(this).offset();
            var x = touch.pageX - elm.left;
            var y = touch.pageY - elm.top;
            if(x < $(this).width() && x > 0){
                if(y < $(this).height() && y > 0){
                    //CODE GOES HERE
                    // left is positive, right is negative offset 
                    var offset = touchStartX - x;
                    console.log('offset:' + offset);
                }
            } 
        });
      })

    // close the image overlay
    $(document).on("click", "span.close", function () {
        $('#modal').css("display", "none");
        var noneIMG = $('<img />').attr({class: "modal-content", id: "modalIMG"});
        $('#modalIMG').replaceWith(noneIMG);
      });

});