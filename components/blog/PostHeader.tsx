import Image from 'next/image'
import { urlForImage } from '../../sanity/lib/sanity.image'
import { format, parseISO } from 'date-fns'

import styles from './blog.module.css'



export default function PostHeader({data}) {

    const { title, coverImage, coverImageAlt, publishedDate } = data;

    let formattedDate = publishedDate;
    if (formattedDate != '') {        
        formattedDate = format(parseISO(formattedDate), 'LLLL d, yyyy')        
    }

    return (
        <div className={'bg-black'}>
        <div className={`${styles.fadeIn} bg-black grid grid-cols-2`} style={{position: 'relative', height:'50vh'}}>

            {/* DATE & TITLE */}
            <div className='grid items-center text-white px-20'>
            
                <div>
                    {/* DATE */}
                    <h3 className='mb-3'>               
                        {formattedDate}               
                    </h3>

                    {/* TITLE */}
                    <h1 className='text-3xl font-bold tracking-tight'>                
                        {title}                
                    </h1>
                </div>               

            </div>            

            {/* COVER IMAGE */}          
            <div className="relative col-start-2">
                <Image
                    src={
                    coverImage?.asset?._ref
                        ? urlForImage(coverImage).fit('crop').url()
                        : ''
                    }
                    fill={true}
                    className="object-cover"                             
                    alt={coverImageAlt}
                />
            </div>           

        </div>
        </div>
    )
}