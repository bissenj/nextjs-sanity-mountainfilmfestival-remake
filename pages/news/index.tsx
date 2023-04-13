/* eslint-disable simple-import-sort/imports */
import { GetStaticProps } from 'next'

// Data from Sanity
import { getNews, getPage } from '../../sanity/lib/sanity.client'

// Rendering
import NewsPage from '../../components/pages/newsPage'



// --------------------------------------------------------------------------
// REACT - JSX
// --------------------------------------------------------------------------

export default function NewsIndexPage(props) {
  const { data, news } = props;
  
  return (
    <>
      <NewsPage data={data} news={news}/>
    </>
  )
}


// --------------------------------------------------------------------------
// NEXTJS PAGE RENDERING 
// --------------------------------------------------------------------------


export const getStaticProps = async (context) => {  

  const [data, news] = await Promise.all([    
    getPage({slug:'news'}),
    getNews()     
  ]);

  return {
    props: {
      data,    
      news  
    },
  }
}

