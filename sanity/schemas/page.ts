/* eslint-disable simple-import-sort/imports */
import { DocumentIcon, ImageIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

import section from './section'
import textImagePanel from './textImagePanel'
import singleImageBannerPanel from './singleImageBannerPanel'
import imageImagePanel from './imageImagePanel'
import quotePanel from './quotePanel'
import siteMenu from './siteMenu'


export default defineType({
    type: 'document',
    name: 'page',
    title: 'Page',
    icon: DocumentIcon,
    fields: [
      defineField({
        type: 'string',
        name: 'title',
        title: 'Title',
        validation: (rule) => rule.required(),
      }),
      defineField({
        type: 'slug',
        name: 'slug',
        title: 'Slug',
        options: {
          source: 'title',
        },
        validation: (rule) => rule.required(),
      }), 
      defineField({
        type: 'string',
        name: 'root',
        title: 'Root',
        validation: (rule) => rule.required(),
        description: 'Home, News, Festival, etc',
      }),
      defineField({
        name: 'siteMenu',
        type: 'reference',
        to: [{ type: 'siteMenu' }],                
      }), 
            
      defineField({
        type: 'array',
        name: 'sections',
        title: 'Sections',
        description:
          "All the page sections",
        of: [
          // Page Sections
          defineArrayMember({
            type: 'reference',
            name: 'section',
            to: [{ type: section.name }],
          }), 
          // Page Sections
          defineArrayMember({
            type: 'reference',
            name: 'textImagePanel',
            to: [{ type: textImagePanel.name }],
          }),
          defineArrayMember({
            type: 'reference',
            name: 'singleImageBannerPanel',
            to: [{ type: singleImageBannerPanel.name }],
          }), 
          defineArrayMember({
            type: 'reference',
            name: 'imageImagePanel',
            to: [{ type: imageImagePanel.name }],
          }), 
          defineArrayMember({
            type: 'reference',
            name: 'quotePanel',
            to: [{ type: quotePanel.name }],
          }),                              
        ],
      }), 

      defineField({
        type: 'array',
        name: 'body',
        title: 'Body',
        description:
          "This is where you can write the page's content. Including custom blocks like timelines for more a more visual display of information.",
        of: [
          // Paragraphs
          defineArrayMember({
            type: 'block',
            marks: {
              annotations: [
                {
                  name: 'link',
                  type: 'object',
                  title: 'Link',
                  fields: [
                    {
                      name: 'href',
                      type: 'url',
                      title: 'Url',
                    },
                  ],
                },
              ],
            },
            styles: [],
          }),          
          defineField({
            type: 'image',
            icon: ImageIcon,
            name: 'image',
            title: 'Image',
            options: {
              hotspot: true,
            },
            preview: {
              select: {
                imageUrl: 'asset.url',
                title: 'caption',
              },
            },
            fields: [
              defineField({
                title: 'Caption',
                name: 'caption',
                type: 'string',
              }),
              defineField({
                name: 'alt',
                type: 'string',
                title: 'Alt text',
                description:
                  'Alternative text for screenreaders. Falls back on caption if not set',
              }),
            ],
          }),
        ],
      }),
    ],
    preview: {
      select: {
        title: 'title',
      },
      prepare({ title }) {
        return {
          subtitle: 'Page',
          title,
        }
      },
    },
  })
  