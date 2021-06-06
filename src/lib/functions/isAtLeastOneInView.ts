function isElementInViewport(el:Element) {
    var rect = el.getBoundingClientRect();

    return rect.bottom > 0 &&
        rect.right > 0 &&
        rect.left < (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */ &&
        rect.top < (window.innerHeight || document.documentElement.clientHeight) /* or $(window).height() */;
}

function isAtLeastOneInView(el:Element){

    var allchildrenofelement = el.getElementsByTagName("*");

    for (var i = 0; i < allchildrenofelement.length; i++){
        if(isElementInViewport(allchildrenofelement[i])){
            return true;
        }
    }
    return false;
}

//export the function
export default isAtLeastOneInView;