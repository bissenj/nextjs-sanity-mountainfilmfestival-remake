import style from './footer.module.css';

export default function Footer({data}) {
    console.log('Footer Data: ', data);
    
    const {cta, lists} = data?.siteContent;
    
    return (
        <section className={`${style['footer-container']} bg-black white`}>            

            {/* MIDDLE PANEL  */}
            <div className={`${style['main-container']}`}>

                <div>
                    <h1 className={`${style['cta-heading']} mb-4`} >{cta?.heading}</h1>
                    <p className={'mb-4'}>{cta?.details}</p>
                    <div className={`${style['newsletter-signup']}  text-black`}>
                        <input type='text' className={'text-black'} placeholder='Enter your email address...'></input>
                        <button className='light-blue text-black'>{cta?.url}</button>
                    </div>
                        
                </div>

                <div className='flex justify-end gap-10'>
                    {/* Site Menu Links */}
                    {lists.map((list, index) => (
                        <div key={`menulist-${index}`} className={`${style['site-menu-content']} footer-menu`}>
                            <h1 className={'ml-2'}>{list.title}</h1>
                            <ul>                    
                                {list.menuItems.map((item, index) => (
                                    <li key={`cta-menu-item-${index}`} className={'m-2'}>
                                        <a href={item.url} className={'site-menu-item'}>
                                            {item.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>                    
                        </div>
                    ))} 
                </div>

            </div>


            {/* LEGAL PANEL */}
            <div className={`${style['legal-container']} flex justify-between p-4 align-center`}>
                <div>
                  @{new Date().getFullYear()} {data.legal.copyright}
                </div>

                <div className={`${style['legal-links']}`}>                    
                    {data.legal.links && data.legal.links.map((item, index) => (                        
                        <a key={`legal-link-${index}`} href={item.url}>{item.title}</a>                        
                    ))}                   
                </div>
            </div>

        </section>
    )
}