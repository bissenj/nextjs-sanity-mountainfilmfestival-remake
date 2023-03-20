
import Link from 'next/link'
import style from './ctaPanel.module.css';

interface iCTAPanel {
    style: string;
    heading: string;
    details: string;
    url: string;
}


export default function CTAPanel({data} : { data: iCTAPanel} )  {     
    
    console.log('CTAPanel: ', data);

    return(
        
        <section className={`${style['cta-panel']} ${style[data.style]}`} >
            <Link
                className={`${style[data.style]}`}
                // className={`${data.style}`}
                href={data.url}
            >

                <h2 className={`${style['cta-heading']}`} >
                    { data.heading }
                </h2>

                <div className={`${style['cta-details']}`} >
                    { data.details }
                </div>

            </Link>
        </section>        

    );

}