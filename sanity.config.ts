/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */

import { visionTool } from '@sanity/vision'
import {
  apiVersion,
  dataset,
  DRAFT_MODE_ROUTE,
  previewSecretId,
  projectId,
} from 'lib/sanity.api'
import { previewDocumentNode } from 'plugins/previewPane'
import { pageStructure, singletonPlugin } from 'plugins/settings'
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import { previewUrl } from 'sanity-plugin-iframe-pane/preview-url'
import authorType from 'schemas/document/author'
import postType from 'schemas/document/post'
import settingsType from 'schemas/singleton/settings'
import about from 'schemas/singleton/about'
import settings from 'schemas/singleton/settings'
import { defineUrlResolver, IframeOptions } from 'sanity-plugin-iframe-pane'

const title =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || 'Next.js Blog with Sanity.io'
  
  export const PREVIEWABLE_DOCUMENT_TYPES: string[] = [
    authorType.name,
    postType.name
  ]

  const PREVIEWABLE_DOCUMENT_TYPES_REQUIRING_SLUGS = [
    authorType.name,
    postType.name,
  ] satisfies typeof PREVIEWABLE_DOCUMENT_TYPES

  export const iframeOptions = {
    url: defineUrlResolver({
      base: DRAFT_MODE_ROUTE,
      requiresSlug: PREVIEWABLE_DOCUMENT_TYPES_REQUIRING_SLUGS,
    }),
    urlSecretId: previewSecretId,
    reload: { button: true },
  } satisfies IframeOptions

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title,
  schema: {
    // If you want more content types, you can add them to this array
    types: [authorType, postType, settingsType, about],
  },
  plugins: [
    deskTool({
      structure: pageStructure([settings, about]),
      // `defaultDocumentNode` is responsible for adding a “Preview” tab to the document pane
      defaultDocumentNode: previewDocumentNode(),
    }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    singletonPlugin([settings.name, about.name]),
    // Add the "Open preview" action
    previewUrl({
      base: DRAFT_MODE_ROUTE,
      urlSecretId: previewSecretId,
      matchTypes: PREVIEWABLE_DOCUMENT_TYPES,
    }),
    // Add an image asset source for Unsplash
    unsplashImageAsset(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
