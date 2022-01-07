import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { RestLink } from 'apollo-link-rest'
import { pianoClient } from '../utils'
import cache from './cache'

const getQueryStringParams = (query) => {
  return query
    ? (/^[?#]/.test(query) ? query.slice(1) : query)
        .split('&')
        .reduce((params, param) => {
          let [key, value] = param.split('=')
          params[key] = value
            ? decodeURIComponent(value.replace(/\+/g, ' '))
            : ''
          return params
        }, {})
    : {}
}

const pianoFetch = (uri, options) => {
  const path = uri.split('?')[0]
  const params = getQueryStringParams(uri.split('?')[1])
  return new Promise((resolve, reject) => {
    pianoClient.push([
      'init',
      function () {
        pianoClient.api?.callApi(
          path,
          {
            api_token: process.env.NEXT_PUBLIC_PIANO_API_KEY,
            ...params,
          },
          (data) => {
            if (data.code === 0) {
              const responseObject = new Response()
              responseObject.json = () => data
              resolve(responseObject)
            } else {
              reject(`Code: ${data.code} - ${data.message}`)
            }
          }
        )
      },
    ])
  })
}

export const client = new ApolloClient({
  connectToDevTools: true,
  link: ApolloLink.from([
    new RestLink({
      uri: '',
      customFetch: pianoFetch,
    }),
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        )
      }
      if (networkError) console.log(`[Network error]: ${networkError}`)
    }),
    new HttpLink({
      uri: `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/environments/${process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT}`,
      credentials: 'same-origin',
      headers: {
        Authorization: `Bearer ${
          process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW
            ? process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
        }`,
      },
    }),
  ]),
  cache,
})

export const contentfulDirectClient = new ApolloClient({
  connectToDevTools: true,
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        )
      }
      if (networkError) console.log(`[Network error]: ${networkError}`)
    }),
    new HttpLink({
      uri: `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/environments/${process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT}`,
      credentials: 'same-origin',
      headers: {
        Authorization: `Bearer ${
          process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW
            ? process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
        }`,
      },
    }),
  ]),
  cache,
})
