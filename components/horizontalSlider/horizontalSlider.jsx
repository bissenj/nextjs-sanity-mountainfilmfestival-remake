import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import styles from './horizontalSlider.module.css'



/// Test data
// const data = [{id: 1, text: "This is Slide 1", background: "#FFCF47"}, {id: 2, text: "Slide 2", background: "#7ADCEF"}, {id: 3, text: "3rd Slide", background: "#a78df5" }, {id:4, text:"Last Slide.  4", background: "#ff8686"}];

// export const HorizontalSlider = ({index, updateSelectedIndex, data}) => {
export const HorizontalSlider = ({index, updateSelectedIndex, name, children}) => {   
    const sliderRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const currentIndex = useRef(-1);
    const currentTranslate = useRef(0);
    const prevTranslate = useRef(0);
        
    // Dragging variables
    const animating = useRef(false);
    const dragging = useRef(false);
    const startPos = useRef(0);
    const animationRef = useRef(null);

    // CONSTRAINT VARIABLES
    const MAX_INDEX = children.length - 1;
    const MIN_INDEX = 0;

    const setBoundedIndex = (newIndex) => {
        let index = newIndex;
        
        if (index > MAX_INDEX) {
            index = MAX_INDEX;
        }
        if (index < MIN_INDEX) { 
            index = MIN_INDEX;
        }
        
        updateSelectedIndex(index);
    }


    const setPositionByIndex = useCallback((width = dimensions.width) => {  
        currentTranslate.current = currentIndex.current * -width;
        prevTranslate.current = currentTranslate.current;
        setSliderPosition();
    }, [dimensions.width]);


    // USE EFFECT when index changes
    useEffect(() => {
        if (currentIndex.current !== index) {            
            currentIndex.current = index;
            setPositionByIndex();
        }
    }, [index]);


    // USE EFFECT for Event Handlers
    useEffect(() => {                
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('resize', handleResize);
        }
    }, []);


    const handleResize = () => {        
        if (sliderRef.current) {
            const dim = getElementDimensions(sliderRef.current);
            setDimensions(dim);
            setPositionByIndex(dim.width);
        }
    }


    // Handle Key Down
    const handleKeyDown = ({key}) => {
        if (!animating.current && !dragging.current) {
            if (key === 'ArrowRight') {
                setBoundedIndex(currentIndex.current + 1)                
            }

            if (key === 'ArrowLeft') {
                setBoundedIndex(currentIndex.current - 1)                
            }
        }
    }

    function animation() {
        setSliderPosition();
        if (dragging.current) requestAnimationFrame(animation);
    }

    // Handle drag start
    function handleDragStart(e) {       
        if (!animating.current) {
            dragging.current = true;
            startPos.current = e.pageX;
            animationRef.current = requestAnimationFrame(animation);
        }
        else {
            console.log("Nope - currently animating");
        }
    }

    // Handle Transition End
    function handleTransitionEnd(e) {        
    }

     // Handle drag end
     function handleDragEnd(e) {
        dragging.current = false;
        cancelAnimationFrame(animationRef.current);

        const threshold = 50;
        const movedBy = currentTranslate.current - prevTranslate.current;
        if (movedBy < -threshold) {
            setBoundedIndex(currentIndex.current += 1)            
        }
        if (movedBy > threshold) {
            setBoundedIndex(currentIndex.current -= 1)            
        }
        setPositionByIndex();

        animating.current = true;
    }

    
    // Handle drag move
    function handleDragMove(e) {
        e.preventDefault();  // Need this or IMAGE drags won't work.

        if (dragging.current) {
            const currentPosition = e.pageX;
            const newTranslate = prevTranslate.current + currentPosition - startPos.current;
            
            // if (newTranslate < 0 && newTranslate > (-dimensions.width * (slides.length-1))) {
            if (newTranslate < 0 && newTranslate > (-dimensions.width * MAX_INDEX)) {
                currentTranslate.current = prevTranslate.current + currentPosition - startPos.current;
            }

            // Handle crazy mouse clicking which loses the mouse down
            if (e.buttons === 0) {                 
                handleDragEnd(e);
                setBoundedIndex(currentIndex.current)                

                console.log("Bailing - Lost control of the mouse.");
            } 
        }
    }



    // USE LAYOUT EFFECT when setPositionByIndex is called? 
    useLayoutEffect(() => {        
        if (sliderRef.current) {
            const dims = getElementDimensions(sliderRef.current);            
            setDimensions(dims);
            setPositionByIndex(dims.width);
        }
    }, [setPositionByIndex]);


    // Handles the actual "moving" of the slides.
    function setSliderPosition() {
        if (!sliderRef.current) return;  // bail if no reference   
        
        sliderRef.current.style.transform = `translateX(${currentTranslate.current}px)`;        

        animating.current = true;
        window.setTimeout(() => {
            animating.current = false;
        }, 300);
    }


    function getElementDimensions(element) {
        const width = element.clientWidth
        const height = element.clientHeight        
        return { width, height }
    }
    
    
    return (
        <div className={styles.photoSlider} tabIndex={0} onKeyDown={handleKeyDown}>
            <div className={styles.slideViewer}>
                {/* <div ref={sliderRef} className='slide-group animating' style={{ transform: `translateX(-${index * 100}%)` }}> */}
                <div 
                    name={name}       // For End to End Testing
                    data-index={index}
                    ref={sliderRef} 
                    className={styles['slide-group'] + " " + styles['animating']} 
                    style={{ transform: `translateX(-${index * 100}%)` }}                    
                    onTransitionEnd={handleTransitionEnd}
                    onPointerDown={handleDragStart}
                    onPointerUp={handleDragEnd}
                    onPointerMove={handleDragMove}                    
                    onPointerLeave={() => {    
                        //console.log("Drag Leave");                                            
                        if (dragging.current) {
                            handleDragEnd();                            
                        }                        
                    }}
                >

                    {children}
                
                    {/* {slides.map((item, _index) => {
                        // console.log("Render Slides: ", currentIndex.current, index);
                        //let classes = 'slide flex-center hide-content';
                        //if (index === _index) classes = 'slide flex-center';

                        return (
                            <div key={_index} 
                                    // className={classes} 
                                    className={styles['slide'] + " " + styles['flex-center']} 
                                    style={{backgroundColor: item.background}}
                                    data-id={item.id}
                            > 
                                    <span>
                                        {item.text}                                        
                                    </span>
                            </div>);
                            

                            // <div key={_index} className={styles.slide}> 
                            //     {prismicH.isFilled.image(item.image) && (                    
                            //         <PrismicNextImage field={item.image} sizes="100vw" className="w-full" />                    
                            //     )}         
                            // </div>);
                    })} */}

                </div>
            </div>
        </div>
    );

}

