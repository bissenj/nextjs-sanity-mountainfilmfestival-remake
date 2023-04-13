import { ImageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

import slideshow from './slideshow'

export default defineType({
    type: 'object',
    name: 'newsPanel',
    title: 'News Panel',
    icon: ImageIcon,
    fields: [

      // TITLE - 'News & Community'
      defineField({
        type: 'string',
        name: 'title',
        title: 'Title',
        validation: (rule) => rule.required(),
      }),

      // TYPE - 7
      defineField({        
        type: 'number',
        name: 'type',
        title: 'Type Index - 7',
        initialValue: 7,
        validation: (rule) => rule.required().custom(index => {
            if (typeof index === 'undefined') {
                return true;
            }
            return index != 7 ? 'Index must be 7' : true 
        }).warning(),        
      }),
      
      // CTA Button
      defineField({
        type: 'ctaButton',
        name: 'ctaButton',
        title: 'CTA Button',        
      }),           
    ]
})