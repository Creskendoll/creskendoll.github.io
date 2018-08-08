var rotateBy = -60

$(document).ready(function () {

    var getMouseRelativePosition = function (elem, e) {
        var parentOffset = elem.offset(); 
        var relX = e.pageX - parentOffset.left;

        return relX;
    }

    $("#profilePicContainer").mousemove(function (e) {
        var pic = $("#profilePic")

        if (pic.hasClass('f')){
            return;
        }

        var relX = getMouseRelativePosition($(this), e);

        var rotation = ( relX - Math.abs (pic.width()) + pic.width()/2 ) / (pic.width()/4 - (-pic.width()/4))*rotateBy

        pic.css({"z-index": 9, "-webkit-transform": "rotateY("+rotation+"deg)", "-moz-transform": "rotateY("+rotation+"deg)"})
    });

    $("#profilePicContainer").mouseleave(function (e) {
        var pic = $("#profilePic")

        pic.css({"z-index": 9, 
                 "-webkit-transform": "rotateX("+0+"deg)",
                 "-moz-transform": "rotateX("+0+"deg)"});
    });

    $("#profilePicContainer").click(function (e) {
        var relX = getMouseRelativePosition($(this), e);

        var pic = $("#profilePic");

        $("#profilePicBack").attr('src', '../src/profile3.jpg');

        if(relX < pic.width()/2) {            
            // clicked left side
            pic.addClass('flipping-left');
            pic.removeClass('flipping-right'); 
            
            pic.addClass('f');

            setTimeout(() => {
                $("#profilePicFront").attr('src', '../src/profile2.jpg');
                pic.removeClass('f');
            }, 300);

        }else if(relX > pic.width()/2) {
            // clicked right side
            pic.addClass('flipping-right');
            pic.removeClass('flipping-left');
             
            pic.addClass('f');
            
            setTimeout(() => {
                $("#profilePicFront").attr('src', '../src/profile3.jpg');
                pic.removeClass('f');
            }, 300);
        }

    });
});