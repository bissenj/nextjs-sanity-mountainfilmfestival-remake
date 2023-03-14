/* eslint-disable simple-import-sort/imports */
/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'

// see https://www.sanity.io/docs/api-versioning for how versioning works
import { apiVersion, dataset, projectId } from './sanity/env'
import { schema } from './sanity/schema'
import page from './sanity/schemas/page'
import section from './sanity/schemas/section'
import textImagePanel from './sanity/schemas/textImagePanel'
import singleImageBannerPanel from './sanity/schemas/singleImageBannerPanel'

import siteMenu from './sanity/schemas/siteMenu'
import siteMenuItem from './sanity/schemas/siteMenuItem'
import siteMenuContent from './sanity/schemas/siteMenuContent'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  //edit schemas in './sanity/schema'
  schema: {
    // If you want more content types, you can add them to this array
    types: [      
      page,
      section,
      textImagePanel,
      singleImageBannerPanel,
      siteMenu,
      siteMenuItem,
      siteMenuContent
    ],
  },
  plugins: [
    deskTool(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
