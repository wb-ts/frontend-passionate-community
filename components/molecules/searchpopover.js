import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'
import { Popover, Box, Typography, InputBase, IconButton } from '@mui/material'
import { makeStyles } from '@mui/styles'
import paths from '../../paths/path'
import TopicTag from './TopicTag'

const useStyles = makeStyles((theme) => ({
  searchPopover: {
    borderRadius: 0,
    '& .MuiPopover-paper': {
      top: '0!important',
      left: '0!important',
      right: '0!important',
      maxWidth: '100vw',
      minHeight: '420px',
      borderRadius: 0,
      padding: '32px',
      [theme.breakpoints.down('sm')]: {
        minHeight: '100%',
        padding: '12px',
      },
      [theme.breakpoints.up('sm')]: {
        right: 'initial!important',
        width: '323px',
        minHeight: '100%',
        padding: '24px',
      },
      [theme.breakpoints.up('md')]: {
        right: '0!important',
        width: 'initial',
        minHeight: '420px',
      },
    },
  },
  searchPopoverContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchPopoverClose: {
    display: 'flex',
    alignSelf: 'flex-end',
  },
  searchPopoverSearch: {
    position: 'relative',
    color: theme.palette.grey.medium,
    '&:before': {
      position: 'absolute',
      left: '-13px',
      top: '-8px',
      content: '""',
      height: '40px',
      width: '2px',
      background: theme.palette.grey.light,
    },
  },
  searchPopoverCancel: {
    display: 'none',
    color: theme.palette.grey.medium,
    marginRight: 2,
    [theme.breakpoints.down('lg')]: {
      marginRight: 20,
    },
    [theme.breakpoints.down('md')]: {
      marginRight: 22,
    },
    '&$visible': {
      display: 'flex',
    },
  },
  visible: {},
  searchPopoverBody: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '960px',
    padding: '32px 20px 12px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.4)',
    [theme.breakpoints.down('lg')]: {
      padding: '24px 12px',
    },
    [theme.breakpoints.up('md')]: {
      width: '80%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '100%',
    },
  },
  inputRoot: {
    color: 'inherit',
    width: '90%',
  },
  inputInput: {
    width: '100%',
    fontSize: '1.25rem',
    fontWeight: 700,
    color: theme.palette.grey.medium,
    transition: theme.transitions.create('width'),

    '&::-moz-placeholder': {
      /* Mozilla Firefox 19+ */
      color: theme.palette.grey.medium,
      fontSize: '1.25rem',
      fontWeight: 700,
      lineHeight: '1.125rem',
      letterSpacing: '0.2px',
      opacity: 1,
    },

    '&::-ms-input-placeholder': {
      /* Internet Explorer 10+ */
      color: theme.palette.grey.medium,
      fontSize: '1.25rem',
      fontWeight: 700,
      lineHeight: '1.125rem',
      letterSpacing: '0.2px',
      opacity: 1,
    },
    '&::-webkit-input-placeholder': {
      /* WebKit browsers */
      color: theme.palette.grey.medium,
      fontSize: '1.25rem',
      fontWeight: 700,
      lineHeight: '1.125rem',
      letterSpacing: '0.2px',
      opacity: 1,
    },
  },
  searchPopoverTopics: {
    width: '80%',
    maxWidth: '960px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    marginTop: '32px',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      width: '100%',
    },
  },
  searchPopoverTopicsBox: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 16px',
    [theme.breakpoints.down('md')]: {
      padding: '24px 0',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '24px 12px',
    },
  },
  searchPopoverTopicsBoxHeading: {
    fontSize: '12px',
    fontWeight: '600',
    lineHeight: '18px',
    paddingLeft: '4px',
    [theme.breakpoints.down('md')]: {
      fontSize: '14px',
      lineHeight: '21px',
      fontWeight: '700',
    },
  },
  searchPopoverTopicsBoxTags: {
    flexGrow: 1,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop: '16px',
    [theme.breakpoints.down('md')]: {
      marginTop: '12px',
    },
    '& p': {
      flexGrow: 1,
    },
  },
  searchFaq: {
    maxWidth: '960px',
    width: '80%',
    textAlign: 'right',
    marginTop: '4px',
    '& a': {
      color: '#FF2E45',
      fontWeight: '500',
      width: '80%',
    },
  },
}))

