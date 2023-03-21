import { ImageIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'


export default defineType({
    type: 'document',
    name: 'imageImagePanel',
    title: 'Image Image Panel',
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
        initialValue: 5,
        validation: (rule) => rule.required().custom(index => {
            if (typeof index === 'undefined') {
                return true;
            }
            return index != 5 ? 'Index must be 5' : true 
        }).warning(),
        // Create a custom validation rule, eventually.
        // https://www.sanity.io/answers/what-is-the-best-way-to-validate-that-e-g-p1600678009120400
      }),
      {
        type: 'array',
        name: 'imageList',
        title: 'Image List',
        description:
          "List of Images and Captions",
        of: [
          defineArrayMember({
            type: 'object',
            name: 'imageAndCaption',
            title: 'Image and Caption',
            icon: ImageIcon,
            fields: [
              defineField({
                type: 'string',
                name: 'title',
                title: 'Title',                    
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
              }),  
              defineField({
                type: 'string',
                name: 'heading',
                title: 'Heading',                    
              }),
              defineField({
                type: 'string',
                name: 'details',
                title: 'Details',                    
              }),
              defineField({
                type: 'string',
                name: 'url',
                title: 'Link',                    
              }),
              defineField({
                type: 'string',
                name: 'classes',
                title: 'blue, green, yellow, or red',  
                initialValue: 'blue'
              }), 
            ]
          }),      
        ]
      }
    ]
})