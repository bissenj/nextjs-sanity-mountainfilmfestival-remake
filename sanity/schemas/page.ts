/* eslint-disable simple-import-sort/imports */
import { DocumentIcon,DocumentsIcon, ImageIcon, ImagesIcon, InlineIcon, BlockElementIcon, DashboardIcon, UserIcon, BinaryDocumentIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

import textImagePanel from './textImagePanel'
import singleImageBannerPanel from './singleImageBannerPanel'
import imageImagePanel from './imageImagePanel'
import quotePanel from './quotePanel'
import newsPanel from './newsPanel'
import siteMenu from './siteMenu'
import footer from './footer'


export default defineType({
    type: 'document',
    name: 'page',
    title: 'Pages',
    icon: DocumentsIcon,
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
            
      // Page Sections
      defineField({
        type: 'array',
        name: 'sections',
        title: 'Sections',
        icon: BlockElementIcon,
        description:
          "All the page sections",
        of: [          
          
          // Text Image Panel
          defineArrayMember({
            type: 'textImagePanel',
            name: 'textImagePanel',    
            title: 'Split Text and Image',
            icon: 'InlineIcon'
          }),

          // Single Image Banner Panel
          defineArrayMember({
            type: 'singleImageBannerPanel',
            name: 'singleImageBannerPanel',    
            title: 'Hero with Image and CTA',
            icon: 'BashboardIcon'        
          }), 

          // Image Image Panel
          defineArrayMember({
            type: 'imageImagePanel',
            name: 'imageImagePanel',  
            title: 'Images Section', 
            icon: 'ImagesIcon'          
          }), 

          // Quote Panel
          defineArrayMember({
            type: 'quotePanel',
            name: 'quotePanel',   
            title: 'Quote',
            icon: 'UserIcon'                     
          }), 

          // News Panel
          defineArrayMember({
            type: 'newsPanel',
            name: 'newsPanel',
            title: 'News Panel',
            icon: 'BinaryDocumentIcon'            
          }), 

        ],        
      }),  
      
      defineField({
        name: 'footer',
        type: 'reference',
        to: [{ type: 'footer' }],                
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
  