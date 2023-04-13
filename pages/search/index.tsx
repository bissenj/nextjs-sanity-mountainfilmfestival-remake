/* eslint-disable simple-import-sort/imports */
import { GetStaticProps } from 'next'

// Data from Sanity
import { getNews, getPage } from '../../sanity/lib/sanity.client'

// Rendering
import SearchPage from '../../components/pages/searchPage'



// --------------------------------------------------------------------------
// REACT - JSX
// --------------------------------------------------------------------------

export default function SearchIndexPage(props) {
  const { data } = props;

  console.log('SearchIndexPage: ', props);
  
  return (
    <>
      <SearchPage data={data} />
    </>
  )
}


// --------------------------------------------------------------------------
// NEXTJS PAGE RENDERING 
// --------------------------------------------------------------------------


export const getStaticProps = async (context) => {  

    try {
        const [data] = await Promise.all([    
            getPage({slug:'search'}),
            // getPage({slug:'news'}),
            // getNews()     
        ])
        .catch((ex) => {
          throw Error('No page data was found');
        })  

        // Make sure that page data was found.
        if (Object.keys(data).length === 0 && data.constructor === Object) {          
          throw Error('No page data was found');
        }

        return {
            props: {
              data,    
              // news  
            },
        }
    }
    catch(ex) {
        console.error('getStaticProps - Exception caught: ', ex);        

        return { notFound: true }
    }   
}

