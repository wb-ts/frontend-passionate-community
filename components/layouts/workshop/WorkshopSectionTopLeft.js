import React from 'react'
import { Box, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import ShowMoreText from 'react-show-more-text'
import { getContentText } from '../../../lib/data-transformations'
import ProfileSummary from '../../info/ProfileSummary'
import Topics from '../../molecules/Topics'
import TopicTag from '../../molecules/TopicTag'

const useStyles = makeStyles((theme) => ({
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

const WorkshopSectionTopLeft = ({ workshop }) => {
  const classes = useStyles()

  return (
    <Box>
      <Box mb={1}>
        <TopicTag variant='topic' label={workshop.type.title} />
      </Box>
      <Box mb={2}>
        <Typography variant={'h1'}>{workshop.title}</Typography>
      </Box>
      <Box id='about' style={{ margin: '0px' }}>
        {/**
         * @todo revisit leveraging a reusable component. There are other similar areas that have read more fucntionality
         */}
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
          {getContentText(workshop.description.json)}
        </ShowMoreText>
      </Box>

      <Box mt={3} data-testid='roles'>
        <Topics
          title='Who should attend?'
          titleVariant='h6'
          variant='basicSmall'
          mt={2}
          topics={workshop.roles.items.map((item) => item.title)}
          contentType='workshop'
        />
      </Box>
      <Box mt={3} data-testid='grades'>
        <Topics
          title='Grade Levels'
          titleVariant='h6'
          variant='basicSmall'
          mt={2}
          topics={workshop.grades.items.map((item) => item.title)}
          contentType='workshop'
        />
      </Box>
      <Box mt={3} data-testid='topicsCovered'>
        <Topics
          title='Topics covered'
          titleVariant='h6'
          variant='basicSmall'
          mt={2}
          topics={workshop.keywords.items.map((item) => item.title)}
          contentType='workshop'
        />
      </Box>
      <Box mt={5}>
        <ProfileSummary
          profiles={workshop.authors.items}
          title={
            workshop.authors.items.length > 0
              ? 'About the Authors'
              : 'About the Author'
          }
        />
      </Box>
    </Box>
  )
}

export default WorkshopSectionTopLeft
