import { ImageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'


export default defineType({
    type: 'document',
    name: 'singleImageBannerPanel',
    title: 'Single Image Banner Panel',
    icon: ImageIcon,
    fields: [
      defineField({
        type: 'string',
        name: 'title',
        title: 'Title',
        validation: (rule) => rule.required(),
      }),
      defineField({        
        type: 'number',
        name: 'type',
        title: 'Type Index',
        initialValue: 4,
        validation: (rule) => rule.required().custom(index => {
            if (typeof index === 'undefined') {
                return true;
            }
            return index != 4 ? 'Index must be 4' : true 
        }).warning(),
        // Create a custom validation rule, eventually.
        // https://www.sanity.io/answers/what-is-the-best-way-to-validate-that-e-g-p1600678009120400
      }),
      defineField({
        type: 'string',
        name: 'headerText',
        title: 'Heading',        
      }),
      defineField({
        type: 'string',
        name: 'bodyText',
        title: 'Body',        
      }),
      defineField({
        type: 'string',
        name: 'buttonText',
        title: 'Button Text',        
      }),        
      defineField({
        type: 'image',
        name: 'image',
        title: 'Select an Image',
      }),
      defineField({
        type: 'string',
        name: 'altText',
        title: 'Describe the image (alt text for the visually impaired).',
      })    
    ]
})