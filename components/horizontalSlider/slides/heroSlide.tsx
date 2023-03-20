import styles from '../horizontalSlider.module.css'

export default function HeroSlide({topic, heading, cta, url, id}) {
    //console.log('HeroSlide: ', topic, heading, cta, url);
    return(
        <article key={id} className={styles['slide']}>
            {topic && 
                // <div className={styles['topic'] + " " + styles['animating']}> 
                <div className={styles['topic']}> 
                    {topic} 
                </div>
            }

            {heading && 
                <div className={styles['heading']}> 
                    {heading} 
                </div>
            }

            {cta && 
                <a href={url}  className={styles['cta']}>  
                    {cta} 
                </a>
            }
        </article>
    ); 
}