/* eslint-disable simple-import-sort/imports */
import Image from 'next/image'
import { urlForImage } from '../../../sanity/lib/sanity.image'

interface TextImagePanel {
    textOnLeft: boolean;
    headerText: string;
    bodyText: string;
    buttonText: string;
    image: any;
}

export default function TextImagePanel({ data }) {
    const { image, altText } = data;

    
    let textOnLeft = data.textOnLeft ? '' : 'left';
    console.log('Text Location: ', textOnLeft);

    function handleMouseOver(e) {
      console.log('handleMouseOver(): ', e.target);
      e.target.classList.add('active');

    }

    return (
        <div className={`textImagePanel ${textOnLeft} gap-12 p-10`} onMouseOver={handleMouseOver}>
            {/* Text */}
            <div className='contentPanel'>
                { data.headerText && 
                  <div className='heading'>{data.headerText}</div>
                }
                { data.bodyText && 
                  <div>{data.bodyText}</div>
                }
                { data.buttonText && 
                  <a href='/' className='button hollow' style={{width:'fit-content'}}>{data.buttonText}</a>
                }
            </div>

            {/* Image */}
            <div className='imagePanel'>
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
            </div>
        </div>
    );
}