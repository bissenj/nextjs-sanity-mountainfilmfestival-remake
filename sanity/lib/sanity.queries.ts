import { groq } from 'next-sanity'

export const homePageQuery = groq`
*[_type == "page"][0]{
    _id,     
    overview,     
    title, 
    sections[]->{
      type,
      title
    },
    body[] {
      children[0]->{
        text
      }
    },
  }
`