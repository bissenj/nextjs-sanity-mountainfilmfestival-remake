import { BookIcon, DocumentsIcon } from '@sanity/icons'
import { format, parseISO } from 'date-fns'
import { defineField, defineType } from 'sanity'

import authorType from './author'

/**
 * This file is the schema definition for a post.
 *
 * Here you'll be able to edit the different fields that appear when you 
 * create or edit a post in the studio.
 * 
 * Here you can see the different schema types that are available:

  https://www.sanity.io/docs/schema-types

 */

export default defineType({
  name: 'post',
  title: 'Posts',
  icon: DocumentsIcon,
  type: 'document',
  fields: [

    // TITLE
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    // SLUG
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),    

    // SUMMARY
    defineField({
        name: 'summary',
        title: 'Summary',
        type: 'text',
        rows: 2,
      }),

    // CONTENT
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
    }),
    
    // COVER IMAGE
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    // COVER IMAGE ALT
    defineField({
      name: 'coverImageAlt',
      title: 'Cover Image Alternate Text',
      type: 'string',      
    }),

    // DATES
    defineField({
        name: 'dates',
        title: 'Dates',
        type: 'object',
        fields: [

            // PUBLISH DATE
            defineField({
                name: 'publishedDate',
                title: 'Published',
                type: 'datetime',
                initialValue: () => new Date().toISOString(),
            }),

            // UPDATED DATE  
            defineField({
                name: 'updatedDate',
                title: 'Updated',
                type: 'date',                
            }),
        ]
    }),        

    // AUTHOR
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: authorType.name }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      publishDate: 'dates.publishedDate',      
      media: 'coverImage',
    },
    prepare({ title, media, author, publishDate }) {
      const subtitles = [
        author && `by ${author}`,
        publishDate && `on ${format(parseISO(publishDate), 'LLLL d, yyyy')}`,
      ].filter(Boolean)

      return { title, media, subtitle: subtitles.join(' ') }
    },
  },
})
