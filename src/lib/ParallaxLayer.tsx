import React from 'react';
import { useEffect } from 'react';

const ParallaxLayer = (props: {speed?: string, zIndex?: number, children?:[HTMLElement]}) => {

    const thisdiv:any = React.createRef();

    useEffect(()=>{
        if(!props.speed) props.speed = "100%";
        if(!props.speed.includes("%")) console.error("Value of Parallax Speed must be a percentage. Read our documentation for further information.")
        thisdiv.current.setAttribute("parallaxSpeed", props.speed);

    }, [props.speed])

    return (
        <div style={{zIndex: props.zIndex?props.zIndex:0, transform: "translateY(0px)"}} className={"Parallax-Layer"} ref={thisdiv}>
            {props.children}
        </div>
    )
}

export default ParallaxLayer