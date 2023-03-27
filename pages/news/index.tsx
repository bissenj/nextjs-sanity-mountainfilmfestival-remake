/* eslint-disable simple-import-sort/imports */
import { GetStaticProps } from 'next'
import Page from '../../components/page'

// import { getNewsPage } from '../../sanity/lib/sanity.client'

import groq from 'groq';
import { client } from '../../sanity/lib/sanity.client'


export default function IndexPage(props) {
  const { data } = props;

  const hasPosts = props?.posts?.length > 0;
  return (
    <>
      <p>News Page</p>

      { hasPosts &&
        <p>Here are the most recent posts</p>
      }

      { !hasPosts &&
        <p>There are no posts.  Create one -here-</p>
      }
      
    </>
  )
}



//const query = groq`*[_type == "post" && publishedAt < now()] | order(publishedAt desc)`


export async function getStaticProps() {
    const posts = await client.fetch(groq`
      *[_type == "post" && publishedAt < now()] | order(publishedAt desc)
    `)
    return {
      props: {
        posts
      }
    }
  }