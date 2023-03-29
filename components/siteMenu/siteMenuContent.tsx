import style from './siteMenuContent.module.css';
import ctaPanel from '../ctaPanel/ctaPanel';
import CTAPanel from '../ctaPanel/ctaPanel';


interface iCTAPanel {
    style: string;
    heading: string;
    details: string;
    url: string;
}

interface  MenuItem {
    title: string;
    url: string;
}
interface MenuList {
    title: string,
    menuItems: [];
}

export default function SiteMenuContent({ visible, content }) {
    //console.log('Site Menu Content: ', visible, content);
    
    const visibleClass = (visible ? 'active' : '');

    // const cta: iCTAPanel = {
    //     style: 'blue',
    //     heading: 'Bring Mountainfilm to your town',
    //     details: 'Become a host',
    //     url: '/'
    // }

    const cta: iCTAPanel = {        
        heading: content?.siteContent?.cta?.heading ?? 'Heading',
        details: content?.siteContent?.cta?.details ?? 'Details',
        url: content?.siteContent?.cta?.url ?? '/',
        style: content?.siteContent?.cta?.classes ?? 'green',
    }

    return(        
        <div id="siteMenuContents" data-testid="site-menu-contents" className={`${style['site-menu-content']} ${style[visibleClass]}`}>

            {/* CTA */}
            <CTAPanel data={cta}></CTAPanel>

            {/* Site Menu Links */}
            {content?.siteContent?.lists.map((list) => (
                <div key={list.id}>
                    <h1 className={`${list.classes}`}>{list.title}</h1>
                    <ul>                    
                        {list.menuItems.map((item) => (
                            <li key={item.id}>
                                <a href={item.url} className={'site-menu-item'}>
                                    {item.title}
                                </a>
                            </li>
                        ))}
                    </ul>                    
                </div>
            ))}        

        </div>        
    );
}