import React from 'react';
import { useEffect } from 'react';
var ParallaxLayer = function (props) {
    var thisdiv = React.createRef();
    useEffect(function () {
        if (!props.speed)
            props.speed = "100%";
        if (!props.speed.includes("%"))
            console.error("Value of Parallax Speed must be a percentage. Read our documentation for further information.");
        thisdiv.current.setAttribute("parallaxSpeed", props.speed);
    }, [props.speed]);
    return (React.createElement("div", { style: { zIndex: props.zIndex ? props.zIndex : 0, transform: "translateY(0px)" }, className: "Parallax-Layer", ref: thisdiv }, props.children));
};
export default ParallaxLayer;