export default function SearchPopover({
  searchPopover,
  closeSearchPopover,
  searchPopoverValue,
  setSearchPopoverValue,
  resetSearchPopoverValue,
  searchPopoverPlaceholder,
  triggerSearch,
  onEnterKeyPress,
  onCancelKeyPress,
  topics,
  grades,
  subjects,
}) {
  const classes = useStyles()
  const router = useRouter()

  return (
    <Popover
      id='search-popover'
      open={Boolean(searchPopover)}
      anchorEl={searchPopover}
      onClose={closeSearchPopover}
      className={classes.searchPopover}
    >
      <Box className={classes.searchPopoverContent}>
        <IconButton
          onClick={closeSearchPopover}
          className={classes.searchPopoverClose}
          size='large'
        >
          <CloseIcon />
        </IconButton>
        <Box className={classes.searchPopoverBody}>
          <InputBase
            value={searchPopoverValue}
            placeholder={searchPopoverPlaceholder}
            onChange={setSearchPopoverValue}
            onKeyPress={onEnterKeyPress}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            color='primary'
            variant='subtitle2'
            inputProps={{ 'aria-label': 'search' }}
            autoFocus
          />
          <IconButton
            className={
              searchPopoverValue != ''
                ? `${classes.visible} ${classes.searchPopoverCancel}`
                : classes.searchPopoverCancel
            }
            onClick={resetSearchPopoverValue}
            onKeyPress={onCancelKeyPress}
            size='large'
          >
            <CloseIcon />
          </IconButton>
          <IconButton
            className={classes.searchPopoverSearch}
            onClick={triggerSearch}
            size='large'
          >
            <SearchIcon />
          </IconButton>
        </Box>
        <Box className={classes.searchFaq}>
          <Link href='/faq'>
            <a>Search FAQ</a>
          </Link>
        </Box>
        <Box className={classes.searchPopoverTopics}>
          <Box className={classes.searchPopoverTopicsBox}>
            <Typography className={classes.searchPopoverTopicsBoxHeading}>
              Search by Topic
            </Typography>
            {topics && (
              <Box className={classes.searchPopoverTopicsBoxTags}>
                {topics.map((topic, key) => (
                  <Box key={key} p={0.5}>
                    <TopicTag
                      label={topic.fields.title}
                      onclick={() => {
                        closeSearchPopover()
                        router.push(
                          paths.search({
                            topics: [topic.fields.title],
                          })
                        )
                      }}
                      variant='basic'
                      textTransform='uppercase'
                    />
                  </Box>
                ))}
              </Box>
            )}
          </Box>
          <Box className={classes.searchPopoverTopicsBox}>
            <Typography className={classes.searchPopoverTopicsBoxHeading}>
              Search by Grade
            </Typography>
            {grades && (
              <Box className={classes.searchPopoverTopicsBoxTags}>
                {grades.map((grade, key) => (
                  <Box key={key} p={0.5}>
                    <TopicTag
                      label={grade.fields.title}
                      onclick={() => {
                        closeSearchPopover()
                        router.push(
                          paths.search({
                            grades: [grade.fields.title],
                          })
                        )
                      }}
                      variant='basic'
                      textTransform='uppercase'
                    />
                  </Box>
                ))}
              </Box>
            )}
          </Box>
          <Box className={classes.searchPopoverTopicsBox}>
            <Typography className={classes.searchPopoverTopicsBoxHeading}>
              Search by Subject
            </Typography>
            {subjects && (
              <Box className={classes.searchPopoverTopicsBoxTags}>
                {subjects.map((subject, key) => (
                  <Box key={key} p={0.5}>
                    <TopicTag
                      label={subject.fields.title}
                      onclick={() => {
                        closeSearchPopover()
                        router.push(
                          paths.search({
                            subjects: [subject.fields.title],
                          })
                        )
                      }}
                      variant='basic'
                      textTransform='uppercase'
                    />
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Popover>
  )
}
