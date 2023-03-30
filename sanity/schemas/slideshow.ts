import { ImageIcon } from '@sanity/icons'
import { defineField, defineType, defineArrayMember } from 'sanity'


export default defineType({
    type: 'document',
    name: 'Slideshow',
    title: 'Slideshows',
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
        name: 'slides',
        title: 'Slides',
        description:
          "All the slides",
        of: [          
            defineField({
                type: 'object',
                name: 'slide',
                title: 'Slide',
                description: 'Individual Slide',
                fields: [         
                  // TITLE - 'Festival Passes on sale now'
                  defineField({   
                    type: 'string',
                    name: 'title',
                    title: 'Title',                
                  }), 
                  // TOPIC - 'Mountainfilm 2023 Passes'
                  defineField({
                    type: 'string',
                    name: 'topic',
                    title: 'Topic',                
                  }), 
                  // CTA - 'Buy Passes'
                  defineField({
                    type: 'string',
                    name: 'cta',
                    title: 'CTA Text',                
                  }), 
                  // URL - '/passes/buy'
                  defineField({
                    type: 'string',
                    name: 'url',
                    title: 'Url',                
                  }),                                 
                ]
            }) 
        ]
    })
    ]
})