
import React, {useState} from 'react'
import { HorizontalSlider } from '../../horizontalSlider/horizontalSlider';
import NewsSlide from '../../horizontalSlider/slides/newsSlide';
import style from './newsPanel.module.css';

export default function NewsPanel({ data, news}) {

    console.log('News Panel: ', data, news);

    const [selectedIndex, setSelectedIndex] = useState(0);    

    const newsSlides = [
        {  
            postImageSrc: '', 
            postTitle: 'Festival Passes on sale now',
            postDate: 'Buy Passes',
            url: '/passes/buy',
            id: '0'
        },
        {   
            postImageSrc: '', 
            postTitle: 'More Festival Passes on sale now',
            postDate: 'More Passes',
            url: '/passes/buy',
            id: '1'
        },
        {   
            postImageSrc: '', 
            postTitle: 'All the Festival Passes on sale now',
            postDate: 'All Passes',
            url: '/passes/buy',
            id: '2'
        },
        {  
            postImageSrc: '', 
            postTitle: 'Festival Passes on sale now',
            postDate: 'Buy Passes',
            url: '/passes/buy',
            id: '3'
        },
        {   
            postImageSrc: '', 
            postTitle: 'More Festival Passes on sale now',
            postDate: 'More Passes',
            url: '/passes/buy',
            id: '4'
        },
        {   
            postImageSrc: '', 
            postTitle: 'All the Festival Passes on sale now',
            postDate: 'All Passes',
            url: '/passes/buy',
            id: '5'
        },
       
    ];

    return (
        <section className={`${style['news-panel']}`}>
            {/* News & Community Banner */}
            <div className={`${style['news-banner']}`}>
                <h1>News & Community</h1>
            </div>

            <div className={`${style['news-content']}`}>
                {/* Slider */}
                <div className={`${style['content-body']}`}>
                    <HorizontalSlider index={selectedIndex} updateSelectedIndex={setSelectedIndex} name={'hero-slider'}>

                        {/* {newsSlides && 
                            newsSlides.map((item, slideIndex) => {
                                return <NewsSlide key={slideIndex} post={item} animating={false}></NewsSlide>
                            })
                        }   */}

                        {news &&
                            news.map((item) => {
                                return <NewsSlide key={item._id} post={item}></NewsSlide>
                            })
                        }

                    </HorizontalSlider>
                </div>

                {/* Slider Footer and Controls */}
                <div className={`${style['content-footer']}`}>
                    <button>See All News</button>
                    <div className={`${style['controls-container']}`}>
                        <div className={`${style['left-control']}`}> Left </div>
                        <div className={`${style['right-control']}`}> Right </div>
                    </div>
                </div>
            </div>


        </section>
    );
}