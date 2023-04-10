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

    //console.log('SingleImageBannerPanel: ', data);

    const image = data?.image ?? null;
    const altText = data?.altText ?? null;
    
    // const slides = [{id: 1, text: "This is Slide 1", background: "#FFCF47"}, {id: 2, text: "Slide 2", background: "#7ADCEF"}, {id: 3, text: "3rd Slide", background: "#a78df5" }, {id:4, text:"Last Slide.  4", background: "#ff8686"}];
    // const heroSlides = [
    //     {
    //         topic: 'Mountainfilm 2023 Passes',
    //         heading: 'Festival Passes on sale now',
    //         cta: 'Buy Passes',
    //         url: '/passes/buy'
    //     },
    //     {
    //         topic: 'Host a Tour Stop',
    //         heading: 'Bring Mountainfilm to your community!',
    //         cta: 'Learn More',
    //         url: '/tour/host-mountainfilm-on-tour'
    //     },
    //     {
    //         topic: '',
    //         heading: 'Mountainfilm: Outsides Best U.S. Outdoor Festivals',
    //         cta: 'Read the article!',
    //         url: 'https://www.outsideonline.com/adventure-travel/destinations/north-america/best-outdoor-festivals-2023/'
    //     },
    // ];

    // extract the slides if any exist.
    const hasSlideShow = data?.slideshow;
    const heroSlides = data?.slideshow?.slides;
    // const heroSlides = undefined;       // Negative testing

    // Selected index of mini-slideshow.
    const [selectedIndex, setSelectedIndex] = useState(0);

    //console.log('Hero Slides: ', heroSlides);

    return (
        <div className={`${style['container']} content-wrapper`}>

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
                    { data.ctaButton &&                         
                        <a href={data.ctaButton.url} className={`${style['button-link']} button`}>
                            {data.ctaButton.text}
                        </a>
                    }
                </div>

            </div>

            {/* Slider */}
            { hasSlideShow && 
                <div id='slideContainer' className={`${style['slider-container']}`}>   
                    <div className={`${style['slider-inner']}`}>     
                        
                        <HorizontalSlider index={selectedIndex} updateSelectedIndex={setSelectedIndex} name={'hero-slider'}>                    

                            {heroSlides && 
                                heroSlides.map((item, slideIndex) => {
                                    return <HeroSlide key={item._key} topic={item.topic} heading={item.title} cta={item.cta} url={item.url} id={`slide-${slideIndex}`}></HeroSlide>
                                })
                            }    
                            {!heroSlides &&                         
                                <HeroSlide key={0} topic={'Oops!'} heading={`Hey!  We're missing some slides here!`} cta={'Fix in Studio'} url={'/studio'} id={`slide-0`}></HeroSlide>
                            }
                        
                        </HorizontalSlider>                    
                    
                        <div style={{position: 'relative', top: '-10px', margin: '0 auto', width: '200px'}}>     
                            <ControlGrid quantity={heroSlides?.length} index={selectedIndex} updateSelectedIndex={setSelectedIndex} forwardBackControls={true} />
                        </div>
                    
                    </div>

                </div>
            }

            {/* Color Stripe */}
            <div className={`${style['color-stripe']}`}></div>

        </div>
    );
}