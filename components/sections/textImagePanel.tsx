

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
            <div className='contentPanel'>
                { data.headerText && 
                  <div className='heading'>{data.headerText}</div>
                }
                { data.bodyText && 
                  <div>{data.bodyText}</div>
                }
                { data.buttonText && 
                  <a href='/' className='button hollow' style={{width:'fit-content'}}>{data.buttonText}</a>
                }
            </div>

            {/* Image */}
            <div className='imagePanel'>
                {/* <div style={{width: '100%', height: '100%', border: '1px solid #777'}}></div> */}
            </div>
        </div>
    );
}