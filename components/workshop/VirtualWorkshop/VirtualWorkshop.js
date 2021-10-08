import { Box, makeStyles, Typography } from '@material-ui/core'
import Topics from '@/components/molecules/topics'
import TopicTag from '@/components/molecules/topictag'
import TextStyle from '@/components/atoms/textstyle'
import ShowMoreText from 'react-show-more-text'
import { PropTypes } from 'prop-types'

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 40,
    fontWeight: 800,
    lineHeight: '50px',
    letterSpacing: '2%',
    marginBottom: 16,
  },
  description: {
    fontSize: 18,
    fontWeight: 400,
    lineHeight: '30px',
    letterSpacing: '2%',
    fontFamily: 'Poppins',
  },
  author: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '20px',
    letterSpacing: '2%',
    fontFamily: 'Poppins',
  },
  seeMore: {
    color: theme.palette.primary.main,
    textDecoration: 'under',
  },
}))
export default function VirtualWorkshop({
  title,
  description,
  audience,
  topics,
  author,
}) {
  const classes = useStyles()

  return (
    <Box>
      <Box>
        <TopicTag variant='topic' label='VIRTUAL WORKSHOP' />
      </Box>
      <TextStyle variant='h1' className={classes.title}>
        {title}
      </TextStyle>
      <Box mt={[5, 9]} id='about'>
        <ShowMoreText
          lines={3}
          more='Show more'
          less='Show less'
          className={classes.description}
          anchorClass={classes.seeMore}
          expanded={false}
          width={0}
          truncatedEndingComponent={'... '}
        >
          {description}
        </ShowMoreText>
      </Box>

      <Box mt={3} data-testid='audience'>
        <Topics
          title='Who should attend?'
          titleVariant='h6'
          variant='basicSmall'
          mt={2}
          topics={audience}
          contentType='book'
        />
      </Box>
      <Box mt={3} data-testid='topics'>
        <Topics
          title='Topics covered'
          titleVariant='h6'
          variant='basicSmall'
          mt={2}
          topics={topics}
          contentType='book'
        />
      </Box>

      {author && (
        <Box mt={3}>
          <TextStyle variant='buttonMedium'>About the Author</TextStyle>
          <ShowMoreText
            lines={3}
            more='Show more'
            less='Show less'
            className={classes.author}
            anchorClass={classes.seeMore}
            expanded={false}
            width={0}
            truncatedEndingComponent={'... '}
          >
            {author}
          </ShowMoreText>
        </Box>
      )}
    </Box>
  )
}

VirtualWorkshop.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  audience: PropTypes.arrayOf(PropTypes.string),
  topics: PropTypes.arrayOf(PropTypes.string),
  author: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
}
