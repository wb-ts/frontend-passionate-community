import React from 'react'
import PropTypes from 'prop-types'
import TextStyle from '../../atoms/TextStyle'
import useProductInventory from '../../../lib/hooks/useProductInventory'
import Skeleton from '@material-ui/lab/Skeleton'
/**
 * @typedef {string} DisplayVariants
 **/

/**
 * @enum {DisplayVariants}
 */
export const DISPLAY_VARIANTS = {
  SEATS_REMAINING: 'SEATS_REMAINING',
}

/**
 * Displays the seats remaining for a product id. Specify a variant to change the display.
 * @param {string} id
 * @param {DisplayVariants} displayVariant
 * @returns {Component}
 */
const InventorySummary = ({ id, displayVariant }) => {
  const { productInventory, loading } = useProductInventory(id)

  const SeatsRemaining = () => (
    <TextStyle variant='h4' color='#00A77E'>
      {productInventory && productInventory.stock > 0 ? (
        <>{`ONLY ${productInventory.stock} SEATS REMAINING`}</>
      ) : (
        <>NO SEATS REMAINING</>
      )}
    </TextStyle>
  )

  const _renderVariant = () => {
    switch (displayVariant) {
      case DISPLAY_VARIANTS.SEATS_REMAINING:
        return <SeatsRemaining />
    }
  }

  return (
    <>
      {loading ? (
        <Skeleton
          variant='rect'
          width={'100%'}
          height={'28px'}
          animation={false}
        />
      ) : (
        id && _renderVariant()
      )}
    </>
  )
}

export default InventorySummary

InventorySummary.propTypes = {
  id: PropTypes.string,
  displayVariant: PropTypes.oneOf(Object.values(DISPLAY_VARIANTS)),
}

InventorySummary.defaultProps = {
  displayVariant: DISPLAY_VARIANTS.SEATS_REMAINING,
}