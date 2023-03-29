import { PortableText } from '@portabletext/react'
import imageUrlBuilder from '@sanity/image-url'
import {client} from '../../sanity/lib/sanity.client'


function urlFor(source) {
    return imageUrlBuilder(client).image(source);
  }
 

const ptComponents = {
    types: {
      block: props => (
        <p style={{color: 'red'}}>{props.node.code}</p>
      ),
      image: ({ value }) => {
        if (!value?.asset?._ref) {
          return null
        }
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt={value.alt || ' '}
            loading="lazy"
            src={urlFor(value).fit('max').auto('format')}
          />
        )
      },    
    }
  }


export default function PostBody({data}) {
    console.log('PostBody: ', data);

    return(         
        <div className='post-content container mx-auto px-5 text-lg'>            
            <PortableText 
                value={data}                                 
                components={ptComponents}
            />
        </div>
    )
}