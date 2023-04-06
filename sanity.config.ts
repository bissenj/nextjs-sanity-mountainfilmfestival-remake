/* eslint-disable simple-import-sort/imports */
/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'

// see https://www.sanity.io/docs/api-versioning for how versioning works
import { apiVersion, dataset, projectId } from './sanity/env'

// Pages 
import page from './sanity/schemas/page'

// Sections

import textImagePanel from './sanity/schemas/textImagePanel'
import singleImageBannerPanel from './sanity/schemas/singleImageBannerPanel'
import imageImagePanel from './sanity/schemas/imageImagePanel'
import quotePanel from './sanity/schemas/quotePanel'
import newsPanel from './sanity/schemas/newsPanel'

// Components
import photoGallery from './sanity/schemas/photoGallery'
import slideshow from './sanity/schemas/slideshow'
import ctaButton from './sanity/schemas/ctaButton'

// Blog
import post from './sanity/schemas/post'
import author from './sanity/schemas/author'
import blockContent from './sanity/schemas/blockContent'

// Site Menu
import siteMenu from './sanity/schemas/siteMenu'
import siteMenuItem from './sanity/schemas/siteMenuItem'
import siteMenuContent from './sanity/schemas/siteMenuContent'

import footer from './sanity/schemas/footer'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  //edit schemas in './sanity/schema'
  schema: {
    // If you want more content types, you can add them to this array
    types: [      
      page,      
      post,
      textImagePanel,
      singleImageBannerPanel,
      siteMenu,
      siteMenuItem,
      siteMenuContent,
      footer,
      imageImagePanel,
      quotePanel,
      newsPanel,
      slideshow,
      ctaButton,      
      author,
      blockContent,
      photoGallery, 
    ],
  },
  plugins: [
    deskTool(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
