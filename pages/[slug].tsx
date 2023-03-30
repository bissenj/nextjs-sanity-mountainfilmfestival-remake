// [slug].tsx

import groq from 'groq';
import { client } from '../sanity/lib/sanity.client'
import { useRouter } from 'next/router'

import Page from '../components/page'
import { getPage } from '../sanity/lib/sanity.client'


const DynamicRootPage = ({page}) => {
    const router = useRouter();


    // If the page is not yet generated, this will be displayed
    // initially until getStaticProps() finishes running.
    // https://nextjs.org/docs/api-reference/data-fetching/get-static-paths#fallback-blocking
    if (router.isFallback) {
      return <div>Loading...</div>
    }

  //const { title = 'Missing title', name = 'Missing name', categories, authorImage, body = [] } = post

  const { title = 'Missing title' } = page;


  return (
    <>
      <Page data={page} />
    </>
  )
}


// Get pages from Sanity.io
export async function getStaticPaths() {
  //console.log('getStaticPaths: ');

  try {
    const paths = await client.fetch(
        // groq`*[_type == "page" && root == "news" && defined(slug.current)][].slug.current`
        groq`*[_type == "page" && defined(slug.current)][].slug.current`
    );  
    console.log('paths:', paths);  
    //const map = paths.map((slug) => ({params: {slug}}));
    
    return {
      paths: paths.map((slug) => ({params: {slug}})),
      fallback: true,      
    }

  } catch (error) {
    console.error('Error caught: ', error);
  }

  return { 
    notFound: true
  }
  
}


// const query = groq`*[_type == "page" && slug.current == $slug][0]{
//     title,
// }`

// Gets data from params (instead of using React Router) and our main query
export async function getStaticProps(context) {  
  console.log('getStaticProps: ', context);

  try {
    // It's important to default the slug so that it doesn't return "undefined"
    const { slug = "" } = context.params;
    const page = await getPage({ slug });

    console.log('Got Page: ', page);

    if (!page || !page?.title) {
      console.log('Page is invalid - sending to 404 page');
      return { 
        notFound: true
      }
    }

    return {
      props: {
        page
      }
    }
  } catch (error) {
    console.error('Error caught: ', error);    
  }

  return { 
    notFound: true
  }

}

export default DynamicRootPage

