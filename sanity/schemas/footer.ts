import { DocumentIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

import siteMenuContent from './siteMenuContent'

export default defineType({
    type: 'document',
    name: 'footer',
    title: 'Site Footer',
    icon: DocumentIcon,
    fields: [

      // Title
      defineField({
        type: 'string',
        name: 'title',
        title: 'Title',
        validation: (rule) => rule.required(),
      }),
           
      defineField({
        name: 'siteContent',
        title: 'Footer Content Panel and Menu', 
        type: 'reference',                
        to: [{ type: siteMenuContent.name }],       
      }),


      // DATES
      defineField({
        name: 'legal',
        title: 'Legal',
        type: 'object',
        fields: [

            // COPYRIGHT
            defineField({
                name: 'copyright',
                title: 'Copyright',
                type: 'string',                
            }),

            // LEGAL LINKS
            defineField({
              type: 'array',
              name: 'links',
              title: 'Links',
              description:
                "All the Legal Links",
              of: [ 
                defineField({
                  type: 'object',
                  name: 'links',
                  title: 'Links',
                  description: 'Individual Slide',
                  fields: [         
                    // TITLE - 'Terms & Conditions'
                    defineField({   
                      type: 'string',
                      name: 'title',
                      title: 'Title',                
                    }), 
                    // TOPIC - '/terms-conditions'
                    defineField({
                      type: 'string',
                      name: 'url',
                      title: 'Url',                
                    }), 
                  ],
                }),
              ]
            })
          ]
      }),

    ]
})