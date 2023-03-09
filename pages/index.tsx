/* eslint-disable simple-import-sort/imports */
import { GetStaticProps } from 'next'
import Page from '../components/page'
import { getHomePage } from '../sanity/lib/sanity.client'


export default function IndexPage(props) {
  const { data } = props;

  return (
    <>
      <Page data={data} />
    </>
  )
}


export const getStaticProps = async (ctx) => {
  //const { preview = false, previewData = {} } = ctx

  const [data] = await Promise.all([
    getHomePage()
  ]);

  return {
    props: {
      data,      
    },
  }
}
