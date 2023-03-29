/* eslint-disable simple-import-sort/imports */
import { GetStaticProps } from 'next'
import Page from '../../components/page'

import { getNews } from '../../sanity/lib/sanity.client'

import groq from 'groq';
import { client } from '../../sanity/lib/sanity.client'
import NewsSlide from '../../components/horizontalSlider/slides/newsSlide'


export default function IndexPage(props) {
  const { posts } = props;

  const hasPosts = props?.posts?.length > 0;
  return (
    <div className='container m-auto p-10'>
      <p>News Page</p>

      { hasPosts &&
        <div>
          <p>Here are the most recent posts</p>

          <div className='grid grid-cols-3 gap-y-20'>

            {/* News Items go here */}
            {posts.map((post) => (             
                <NewsSlide key={post._id} post={post}></NewsSlide>              
            ))}  

          </div> 
        </div>        
      }

      { !hasPosts &&
        <p>There are no posts.  Create one -here-</p>
      }
      
    </div>
  )
}



//const query = groq`*[_type == "post" && publishedAt < now()] | order(publishedAt desc)`


export async function getStaticProps() {
    // const posts = await client.fetch(groq`
    //   *[_type == "post" && publishedAt < now()] | order(publishedAt desc)
    // `)

    const posts = await getNews();

    return {
      props: {
        posts
      }
    }
  }