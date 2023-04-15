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
import post from 'sanity/schemas/post';


export default function SearchPage({ data }) {
    const { sections, siteMenu, footer } = data;

    const [authors, setAuthors] = useState([]);
    const [posts, setPosts] = useState([]);    

    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // get query params
        const params = Object.fromEntries(new URL(window.location.href).searchParams);
        setSearchTerm(params?.q);
        

        if (isObjectEmpty(params)) {
            console.log('No search terms');
            return;
        }
        
        //console.log('Search Terms are: ', params);
       
        // This is the search term from the query param that the user typed in.
        const term = params.q;               
       
        search(term);

    }, [])


    const search = async(term) => {
        const results = await getSearchResults({term:`*${term}*`});
        //console.log('Search Results: ', results);

        /// Get authors
        // filter out any undefined author fields, then map over the result and pull out only the author field.
        const a = results.filter(item => typeof item.author === 'string').map(({author}) => author);                        
        let uniqueAuthors = [...new Set(a)];
        //console.log('Authors: ', uniqueAuthors);
        setAuthors(uniqueAuthors);

        /// Get Posts
        const p = results.filter(item => typeof item.slug === 'string').map((item) => { return {'title': item.title, 'url': item.slug }});
        let uniquePosts = [...new Set(p)];
        //console.log('Posts: ', uniquePosts);
        setPosts(uniquePosts);

        console.log('search done');
    }

    function handleSearch(e) {
        e.preventDefault();

        const term = e.target[0].value;

        setSearchTerm(term);
        search(term);

        // TODO
        // Update the page query param, if possible.

        console.log('handleSearch', e, term);
    }
    
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


                <div className='mx-5'>


                    {/* SEARCH INPUT */}

                    {/* <form action='/' method='post'> */}
                    <form onSubmit={handleSearch}>
                        <div className='content-wrapper'>
                            <div className="mb-6 pr-20">
                                <label htmlFor="search-box" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    SEARCH
                                </label>
                                <input 
                                    type="text" 
                                    id="search-box" 
                                    name="q" 
                                    className="w-full p-4 text-gray-900 border border-gray-300 bg-gray-50 sm:text-md dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
                                    defaultValue={searchTerm}
                                />                        
                            </div>                    
                        </div>
                    </form>


                    {/* SEARCH RESULTS */}

                    { searchTerm && 
                        <div className='content-wrapper'>
                            <div  className='text-3xl'>
                                <h2>SEARCH RESULTS FOR: <span className='bg-black white uppercase'>{searchTerm}</span></h2>                            
                            </div>

                            <div className='mt-6 text-xl'>

                                { posts && posts?.length > 0 &&
                                    <div className='post-content my-6'>
                                        <h3 className='uppercase font-semibold'>Posts</h3>
                                        <ul className='ml-3 list-disc'>
                                            {posts.map((item, index) => (
                                                <li key={`post-${index}`} className='mx-6 my-4'>
                                                    <a href={`news/${item.url}`}>{item.title}</a>
                                                </li>
                                            ))}
                                            
                                        </ul>
                                    </div>
                                }

                                { authors && authors?.length > 0 &&
                                    <div className='post-content my-6'>
                                        <h3 className='uppercase font-semibold'>Authors</h3>
                                        <ul className='ml-3 list-disc'>
                                            {authors.map((item, index) => (
                                                <li key={`author-${index}`} className='mx-6 my-4'>{item}</li>
                                            ))}
                                            
                                        </ul>
                                    </div>
                                }

                                { (posts.length == 0 && authors.length == 0) && 
                                    <p>No results found</p>
                                }

                            </div>
                        </div>
                    }

                    {

                    }

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