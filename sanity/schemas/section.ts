import { BlockElementIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'


export default defineType({
    type: 'document',
    name: 'section',
    title: 'Section',
    icon: BlockElementIcon,
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
        title: 'Type',
        validation: (rule) => rule.required(),
      }),
    ]
})