import React from 'react'
import CloseIcon from '@mui/icons-material/Close'
import TuneIcon from '@mui/icons-material/Tune'
import {
  Box,
  Grid,
  Link,
  Typography,
  Divider,
  Drawer,
  Button,
  IconButton,
} from '@mui/material'
import Switch from '@mui/material/Switch'
import { withStyles } from '@mui/styles'
import PropTypes from 'prop-types'
import {
  Configure,
  Hits,
  InstantSearch,
  Pagination,
  ScrollTo,
  RefinementList,
  SearchBox,
  SortBy,
  Stats,
  connectRefinementList,
} from 'react-instantsearch-dom'
import { algoliaSearchIndexId, algoliaSearchIndices } from '../../lib/algolia'
import { CustomCurrentRefinements } from './customcurrentrefinement'
import { CustomRefinementList } from './customrefinementlist'
import SearchItem from './searchitem'

const useStyles = (theme) => ({
  searchBar: {
    width: '100vw',
    position: 'relative',
    left: '50%',
    right: '50%',
    marginLeft: '-50vw',
    marginRight: '-50vw',
    backgroundColor: theme.palette.grey.dark,
    borderRadius: '0px 0px 0px 64px',
    padding: '52px 0 40px',
    marginBottom: '56px',
    [theme.breakpoints.down('md')]: {
      marginBottom: '12px',
    },
  },
  categoryFilters: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    [theme.breakpoints.down('md')]: {
      padding: 24,
    },
  },
  categoryTitles: {
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: '20px',
    marginBottom: '10px',
  },
  totalResultsLabel: {
    marginRight: 24,
  },
  resultsRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
    [theme.breakpoints.down('md')]: {
      marginTop: '24px',
      marginBottom: '24px',
    },
  },
  sortRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    '& > div:first-child': {
      marginRight: '24px',
      [theme.breakpoints.down('sm')]: {
        marginRight: 0,
        marginBottom: '20px',
      },
    },
  },
  sortBlock: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  drawerHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: theme.palette.background.light,
    padding: '20px 12px 12px',
    borderBottom: '1px solid rgba(33, 33, 33, 0.08)',
  },
  drawerHeaderClose: {
    color: theme.palette.grey.medium,
    marginRight: 10,
    '&:hover': {
      color: theme.palette.hover.main,
    },
  },
  drawerPaper: {
    [theme.breakpoints.down('sm')]: {
      width: '80%',
    },
  },
})

const HitComponent = ({ hit }) => <SearchItem hit={hit} />

HitComponent.propTypes = {
  hit: PropTypes.object,
}

//Switch component to toggle Premium Resources
const pxToRem = (px, oneRemPx = 16) => `${px / oneRemPx}rem`
const switchBorderWidth = 2
const switchWidth = pxToRem(44)
const swithcHeight = pxToRem(22)
const switchSize = pxToRem(16)
const switchGap = (22 - 16) / 2

const PremiumResourcesSwitch = withStyles((theme) => ({
  premiumResources: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    [theme.breakpoints.down('md')]: {
      padding: '24px 24px 18px',
    },
  },
  premiumResourcesSwitchLabel: {
    color: theme.palette.accent.darkOrange,
  },
  root: {
    width: switchWidth,
    height: swithcHeight,
    padding: 0,
    overflow: 'unset',
  },
  switchBase: {
    padding: pxToRem(switchGap),
    '&$checked': {
      color: theme.palette.text.secondary,
      transform: `translateX(calc(${switchWidth} - ${switchSize} - ${pxToRem(
        2 * switchGap
      )}))`,
      '& + $track': {
        backgroundColor: theme.palette.primary.main,
        opacity: 1,
        border: 'none',
      },
      '& $thumb': {
        backgroundColor: theme.palette.text.secondary,
      },
    },
  },
  track: {
    borderRadius: 40,
    border: 'none',
    borderWidth: switchBorderWidth,
    backgroundColor: theme.palette.grey.light,
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
    boxSizing: 'border-box',
  },
  thumb: {
    boxShadow: 'none',
    backgroundColor: theme.palette.text.secondary,
    width: switchSize,
    height: switchSize,
  },
  checked: {},
}))((props) => {
  const { classes, checked, onChange } = props

  return (
    <Box className={classes.premiumResources}>
      <Switch
        className={classes.premiumResourcesSwitch}
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          track: classes.track,
          thumb: classes.thumb,
          checked: classes.checked,
        }}
        inputProps={{ 'aria-label': 'Premium resources' }}
        checked={checked}
        onChange={onChange}
      />
      <img
        src='/images/premium.png'
        alt='premium resources logo'
        style={{ width: '24px', margin: '0 8px 0 16px' }}
      />
      <Typography
        className={classes.premiumResourcesSwitchLabel}
        variant='overline'
      >
        Premium resources
      </Typography>
    </Box>
  )
})
//End of Switch component to toggle Premium Resources

