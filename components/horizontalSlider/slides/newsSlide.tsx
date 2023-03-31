import Link from 'next/link'
import Image from 'next/image'
import { urlForImage } from '../../../sanity/lib/sanity.image'

import styles from '../horizontalSlider.module.css'

import { format, parseISO } from 'date-fns'

// interface newsPost {
//     postImageSrc: string;
//     postDate: string;
//     postTitle: string;
//     url: string;
//     id: string;
// }

export default function NewsSlide({post, animating = false}) {    
    
    // console.log('NewsSlide: ', post); 

    const postImageSrc = post?.postImageSrc ?? '';
    let postDate = post?.dates?.publishedDate ?? '';
    const postTitle = post?.title ?? '';
    const postUrl = post?.slug ?? '';
    //const id = post?._id ?? 0;
    
    if (postDate != '') {
        //console.log('Post Date: ', postDate);
        postDate = format(parseISO(postDate), 'LLLL d, yyyy')
        //console.log('Formatted Date: ', postDate);
    }

    // const border = (animating) ? '1px solid green' : '1px solid blue';
    
    function handleClick(e) {        
        console.log('handleClick: ', animating);
    }

    return(
        <article className={styles['news-slide']}>            
            <Link href={`/news/${postUrl}`} className={`${styles['post-link']}`} onClick={handleClick}>
                
                {/* IMAGE */}
                <div className={styles['post-image']}>
                    <Image
                        src={
                        post?.coverImage?.asset?._ref
                            ? urlForImage(post?.coverImage).fit('crop').url()
                            : ''
                        }
                        fill={true}
                        className="object-cover"                             
                        alt={(post?.coverImageAlt) ? post.coverImageAlt : 'Missing Alt Text'}
                    />
                </div>

                {/* DATE */}
                <div className={styles['post-date']}>
                    <span>{postDate}</span>
                </div>
            
                {/* TITLE */}
                <div className={styles['post-title']}>
                    <h2>{postTitle}</h2>
                </div>

            </Link>
        </article>
    ); 
}