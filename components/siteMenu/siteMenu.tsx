/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable simple-import-sort/imports */
import style from './siteMenu.module.css';

export default function SiteMenu({ data }) {

    console.log('SiteMenu data: ', data);

    // This renders out each menuitem as it's own custom component.
    function menuItemFactory(menuItem) {
        switch(menuItem.type) {
            case 0:
                return <span>{ menuItem.text } </span>
            case 1:
                return <a className='button'> { menuItem.text } </a>
            // case 2:
            //     return <span>{ menuItem.text } </span>            
            default:
                return <span>{ menuItem.text } </span>
        }
    }

    return (
        <div className={`${style['site-menu']}`}>
            
            {/* Sections go here */}
            {data.menuItems.map((i) => (
              <span key={i.id}>
                { menuItemFactory(i) }    
                {/* &#x1F50E;&#xFE0E; -- Magnifying glass icon */}
              </span>  
            ))}

        </div>
    );
}