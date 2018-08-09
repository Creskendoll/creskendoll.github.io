var rotateBy = 60
var profilePics = [
    "https://drive.google.com/uc?id=1IJcqmoeLggICJ85OWT860Oh_xpX6VSUJ", 
    "https://drive.google.com/uc?id=16peQ6qnSRZvxp1S-8uwtQOhAVtLi_fvo",
    "https://drive.google.com/uc?id=1absn7C9EBdwuNV2cKfYqmc9_GRJ-LKBu",
    "https://drive.google.com/uc?id=1ER5oaj0O3t9GTYQdoXzgGC1VhufTv98q",
    "https://drive.google.com/uc?id=1iviciPu42cHqhZ2Se7kDE28kT4jhfEuN",
    "https://drive.google.com/uc?id=1n9diTQ8oXklkI9cOuE11XYayrRx22eHF",
    "https://drive.google.com/uc?id=19vOmmJR6Gk3Efsh3AefZAsB2em9h7NJw"]
var galleryPics = []

$(document).ready(function () {

    var replacePic = function (picID, replaceWith) {
        // replaces pic with picID with replaceWith
        // replaceWith is html, picID -> #foo
        if (picID.charAt(0) == "#") {
            $(picID).replaceWith(replaceWith);
        }else {
            $("#"+picID).replaceWith(replaceWith);
        }
    }

    var setNewPic = function (img) { 
        // returns new image element with image attached

        // default pic 
        var newPicURL = '';

        var currentPicURL = img.attr('src');

        while (newPicURL == '' || newPicURL == currentPicURL) {
            newPicURL = profilePics[Math.floor(Math.random()*profilePics.length)];
        }
        
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

    // set initial photo
    setNewPic($("#profileIMG"));

    var getMouseRelativePosition = function (elem, e) {
        // get mouse position relative to the elem
        
        var parentOffset = elem.offset(); 
        var relX = e.pageX - parentOffset.left;

        return relX;
    }

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