import { ImageIcon, OlistIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
    type: 'document',
    name: 'heroText',
    title: 'Hero Text',
    icon: OlistIcon,
    fields: [

      // TITLE
      defineField({
        type: 'string',
        name: 'title',
        title: 'Title',
        validation: (rule) => rule.required(),
      }), 

      // TYPE
      defineField({        
        type: 'number',
        name: 'type',
        title: 'Type Index - 8',
        initialValue: 8,
        validation: (rule) => rule.required().custom(index => {
            if (typeof index === 'undefined') {
                return true;
            }
            return index != 8 ? 'Index must be 8' : true 
        }).warning(),        
      }),  

      // CTA
      defineField({
        type: 'object',
        name: 'settings',
        title: 'Settings',
        fields: [   

          // HEADING
          defineField({
            type: 'string',
            name: 'heading',
            title: 'Heading',                
          }), 

          // DETAILS
          defineField({
            type: 'string',
            name: 'details',
            title: 'Details (Link Text)',                
          }), 

          // URL
          defineField({
            type: 'string',
            name: 'url',
            title: 'Url (Link)',                
          }), 

          // CLASSES
          defineField({
            type: 'string',
            name: 'classes',
            title: 'blue, green, yellow, or red',  
            initialValue: 'blue'
          }), 
        ]
      }),   
  ]
})