/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable simple-import-sort/imports */
import React, {useState} from 'react'
import Image from 'next/image'
import { urlForImage } from '../../../sanity/lib/sanity.image'
import style from './singleImageBannerPanel.module.css';

import { ControlGrid } from '../../controlGrid/controlGrid';
import { HorizontalSlider } from '../../horizontalSlider/horizontalSlider';
import HeroSlide from '../../horizontalSlider/slides/heroSlide';

export default function SingleImageBannerPanel({ data }) {
    const image = data?.image ?? null;
    const altText = data?.altText ?? null;
    
    const slides = [{id: 1, text: "This is Slide 1", background: "#FFCF47"}, {id: 2, text: "Slide 2", background: "#7ADCEF"}, {id: 3, text: "3rd Slide", background: "#a78df5" }, {id:4, text:"Last Slide.  4", background: "#ff8686"}];
    const heroSlides = [
        // {
        //     topic: 'Mountainfilm 2023 Passes',
        //     heading: 'Festival Passes on sale now',
        //     cta: 'Buy Passes',
        //     url: '/passes/buy'
        // },
        {
            topic: 'Host a Tour Stop',
            heading: 'Bring Mountainfilm to your community!',
            cta: 'Learn More',
            url: '/tour/host-mountainfilm-on-tour'
        },
        {
            topic: '',
            heading: 'Mountainfilm: Outsides Best U.S. Outdoor Festivals',
            cta: 'Read the article!',
            url: 'https://www.outsideonline.com/adventure-travel/destinations/north-america/best-outdoor-festivals-2023/'
        },
    ];

    const [selectedIndex, setSelectedIndex] = useState(0);

    //console.log('Hero Slides: ', heroSlides);

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
            <div id='slideContainer' className={`${style['slider-container']}`}>                
                <HorizontalSlider index={selectedIndex} updateSelectedIndex={setSelectedIndex} name={'hero-slider'}>
                    {/* <p>This is a child - 1</p>
                    <p>This is a child - 2</p>
                    <HeroSlide topic={'Topic'} heading={'Heading'} cta={'CTA'} url={'URL'} id={1} /> */}

                    {heroSlides && 
                        heroSlides.map((item, slideIndex) => {
                            return <HeroSlide key={slideIndex} topic={item.topic} heading={item.heading} cta={item.cta} url={item.url} id={`slide-${slideIndex}`}></HeroSlide>
                        })
                    }                    
                </HorizontalSlider>

                <div style={{position: 'relative', top: '-10px', margin: '0 auto', width: '200px'}}>     
                    <ControlGrid quantity={heroSlides.length} index={selectedIndex} updateSelectedIndex={setSelectedIndex} forwardBackControls={true} />
                </div>

            </div>

            {/* Color Stripe */}
            <div className={`${style['color-stripe']}`}>
            </div>

        </div>
    );
}