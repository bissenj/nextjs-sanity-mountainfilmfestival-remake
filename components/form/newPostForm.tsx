
/*
    References
        1.  https://blog.logrocket.com/using-filereader-api-preview-images-react/
        2.  https://stackoverflow.com/questions/73278453/uploading-image-to-sanity-io-in-react-native


    Plan:
        Allow a user to submit a post programmatically using a Form and the Sanity API.  
        Two step process:
            1.  Upload the cover image and get the returned ID back.                        /api/image
            2.  Upload the form with Title, Summary, etc and link the image Id.             /api/post
*/

import { useState, useRef } from 'react';
// import {writeClient} from "../../sanity/lib/sanity.client";

export default function NewPostForm({}) {

    const [errMessage, setErrMessage] = useState('');
    const [imageSrc, setImageSrc] = useState(null);

    const fileInputRef = useRef();

    // Fake Data
    const title = 'This is the new post title.';
    const summary = 'New Post Summary.  Awesome post.  MountainfilmFest.  Watch movies in Telluride.'
    const today = new Date('03/21/2023');

    // Validation
    const imgMimeType = `image\/(png|jpg)`;


    /**
     * Called when file input changes, sets the selected image in React State (to be used later).
     */
    async function handleImage(e) {
        if (e.target.files && e.target.files[0]) {
            
            const file = e.target.files[0];

            console.log('image: ', file);

            if (!file.type.match(imgMimeType)) {
                console.log('file type: ', file.type);
                alert('Image is the wrong type.  Please select an image that is a PNG or JPG');                
                return;
            }

            setImageSrc(file);            
        }
        else {
            console.log('No Image Found');
        }
    }


    /**
     * Attempts to add a Post to the Sanity database.
     * @param e - browser event
     */
    async function handleSubmit(e) {
        e.preventDefault();
        setErrMessage('');

        let imageId = null;
        
        // If no image selected, then bail.
        // if (!imageSrc) {
        //     setErrMessage('Select an image first.');
        //     return;            
        // }
        
        // Step 1:  Upload image to sanity and get an id back. 
        // imageId = await submitImage(imageSrc);             
        // if (imageId != null) {
        //     console.log('Image Id is: ', imageId);
        // }

        imageId = 'image-b3be35555041e14f68d9a99876c9ead531790016-200x196-png';


        // Step 2:  Upload the post text
         await fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                summary: summary,
                create: today,
                imageId
            }),
        })
        .then((response)  => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response);                
        })
        .then((data) => {                
            console.log('response: ', data);            
        })  
        .catch((response) => {
            console.log(response.status, response.statusText);                
            response.json().then((json: any) => {
                console.log(json);
                const errorMessage = `Error caught while uploading post.  ${json.message}`;                
                setErrMessage(errorMessage);         
            })                  
        }); 
        ;


        // Reset stuff
        resetFields();

        // let formData = new FormData();

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


    /** Sends image to Sanity and returns the image id which was created. */
    async function submitImage(image) {
        let result = null;

        await fetch('/api/image', {
            method: 'POST',
            body: image
        })
        .then((response)  => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response);                
        })
        .then((data) => {                
            console.log('response: ', data);
            result = data.id;                
        })              
        .catch((response) => {
            console.log(response.status, response.statusText);                
            response.json().then((json: any) => {
                console.log(json);
                const errorMessage = `Error caught while uploading image.  ${json.message}`;                
                setErrMessage(errorMessage);         
            })                  
        });    

        return result;
    }


    /** Resets the Form fields after successful posting. */
    function resetFields() {
        // Clear the selected image
        setImageSrc(null);

        // Clear the file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
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
                    ref={fileInputRef}
                    type='file'
                    accept="image/*"
                    className='border m-10 p-4'    
                    onChange={handleImage}            
                />                    

                {/* Error Message */}
                <p className='text-red-500 font-semibold m-10 mb-0 mt-0'>{errMessage}</p>

                {/* Submit */}
                <button 
                    className='border m-10 p-4 bg-gray-300'   
                    onClick={handleSubmit}
                >
                    Create
                </button>               

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