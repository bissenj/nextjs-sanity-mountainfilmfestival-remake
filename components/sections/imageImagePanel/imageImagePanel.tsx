import Image from 'next/image'
import { urlForImage } from '../../../sanity/lib/sanity.image'

import style from './imageImagePanel.module.css';

export default function ImageImagePanel({ data }) {

    //console.log('ImageImagePanel: ', data);

    const color = 'green';

    return(
        <div className={`${style['image-image-container']}`}>

            {data?.imageList.map((item, index) => (
                
                <div key={`imageitem-${index}`}>
                    {/* IMAGE */}
                    <div className={`${style['image-wrapper']}`}>
                        <Image
                            src={
                            item.image?.asset?._ref
                                ? urlForImage(item.image).fit('crop').url()
                                : ''
                            }
                            fill={true}
                            className="object-cover"                             
                            alt={item.altText}
                        />
                    </div>

                    {/* CAPTION */}
                    <div className={`${style['cta']} ${item.classes}`}>
                        <a className={`${style['cta-link']}`}>
                            <span>{item.heading}</span>
                            <span className={'hover-link'}>{item.details}</span>
                        </a>
                    </div>
                </div>

            ))}          
           
        </div>
    );
}