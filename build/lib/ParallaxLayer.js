import React from 'react';
import { useEffect, useState } from 'react';
//create ParallaxLayer component. You can provode a speed prop whcih sets the scroll speed realtive to the normal scroll speed in percent.
//You can also provide a zIndex to specify if the object is on the of front or back (or between)
var ParallaxLayer = function (props) {
    var thisdivprefetch = React.createRef(); //create reference to this main div of the ParallaxLayer
    var _a = useState(thisdivprefetch), thisdiv = _a[0], setThisdiv = _a[1];
    //In some scenarios the reference returns null because of the way react-hotreload works. 
    //Creating a state of the reference seems to fix this proplem.
    useEffect(function () {
        var _a;
        if (!props.speed)
            props.speed = "100%";
        if (!props.speed.includes("%"))
            console.error("Value of Parallax Speed must be a percentage. Read our documentation for further information.");
        (_a = thisdiv.current) === null || _a === void 0 ? void 0 : _a.setAttribute("parallaxSpeed", props.speed);
    }, [props.speed]);
    return (React.createElement("div", { style: { zIndex: props.zIndex ? props.zIndex : 0, transform: "translateY(0px)" }, className: "Parallax-Layer", ref: thisdiv }, props.children));
};
export default ParallaxLayer;
