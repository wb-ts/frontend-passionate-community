import React from 'react'
import { Box, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { PropTypes } from 'prop-types'
import ShowMoreText from 'react-show-more-text'
import { options } from '../../../const'
import TextStyle from '../../atoms/TextStyle'
import ProfileSummary from '../../info/ProfileSummary'
import Topics from '../../molecules/Topics'
import TopicTag from '../../molecules/TopicTag'
import ArticleAuthors from '../../organisms/articleaauthors'

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
  topicTag,
  description,
  roles,
  grades,
  topics,
  profiles,
}) {
  const classes = useStyles()

  return (
    <Box>
      <Box>
        <TopicTag variant='topic' label={topicTag} />
      </Box>
      <TextStyle variant='h1' className={classes.title}>
        {title}
      </TextStyle>
      <Box id='about' style={{ margin: '0px' }}>
        <ShowMoreText
          lines={6}
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

      <Box mt={3} data-testid='roles'>
        <Topics
          title='Who should attend?'
          titleVariant='h6'
          variant='basicSmall'
          mt={2}
          topics={roles}
          contentType='workshop'
        />
      </Box>
      <Box mt={3} data-testid='grades'>
        <Topics
          title='Grade Levels'
          titleVariant='h6'
          variant='basicSmall'
          mt={2}
          topics={grades}
          contentType='workshop'
        />
      </Box>
      <Box mt={3} data-testid='topicsCovered'>
        <Topics
          title='Topics covered'
          titleVariant='h6'
          variant='basicSmall'
          mt={2}
          topics={topics}
          contentType='workshop'
        />
      </Box>
      <Box mt={5}>
        <ProfileSummary
          profiles={profiles}
          title={
            profiles?.length > 0 ? 'About the Authors' : 'About the Author'
          }
        />
      </Box>
    </Box>
  )
}

VirtualWorkshop.propTypes = {
  title: PropTypes.string.isRequired,
  topicTag: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  roles: PropTypes.arrayOf(PropTypes.string),
  grades: PropTypes.arrayOf(PropTypes.string),
  topics: PropTypes.arrayOf(PropTypes.string),
  profiles: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
}
