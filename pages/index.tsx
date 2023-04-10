/* eslint-disable simple-import-sort/imports */
import { GetStaticProps } from 'next'
import SectionedPage from '../components/pages/sectionedPage'
import { getHomePage, getNewsFeed } from '../sanity/lib/sanity.client'


export default function IndexPage(props) {
  const { data, news } = props;
  
  const pageData = { sections: data , news: news }

  return (
    <>
      <SectionedPage data={data} news={news}/>
    </>
  )
}


export const getStaticProps = async (ctx) => {
  console.log('getStaticProps: ', ctx);

  const [data, news] = await Promise.all([
    getHomePage(),  
    getNewsFeed()     
  ]);

  return {
    props: {
      data,    
      news  
    },
  }
}
