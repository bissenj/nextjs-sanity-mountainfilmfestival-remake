
import React, {useState} from 'react'
import { HorizontalSlider } from '../../horizontalSlider/horizontalSlider';
import NewsSlide from '../../horizontalSlider/slides/newsSlide';
import style from './newsPanel.module.css';

export default function NewsPanel({ data, news }) {

    console.log('News Panel: ', data, news);

    const [selectedIndex, setSelectedIndex] = useState(0);    
    
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

                        {news &&
                            news.map((item, index) => {
                                return <NewsSlide key={`post-${index}`} post={item}></NewsSlide>
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