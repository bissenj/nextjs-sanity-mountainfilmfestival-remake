import React, {useState} from 'react'
import { HorizontalSlider } from '../../horizontalSlider/horizontalSlider';
import NewsSlide from '../../horizontalSlider/slides/newsSlide';
import style from './newsPanel.module.css';
import Link from 'next/link'

export default function NewsPanel({ data, news }) {

    //console.log('News Panel: ', data, news);

    const [selectedIndex, setSelectedIndex] = useState(0);    
    const [maxIndex, setMaxIndex] = useState(0);    

    function handleIndexChange(direction) {
        console.log('handleIndexChange: ', direction);
        let newIndex = selectedIndex + direction;
        
        if (newIndex > maxIndex) {
            newIndex = maxIndex;
        }

        if (newIndex < 0) {
            newIndex = 0;
        }

        setSelectedIndex(newIndex);
    }
    
    return (
        <section className={`${style['news-panel']}`}>
            {/* News & Community Banner */}
            <div className={`${style['news-banner']}`}>
                <h1>News & Community</h1>
            </div>

            <div className={`${style['news-content']}`}>
                {/* Slider */}
                <div className={`${style['content-body']}`}>
                    <HorizontalSlider index={selectedIndex} updateSelectedIndex={setSelectedIndex} setMaxIndex={setMaxIndex} name={'hero-slider'}>

                        {news &&
                            news.map((item, index) => {
                                return <NewsSlide key={`post-${index}`} post={item}></NewsSlide>
                            })
                        }

                    </HorizontalSlider>
                </div>

                {/* Slider Footer and Controls */}
                <div className={`${style['content-footer']}`}>
                    <Link href={`/news`} className={`${style['post-link']}`}>
                        See All News
                    </Link>

                    <div className={`${style['controls-container']}`}>
                        <button 
                            className={`${style['left-control']}`}
                            onClick={() => handleIndexChange(-1)}
                        > 
                            Left 
                        </button>
                        <button 
                            className={`${style['right-control']}`}
                            onClick={() => handleIndexChange(1)}
                        > 
                            Right 
                        </button>
                    </div>
                </div>
            </div>


        </section>
    );
}