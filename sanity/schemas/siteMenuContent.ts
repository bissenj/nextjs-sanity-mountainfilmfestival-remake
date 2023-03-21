import { ImageIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
    type: 'document',
    name: 'siteMenuContent',
    title: 'Menu Content',
    icon: ImageIcon,
    fields: [
      defineField({
        type: 'string',
        name: 'title',
        title: 'Title',
        validation: (rule) => rule.required(),
      }), 
      defineField({
        type: 'object',
        name: 'cta',
        title: 'Call To Action',
        fields: [          
          defineField({
            type: 'string',
            name: 'heading',
            title: 'Heading',                
          }), 
          defineField({
            type: 'string',
            name: 'details',
            title: 'Details (Link Text)',                
          }), 
          defineField({
            type: 'string',
            name: 'url',
            title: 'Url (Link)',                
          }), 
          defineField({
            type: 'string',
            name: 'classes',
            title: 'blue, green, yellow, or red',  
            initialValue: 'blue'
          }), 
        ]
      }),    
      defineField({
        type: 'array',
        name: 'contentLists',
        title: 'Menu Lists',
        description:
          "One to Three Menu Lists",
        of: [          
          defineArrayMember({
            type: 'object',
            name: 'linkList',
            title: 'Menu Items',
            fields: [
              defineField({
                type: 'string',
                name: 'title',
                title: 'Title',                
              }), 
              defineField({
                type: 'string',
                name: 'classes',
                title: 'Classes',                
              }),   
              {
                type: 'array',
                name: 'menuItems',
                title: 'Menu Items',
                description:
                  "List of Links",
                of: [
                  defineArrayMember({
                    type: 'object',
                    name: 'link',
                    title: 'Menu Link',
                    icon: ImageIcon,
                    fields: [
                      defineField({
                        type: 'string',
                        name: 'title',
                        title: 'Title',                    
                      }),
                      defineField({
                        type: 'string',
                        name: 'url',
                        title: 'Link',                    
                      }),
                    ]
                  }),      
                ]
              }
            ]
          }),
        ]
      }
    )
  ]
})