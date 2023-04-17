
import {writeClient} from "../../sanity/lib/sanity.client";

import { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable'

interface newPost_Incoming {
  title: string;
  summary: string;
  create: Date;
}

interface newPost_Sanity {
  title: string;  
  summary: string;
  create: Date;

  slug: string;
  publish: Date;
  image: object;
  author: object;
}

// set bodyparser
export const config = {
  api: {
    bodyParser: false
  }
}

const form = formidable()

export default async (req: NextApiRequest, res: NextApiResponse) => {

  console.log('Got here');

  const data = await new Promise((resolve, reject) => {
    //const form = new formidable()

    form.parse(req, (err, fields, files) => {
    
      console.log(files);

      const file = files;

      uploadImage(file.image);
      

      // fetch(file.image.filepath)
      // .then((response) => {
      //   uploadImage(file, response);   
      // })
      
     

      if (err) reject({ err })
        resolve({ err, fields, files })
    }) 
  })

  //return the data back or just do whatever you want with it
  res.status(200).json({
    status: 'ok',
    data
  })
}

async function uploadImage(file) {
  console.log('uploadImage:', file);

    //const filepath = image.filepath;
    //console.log('filePath: ', filepath);
   
    const { mimetype, size, originalFilename } =  file;

    console.log(mimetype, size, originalFilename );

    //const buf = await new Response(file.image).arrayBuffer();
    //const buffer = Buffer.from(buf);
    //const bufferStr = JSON.stringify(file.image);
 
    await writeClient.assets.upload('image', file, { contentType: mimetype, filename: originalFilename})
    .then((image) => {
      console.log('The image was uploaded: ', image)
    })
    .catch((error) => {
      console.error('Upload failed:', error.message);
    })
  
 
}




// export default async function handler(req, res) {

//   //console.log('request: ', req);

//   // console.log(await req.formData());


//   switch (req.method) {

//     // CREATE
//     case "POST":      
//       const newPost = await JSON.parse(req.body);
//       console.log('New Post: ', newPost);




//       // req.formData().then(data => {

//         // const title = newPost.'title');
//         // const summary = newPost.get('summary');
//         // const image = newPost.get('image');

//         // console.log('Title: ', title);
//       // })

      

//       //console.log('New Post: ', newPost);

//       // Create a slug -> TODO:  check that this is unique.  If not, make it unique.
//       // const slug = {
//       //   _type: 'slug',
//       //   current: newPost.title.replace('.','').replace(/["]+/g, '').replace(/\s+/g, '-').toLowerCase()
//       // }
//       // console.log('slug: ', slug);

      
//       // Deal with the image.
//       try {


//         // const img = await fetch(newPost.image);

//         // const bytes = await img.blob();
//         // console.log('Bytes:', bytes);

//         // await writeClient.assets.upload('image', bytes, { filename: 'image' }).then((imageAsset) => { 
//         //   console.log('imageAsset:', imageAsset);
//         // });
       


//         //if (newPost.image) {

//           // fetch(newPost.image)
//           // .then(async (b) => {
//           //.then(r => r.blob())
//           //.then(async (b) => {
//             //console.log(b);

//             //b.body

//             //const url = URL.createObjectURL(b)



//           //   await writeClient.assets.upload('image', b.body instanceof ReadableStream, { contentType: b.type, filename: 'image.png'})
//           //   .then((image) => {
//           //     console.log('The image was uploaded: ', image)
//           //   })
//           //   .catch((error) => {
//           //     console.error('Upload failed:', error.message);
//           //   })

//           // });

//           //const buffer = req.read(req.readableLength);
//           // await writeClient.assets.upload('image', newPost.image)
//           // .then((image) => {
//           //   console.log('The image was uploaded: ', image)
//           // })
//           // .catch((error) => {
//           //   console.error('Upload failed:', error.message);
//           // })


//           // await writeClient.assets.upload('image', newPost.image, { filename: 'image' })
//           // .then(imageAsset => {
//           //   console.log('Image Asset: ', imageAsset);
//           // })
//         //}


//       } catch (err) {
//         console.log('error caught while uploading image', err);
//         res.status(500).json({ msg: "Error, check console" });
//         break;        
//       }   


//       //then use the Sanity client to create a new post doc
//       // try {
//       //   await writeClient
//       //     .create({
//       //       _type: "post",
//       //       title: newPost.title,
//       //       slug: slug,
//       //       summary: newPost.summary,   
//       //       dates: {
//       //         publishedDate: newPost.create
//       //       }                                 
//       //     })
//       //     .then((res) => {
//       //       console.log(`Post was created, document ID is ${res._id}`);
//       //     });

//       //   res
//       //     .status(200)
//       //     .json({ msg: `Post was created, document ID is ${res._id}` });


//       // } catch (err) {
//       //   console.error(err);
//       //   res.status(500).json({ msg: "Error, check console" });
//       // }

//       // break;
//   }

//   res.status(200).json({ msg: "Done, check console" });
// }