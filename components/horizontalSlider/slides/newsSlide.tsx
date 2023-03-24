import styles from '../horizontalSlider.module.css'

interface newsPost {
    postImageSrc: string;
    postDate: string;
    postTitle: string;
    url: string;
    id: string;
}

export default function NewsSlide({post} : { post: newsPost }) {    
    
    //console.log('NewsSlide: ', post); 

    const postImageSrc = post?.postImageSrc ?? '';
    const postDate = post?.postDate ?? '';
    const postTitle = post?.postTitle ?? '';
    const postUrl = post?.url ?? '';
    const id = post?.id ?? 0;
    

    function handleClick(e) {
        console.log('handleClick');
        // console.log('handleClick: ', animating);
        // if (animating) {
        //     e.preventDefault();
        // }
    }

    return(
        <article key={id} className={styles['news-slide']}>
            {/* <a href={postUrl} className={`${styles['post-link']} ${styles['dragstart']}`}> */}            

                {/* IMAGE */}
                <div className={styles['post-image']}>
                    <img src={postImageSrc} alt='Post Image' />
                </div>

                {/* DATE */}
                <div className={styles['post-date']}>
                    <span>{postDate}</span>
                </div>
            <a href={postUrl} className={`${styles['post-link']}`} onClick={handleClick}>
                {/* TITLE */}
                <div className={styles['post-title']}>
                    <h2>{postTitle}</h2>
                </div>
            </a>
        </article>
    ); 
}