import { ImageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

import slideshow from './slideshow'

export default defineType({
    type: 'object',
    name: 'newsPanel',
    title: 'News Panel',
    icon: ImageIcon,
    fields: [
      // Title - 'News & Community'
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
        initialValue: 7,
        validation: (rule) => rule.required().custom(index => {
            if (typeof index === 'undefined') {
                return true;
            }
            return index != 7 ? 'Index must be 7' : true 
        }).warning(),        
      }),
      //  Button Text - 'See All News'
      defineField({
        type: 'string',
        name: 'buttonText',
        title: 'Button Text',        
      }),
      defineField({
        type: 'Slideshow',
        name: 'slideshow',
        title: 'Slideshow',
        description: 'Slideshow for the section',
        validation: (rule) => rule.required(),
      }),      
    ]
})