const VirtualRefinementList = connectRefinementList(() => null)
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      premiumResources: false,
      mobileView: false,
      filtersDrawerOpen: false,
    }
  }

  componentDidMount() {
    const setResponsiveness = () => {
      return window.innerWidth < 960
        ? this.setState((prevState) => ({ ...prevState, mobileView: true }))
        : this.setState((prevState) => ({ ...prevState, mobileView: false }))
    }
    setResponsiveness()
    window.addEventListener('resize', () => setResponsiveness())
  }

  render() {
    const { classes } = this.props
    const premiumResources = this.state.premiumResources
    const setPremiumResources = () =>
      this.setState({ premiumResources: !this.state.premiumResources })

    const mobileView = this.state.mobileView
    const filtersDrawerOpen = this.state.filtersDrawerOpen
    const handleFiltersDrawerOpen = () =>
      this.setState((prevState) => ({ ...prevState, filtersDrawerOpen: true }))
    const handleFiltersDrawerClose = () =>
      this.setState((prevState) => ({ ...prevState, filtersDrawerOpen: false }))

    const searchIndices =
      process.env.NEXT_PUBLIC_ALGOLIA_INDEX_ID == 'ascd_dev'
        ? algoliaSearchIndices.dev
        : process.env.NEXT_PUBLIC_ALGOLIA_INDEX_ID == 'ascd_stage'
        ? algoliaSearchIndices.stage
        : process.env.NEXT_PUBLIC_ALGOLIA_INDEX_ID == 'ascd_master'
        ? algoliaSearchIndices.master
        : algoliaSearchIndices.dev

    //Search Filters
    const searchFilters = () => {
      return (
        <Box className={classes.categoryFilters}>
          <Box>
            <Typography className={classes.categoryTitles} variant='h6'>
              Featured
            </Typography>
            <RefinementList
              attribute='featured'
              limit={6}
              showMore
              showMoreLimit={20}
              translations={{
                showMore(expanded) {
                  return expanded ? 'Less' : 'More'
                },
                noResults: 'No results',
              }}
              transformItems={(items) =>
                items.map((item) => ({
                  ...item,
                  label: item.label == 'false' ? 'No' : 'Yes',
                }))
              }
            />
          </Box>
          <Box>
            <Typography className={classes.categoryTitles} variant='h6'>
              Content Types
            </Typography>
            <RefinementList
              attribute='type'
              limit={6}
              transformItems={(items) =>
                items.map((item) => ({
                  ...item,
                  label: item.label != 'pubissue' ? item.label : 'Publication',
                }))
              }
              showMore
              showMoreLimit={20}
              translations={{
                showMore(expanded) {
                  return expanded ? 'Less' : 'More'
                },
                noResults: 'No results',
              }}
            />
          </Box>
          <Box>
            <Typography className={classes.categoryTitles} variant='h6'>
              Topics
            </Typography>
            <RefinementList
              attribute='topic'
              limit={6}
              showMore
              showMoreLimit={20}
              translations={{
                showMore(expanded) {
                  return expanded ? 'Less' : 'More'
                },
                noResults: 'No results',
              }}
            />
          </Box>
          <Box>
            <Typography className={classes.categoryTitles} variant='h6'>
              Grades
            </Typography>
            <RefinementList
              attribute='grade'
              limit={6}
              showMore
              showMoreLimit={20}
              translations={{
                showMore(expanded) {
                  return expanded ? 'Less' : 'More'
                },
                noResults: 'No results',
              }}
            />
          </Box>
          <Box>
            <Typography className={classes.categoryTitles} variant='h6'>
              Subjects
            </Typography>
            <RefinementList
              attribute='subject'
              limit={6}
              showMore
              showMoreLimit={20}
              translations={{
                showMore(expanded) {
                  return expanded ? 'Less' : 'More'
                },
                noResults: 'No results',
              }}
            />
          </Box>
          <Box>
            <Typography className={classes.categoryTitles} variant='h6'>
              Roles
            </Typography>
            <RefinementList
              attribute='role'
              limit={6}
              showMore
              showMoreLimit={20}
              translations={{
                showMore(expanded) {
                  return expanded ? 'Less' : 'More'
                },
                noResults: 'No results',
              }}
            />
          </Box>
          <Box>
            <Typography className={classes.categoryTitles} variant='h6'>
              Book Filters:
            </Typography>
            {/* <Typography className={classes.categoryTitles} variant='h6'>
              Translations
            </Typography>
            <RefinementList
              attribute='language'
              limit={6}
              showMore
              showMoreLimit={20}
              translations={{
                showMore(expanded) {
                  return expanded ? 'Less' : 'More'
                },
                noResults: 'No results',
              }}
            /> */}
          </Box>
          <Box>
            <Typography className={classes.categoryTitles} variant='h6'>
              Year Published
            </Typography>
            <RefinementList
              attribute='yearPublished'
              limit={6}
              showMore
              showMoreLimit={20}
              translations={{
                showMore(expanded) {
                  return expanded ? 'Less' : 'More'
                },
                noResults: 'No results',
              }}
            />
          </Box>
          <Box>
            <Typography className={classes.categoryTitles} variant='h6'>
              More Filters
            </Typography>
            <RefinementList
              attribute='bookFilters'
              limit={6}
              showMore
              showMoreLimit={20}
              translations={{
                showMore(expanded) {
                  return expanded ? 'Less' : 'More'
                },
                noResults: 'No results',
              }}
            />
          </Box>
          <Box>
            <Typography className={classes.categoryTitles} variant='h6'>
              Keywords
            </Typography>
            <RefinementList
              attribute='keywords'
              limit={6}
              showMore
              showMoreLimit={20}
              translations={{
                showMore(expanded) {
                  return expanded ? 'Less' : 'More'
                },
                noResults: 'No results',
              }}
            />
          </Box>
          <Box pb={50}>
            <Typography className={classes.categoryTitles} variant='h6'>
              Author
            </Typography>
            <CustomRefinementList attribute='author' limit={10000} />
          </Box>
        </Box>
      )
    }
    //End of Search Filters

    return (
      <Grid container>
        <InstantSearch
          searchClient={this.props.searchClient}
          resultsState={this.props.resultsState}
          onSearchStateChange={this.props.onSearchStateChange}
          searchState={this.props.searchState}
          createURL={this.props.createURL}
          indexName={this.props.indexName}
          onSearchParameters={this.props.onSearchParameters}
          {...this.props}
        >
          {premiumResources ? (
            <Configure hitsPerPage={12} filters='premium:true' />
          ) : (
            <Configure hitsPerPage={12} />
          )}
          <Grid item xs={12}>
            <ScrollTo>
              <Box className={classes.searchBar}>
                <SearchBox
                  translations={{
                    placeholder: '',
                  }}
                />
              </Box>
            </ScrollTo>
          </Grid>
          {mobileView ? (
            <>
              <VirtualRefinementList attribute='featured' />
              <VirtualRefinementList attribute='type' />
              <VirtualRefinementList attribute='topic' />
              <VirtualRefinementList attribute='grade' />
              <VirtualRefinementList attribute='subject' />
              <VirtualRefinementList attribute='role' />
              <VirtualRefinementList attribute='language' />
              <VirtualRefinementList attribute='yearPublished' />
              <VirtualRefinementList attribute='bookFilters' />
              <VirtualRefinementList attribute='keywords' />
              <VirtualRefinementList attribute='author' />
              <Drawer
                {...{
                  anchor: 'right',
                  open: filtersDrawerOpen,
                  onClose: handleFiltersDrawerClose,
                }}
                classes={{
                  paper: classes.drawerPaper,
                }}
              >
                <Box className={classes.drawerHeader}>
                  <IconButton
                    className={classes.drawerHeaderClose}
                    onClick={handleFiltersDrawerClose}
                    size='large'
                  >
                    <CloseIcon />
                  </IconButton>
                  <Typography variant='h4'>Filters</Typography>
                </Box>
                <PremiumResourcesSwitch
                  checked={premiumResources}
                  onChange={setPremiumResources}
                />
                {searchFilters()}
              </Drawer>
            </>
          ) : (
            <Grid item xs={12} md={4}>
              {searchFilters()}
            </Grid>
          )}
          <Grid item xs={12} md={8}>
            <Box className={classes.resultsRow}>
              <Typography variant='h5' className={classes.totalResultsLabel}>
                <Stats
                  translations={{
                    stats(nbHits) {
                      return `${nbHits.toLocaleString()} results`
                    },
                  }}
                />
              </Typography>
              {mobileView && (
                <Button
                  variant='outlined'
                  color='primary'
                  startIcon={<TuneIcon />}
                  onClick={handleFiltersDrawerOpen}
                >
                  Filters
                </Button>
              )}
            </Box>
            <Box className={classes.sortRow}>
              {!mobileView && (
                <PremiumResourcesSwitch
                  checked={premiumResources}
                  onChange={setPremiumResources}
                />
              )}
              <Box className={classes.sortBlock}>
                <Box>
                  <Typography className='search-sort'>
                    Sort by: &nbsp;
                  </Typography>
                </Box>
                <SortBy
                  defaultRefinement={algoliaSearchIndexId}
                  items={searchIndices}
                />
              </Box>
            </Box>
            <Grid container>
              <Grid item className='search-filters'>
                <Box>
                  <CustomCurrentRefinements />
                </Box>
              </Grid>
              <Grid item>
                <Hits hitComponent={HitComponent} />
              </Grid>
            </Grid>
            <Box py={3}>
              <Pagination
                showFirst={true}
                showPrevious={false}
                showNext={false}
                showLast={true}
                className='search-pagination'
                translations={{
                  first: '<',
                  last: '>',
                  ariaFirst: 'First page',
                  ariaLast: 'Last page',
                  page(currentRefinement) {
                    return currentRefinement
                  },
                  ariaPage(currentRefinement) {
                    return `Page ${currentRefinement}`
                  },
                }}
              />
            </Box>
          </Grid>
        </InstantSearch>
      </Grid>
    )
  }
}

App.proptypes = {
  searchState: PropTypes.object,
  resultsState: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onSearchStateChange: PropTypes.func,
  createURL: PropTypes.func,
  indexName: PropTypes.string,
  searchClient: PropTypes.object,
}

export default withStyles(useStyles)(App)
