import { ImageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

import slideshow from './slideshow'

export default defineType({
    type: 'object',
    name: 'newsGrid',
    title: 'News Grid',
    icon: ImageIcon,
    fields: [

      // TITLE - 'News Grid'
      defineField({
        type: 'string',
        name: 'title',
        title: 'Title',
        initialValue: 'News Grid',
        validation: (rule) => rule.required(),
      }),

      // TYPE - 9
      defineField({        
        type: 'number',
        name: 'type',
        title: 'Type Index - 9',
        initialValue: 9,
        validation: (rule) => rule.required().custom(index => {
            if (typeof index === 'undefined') {
                return true;
            }
            return index != 9 ? 'Index must be 9' : true 
        }).warning(),        
      }),
      
      // CTA Button
      defineField({
        type: 'boolean',
        name: 'usePagination',
        title: 'Break results into multiple pages?',        
      }),           
    ]
})