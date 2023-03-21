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
      classes,
      siteContent->{
        cta,
        'lists': contentLists[]{
          "id": _key,
          title,
          classes,
          menuItems[]{
            "id": _key,
            title,
            url
          }
        }
      }
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
    _type == 'imageImagePanel' => {      
      imageList[]{
        "id": _key,
        image,
        altText,
        heading,
        details,           
        url,
        classes
      }
    },
    _type == 'quotePanel' => {  
      "id": _key,
      quote,
      author        
    },
    "id": _id,
    type,
    title,      
  },       
}
`