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


export default function Page({ data }) {
    // const [menuVisible, setMenuVisible] = useState(false);
    // const [selectedMenuIndex, setSelectedMenuIndex] = useState(-1);

    //console.log('Page: ', data);

    // This renders out each section as it's own custom component.
    function panelFactory(section) {
        switch(section.type) {
            case 1:
                return <Header key={section.id} data={section}></Header>
            case 2:
                return <Footer key={section.id} data={section}></Footer>
            case 3:
                return <TextImagePanel key={section.id} data={section}></TextImagePanel>
            case 4:
                return <SingleImageBannerPanel key={section.id} data={section}></SingleImageBannerPanel>
            case 5:
                return <ImageImagePanel key={section.id} data={section}></ImageImagePanel>
            case 6:
                return <QuotePanel key={section.id} data={section}></QuotePanel>
            default:
                return <div key={section.id}>{section.title}</div>
        }
    }

    return (
        <>
            <Head>
                <title>Home | Mountainfilm Festival</title>        
            </Head>
            <div className='page'>
                
                <SiteMenu data={data.siteMenu}></SiteMenu>
                <Sidebar></Sidebar>

                <NewsPanel></NewsPanel>

                {/* <SingleImageBannerPanel></SingleImageBannerPanel> */}

                {/* Sections go here */}
                {data.sections.map((s) => (
                    panelFactory(s)                
                ))}

                {/* TEST */}
                {/* <QuotePanel data={''}></QuotePanel> */}

                <div style={{backgroundColor: '#000', minHeight:'70vh'}}></div>
            </div>
            <div style={{backgroundColor: '#fff', minHeight:'10vh'}}></div>
            <div style={{backgroundColor: '#000', minHeight:'40vh'}}></div>
        
        </>
    );
}