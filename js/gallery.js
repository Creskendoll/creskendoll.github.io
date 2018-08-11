$(document).ready(function () {

    var maxSlidePx = 0;

    var populateGallery = function () {
        var thumbnailURLS = [];
        $.when($.getJSON("src/pictureURLS.json", function (data) {
            var galleryPics = data.galleryPics; 
            $.each(galleryPics, function (index, obj) {
                thumbnailURLS.push(obj.small); 
              });
          })).done(function () { 
            generateImages(thumbnailURLS);
           });
      }

    var generateImages = function (urls) {
        $.each(urls, function (index, picURL) {
            var img = $("<img />").attr({class: "gallery-img", src: picURL, alt: "Gallery Image"})
            .on('load', function() {
                if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
                    console.log("Couldn't fetch image: ", picURL);
                } else {
                    maxSlidePx += 400;
                    $("#gallery-items").append(img);
                }
            }); 
        });
    }
    
    populateGallery();

    // refactor and refurnish this
    var slideBy = 400;
    $("#arrowRight").click(function (e) {
        var pos = parseInt($("#gallery-items").css('left')); 

        if (pos % 400 == 0){
            if (pos >= (-maxSlidePx + slideBy)) {
                $("#gallery-items").css('left', (pos-slideBy)+'px');
            }   
        }     
    });

    $("#arrowLeft").click(function (e) {
        var pos = parseInt($("#gallery-items").css('left')); 

        if (pos % 400 == 0) {
            if (pos >= -slideBy) {
                $("#gallery-items").css('left', '0px');
            } else if (pos >= (-maxSlidePx + slideBy) && pos < 0) {
                $("#gallery-items").css('left', (pos+slideBy)+'px');
            }
        }
    });

});