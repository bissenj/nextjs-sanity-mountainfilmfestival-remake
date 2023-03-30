import { ImageIcon } from '@sanity/icons'
import { defineField, defineType, defineArrayMember } from 'sanity'


export default defineType({
    type: 'object',
    name: 'ctaButton',
    title: 'CTA Button',
    icon: ImageIcon,
    fields: [
      defineField({
        type: 'string',
        name: 'text',
        title: 'Text',
        validation: (rule) => rule.required(),
      }),
      defineField({
        type: 'string',
        name: 'url',
        title: 'Link (URL)',        
      }),
    ],
})