import { INLINES, BLOCKS } from '@contentful/rich-text-types'
import { Link, Box } from '@mui/material'
import { imageoptimization } from '.'
import TextStyle from '../components/atoms/TextStyle'
import { components } from './components'

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
      return (
        <Box my={6}>
          {components(node.data.target, Math.floor(Math.random() * 10 + 1))}
        </Box>
      )
    },
    [INLINES.EMBEDDED_ENTRY]: (node, children) => {
      return (
        <Box my={6}>
          {components(node.data.target, Math.floor(Math.random() * 10 + 1))}
        </Box>
      )
    },
    [INLINES.HYPERLINK]: (node, children) => {
      return (
        <Link
          href={node.data.uri}
          target={
            node.data.uri?.toLowerCase().startsWith('https://www.ascd.org')
              ? ''
              : '_blank'
          }
        >
          {children}
        </Link>
      )
    },
    [INLINES.ENTRY_HYPERLINK]: (node, children) => {
      let prefix = ''
      switch (node.data.target.sys?.contentType?.sys?.id) {
        case 'blog':
          prefix = '/blogs/'
          break
        case 'book':
          prefix = '/books/'
          break
        case 'pubissue':
          prefix = '/el/'
          break
        case 'article':
          prefix = '/el/articles/'
          break
        case 'event':
          prefix = '/events/'
          break
        case 'profile':
          prefix = '/people/'
          break
        case 'podcast':
          prefix = '/podcasts/'
          break
        case 'video':
          prefix = '/videos/'
          break
        case 'webinar':
          prefix = '/webinars/'
          break
        default:
          break
      }
      return (
        <Link href={`${prefix}${node.data?.target?.fields?.slug}`}>
          {children}
        </Link>
      )
    },
    [INLINES.ASSET_HYPERLINK]: (node, children) => {
      return (
        <Link
          href={
            node.data?.target?.fields?.file?.url +
            '?' +
            imageoptimization.qualityParameter +
            '=' +
            imageoptimization.qualityValue
          }
        >
          {children}
        </Link>
      )
    },
    [BLOCKS.EMBEDDED_ASSET]: (node) =>
      node?.data?.target?.fields?.file?.contentType === 'application/pdf' ? (
        <Link
          href={node?.data?.target?.fields?.file?.url}
          target={
            node?.data?.target?.fields?.file?.url
              ?.toLowerCase()
              .includes('https://www.ascd.org')
              ? ''
              : '_blank'
          }
        >
          {node?.data?.target?.fields?.file?.fileName}
        </Link>
      ) : (
        <img
          src={
            node.data?.target?.fields?.file?.url +
            '?' +
            imageoptimization.qualityParameter +
            '=' +
            imageoptimization.qualityValue
          }
          alt={node.data?.target?.fields?.title}
          style={{ marginTop: '20px' }}
        />
      ),
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <Box my={2}>
        <TextStyle variant='body2'>{children}</TextStyle>
      </Box>
    ),
    [BLOCKS.HEADING_1]: (node, children) => (
      <TextStyle variant='h1'>{children}</TextStyle>
    ),
    [BLOCKS.HEADING_2]: (node, children) => (
      <TextStyle variant='h2'>{children}</TextStyle>
    ),
    [BLOCKS.HEADING_3]: (node, children) => (
      <TextStyle variant='h3'>{children}</TextStyle>
    ),
    [BLOCKS.HEADING_4]: (node, children) => (
      <TextStyle variant='h4'>{children}</TextStyle>
    ),
    [BLOCKS.HEADING_5]: (node, children) => (
      <TextStyle variant='h5'>{children}</TextStyle>
    ),
    [BLOCKS.HEADING_6]: (node, children) => (
      <TextStyle variant='h6'>{children}</TextStyle>
    ),
  },
}
export default options
