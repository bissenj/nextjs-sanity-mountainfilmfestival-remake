import { ImageIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

import siteMenuContent from './siteMenuContent'

export default defineType({
    type: 'object',
    name: 'siteMenuItem',
    title: 'Site Menu Item',
    icon: ImageIcon,
    fields: [
      defineField({
        name: 'title',
        type: 'string',        
        title: 'Title',
        validation: (rule) => rule.required(),
      }),      
      defineField({        
        name: 'type',
        type: 'number',       
        title: 'Type Index',
        description: '0 = normal link, 1 = CTA button',
        initialValue: 0,   // 0 = button, 1 = link
        validation: (rule) => rule.required().warning(),        
      }),
      defineField({
        name: 'classes',
        type: 'string',        
        title: 'Styles',        
      }),      
      defineField({
        name: 'siteContent',
        title: 'Content Panel', 
        type: 'reference',                
        to: [{ type: siteMenuContent.name }],       
      }),
    ]
})