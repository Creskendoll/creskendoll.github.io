$(document).ready(function () {

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
            var img = $("<img />").attr({class: "col col-sm-5 col-md-2 col-lg-2 gallery-img", src: picURL, alt: "Gallery Image"})
            .on('load', function() {
                if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
                    console.log("Couldn't fetch image: ", picURL);
                } else {
                    $("#gallery-items").append(img);
                }
            });
        });
    }

    populateGallery();
});