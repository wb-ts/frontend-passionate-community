import React, { useEffect, useState } from 'react'
import algoliasearch from 'algoliasearch'
import { client } from '@/lib/contentful'
// import { algoliaWriteClient } from '@/lib/algolia'
import { workshopItemToCardData } from '@/lib/data-transformations'

const algoliaClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_WRITE_API_KEY
)

export default function WorkshopIndex({ workshops }) {
  console.log('workshops ', workshops)

  const handleClick = async () => {
    const workshopsToAlgoliaData = workshops?.map((item) => {
      return item?.fields?.variations.map((v) => {
        const cardData = workshopItemToCardData(item, v)
        //add unixTimeStamp for workshopDate
        cardData.workshopDateTimeStamp =
          new Date(cardData?.workshopDate).getTime() / 1000
        cardData.topics = item.fields.topics.map(
          (topic) => topic?.fields?.title
        )
        console.log('cardData ', cardData)
        return cardData
      })
    })

    //convert 2d array to 1d array
    const workshopRecords = [].concat(...workshopsToAlgoliaData)
    try {
      const algoliaIndex = algoliaClient.initIndex(
        process.env.NEXT_PUBLIC_ALGOLIA_WORKSHOP_INDEX_ID
      )

      await algoliaIndex.clearObjects()
      const indexedContent = await algoliaIndex.saveObjects(workshopRecords, {
        autoGenerateObjectIDIfNotExist: true,
      })
      console.log('indexed content: ', indexedContent)

      //set relevance
      algoliaIndex.setSettings({
        // Select the attributes you want to search in
        searchableAttributes: ['title', 'authorName'],
        // Define business metrics for ranking and sorting
        customRanking: ['desc(workshopDateTimeStamp)'],
        // Set up some attributes to filter results on
        attributesForFaceting: ['topics', 'workshopDateTimeStamp'],
      })
    } catch (error) {
      console.log('error ', error)
    }
  }
  return (
    <>
      <button onClick={handleClick}>
        Import from workshop content to algolia
      </button>
    </>
  )
}

export async function getStaticProps() {
  const workshopData = await client.getEntries({
    content_type: 'workshop',
    select:
      'fields.title,fields.slug,fields.authors,fields.variations,fields.type,fields.topics,fields.clockHours,fields.featured,fields.spotlightImage',
    include: 3,
  })

  workshopData.items.forEach((ws) => {
    ws.fields.variations = ws.fields.variations?.filter(
      (item) => item.fields !== undefined
    )
    if (!ws.fields.variations) {
      ws.fields.variations = null
    }
  })
  return {
    props: { workshops: workshopData.items },
    revalidate: 20,
  }
}
