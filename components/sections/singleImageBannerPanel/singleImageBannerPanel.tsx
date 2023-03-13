/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable simple-import-sort/imports */
import Image from 'next/image'
import { urlForImage } from '../../../sanity/lib/sanity.image'
import style from './singleImageBannerPanel.module.css';

export default function SingleImageBannerPanel({ data }) {
    const image = data?.image ?? null;
    const altText = data?.altText ?? null;

    return (
        <div className={`${style['container']}`}>

            {/* Background */}
            <div className={`${style['image-wrapper']}`}>

                {/* Image */}
                { image &&                     
                    <Image
                        src={
                        image?.asset?._ref
                            ? urlForImage(image).fit('crop').url()
                            : ''
                        }
                        fill={true}                        
                        className="object-cover"                             
                        alt={altText}
                    />                    
                }

            </div>

            {/* Text */}
            <div className={`${style['content-container']}`}>

                <div className='contentPanel'>
                    { data.headerText && 
                        <div className='heading white'>{data.headerText}</div>
                    }
                    { data.bodyText && 
                        <div className='white'>{data.bodyText}</div>
                    }
                    { data.buttonText &&                         
                        <a href='/' className={`${style['button-link']} button`}>
                            {data.buttonText}
                        </a>
                    }
                </div>

            </div>

            {/* Slider */}
            <div className={`${style['slider-container']}`}>
                
            </div>

            {/* Color Stripe */}
            <div className={`${style['color-stripe']}`}>
            </div>

        </div>
    );
}