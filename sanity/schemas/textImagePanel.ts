import { ImageIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'


export default defineType({
    type: 'document',
    name: 'textImagePanel',
    title: 'Text Image Panel',
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
        initialValue: 3,
        validation: (rule) => rule.required().custom(index => {
            if (typeof index === 'undefined') {
                return true;
            }
            return index != 3 ? 'Index must be 3' : true 
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
        type: 'boolean',
        name: 'textOnLeft',
        title: 'Text on Left',  
        initialValue: true,      
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