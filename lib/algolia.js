import algoliasearch from 'algoliasearch/lite'
import config from '../lib/config'

export const testEnv = 'test'

export const algoliaAppId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID
export const algoliaSearchApiKey =
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
export const algoliaSearchIndexId = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_ID

export const algoliaSearchClient = algoliasearch(
  algoliaAppId,
  algoliaSearchApiKey
)

export const algoliaWriteClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_WRITE_API_KEY
)

export const algoliaSearchIndex =
  algoliaWriteClient.initIndex(algoliaSearchIndexId)

export const algoliaSearchIndices = {
  dev: [
    { value: 'ascd_dev', label: 'Default' },
    { value: 'ascd_dev_title_asc', label: 'Title (asc)' },
    { value: 'ascd_dev_title_desc', label: 'Title (desc)' },
    { value: 'ascd_dev_article_date_asc', label: 'Date Created (asc)' },
    {
      value: 'ascd_dev_article_date_desc',
      label: 'Date Created (desc)',
    },
    {
      value: 'ascd_dev_book_release_asc',
      label: 'Books - Date Released (asc)',
    },
    {
      value: 'ascd_dev_book_release_desc',
      label: 'Books - Date Released (desc)',
    },
  ],
  stage: [
    { value: 'ascd_stage', label: 'Default' },
    { value: 'ascd_stage_title_asc', label: 'Title (asc)' },
    { value: 'ascd_stage_title_desc', label: 'Title (desc)' },
    { value: 'ascd_stage_article_date_asc', label: 'Date Created (asc)' },
    {
      value: 'ascd_stage_article_date_desc',
      label: 'Date Created (desc)',
    },
    {
      value: 'ascd_stage_book_release_asc',
      label: 'Books - Date Released (asc)',
    },
    {
      value: 'ascd_stage_book_release_desc',
      label: 'Books - Date Released (desc)',
    },
  ],
  master: [
    { value: 'ascd_master', label: 'Default' },
    { value: 'ascd_master_title_asc', label: 'Title (asc)' },
    { value: 'ascd_master_title_desc', label: 'Title (desc)' },
    { value: 'ascd_master_article_date_asc', label: 'Date Created (asc)' },
    {
      value: 'ascd_master_article_date_desc',
      label: 'Date Created (desc)',
    },
    {
      value: 'ascd_master_book_release_asc',
      label: 'Books - Date Released (asc)',
    },
    {
      value: 'ascd_master_book_release_desc',
      label: 'Books - Date Released (desc)',
    },
  ],
}
