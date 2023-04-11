/* eslint-disable simple-import-sort/imports */
import React, { useState, useRef } from 'react';

import Head from 'next/head';
// import Header from '../header';

import Sidebar from '../sidebar/sidebar';
import SiteMenu from '../siteMenu/siteMenu';
import Footer from '../footer/footer';

import NewsGrid from '../sections/newsGrid/newsGrid';

import { sectionFactory } from '../sections/sectionFactory';


export default function NewsPage({ data, news = null }) {

    const { sections, siteMenu, footer } = data;
        
    //console.log('News Page: ', data, news);    
    
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

                {sections?.map((s, index) => (
                        sectionFactory(s, news, `section-${index}`)                
                ))}

                                
                {/* <div className='content-wrapper'>  
                    <NewsGrid posts={news} />
                </div> */}


                {/* Hack so sidebar floats into footer */}
                <div></div>

                
                {footer &&
                    <Footer data={footer}></Footer>
                }                
                
            </div>
        </>
    );
}