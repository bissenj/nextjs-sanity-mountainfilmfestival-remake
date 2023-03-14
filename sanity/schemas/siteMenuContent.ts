import { ImageIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

import siteMenuContentItem from './siteMenuContentItem'

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