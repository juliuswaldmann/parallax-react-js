import React from "react";
import {useState, useEffect} from "react";

function ParallaxContainer(props: { children: React.ReactNode}) {
  const thisContainerPrefetch = React.createRef<HTMLDivElement>(); //create reference to this main div of the ParallaxContainer
  const [thisContainer, setThisContainer] = useState(thisContainerPrefetch); 
  //In some scenarios the reference returns null because of the way react-hotreload works. 
  //Creating a state of the reference seems to fix this proplem.

  useEffect(() => {

    var prevScroll: number = 0; 
    //variable that stores the previous scroll height. 
    //Used to calculate the change in scroll height (or "deltaScroll") since the last event was fired.

    function setPrevScroll(nv:number) { //setter function because "prevScroll" is out of the scope of the "onscroll" method
        prevScroll = nv; //"prevScroll" is set to the value provided by the "onscroll" function
    }

    thisContainer.current!.onscroll = () => { //set the "onscroll" event function of the ParallaxContainer
        try { //use try catch block to better handle errors created by the strange behaviour of references together with hotreload
            onscroll(thisContainer.current!, setPrevScroll, prevScroll); //pass the current ParallaxContainer, the setter function for "prevScroll" and the value of "prevScroll" to the "onscroll" function
        } catch (error) { //handle errors
            console.error(error) //send errors to console for better insight
        }
      };
  }, []); //empty dependency array (runs only after first render of Component)

  return ( //return children wrapped inside a div referenced by "thisContainer". Div is part of class "Parallex-Container" and has some simple style properties
    <div className={"Parallax-Container-Outer"} style={{width: "100%", height: "100vh", display: 'flex'}}>
      <div className={"Parallax-Container"} ref={thisContainer} style={{ height: "100%", overflow: "auto", width: "100%" }} >
        {props.children}
      </div>
    </div>
  );
}

//"onscroll" function that takes the ParallaxContainer, the setter function for "prevScroll" and "prevScroll" itself as arguments.
//function then calculates the needed "translateY" value for the scroll behaviour to work as expected.
function onscroll(container: HTMLDivElement, setPrevScroll:Function, prevScroll:number ) {

  const deltaScroll = container.scrollTop - prevScroll; //calculate the pixels scrolled since the lasr "onscroll" event

  setPrevScroll(container.scrollTop); //set "prevScroll" so "deltaScroll" can be calculated properly the next time "onscroll" runs

  const childrenarray :NodeListOf<HTMLElement> = container.querySelectorAll('.Parallax-Layer'); //select all ParallaxLayers that are children to the ParallaxContainer

  for(let i = 0; i < childrenarray.length; i++) { //loop through the ParallaxLayers. For loop is faster than foreach so for loop is used.
    
    const prevPosY: number = childrenarray[i].style.transform==""?0:parseFloat(childrenarray[i].style.transform.replace("translateY(", "").replace("px)", "")); //get the previous "translateY" value so it can later be added on top

    try { //use try catch again because of the strange way refs behave when hotreload is used.

      //calculate new "tranlateY" value based on wanted speed of each Layer, 
      //the current position and the distance scrolled between now and the last "onscroll" event.
      childrenarray[i].style.transform = "translateY(" + (prevPosY + deltaScroll * (1-parseFloat(childrenarray[i].getAttribute("parallaxSpeed")!.replace("%", ""))/100)).toString() + "px)";
    
      } catch (error) { //handle errors
        console.error(error); //log errors to console for better insight
    }
  };

}

//export the ParallaxContainer component.
export default ParallaxContainer;