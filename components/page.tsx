/* eslint-disable simple-import-sort/imports */
import React, { useState, useRef } from 'react';

import Head from 'next/head';

import Footer from './footer';
import Header from './header';
import TextImagePanel from './sections/textImagePanel/textImagePanel';
import SingleImageBannerPanel from './sections/singleImageBannerPanel/singleImageBannerPanel';
import ImageImagePanel from './sections/imageImagePanel/imageImagePanel';
import QuotePanel from './sections/quotePanel/quotePanel';
import Sidebar from './sidebar/sidebar';
import SiteMenu from './siteMenu/siteMenu';

import NewsPanel from './sections/newsPanel/newsPanel';


export default function Page({ data, news = null }) {
    // const [menuVisible, setMenuVisible] = useState(false);
    // const [selectedMenuIndex, setSelectedMenuIndex] = useState(-1);

    const { sections, siteMenu } = data;
    
    //console.log('Page: ', data);
    //console.log('Sections: ', sections);

    // This renders out each section as it's own custom component.
    function panelFactory(section, news, id) {
        if (section == null) {
            return;
        }

        //console.log('panelFactory: ', section, news);
        switch(section.type) {
            case 1:
                return <Header key={id} data={section}></Header>
            case 2:
                return <Footer key={id} data={section}></Footer>
            case 3:
                return <TextImagePanel key={id} data={section}></TextImagePanel>
            case 4:
                return <SingleImageBannerPanel key={id} data={section}></SingleImageBannerPanel>
            case 5:
                return <ImageImagePanel key={id} data={section}></ImageImagePanel>
            case 6:
                return <QuotePanel key={id} data={section}></QuotePanel>
            case 7:
                return <NewsPanel key={id} data={section} news={news}></NewsPanel>
            default:
                return <div key={id}>{section.title}</div>
        }
    }

    return (
        <>
            <Head>
                <title>Home | Mountainfilm Festival</title>        
            </Head>
            <div className='page'>
                
                {siteMenu && 
                    <SiteMenu data={siteMenu}></SiteMenu>
                }
                <Sidebar></Sidebar>

                {/* {news && 
                    <NewsPanel data={''} news={news}></NewsPanel>
                } */}

                {/* Sections go here */}
                {sections?.map((s, index) => (
                    panelFactory(s, news, `section-${index}`)                
                ))}
                

                <div style={{backgroundColor: '#000', minHeight:'70vh'}}></div>
            </div>
            <div style={{backgroundColor: '#fff', minHeight:'10vh'}}></div>
            <div style={{backgroundColor: '#000', minHeight:'40vh'}}></div>
        
        </>
    );
}