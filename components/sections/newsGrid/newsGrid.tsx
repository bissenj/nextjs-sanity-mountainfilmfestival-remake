import Link from 'next/link'
import style from './ctaPanel.module.css';

import {useState, useEffect} from 'react';

// import NewsSlide from '../../horizontalSlider/slides/newsSlide'
import NewsItem from './newsItem';

export default function NewsGrid({ posts, usePagination } : { posts : any, usePagination: boolean} ) {
    
    // Make sure there are posts available to work with.
    if (!posts) {
        return (
            <div className='content-wrapper'> 
                No Posts available.
            </div>
        )
    }

    const hasPosts = posts?.length > 0;

    const NUM_PER_PAGE = 6;
    const numPages = Math.ceil(posts?.length / NUM_PER_PAGE);

    const [visiblePosts, setVisiblePosts] = useState(posts.slice(0, 3));
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const start = currentPage * NUM_PER_PAGE;
        const end = start + NUM_PER_PAGE;
        const newPosts = posts.slice(start, end);
        setVisiblePosts(newPosts);
    }, [currentPage, posts]);       //posts was added to make eslint happy during prod build.


    console.log('NumPages: ', numPages);
    let pages = [];
    for(let i = 0; i < numPages; i++) {        
        pages.push(i+1);
    }

    console.log('Pages: ', pages);

    function handlePageClick(e) {
        const value = e.target.dataset.index - 1;                
        console.log('New Page: ', value);

        setCurrentPage(value);        
    }
    

    if (!hasPosts) {
        return <p>There are no posts.  Create one in -studio-.</p>
    }

    return (       

        <div className='content-wrapper'>

            {/* {posts?.length} / {numPages} */}

            <div className='grid grid-cols-2 md:grid-cols-3 gap-y-14'>
                
                {visiblePosts.map((post) => (             
                    <NewsItem key={post._id} post={post}></NewsItem>              
                ))}                
                
            </div> 

            {usePagination && 
                <>
                    <div style={{marginTop:'40px'}}>Pagination goes here</div>

                    <div style={{display:'flex', gap:'12px'}}>
                        {pages.map((item, index) => (
                            <span key={`page-${index}`} data-index={item} onClick={handlePageClick}>{item}</span>
                        ))}
                    </div>

                    <button onClick={() => {
                        if (currentPage > 0) {
                            setCurrentPage(currentPage - 1);
                        }
                    }}>Down</button>

                    <button onClick={() => {
                        if (currentPage < numPages - 1) {
                            setCurrentPage(currentPage + 1);
                        }
                    }}>Up</button>
                </>                
            }  

        </div>           
    );
}