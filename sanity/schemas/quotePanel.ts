import { ImageIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'


export default defineType({
    type: 'object',
    name: 'quotePanel',
    title: 'Quote Panel',
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
        initialValue: 6,
        validation: (rule) => rule.required().custom(index => {
            if (typeof index === 'undefined') {
                return true;
            }
            return index != 6 ? 'Index must be 6' : true 
        }).warning(),        
      }),      
      defineField({
        type: 'text',
        name: 'quote',
        title: 'Quote',                    
      }),      
      defineField({
        type: 'string',
        name: 'author',
        title: 'Author',                    
      }),        
    ]
})