import { createClient } from 'next-sanity'
import { homePageQuery } from './sanity.queries'

import { apiVersion, dataset, projectId, useCdn } from '../env'

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
})


export async function getHomePage() {
  if (client) {
    return (await client.fetch(homePageQuery)) || {}
  }
  return {}
}
