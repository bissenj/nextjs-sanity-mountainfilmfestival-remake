import { NextApiRequest, NextApiResponse } from 'next'
import {writeClient} from "../../sanity/lib/sanity.client";


export const config = {
    api: {
      bodyParser: false
    }
  };
  
  export default function handler( req: NextApiRequest, res: NextApiResponse)
  {
    console.log('images route');

    const buffer = req.read(req.readableLength);

    console.log('buffer: ', buffer)

    writeClient.assets.upload('image', buffer).then((imageAsset) => { 
      console.log('imageAsset:', imageAsset);

      res.status(200).json({ id: imageAsset._id });

    });
    
    
  }