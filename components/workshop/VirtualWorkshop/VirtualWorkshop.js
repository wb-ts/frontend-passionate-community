import { Box, makeStyles, Typography } from '@material-ui/core'
import Topics from '@/components/molecules/topics'
import TopicTag from '@/components/molecules/topictag'
import TextStyle from '@/components/atoms/textstyle'
import { PropTypes } from 'prop-types'
const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 40,
    fontWeight: 800,
    lineHeight: '50px',
    letterSpacing: '2%',
    marginBottom: 16,
  },
  seeMore: {
    color: theme.palette.primary.main,
    textDecoration: 'under',
  },
}))
export default function VirtualWorkshop({
  title,
  body,
  audience,
  topics,
  author,
}) {
  const classes = useStyles()
  console.log('body ', body)
  return (
    <Box>
      <Box>
        <TopicTag variant='topic' label='VIRTUAL WORKSHOP' />
      </Box>
      <TextStyle variant='h1' className={classes.title}>
        {title}
      </TextStyle>
      <Typography variant='body1'>
        {body} ... <span className={classes.seeMore}>See more</span>
      </Typography>

      <Box mt={3}>
        <Topics
          title='Who should attend?'
          titleVariant='h6'
          variant='basicSmall'
          mt={2}
          topics={audience}
          contentType='book'
        />
      </Box>
      <Box mt={3}>
        <Topics
          title='Topics covered'
          titleVariant='h6'
          variant='basicSmall'
          mt={2}
          topics={topics}
          contentType='book'
        />
      </Box>

      <Box mt={3}>
        <TextStyle variant='buttonMedium'>About the Author</TextStyle>
        <Typography variant='body2'>
          {author} <span className={classes.seeMore}>See more</span>
        </Typography>
      </Box>
    </Box>
  )
}

VirtualWorkshop.propTypes = {
  title: PropTypes.string,
  body: PropTypes.arrayOf(PropTypes.object),
  audience: PropTypes.arrayOf(PropTypes.string),
  topics: PropTypes.arrayOf(PropTypes.string),
  author: PropTypes.arrayOf(PropTypes.object),
}
