import PostHeader from "./PostHeader"
import PostBody from "./PostBody"

export default function PostPage({post}) {

    const headerData = {
        title: post?.title ?? '',
        coverImage: post?.coverImage ?? null,
        coverImageAlt: post?.coverImageAlt ?? '',
        publishedDate: post?.dates?.publishedDate ?? null
    }

    const contentData = post?.content
    

    return(
        <article>            
            <PostHeader data={headerData}></PostHeader>
            <PostBody data={contentData}></PostBody>
        </article>                
    )
}