/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable simple-import-sort/imports */
import React, { useState, useRef } from 'react';

import style from './siteMenu.module.css';
import SiteMenuContent from './siteMenuContent';


export default function SiteMenu({ data }) {

    const [menuVisible, setMenuVisible] = useState(false);
    const [selectedMenuIndex, setSelectedMenuIndex] = useState(-1);

    // ------------------------------------------------------------------------
    // Opens and Closes the Site Menu Content element depending on 
    // if it is already visible and if the selected menu item is changing.
    // ------------------------------------------------------------------------
    function handleClick(e) {          

        if (e.target) {
            const index = e.target.parentElement.dataset.index;

            // Don't do anything if we can't get the index.
            if (!index) {
                return;
            }
            
            // Always open the menu if it is not visible
            if (!menuVisible) {
                setMenuVisible(true);
            }        
            
            // Clicking on the same menu item -> Close menu
            if (index == selectedMenuIndex) {                
                setMenuVisible(false);   
                setTimeout(() => {
                    setSelectedMenuIndex(-1);
                }, 500)
                
            }
            // Clicking on a different menu item -> Set new item as selected
            else {                
                setSelectedMenuIndex(index);
            }                      
        }              
    }

    //console.log('SiteMenu: ', selectedMenuIndex);

    // This renders out each menu item as it's own custom component.
    function menuItemFactory(menuItem, index) {
        const activeClass = (index == selectedMenuIndex) ? 'active' : '';
        // console.log(menuItem.text, activeClass, menuItem);

        switch(menuItem.type) {
            case 0:
                return <button name={ menuItem.text } className={`site-menu-item ${activeClass}`} onClick={handleClick}>{ menuItem.text } </button>
            case 1:
                return <a className={`button ${menuItem.classes}`}> { menuItem.text } </a>
            // case 2:
            //     return <span>{ menuItem.text } </span>            
            default:
                return <span>{ menuItem.text } </span>
        }
    }

    return (
        <div className={`${style['site-menu-container']}`}>
            <nav className={`${style['site-menu']}`}>
                    
                {data.menuItems.map((i, index) => (
                <div key={`menuitem-${index}`} data-index={index}>
                    { menuItemFactory(i, index) }    
                    {/* &#x1F50E;&#xFE0E; -- Magnifying glass icon */}
                </div>  
                ))}           

            </nav>

            <SiteMenuContent visible={menuVisible} content={data.menuItems[selectedMenuIndex]}></SiteMenuContent>
        </div>
    );
}