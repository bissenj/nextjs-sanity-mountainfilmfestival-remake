import style from './siteMenuContent.module.css';

interface  MenuItem {
    title: string;
    url: string;
}
interface MenuList {
    title: string,
    menuItems: [];
}

export default function SiteMenuContent({ visible, content }) {
    console.log('Site Menu Content: ', visible, content);
    
    const visibleClass = (visible ? 'active' : '');

    return(        
        <div id="siteMenuContents" data-testid="site-menu-contents" className={`${style['site-menu-content']} ${style[visibleClass]}`}>
        
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