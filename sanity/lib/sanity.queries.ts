import { groq } from 'next-sanity'

export const homePageQuery = groq`
*[_type == "page"][0]{
  "id": _id,     
  overview,     
  title, 
  sections[]->{
    _type == 'textImagePanel' => {
      headerText,
      bodyText,
      buttonText
    },
    "id": _id,
    type,
    title,      
  },       
}
`