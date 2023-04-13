import { EllipsisHorizontalIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

import siteMenuItem from './siteMenuItem'


export default defineType({
    type: 'document',
    name: 'siteMenu',
    title: 'Site Menu',
    icon: EllipsisHorizontalIcon,
    fields: [
      defineField({
        type: 'string',
        name: 'title',
        title: 'Title',
        validation: (rule) => rule.required(),
      }),      
      defineField({
        type: 'array',
        name: 'menuItems',
        title: 'Menu Items',
        description:
          "All the Menu Items",
        of: [          
          defineArrayMember({
            type: 'siteMenuItem',
            name: 'siteMenuItem',
            title: 'Site Menu Item'
            // to: [{ type: siteMenuItem.name }],
          }),
        ]
      }
    )
  ]
})