import React from 'react';
import {useEffect, useState} from 'react';

//create ParallaxLayer component. You can provode a speed prop whcih sets the scroll speed realtive to the normal scroll speed in percent.
//You can also provide a zIndex to specify if the object is on the of front or back (or between)
const ParallaxLayer = (props: {speed?: string, zIndex?: number, children?:React.ReactNode}) => {

    const thisdivprefetch = React.createRef<HTMLDivElement>(); //create reference to this main div of the ParallaxLayer
    const [thisdiv, setThisdiv] = useState(thisdivprefetch);
    //In some scenarios the reference returns null because of the way react-hotreload works. 
    //Creating a state of the reference seems to fix this proplem.

    useEffect(()=>{
        if(!props.speed) props.speed = "100%"; //if props.speed is undefined set it to 100% (normal scroll speed)

        //check if props.speed is a proper percentage. If not throw an error and set props.speed to 100% again
        if(!props.speed.includes("%")){
            console.error("Value of Parallax Speed must be a percentage. Read our documentation for further information.");
            props.speed = "100%";
        }

        thisdiv.current?.setAttribute("parallaxSpeed", props.speed); 
        //set attribute "parallaxSpeed" of the div to the same value as props.speed.
        //This way you can see the value in the actual dom. 
        //You can also change it and directly influence the scroll speed without changing your source code. 

    }, [props.speed]) //Only run the checks on props.speed again if it has changed.

    //Render chldren of this ParallaxLayer inside of a wrapper div which is part of the "Parallax-Layer" class.
    //Wrapper div is referenced by the "thisdiv" ("thisdivprefetch") reference so parallaxSpeed can be set properly.
    return (
            
        <div style={{zIndex: props.zIndex?props.zIndex:0, transform: "translateY(0px)"}} className={"Parallax-Layer"} ref={thisdiv}>
            <div>{props.children}</div>
        </div>
    )
}

//export the ParallaxLayer component
export default ParallaxLayer