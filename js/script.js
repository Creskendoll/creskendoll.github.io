var rotateBy = 60
var profilePics = [];


var getRandomPicURL = function (arr, currentURL) {
    var newPicURL = '';
    while (newPicURL == '' || newPicURL == currentURL) {
        newPicURL = arr[Math.floor(Math.random()*arr.length)];
    }
    return newPicURL;
}

var replacePic = function (picID, replaceWith) {
    // replaces pic with picID with replaceWith
    // replaceWith is html, picID -> #foo
    if (picID.charAt(0) == "#" || picID.charAt(0) == ".") {
        $(picID).replaceWith(replaceWith);
    } else {
        $("#"+picID).replaceWith(replaceWith);
    }
}

var setNewPic = function (img) { 
    // replaces the img with a new one

    var currentPicURL = img.attr('src');
    var newPicURL = '';

    // had to place it in a function since the async calls didn't work out
    var replace = function () { 
        var img = $("<img />").attr({id: "profileIMG", src: newPicURL, style: "max-width: 100%; max-height: 100%;", alt: "Profile Picture"})
        .on('load', function() {
            if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
                console.log("Couldn't fetch image: ", newPicURL);
                var defaultPic = $("<img />").attr({id: "profileIMG", src: "../src/profile.jpg", style: "max-width: 100%; max-height: 100%;", alt: "Profile Picture"}) 
                replacePic(img.attr('id'), defaultPic);
            } else {
                replacePic(img.attr('id'), img);
            }
        });
    }

    if (profilePics.length == 0) {
        // populate the array 
        $.when($.getJSON("src/pictureURLS.json", function (data) {
            profilePics = data.profilePics;
        })).done(function () {
            newPicURL = getRandomPicURL(profilePics, currentPicURL);
            replace();
        });
    } else {
        newPicURL = getRandomPicURL(profilePics, currentPicURL);
        replace();
    }
}

var getMouseRelativePosition = function (elem, e) {
    // get mouse position relative to the elem
    
    var parentOffset = elem.offset(); 
    var relX = e.pageX - parentOffset.left;

    return relX;
}


$(document).ready(function () {

    // set initial photo
    setNewPic($("#profileIMG"));

    $("#profilePicContainer").mousemove(function (e) {
        // rotate the picture
        
        var pic = $('#profilePic')

        var relX = getMouseRelativePosition($(this), e);

        var rotation = ( relX - Math.abs (pic.width()) + pic.width()/2 ) / (pic.width()/4 - (-pic.width()/4))*rotateBy

        pic.css({"z-index": 9, "-webkit-transform": "rotateY("+rotation+"deg)", "-moz-transform": "rotateY("+rotation+"deg)"})
    });

    $("#profilePicContainer").mouseleave(function (e) {
        // reset the picture 
        var pic = $("#profilePic")

        pic.css({"z-index": 9, 
                 "-webkit-transform": "rotateX("+0+"deg)",
                 "-moz-transform": "rotateX("+0+"deg)"});
    });

    $("#profilePicContainer").click(function (e) {
        // change picture 
        setNewPic($("#profileIMG"));
    });
});