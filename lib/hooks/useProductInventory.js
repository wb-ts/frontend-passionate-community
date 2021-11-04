import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import fetchProduct from '../fetches/fetchProduct'

/**
 * Hook to provide Inventory information for a specifed product id
 *
 * @param {string} id
 * @return {Object} productInventory, lazyLoadProductInventory
 */
const useProductInventory = (id) => {
  const [productInventory, setProductInventory] = useState()
  const [loading, setLoading] = useState()

  const resetProductInventory = () =>
    setProductInventory({
      id: id,
      stock: undefined,
      allowOutOfStockPurchases: undefined,
    })

  const lazyLoadProductInventory = async (id) => {
    if ((!productInventory && id) || productInventory?.id !== id) {
      try {
        setLoading(true)
        const data = await fetchProduct(id)
        setLoading(false)
        setProductInventory({
          id: id,
          stock: data?.stock ? Number.parseInt(data?.stock) : undefined,
          allowOutOfStockPurchases: data?.allowOutOfStockPurchases,
        })
      } catch (e) {
        setLoading(false)
        resetProductInventory()
      }
    } else if (!id) {
      resetProductInventory()
    }
  }

  useEffect(() => lazyLoadProductInventory(id), [id])

  return { productInventory, lazyLoadProductInventory, loading }
}

export default useProductInventory

useProductInventory.propTypes = {
  id: PropTypes.string,
}
