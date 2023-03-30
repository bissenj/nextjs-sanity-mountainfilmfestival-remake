import { createClient } from 'next-sanity'
import { pageQuery, homePageQuery, newsQuery, newsFeedQuery, newsArticleQuery } from './sanity.queries'

import { apiVersion, dataset, projectId, useCdn } from '../env'

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
})


// ----------------------------------------------------------------
// PAGE QUERIES
// ----------------------------------------------------------------

export async function getHomePage() {
  if (client) {
    return (await client.fetch(homePageQuery)) || {}
  }
  return {}
}


export async function getPage(slug) {
  if (client) {
    return (await client.fetch(pageQuery, slug)) || {}
  }
  return {}
}


// ----------------------------------------------------------------
// NEWS QUERIES
// ----------------------------------------------------------------


// Get all News items (Posts) -> Used on News index route.
export async function getNews() {
  if (client) {
    return (await client.fetch(newsQuery)) || {}
  }
  return {}
}

// Get the most recent News items -> Used on homepage news slider.
export async function getNewsFeed() {
  if (client) {
    return (await client.fetch(newsFeedQuery)) || {}
  }
  return {}
}

// Get specific New item -> Used on News detail pages.
export async function getNewsArticle(slug) {
  if (client) {
    return (await client.fetch(newsArticleQuery, slug)) || {}
  }
  return {}
}