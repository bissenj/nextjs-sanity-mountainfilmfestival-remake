/* eslint-disable simple-import-sort/imports */
import React, { useState, useRef, useEffect } from 'react';

import Head from 'next/head';
import Sidebar from '../sidebar/sidebar';
import SiteMenu from '../siteMenu/siteMenu';
import Footer from '../footer/footer';

import NewsGrid from '../sections/newsGrid/newsGrid';

import { sectionFactory } from '../sections/sectionFactory';

// Data from Sanity
import { getSearchResults } from '../../sanity/lib/sanity.client'

// Helpers
import { isObjectEmpty } from '../../util/helpers'


export default function SearchPage({ data }) {
    const { sections, siteMenu, footer } = data;


    useEffect(() => {
        // get query params
        const params = Object.fromEntries(new URL(window.location.href).searchParams);
        

        if (isObjectEmpty(params)) {
            console.log('No search terms');
            return;
        }
        
        console.log('Search Terms are: ', params);

        // const term = params.reduce((item, cur) => {
        //     return cur + " " + item;
        // }, "");
        const term = params.q;
        // const term = 'mountain';
        
        //getSearchQuery({term:`*${term}*`}),
        
        const search = async() => {
            const results = await getSearchResults({term:`*${term}*`});
            console.log('Search Results: ', results);
        }
        search();

    }, [])
    
    return (
        <>
            <Head>
                <title>Search | Mountainfilm Festival</title>        
            </Head>

            <div className='page'>
                
                {siteMenu && 
                    <SiteMenu data={siteMenu}></SiteMenu>
                }
                <Sidebar></Sidebar>

                {sections?.map((s, index) => (
                    sectionFactory(s, null, `section-${index}`)                
                ))}


                {/* SEARCH INPUT */}
                {/* <form action='/' method='post'> */}
                <form>
                    <div className='content-wrapper'>
                        <div className="mb-6 pr-20">
                            <label htmlFor="search-box" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                SEARCH
                            </label>
                            <input type="text" id="search-box" name="q" className="w-full p-4 text-gray-900 border border-gray-300 bg-gray-50 sm:text-md dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />                        
                        </div>                    
                    </div>
                </form>

                 {/* SEARCH RESULTS */}
                 <div className='content-wrapper'>
                    <h2>SEARCH RESULTS FOR: </h2>
                </div>
                                
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