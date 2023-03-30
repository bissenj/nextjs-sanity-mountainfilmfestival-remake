/* eslint-disable simple-import-sort/imports */
import { GetStaticProps } from 'next'
import Page from '../components/page'
import { getHomePage, getNewsFeed } from '../sanity/lib/sanity.client'


export default function IndexPage(props) {
  const { data, news } = props;

  console.log('Data: ', data);
  console.log('News: ', news);

  const pageData = { sections: data , news: news }

  return (
    <>
      <Page data={data} news={news}/>
    </>
  )
}


export const getStaticProps = async (ctx) => {
  console.log('getStaticProps: ', ctx);

  //const { preview = false, previewData = {} } = ctx

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
