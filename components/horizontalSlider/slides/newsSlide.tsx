import styles from '../horizontalSlider.module.css'

interface newsPost {
    postImageSrc: string;
    postDate: string;
    postTitle: string;
    url: string;
    id: string;
}

export default function NewsSlide({post, animating = false} : { post: newsPost, animating: boolean }) {    
    
    //console.log('NewsSlide: ', post); 

    const postImageSrc = post?.postImageSrc ?? '';
    const postDate = post?.postDate ?? '';
    const postTitle = post?.postTitle ?? '';
    const postUrl = post?.url ?? '';
    const id = post?.id ?? 0;

    const border = (animating) ? '1px solid green' : '1px solid blue';
    
    function handleClick(e) {        
        console.log('handleClick: ', animating);
    }

    return(
        <article key={id} className={styles['news-slide']} style={{border: `${border}`}}>            
            <a href={postUrl} className={`${styles['post-link']}`} onClick={handleClick}>
                {/* IMAGE */}
                <div className={styles['post-image']}>
                    <img src={postImageSrc} alt='Post Image' />
                </div>

                {/* DATE */}
                <div className={styles['post-date']}>
                    <span>{postDate}</span>
                </div>
            
                {/* TITLE */}
                <div className={styles['post-title']}>
                    <h2>{postTitle}</h2>
                </div>
            </a>
        </article>
    ); 
}