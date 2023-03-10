

interface TextImagePanel {
    textOnLeft: boolean;
    headerText: string;
    bodyText: string;
    buttonText: string;
    image: any;
}

export default function TextImagePanel({ data }) {
    return (
        <div className='textImagePanel grid grid-cols-2 gap-12 p-10'>
            {/* Text */}
            <div className='flex flex-col'>
                { data.headerText && 
                  <div className='text-2xl'>{data.headerText}</div>
                }
                { data.bodyText && 
                  <div>{data.bodyText}</div>
                }
                { data.buttonText && 
                  <a href='/' className='border border-indigo-500 rounded-lg p-2 bg-purple-200' style={{width:'fit-content'}}>{data.buttonText}</a>
                }
            </div>

            {/* Image */}
            <div>
                This is the image!
            </div>
        </div>
    );
}