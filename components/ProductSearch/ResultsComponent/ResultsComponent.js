import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { Box, Grid, Button } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import PropTypes from 'prop-types'
import { useEffect, useRef} from 'react'
import {
  connectHits,
  connectInfiniteHits,
  connectStateResults,
} from 'react-instantsearch-dom'
import { branch } from 'react-recompose'
import { options } from '../../../const'
import { CustomPagination } from '../plugins'
/**
 * Use the widget to display a list of results.
 * @param {Boolean} isInfinite if True, display an infinite list of results with a “Load more” button, else display with Pagination
 * @param {Component} ItemCard
 * @returns
 */

export const ResultHits = ({
  hits,
  isInfinite,
  hasPrevious,
  refinePrevious,
  hasMore,
  refineNext,
  RenderResults,
  searchState,
  searchResults,
  isSearchStalled,
  isPeople = false,
  isClicked ,
  setIsClickedLoadMore,
  previousHits,
  setPreviousHits
}) => {

  useEffect(()=>{

    if( isPeople && previousHits.length && previousHits.length != hits.length) {
      let first =  previousHits[previousHits.length-1].lastName[0] , flag = 0;
      for(let i = 0 ; i < hits.length ; i++){
        if ( first < hits[i].lastName[0] ) {
          flag = 1;
          break;
        }
      }
      if(flag) {
        setIsClickedLoadMore(false);
        return;
      }
      else {
        setPreviousHits(hits);
        refineNext();
      }
    }
  },[hits])

  useEffect (()=> {
    if(isPeople && isClicked) {
      setPreviousHits(hits);
      refineNext();
    }
    
  } , [isClicked])


  const sentinel = useRef(null);

  const onSentinelIntersection = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && hasMore) {
        setIsClickedLoadMore(true);
      }
    });
  }

  const options = {
    root : null ,
    rootMargin : "0px" ,
    threshold : 1.0
  }

  useEffect (()=> {
    const observer = new IntersectionObserver(onSentinelIntersection , options);
    if(sentinel.current) observer.observe(sentinel.current);
  },[sentinel , options])

  const hasResults = searchResults && searchResults.nbHits !== 0
  return (
    <Box display='flex' justifyContent='center' alignItems='center' sx={{width: '100%'}}>
      
        <Box sx={{ width: '100%' }}>
          {hasResults ? (
            <Box sx={{ flexGrow: 1 }}>
              <RenderResults hits={hits} />
              { ((!isPeople && isSearchStalled) || (isPeople && isClicked)) &&
                <Box data-testid='circularprogress-id' textAlign="center">
                  <CircularProgress color='inherit' />
                </Box>
              }
              {
              isPeople ? 
                <Box ref={sentinel}></Box>
                :
                isInfinite ? (
                  <Box my={10}>
                    <Button
                      disabled={!hasMore}
                      onClick={()=>{isPeople ? setIsClickedLoadMore(true) : refineNext() }}
                      startIcon={<ArrowDownwardIcon />}
                    >
                      Load More
                    </Button>
                  </Box>
                ) : (
                  <Box>
                    <CustomPagination />
                  </Box>
                )
              }
            </Box>
          ) : (
            <Box data-testid='no-results-id'>
              No results found for <strong>{searchState.query}</strong>.
            </Box>
          )}
        </Box>
      
    </Box>
  )
}

ResultHits.propTypes = {
  hits: PropTypes.arrayOf(PropTypes.object),
  isInfinite: PropTypes.bool,
  hasMore: PropTypes.bool,
  refineNext: PropTypes.func,
  RenderResults: PropTypes.elementType,
  hasPrevious: PropTypes.bool,
  refinePrevious: PropTypes.func,
  searchState: PropTypes.object,
  isSearchStalled: PropTypes.bool,
  isPeople: PropTypes.bool,
  isClicked: PropTypes.bool,
  setIsClickedLoadMore: PropTypes.func,
  previousHits: PropTypes.arrayOf(PropTypes.object),
  setPreviousHits: PropTypes.func
}

const ResultsComponent = branch(
  ({ isInfinite }) => isInfinite,
  connectInfiniteHits,
  connectHits
)(connectStateResults(ResultHits))

export default ResultsComponent
