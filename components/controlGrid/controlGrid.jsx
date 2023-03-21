import React from 'react';
//import { useState } from 'react';
// import './control-grid.css';

import styles from './controlGrid.module.css'

//https://www.robinwieruch.de/react-function-component/


export const ControlGrid = ({quantity, index, updateSelectedIndex, forwardBackControls = false}) => {
    // STATE
    //const [selectedIndex, setSelectedIndex] = useState(index);

    const MAX_INDEX = quantity - 1;
    const MIN_INDEX = 0;

    // RENDER BOXES
    const createBoxes = () => {
        let content = [];
        for (let i = 0; i < quantity; i++) {            
            if (i == index) {  
                content.push(
                    <button key={i} tabIndex={0} data-index={i} className={styles['control-box'] + " " + styles['selected']} onClick={handleClick} onKeyDown={(e) => handleKeyDown(e, i)}></button>
                )                                     
            }
            else {           
                content.push(
                    <button key={i} tabIndex={0} data-index={i} className={styles['control-box']} onClick={handleClick} onKeyDown={(e) => handleKeyDown(e, i)}></button>
                )     
            }                
        }
        return content;
    }


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

    // Handle Key Down
    const handleKeyDown = ({key}, elementIndex) => {    
        console.log('handleKeyDown: ', key, elementIndex);

        if (key === 'ArrowRight') {
            setBoundedIndex(index + 1)                
        }

        if (key === 'ArrowLeft') {
            setBoundedIndex(index - 1)                
        }      
        
        if (key === 'Enter') {            
            setBoundedIndex(elementIndex)       
        }
    }
    
    // CLICK HANDLER
    const handleClick = (e) => { 
        const newIndex = parseInt(e.target.dataset.index);        
        setBoundedIndex(newIndex);       
    }

    const handleArrowClick = (direction) => {        
        const newIndex = index + direction;
        setBoundedIndex(newIndex);       
    }



    return (
        <div name='control-grid' className={styles.controlGrid}>
            {forwardBackControls && 
                <div className='left-control' onClick={() => handleArrowClick(-1)}>  </div>
            }

            {createBoxes()} 

            {forwardBackControls && 
                <div className='right-control' onClick={() => handleArrowClick(1)}>  </div>
            }
        </div>
    );
}
