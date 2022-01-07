import { InMemoryCache, makeVar } from '@apollo/client'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { contentfulThumbnailToImageUrl } from '../../lib/data-transformations'
import { pianoClient } from '../utils'

export const userAccountIdVar = makeVar(
  pianoClient?.user?.getProvider()?.getUser()?.uid
)

export const hasPaidMembershipVar = makeVar(false)
export const hasMemberBookPriceVar = makeVar(false)

const typePolicies = {
  Image: {
    fields: {
      imgSrc: {
        read: (existing) => existing || null,
      },
    },
  },
  Book: {
    fields: {
      thumbnail: {
        merge: (existing, incoming, { mergeObjects }) =>
          mergeObjects(incoming, {
            imgSrc: contentfulThumbnailToImageUrl(incoming),
          }),
      },
    },
  },
  Profile: {
    fields: {
      thumbnail: {
        merge: (existing, incoming, { mergeObjects }) =>
          mergeObjects(incoming, {
            imgSrc: contentfulThumbnailToImageUrl(incoming),
          }),
      },
    },
  },
  Workshop: {
    fields: {
      spotlightImage: {
        merge: (existing, incoming, { mergeObjects }) =>
          mergeObjects(incoming, {
            imgSrc: contentfulThumbnailToImageUrl(incoming),
          }),
      },
    },
  },
  UserAccount: {
    fields: {
      id: {
        read: () => userAccountIdVar(),
      },
    },
  },
}

export default new InMemoryCache({ typePolicies })
