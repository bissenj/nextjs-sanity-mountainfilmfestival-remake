import { groq } from 'next-sanity'


export const pageFields = groq`
  "id": _id,     
  overview,     
  title, 
  slug,
  siteMenu->{    
    menuItems[]{      
      type,
      "text": title,
      classes,
      siteContent->{
        cta,
        'lists': contentLists[]{          
          title,
          classes,
          menuItems[]{            
            title,
            url
          }
        }
      }
    }    
  },
  footer->{
    legal{
      copyright,
      links[]{
        title,
        url
      },
    },
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
  },
  sections[]{
  ...  
  },       
`


export const pageQuery = groq`*[_type == "page" && slug.current == $slug][0]{
  ${pageFields}
}`


export const newsPageQuery = groq`*[_type == "page" && slug.current == 'news'][0]{
  ${pageFields}
}`


export const homePageQuery = groq`
*[_type == "page"][0]{
  ${pageFields}
}
`

const postFields = groq`
  _id,
  title,
  dates {
    ...
  },
  summary,
  coverImage,
  "slug": slug.current,  
  content[]{ 
    _type == 'author' => {
      "name": @->.name,
      "picture": @->.picture,
    },
    _type == 'photogallery' => {
      "name": @->.name,      
      "images":@->images[]
    },   
    ... 
  }
`


export const newsQuery = groq`
*[_type == "post"] | order(date desc, dates.publishedDate desc)[] {
  content,
  ${postFields}
}
`
export const newsFeedQuery = groq`
*[_type == "post"] | order(date desc, dates.publishedDate desc) [0...12] {
  content,
  ${postFields}
}
`

export const newsArticleQuery = groq`*[_type == "post" && slug.current == $slug][0]{
  ${postFields}
}`



// SEARCH

// See slack....from Matt about using groqd to create custom queries.  Below is what we need.
// *[_type=="post" && title match '*mountain*'] {
//  title
//}
// OR
// can probably hijack the query parameters, see here:  https://www.sanity.io/docs/groq-parameters
// getSearchQuery({term:`*${term}*`}),

// export const searchQuery = groq`
// *[_type=="post" && title match $term] { title }
// `;

export const searchQuery = groq`
  *[_type=="post"][] {   
    title match $term => {
      "title": title,
      "slug": slug.current
    },
    pt::text(content) match $term => {
      "title": title,
      "slug": slug.current
    }, 
    author -> { name }.name match $term => {
      "author": author -> {name}.name,
      "title": title,
      "slug": slug.current
    }  
  }
`;

