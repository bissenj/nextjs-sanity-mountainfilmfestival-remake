import style from './siteMenuContent.module.css';

export default function SiteMenuContent({ visible }) {
    console.log('Site Menu Content: ', visible);

    const visibleClass = (visible ? 'active' : '');

    return(
        <div className={`${style['site-menu-content']} ${style[visibleClass]}`}>
            Site Menu Content
        </div>
    );
}