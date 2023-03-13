import { groq } from 'next-sanity'

export const homePageQuery = groq`
*[_type == "page"][0]{
  "id": _id,     
  overview,     
  title, 
  slug,
  siteMenu->{    
    menuItems[]->{
      "id": _id,
      type,
      text,
      classes
    }    
  },
  sections[]->{
    _type == 'textImagePanel' => {
      textOnLeft,
      headerText,
      bodyText,
      buttonText,
      image,
      altText,
    },
    _type == 'singleImageBannerPanel' => {      
      headerText,
      bodyText,
      buttonText,
      image,
      altText,
    },
    "id": _id,
    type,
    title,      
  },       
}
`