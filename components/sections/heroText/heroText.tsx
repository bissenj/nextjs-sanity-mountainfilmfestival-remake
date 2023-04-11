
import Link from 'next/link'
import style from './heroText.module.css';

interface iHeroText {
    title: string;
    type: number;
    settings: {
        classes: string;
        heading: string;
        details: string;
        url: string;
    }
}


export default function HeroText({data} : { data: iHeroText} )  {     
    
    console.log('HeroText: ', data);

    const {classes, heading, details, url} = data.settings;

    return(
        <div className='content-wrapper'>  
        
        <section className={`${style['hero-text-panel']} ${style[classes]}`} >

                <div className={`${style['hero-text-content']}`}>
           
                    <h1 className={`${style['hero-text-heading']}`} >
                        { heading }
                    </h1>

                    { details && 
                        <p className={`${style['hero-text-details']}`} >
                            { details }
                        </p>
                    }

                    { url && 
                        <Link  className={`${style[classes]} ${style['hero-text-link']}`}           
                            href={url}
                        >
                        </Link>
                    }
                </div>

        </section>     
        
        </div>   

    );

}