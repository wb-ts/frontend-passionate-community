import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Box, Typography } from '@mui/material'
import { options, imageoptimization } from '.'
import CalloutBlock from '../components/atoms/CalloutBlock'
import TextStyle from '../components/atoms/TextStyle'
import CardGrid from '../components/molecules/cardgrid'
import ContentfulTable from '../components/molecules/contentfultable'
import EmbeddedMedia from '../components/molecules/embeddedmedia'
import HeroHalfHalf from '../components/molecules/herohalfhalf'
import HorizontalSection from '../components/molecules/horizontalsection'
import IssueBannerTitle from '../components/molecules/issuebannertitle'
import Jumbotron from '../components/molecules/jumbotron'
import PodcastPlayer from '../components/molecules/podcastplayer'
import TextCTA from '../components/molecules/textcta'
import TwoColumnCTA from '../components/molecules/twocolumncta'
import VideoPlayer from '../components/molecules/videoplayer'
import TwoColContentListing from '../components/organisms/twocolcontentlisting'
import paths from '../paths/path'

export const components = (item, key) => {
  if (item.sys.contentType) {
    switch (item.sys.contentType.sys.id) {
      case 'componentBanner':
        if (item.fields.image) {
          return (
            <HeroHalfHalf
              title={item.fields.title}
              description={documentToReactComponents(item.fields.body, options)}
              imagePos='right'
              image={
                item.fields?.image?.fields?.imageBynder
                  ? item.fields?.image?.fields?.imageBynder[0]?.src +
                    '?' +
                    imageoptimization.qualityParameter +
                    '=' +
                    imageoptimization.qualityValue
                  : item.fields?.image?.fields?.imageContentful?.fields?.file
                      ?.url
                  ? item.fields?.image?.fields?.imageContentful?.fields?.file
                      ?.url +
                    '?' +
                    imageoptimization.qualityParameter +
                    '=' +
                    imageoptimization.qualityValue
                  : '/images/ASCDImageFiller.png'
              }
              imageAlt={item.fields.title}
              ctaLabel1={item.fields.cta && item.fields.cta[0]?.fields.label}
              ctaLink1={item.fields.cta && item.fields.cta[0]?.fields.url}
              ctaLabel2={
                item.fields.cta &&
                item.fields.cta.length > 1 &&
                item.fields.cta[1].fields.label
              }
              ctaLink2={
                item.fields.cta &&
                item.fields.cta.length > 1 &&
                item.fields.cta[1].fields.url
              }
            />
          )
        } else {
          return (
            <IssueBannerTitle
              landing={{
                title: item.fields.title,
                subtitle: documentToReactComponents(item.fields.body, options),
              }}
              align='center'
            />
          )
        }
      case 'componentTwoColumnCta':
        const img = item.fields?.image?.fields?.imageBynder
          ? item.fields?.image?.fields?.imageBynder[0]?.src +
            '?' +
            imageoptimization.qualityParameter +
            '=' +
            imageoptimization.qualityValue
          : item.fields?.image?.fields?.imageContentful?.fields?.file?.url
          ? item.fields?.image?.fields?.imageContentful?.fields?.file?.url +
            '?' +
            imageoptimization.qualityParameter +
            '=' +
            imageoptimization.qualityValue
          : '/images/ASCDImageFiller.png'
        return (
          <TwoColumnCTA
            label=''
            title={item.fields.title}
            description={documentToReactComponents(item.fields.body, options)}
            imagePos={item.fields.imagePosition}
            image={img}
            imageAlt={item.fields.title}
            ctaLabel1={item.fields.cta && item.fields.cta[0]?.fields?.label}
            ctaLink1={item.fields.cta && item.fields.cta[0]?.fields?.url}
            ctaLabel2={
              item.fields.cta &&
              item.fields.cta.length > 1 &&
              item.fields.cta[1].fields?.label
            }
            ctaLink2={
              item.fields.cta &&
              item.fields.cta.length > 1 &&
              item.fields.cta[1].fields?.url
            }
            descriptionLineNumbers={
              item.fields.cta && item.fields.cta.length > 0 ? 2 : 4
            }
          />
        )
      case 'componentTwoColumnContentList':
        return (
          <TwoColContentListing
            title={item.fields.title}
            body={documentToReactComponents(item.fields.body, options)}
            items={item.fields.listItem}
          />
        )
      case 'componentQuote':
        return (
          <HorizontalSection
            variant='quote'
            description={item.fields.description}
            authorImage={
              item.fields?.thumbnail?.fields?.imageBynder
                ? item.fields?.thumbnail?.fields?.imageBynder[0]?.src +
                  '?' +
                  imageoptimization.qualityParameter +
                  '=' +
                  imageoptimization.qualityValue
                : item.fields?.thumbnail?.fields?.imageContentful?.fields?.file
                    ?.url
                ? item.fields?.thumbnail?.fields?.imageContentful?.fields?.file
                    ?.url +
                  '?' +
                  imageoptimization.qualityParameter +
                  '=' +
                  imageoptimization.qualityValue
                : '/images/ASCDImageFiller.png'
            }
            authorTitle={item.fields.name}
            authorSubtitle={item.fields.expertise}
          />
        )
      case 'componentCTA':
        return (
          <TextCTA
            title={item.fields.title}
            description={documentToReactComponents(item.fields.body, options)}
            ctaLabel={
              item.fields.ctaLink?.fields?.linkLabel
                ? item.fields.ctaLink?.fields?.linkLabel
                : item.fields.ctaLink?.fields?.label
            }
            ctaLink={
              item.fields.ctaLink?.fields?.linkUrl
                ? item.fields.ctaLink?.fields?.linkUrl
                : item.fields.ctaLink?.fields?.url
            }
            button
            bgColor='primary'
          />
        )
      case 'componentGrid':
        return (
          <CardGrid
            key={key}
            items={item.fields.gridItems}
            headerText={item.fields.title}
            headerBody={documentToReactComponents(item.fields.body, options)}
            gridLayout={item.fields.layout}
          />
        )
      case 'componentRichText':
        return (
          <Box>
            {item.fields.title && (
              <TextStyle variant='h4'>{item.fields.title}</TextStyle>
            )}
            <TextStyle variant='body2'>
              {documentToReactComponents(item.fields.body, options)}
            </TextStyle>
          </Box>
        )
      case 'componentTip':
        return (
          <Box width={['100%', '80%']}>
            <CalloutBlock
              sidelabel={item.fields.title ? '' : 'TIP'}
              title={item.fields.title}
              body={item.fields.body}
            />
          </Box>
        )
      case 'video':
        return <VideoPlayer video={item} variant='green' />
      case 'podcast':
        return (
          <PodcastPlayer
            sectionTitle='Listen & Learn'
            podcast={item}
            autoplay
          />
        )
      case 'embeddedMedia':
        return <EmbeddedMedia item={item} />
      case 'valuePropositionCta':
        return <Jumbotron valuepropositions={item} />
      case 'profile':
        return (
          <TwoColumnCTA
            label=''
            title={item.fields.title}
            ctaLabel1='Read More'
            ctaLink1={paths.author({ slug: item.fields.slug })}
            ctaLabel2='View all authors'
            ctaLink2={paths.author({ slug: 'all' })}
            description={item.fields.shortBio}
            image={
              item.fields?.thumbnail?.fields?.imageBynder
                ? item.fields?.thumbnail?.fields?.imageBynder[0]?.src +
                  '?' +
                  imageoptimization.qualityParameter +
                  '=' +
                  imageoptimization.qualityValue
                : item.fields?.thumbnail?.fields?.imageContentful?.fields?.file
                    ?.url
                ? item.fields?.thumbnail?.fields?.imageContentful?.fields?.file
                    ?.url +
                  '?' +
                  imageoptimization.qualityParameter +
                  '=' +
                  imageoptimization.qualityValue
                : '/images/ASCDImageFiller.png'
            }
            imagePos='left'
          />
        )
      case 'componentTable':
      case 'componentTableExtension':
        return <ContentfulTable item={item} />
      case 'image':
        return (
          <Box>
            <img
              src={
                item?.fields?.imageBynder
                  ? item?.fields?.imageBynder[0]?.src +
                    '?' +
                    imageoptimization.qualityParameter +
                    '=' +
                    imageoptimization.qualityValue
                  : item?.fields?.imageContentful?.fields?.file?.url +
                    '?' +
                    imageoptimization.qualityParameter +
                    '=' +
                    imageoptimization.qualityValue
              }
              alt={item?.fields?.alternate}
              style={{ marginTop: '24px', marginBottom: '24px', width: '100%' }}
            />
            {item?.fields?.imageBynder &&
              item?.fields?.imageBynder[0].copyright && (
                <em>Credit: {item?.fields?.imageBynder[0].copyright}</em>
              )}
          </Box>
        )
      default:
        return null
    }
  }
}

export default components
