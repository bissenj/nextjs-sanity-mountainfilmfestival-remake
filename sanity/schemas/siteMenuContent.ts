import { ImageIcon, OlistIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
    type: 'document',
    name: 'siteMenuContent',
    title: 'Site Menu Content',
    icon: OlistIcon,
    fields: [

      // Title
      defineField({
        type: 'string',
        name: 'title',
        title: 'Title',
        validation: (rule) => rule.required(),
      }), 

      // CTA
      defineField({
        type: 'object',
        name: 'cta',
        title: 'Call To Action',
        fields: [            
          // Heading
          defineField({
            type: 'string',
            name: 'heading',
            title: 'Heading',                
          }), 

          // Details
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

          // Classes
          defineField({
            type: 'string',
            name: 'classes',
            title: 'blue, green, yellow, or red',  
            initialValue: 'blue'
          }), 
        ]
      }),   
      
      // Lists
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

              // Title
              defineField({
                type: 'string',
                name: 'title',
                title: 'Title',                
              }), 

              // Classes
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

                      // Title
                      defineField({
                        type: 'string',
                        name: 'title',
                        title: 'Title',                    
                      }),

                      // URL
                      defineField({
                        type: 'string',
                        name: 'url',
                        title: 'Link',                    
                      }),
                    ]
                  }),      
                ]
              },
            ]
          }),
        ]
      }
    )
  ]
})