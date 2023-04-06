import { ImagesIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

/* 

  Look into this later:
  https://www.sanity.io/schemas/image-gallery-dea386ba

*/


export default defineType({
  name: 'photogallery',
  title: 'Photo Gallery',
  icon: ImagesIcon,
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
        }),
      ],
      options: {
        layout: 'grid',
      },
    }),    
  ],
})
