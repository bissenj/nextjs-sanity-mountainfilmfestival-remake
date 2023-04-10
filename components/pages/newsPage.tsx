/* eslint-disable simple-import-sort/imports */
import React, { useState, useRef } from 'react';

import Head from 'next/head';


import Header from '../header';

import Sidebar from '../sidebar/sidebar';
import SiteMenu from '../siteMenu/siteMenu';
import Footer from '../footer/footer';

import NewsPanel from '../sections/newsPanel/newsPanel';
import NewsSlide from '../horizontalSlider/slides/newsSlide'


export default function NewsPage({ data, news = null }) {
    
    const { siteMenu, footer } = data;

    const hasPosts = news?.length > 0;
        
    console.log('News Page: ', data, news);
    //console.log('Sections: ', sections);

    // This renders out each section as it's own custom component.
    function panelFactory(section, news, id) {
        if (section == null) {
            return;
        }

        //console.log('panelFactory: ', section, news);
        switch(section.type) {
            // case 1:
            //     return <Header key={id} data={section}></Header>
            // // case 2:
            // //     return <Footer key={id} data={section}></Footer>
            // case 3:
            //     return <TextImagePanel key={id} data={section}></TextImagePanel>
            // case 4:
            //     return <SingleImageBannerPanel key={id} data={section}></SingleImageBannerPanel>
            // case 5:
            //     return <ImageImagePanel key={id} data={section}></ImageImagePanel>
            // case 6:
            //     return <QuotePanel key={id} data={section}></QuotePanel>
            // case 7:
            //     return <NewsPanel key={id} data={section} news={news}></NewsPanel>
            // default:
            //     return <div key={id}>{section.title}</div>
        }
    }

    return (
        <>
            <Head>
                <title>News | Mountainfilm Festival</title>        
            </Head>

            <div className='page'>
                
                {siteMenu && 
                    <SiteMenu data={siteMenu}></SiteMenu>
                }
                <Sidebar></Sidebar>

                
                {/* <div className='container m-auto p-10'> */}
                <div className='content-wrapper'>                

                    { hasPosts &&

                        <div className='grid grid-cols-3 gap-y-20'>
                            
                            {news.map((post) => (             
                                <NewsSlide key={post._id} post={post}></NewsSlide>              
                            ))}  

                        </div> 
                       
                    }

                    { !hasPosts &&
                        <p>There are no posts.  Create one -here-</p>
                    }
                
                </div>


                {/* Hack so sidebar floats into footer */}
                <div></div>

                
                {footer &&
                    <Footer data={footer}></Footer>
                }                
                
            </div>
        </>
    );
}