//export default HorizontalSlider;


// LET THE LEARNING BEGIN (...continue) -> References

// 1.  React Touch Drag Slider.  Pretty good example of what I want to build.
//     https://www.npmjs.com/package/react-touch-drag-slider
//     https://github.com/bushblade/react-touch-drag-slider/tree/main/src



// 2.  Clever way to move slides on index changed.  No drag support though.
//     https://medium.com/tinyso/how-to-create-the-responsive-and-swipeable-carousel-slider-component-in-react-99f433364aa0

// 3.  Example of drag slider.  No snap to slide though.
//     https://codesandbox.io/s/j356wz6wy5?file=/src/Carousel.js

// 4.  React Draggable Slider - Open source project to check out.  Uses React Spring and GSAP
//     https://www.npmjs.com/package/react-draggable-slider

// 5.  Bear Carousel - Text content fade ins when animations finish
//     https://carousel.bearests.com/example/text-animations
//     https://github.com/imagine10255/bear-react-carousel

// 6.  useLayoutEffect
//     https://upmostly.com/tutorials/react-uselayouteffect-hook?gclid=Cj0KCQiAgribBhDkARIsAASA5bu64wv1TgvjfgbuT2-J4clO126hP7aH-gLlTcCFN4OQbZqMQQwi-4IaAnSDEALw_wcB

// 7.  will-change -> Might help with about page animations
//     https://css-tricks.com/almanac/properties/w/will-change/



