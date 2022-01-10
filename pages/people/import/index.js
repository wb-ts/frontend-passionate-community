import React, { useEffect, useState } from 'react'
import { Box, Container, Divider, Grid } from '@mui/material'
import algoliasearch from 'algoliasearch'
import _, { sortBy } from 'lodash'
import Layout from '../../../components/layout'
import { client } from '../../../lib/contentful'
import { peopleToCardData } from '../../../lib/data-transformations'

const algoliaClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_WRITE_API_KEY
)

export default function AllAuthors({ authors }) {
  const sortedAuthors = sortBy(authors, (item) =>
    item?.fields?.lastName?.trim().toUpperCase()
  )

  const peopleRecords = sortedAuthors.map((item) => peopleToCardData(item))
  const handleClick = async () => {
    try {
      const algoliaIndex = algoliaClient.initIndex(
        process.env.NEXT_PUBLIC_ALGOLIA_PEOPLE_INDEX_ID
      )
      await algoliaIndex.clearObjects()
      const indexedContent = await algoliaIndex.saveObjects(peopleRecords, {
        autoGenerateObjectIDIfNotExist: true,
      })
      console.log('indexed content: ', indexedContent)

      //set relevance
      algoliaIndex.setSettings({
        // Select the attributes you want to search in
        searchableAttributes: ['firstName', 'lastName'],
        // Define business metrics for ranking and sorting
        customRanking: ['asc(lastName)'],
        // Set up some attributes to filter results on
        attributesForFaceting: ['expertise', 'profileType'],
      })
    } catch (error) {
      console.log('error ', error)
    }
  }
  return (
    <Box m={10}>
      <button onClick={handleClick}>
        Import from people content type to algolia
      </button>
    </Box>
  )
}

export async function getServerSideProps(context) {
  const maxEntries = 1000

  //unarchived persons
  let offset = 0
  let items = []
  let processedEntries = null
  while (processedEntries !== 0) {
    const entries = await client.getEntries({
      content_type: 'profile',
      'fields.authorStatus[ne]': 'Archive',
      select:
        'fields.title,fields.thumbnail,fields.slug,fields.lastName,fields.firstName,fields.expertise,fields.profileType',
      skip: offset,
      limit: maxEntries,
    })

    processedEntries = entries.items.length

    if (processedEntries > 0) {
      offset += processedEntries
      items.push(...entries.items)
    }
  }

  return {
    props: {
      authors: items,
    },
  }
}
