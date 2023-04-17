
/*
    References
        1.  https://blog.logrocket.com/using-filereader-api-preview-images-react/
        2.  https://stackoverflow.com/questions/73278453/uploading-image-to-sanity-io-in-react-native
*/

import { useState } from 'react';
// import {writeClient} from "../../sanity/lib/sanity.client";

import { Blob } from "buffer";
import fs from "fs";



export default function NewPostForm({}) {

    const [errMessage, setErrMessage] = useState('');
    const [imageSrc, setImgSrc] = useState(null);

    const title = 'This is the new post title.';
    const summary = 'New Post Summary.  Awesome post.  MountainfilmFest.  Watch movies in Telluride.'
    const today = new Date('03/21/2023');

    const imgMimeType = `image\/(png|jpg)`;

    async function handleImage(e) {
        if (e.target.files && e.target.files[0]) {
            
            const file = e.target.files[0];

            console.log('image: ', file);

            if (!file.type.match(imgMimeType)) {
                console.log('file type: ', file.type);
                alert('Image is the wrong type.  Please select an image that is a PNG or JPG');                
                return;
            }

            let id = 0;

            fetch('/api/image', {
                method: 'POST',
                body: file
            })
            .then((res) => {

                res.json().then((data) => {
                    console.log('response: ', data);
                    id = data.id;
                    console.log('Image Asset Id: ', id);
                })
                
            });

            
            
            // Attempt 1:  base64
            //let fileReader = new FileReader();

            // fileReader.addEventListener('load', () => {
            //     // console.log('Got result: ', fileReader.result);
            //     // setImgSrc(fileReader.result);

            //     // await writeClient.assets.upload('image', bytes, { filename: 'image' }).then((imageAsset) => { 
            //     // console.log('imageAsset:', imageAsset);
            //     // });
            // });

            // fileReader.onload = (e) => {
            //     console.log('On load')
            //     const { result }  = e.target;
            //     if (result) {
            //         console.log('got image')
            //         setImgSrc(result);
            //         console.log('Img: ', result);
            //     }
            //     else {
            //         console.log('no good')
            //     }
            // }
            //await fileReader.readAsDataURL(file);     
            
            // Attempt 2:
            //setImgSrc(file);

            // await writeClient.assets.upload('image', file, { filename: 'image' }).then((imageAsset) => { 
            //     console.log('imageAsset:', imageAsset);
            // });

        }
        else {
            console.log('No Image Found');
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setErrMessage('');

        // Upload image to sanity and get an id back.
        

        let formData = new FormData();
        let file = imageSrc;

        //let buffer = fs.readFileSync(file.filepath);
       // let blob = new Blob([buffer]);

       

        // let img = await fetch(file);
        // console.log('img: ', img);

        // formData.append('image', blob);
        // formData.append('title', title);
        // formData.append('summary', summary);
        // formData.append('create', today);

        // await fetch( '/api/post', {
        //     body: formData,
        //     method: 'POST'
        // });

        
        // await fetch('/api/post', {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         title: title,
        //         summary: summary,
        //         create: today,
        //         image: imageSrc
        //     }),
        // });
    }

    return (
        <form>

            <div className='flex flex-col justify-start content-start border m-20'>

                {/* Title */}
                <input 
                    type='text'
                    defaultValue={title}
                    placeholder='New Post'  
                    className='border m-10 p-4'              
                />


                {/* Summary */}
                <input 
                    type='text'
                    defaultValue={summary}
                    placeholder='Summary'   
                    className='border m-10 p-4'                
                />


                {/* Date */}
                {/* <input 
                    type='date'
                    defaultValue={today}
                /> */}


                {/* File Upload */}
                <input 
                    type='file'
                    accept="image/*"
                    className='border m-10 p-4'    
                    onChange={handleImage}            
                />                    


                {/* Submit */}
                <button 
                    className='border m-10 p-4 bg-gray-300'   
                    onClick={handleSubmit}
                >
                    Create
                </button>

                {/* Error Message */}
                <p>{errMessage}</p>

            </div>

        </form>

    );
}


/*
    TESTS:
        handleImage:
            1.  Upload a 'png' -> Pass
            2.  Upload a 'webp' -> Fail
*/