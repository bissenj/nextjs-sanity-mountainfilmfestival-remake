import { ImageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

import slideshow from './slideshow'

export default defineType({
    type: 'object',
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
        type: 'ctaButton',
        name: 'ctaButton',
        title: 'CTA Button',        
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
        type: 'Slideshow',
        name: 'slideshow',
        title: 'Slideshow',
        description: 'Slideshow for the section',        
      }),      
    ]
})