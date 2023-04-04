import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import styles from './horizontalSlider.module.css'



/// Test data
// const data = [{id: 1, text: "This is Slide 1", background: "#FFCF47"}, {id: 2, text: "Slide 2", background: "#7ADCEF"}, {id: 3, text: "3rd Slide", background: "#a78df5" }, {id:4, text:"Last Slide.  4", background: "#ff8686"}];

// export const HorizontalSlider = ({index, updateSelectedIndex, data}) => {
export const HorizontalSlider = ({index, updateSelectedIndex, setMaxIndex, name, children}) => {   
    const sliderRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [maxGroupIndex, setMaxGroupIndex] = useState(0);
    // const [moves, setMoves] = useState([]);
        
    // Positional variables    
    const slidesPerIndex = useRef(0);
    const windowWidth = useRef(0);

    const currentIndex = useRef(-1);
    const currentTranslate = useRef(0);
    const prevTranslate = useRef(0);
        
    // Dragging variables
    const animating = useRef(false);
    const dragging = useRef(false);
    const startPos = useRef(0);
    const animationRef = useRef(null);
    const moveCounter = useRef(0);

    // CONSTRAINT VARIABLES
    const MAX_INDEX = (children) ? children.length - 1 : 0;
    const MIN_INDEX = 0;
    //const SLIDES_PER_INDEX = 1;

    const setBoundedIndex = (newIndex) => {
        let index = newIndex;
        
        if (index > maxGroupIndex) {
            index = maxGroupIndex;
        }
        if (index < MIN_INDEX) { 
            index = MIN_INDEX;
        }
        
        updateSelectedIndex(index);
        //currentIndex.current = index;

        const obj = {
            'index': index,
            'slidersPerIndex': slidesPerIndex.current,
            'maxGroupIndex': maxGroupIndex
        }

        console.log('setBoundedIndex: ', obj);
    }


    const setPositionByIndex = useCallback((width = dimensions.width) => {    
        
        //setBoundedIndex(currentIndex.current);

        const oldX = currentTranslate.current;
        let newX = currentIndex.current * (-width * slidesPerIndex.current);
        
        if (newX < (MAX_INDEX * -width) ) {
            newX = (MAX_INDEX * -width);
        }        
        currentTranslate.current = newX;
                

        console.log('setPositionByIndex: ', currentIndex.current, oldX, newX);

        prevTranslate.current = currentTranslate.current;

        setSliderPosition();
    }, [dimensions.width]);


    // USE EFFECT when index changes
    useEffect(() => {
        console.log('useEffect - Index Change');
        if (currentIndex.current !== index) {            
            currentIndex.current = index;
            setPositionByIndex();
        }
    }, [index]);


    useEffect(() => {
        if (setMaxIndex) {
            setMaxIndex(maxGroupIndex);
        }
    }, [maxGroupIndex]);
    

    // USE EFFECT for Event Handlers
    useEffect(() => {                
        window.addEventListener('resize', handleResize);

        const width = window.innerWidth;        
        windowWidth.current = width;      // Used to determine how much screen space a slide takes up.

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


    function disableClickEvents(el) {        
        let link = findParentLink(el, 5);
        if (link.href) {           
            link.classList.add('dragstart');           
        }        
    }
    function enableClickEvents(el) {        
        const elements = el.querySelectorAll('a').forEach((el) => {
            el.classList.remove('dragstart');
        })       
    }

    function findParentLink(el, count) {
        if (el.href || count == 0) {
            return el;
        }
        return findParentLink(el.parentNode, count-1);
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

     // Handle drag end
     function handleDragEnd(e) {        
        moveCounter.current = 0;            // helps control the drag speed.  Since drag is over, reset the counter.
        
        dragging.current = false;
        cancelAnimationFrame(animationRef.current);

        const threshold = 250;
         const movedBy = currentTranslate.current - prevTranslate.current;
        if (movedBy < -threshold) {
            console.log('Move Right');
            calculateIndexFromPosition(1);        
        }
        else if (movedBy > threshold) {
            console.log('Move Left');
            calculateIndexFromPosition(-1);        
        }
        else {
            calculateIndexFromPosition(0);
            setPositionByIndex();
        }
                

        animating.current = true;

        if (e) {
            e.preventDefault();
            enableClickEvents(e.target);
        }        
    }

    function calculateIndexFromPosition(direction = 0) {
        let x = -currentTranslate.current;
        let w = dimensions.width * slidesPerIndex.current;
        let index = Math.floor(x / w);

        //let direction = (currentIndex.current > index) ? -1 : 1;  
        
        // if (x < w) {
        //     direction = 0;
        // }
        
        let newIndex = currentIndex.current + direction;

        console.log('calculateIndexFromPosition: ', index, newIndex, x, w, direction);
        
        setBoundedIndex(newIndex)   
        //setPositionByIndex(newIndex);
    }

    
    // Handle drag move
    function handleDragMove(e) {        
        e.preventDefault();  // Need this or IMAGE drags won't work.

        if (dragging.current) {

            //console.log('handleDragMove');        
            disableClickEvents(e.target);

            const currentPosition = e.pageX;
                       
            if (moveCounter.current < 10) {
                moveCounter.current = moveCounter.current + 1;
            }

            // Controls the speed of the drag.  Without this the drag speed increases the longer the drag takes place.            
            const INCREMENT = (25 - moveCounter.current);
           
            const move = (currentPosition - startPos.current) > 0 ? INCREMENT : -INCREMENT;       // Negative is right, Positive is left.
                       
                        
            const newTranslate = currentTranslate.current + move;

            startPos.current = currentPosition;
            
            // Calculate the farthest X position that the slider can be dragged to.  
            // Needs to take slide groups into effect.
            const max_pos = -dimensions.width * slidesPerIndex.current * maxGroupIndex;

            // if (newTranslate < 0 && newTranslate > (-dimensions.width * (slides.length-1))) {
            // if (newTranslate < 0 && newTranslate > ( -dimensions.width * MAX_INDEX) ) {
            if (newTranslate < 0 && newTranslate > ( max_pos ) ) {
                // currentTranslate.current = prevTranslate.current + currentPosition - startPos.current;
                currentTranslate.current = newTranslate;                
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
            console.log('useLayoutEffect');

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


    // ----------------------------------------------------------------------------------------
    // 
    // Responsible for setting:
    //  @slidesPerIndex
    //  @maxGroupIndex
    // ----------------------------------------------------------------------------------------
    function getElementDimensions(element) {
        const width = element.clientWidth
        const height = element.clientHeight   
        
        console.log('width: ', width);
        console.log('screen width: ', windowWidth.current);

        //slidesPerIndex
        // Try to get the width of a slide so when we update the slide index we only move
        // by one slide's width.
        if (element.firstChild) {
            const childElement = element.firstChild;

            let styles = window.getComputedStyle(childElement);
            let ml = styles.getPropertyValue("margin-left") 
            if (ml) { 
                ml = Number.parseInt(ml.replace("px", "")); 
            }
            else {
                ml = 0;
            }

            let mr = styles.getPropertyValue("margin-right");
            if (mr) {
                mr = Number.parseInt(mr.replace("px", ""));
            }
            else {
                mr = 0;
            }
            //console.log('Margins: ', ml, mr);
            //slideMargin.current = (ml + mr);

            // Calculate child width as width + margin.
            const childWidth = childElement.clientWidth + (ml + mr);
            const childHeight = childElement.clientHeight;
           

            console.log('childWidth: ', childWidth);

            // Calculate how many slides to show per screen.
            let d = Math.floor(windowWidth.current / childWidth);
            if (d == 0) d = 1;
            console.log('d: ', d);
            slidesPerIndex.current = d;
            const max = Math.floor(children.length / slidesPerIndex.current);
            setMaxGroupIndex(max);

            //console.log('Child Dimensions: ', childWidth, childHeight);
            return {width: childWidth, height: childHeight};
        }

        // Couldn't get slide with, so use the entire slide group.
        slidesPerIndex.current = 1;
        setMaxGroupIndex(children.length-1);
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
                    style={{ transform: `translateX(-${currentIndex.current * 100}%)` }}                    
                    //onTransitionEnd={handleTransitionEnd}
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


                    {/* {dragging.current &&                     
                        React.Children.map(children,
                            child => {
                                return React.cloneElement(child,
                                { animating: false }, null); //third parameter is null
                                // Because we are not adding any children
                            })
                        
                    }
                    {!dragging.current &&                     
                        React.Children.map(children,
                            child => {
                                return React.cloneElement(child,
                                { animating: true }, null); //third parameter is null
                                // Because we are not adding any children
                            })
                        
                    } */}

                    {/* {React.Children.map(children,
                    child => {
                        return React.cloneElement(child,
                        { animating: (dragging.current == true || animating.current == true ? true : false) }, null); //third parameter is null
                        // Because we are not adding any children
                    })} */}



                
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
