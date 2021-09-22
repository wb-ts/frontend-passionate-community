import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '@/context/state'
import { hasMemberBookPrice } from '@/lib/access-validator'
import { getSnipcartClient } from '@/lib/utils'
import { fetchProductPricesByProductNumbers } from '@/lib/contentful'
import { getProductFromSnipcart } from '@/lib/utils'
import ModalMessageBox from '@/components/organisms/ModalMessageBox'

/**
 * Snipcart is a third party app service that we are using for buying items such as books.
 * This is used to manage the interaction with the snipcart and the user account information.
 * There is nothing to display on the site, this component is just used to update snipcart state.
 *
 *
 * @return {Component}
 */
const SnipcartManager = () => {
  const { user, userAccessData } = useContext(AppContext)
  const [snipcartClient, setSnipcartClient] = useState(getSnipcartClient())
  const [currentPianoId, setCurrentPianoId] = useState()
  const [openModal, setOpenModal] = useState(false)
  const [backOrderMessage, setBackOrderMessage] = useState('')
  const [backOrderItemlist, setbackOrderItemlist] = useState([])

  // Get Snipcart client
  useEffect(() => {
    const backOrderText =
      'A book placed in your cart is on backorder. Place your order now and we will ship it to you as soon as we receive fresh copies to our warehouse (typically within a couple weeks). '
    setBackOrderMessage(backOrderText)
    if (!snipcartClient) {
      document.addEventListener('snipcart.ready', () => {
        setSnipcartClient(window.Snipcart)
      })
    }
  }, [])

  // Use Snipcart item event callback to set an array of back order product numbers to
  // the cart's metadata (i.e., key back-order-items)

  /* Removed until finance is ready for backorder/preorder 
  useEffect(() => {
    if (snipcartClient) {
      //Snipcart item.added
      Snipcart.events.on('item.added', (item) => {
        processCartItemForBackOrder(item)
      })
      //Snipcart item.updated
      Snipcart.events.on('item.updated', (item) => {
        processCartItemForBackOrder(item)
      })
      //Snipcart item.removed
      Snipcart.events.on('item.removed', (item) => {
        processCartItemForBackOrder(item, true)
      })
    }
  }, [snipcartClient]) */

  useEffect(() => {
    if (snipcartClient) {
      snipcartClient.api.session.setLanguage('en', {
        errors: {
          quantity_out_of_stock: `We’re sorry, the title you’re looking for either hasn’t been
          published yet or was so popular it sold out and is on backorder.
          We'll get this book into our warehouse as soon as possible. Please
          check back again soon.`,
        },
      })
    }
  }, [snipcartClient])

  // Set the piano id if user id changes
  useEffect(() => {
    if (user?.id !== currentPianoId) {
      setCurrentPianoId(user?.id)
    }
  }, [user])

  // Update Piano user id if it doenst match current snipcart info
  useEffect(() => {
    if (snipcartClient) {
      const metadata = snipcartClient?.store?.getState()?.cart?.metadata
      if (
        (!metadata && !currentPianoId) ||
        (metadata && metadata['piano-id-uid'] !== currentPianoId)
      ) {
        //Use function setCartMetadata to set values of its keys
        //addPianoIdUid(currentPianoId)
        setCartMetadata(
          currentPianoId,
          !metadata
            ? null
            : !metadata['back-order-items']
            ? null
            : metadata['back-order-items']
        )
      }
    }
  }, [currentPianoId])

  // Update Product Prices if User Access Changes
  useEffect(() => {
    const cartItems = snipcartClient?.store?.getState()?.cart?.items?.items
    if (cartItems?.length > 0) {
      updateProductPrices(cartItems)
    }
  }, [userAccessData])

  const addPianoIdUid = (id) => {
    snipcartClient.api.cart
      .update({
        metadata: {
          'piano-id-uid': id,
        },
      })
      .catch((e) => {
        throw Error(`Unable to add piano-id-uid to snipcart. | ${e.message}`)
      })
  }

  const updateCartItemPrice = (item) =>
    snipcartClient.api.cart.items.update(item).catch((e) => {
      throw Error(`Unable to update product price in snipcart. | ${e.message}`)
    })

  const updateProductPrices = (cartItems) => {
    const productNumbers = cartItems.map((item) => item.id)
    const cartItemsInfo = cartItems.map((item) => ({
      uniqueId: item.uniqueId,
      productNumber: item.id,
      price: item.price,
    }))

    fetchProductPricesByProductNumbers(productNumbers)
      .then((response) => {
        const useMemberBookPrice = hasMemberBookPrice(userAccessData)
        const bookPrices = []

        response.items.forEach((product) => {
          const newPrice = useMemberBookPrice
            ? product.fields.priceMember
            : product.fields.priceNonMember
          const item = cartItemsInfo.find(
            (item) => item.productNumber === product.fields.productNumber
          )
          if (newPrice !== item?.price) {
            bookPrices.push({
              uniqueId: item?.uniqueId,
              price: useMemberBookPrice
                ? product.fields.priceMember
                : product.fields.priceNonMember,
            })
          }
        })
        if (bookPrices.length > 0) {
          Promise.all(bookPrices.map((item) => updateCartItemPrice(item)))
        }
      })
      .catch((e) => {
        throw Error(
          `Unable to update product prices in snipcart. | ${e.message}`
        )
      })
  }

  //@param id - value to set cart's metadata key piano-id-uid
  //@param backOrderItems - array of back order product numbers to set cart's metadata key back-order-items
  const setCartMetadata = (id, backOrderItems) => {
    if (backOrderItems) {
      if (!backOrderItems.length) {
        backOrderItems = null
      }
      snipcartClient.api.cart
        .update({
          metadata: {
            'piano-id-uid': id,
            // Removed until finance is ready for backorder/preorder  'back-order-items': backOrderItems,
          },
        })
        .catch((e) => {
          throw Error(
            `Unable to add back order items to snipcart. | ${e.message}`
          )
        })
    }
  }

  const getProductInventory = async (id) => {
    const data = await getProductFromSnipcart(id)
    try {
      return {
        stock: Number.parseInt(data.stock),
        allowOutOfStockPurchases: data.allowOutOfStockPurchases,
      }
    } catch (e) {
      throw Error(e.message)
    }
  }

  const processCartItemForBackOrder = (item, isRemoval = false) => {
    getProductInventory(item.id)
      .then((inventory) => {
        let backOrderItems = []
        const cart = snipcartClient?.store?.getState()?.cart
        const cartMetadata = cart?.metadata
        if (isRemoval) {
          if (cartMetadata && cartMetadata['back-order-items']) {
            backOrderItems = cartMetadata['back-order-items']
            setCartMetadata(
              !cartMetadata['piano-id-uid']
                ? null
                : cartMetadata['piano-id-uid'],
              updatedArray(backOrderItems, item.id)
            )
          }
        } else if (
          Number.parseInt(item.quantity) > Number.parseInt(inventory.stock)
        ) {
          if (!cartMetadata) {
            backOrderItems = [...backOrderItems, item.id]
            setCartMetadata(
              !currentPianoId ? null : currentPianoId,
              backOrderItems
            )
            setbackOrderItemlist(getProductNames(backOrderItems, cart?.items))
            setOpenModal(true)
          } else if (!cartMetadata['back-order-items']) {
            backOrderItems = [...backOrderItems, item.id]
            setCartMetadata(
              !cartMetadata['piano-id-uid']
                ? null
                : cartMetadata['piano-id-uid'],
              backOrderItems
            )
            setbackOrderItemlist(getProductNames(backOrderItems, cart?.items))
            setOpenModal(true)
          } else if (!cartMetadata['back-order-items'].includes(item.id)) {
            backOrderItems = [...cartMetadata['back-order-items'], item.id]
            setCartMetadata(
              !cartMetadata['piano-id-uid']
                ? null
                : cartMetadata['piano-id-uid'],
              backOrderItems
            )
            setbackOrderItemlist(getProductNames(backOrderItems, cart?.items))
            setOpenModal(true)
          }
        } else {
          if (cartMetadata && cartMetadata['back-order-items']) {
            backOrderItems = cartMetadata['back-order-items']
            setCartMetadata(
              !cartMetadata['piano-id-uid']
                ? null
                : cartMetadata['piano-id-uid'],
              updatedArray(backOrderItems, item.id)
            )
          }
        }
      })
      .catch((e) => {
        throw Error(e.message)
      })
  }

  const getProductNames = (productNumbers, cartItems) => {
    let productNames = []
    if (
      productNumbers &&
      productNumbers.length &&
      cartItems &&
      cartItems.count
    ) {
      productNumbers.map((productNumber) => {
        productNames = [
          ...productNames,
          cartItems.items.find((item) => item.id === productNumber)?.name,
        ]
      })
    }
    return productNames
  }

  const getProductString = (backOrderProducts) => {
    let backOrderProductList = ''
    if (backOrderProducts && backOrderProducts.length) {
      backOrderProducts.map(
        (el) => (backOrderProductList = backOrderProductList + el + ', ')
      )
      backOrderProductList = backOrderProductList.slice(0, -2)
    }
    const idx = backOrderProductList.lastIndexOf(',')
    if (idx > -1) {
      let arrBackOrderProductList = backOrderProductList.split('')
      arrBackOrderProductList.splice(idx, 1, ' and')
      backOrderProductList = arrBackOrderProductList.join('')
    }
    return backOrderProductList
  }

  const updatedArray = (arr, elementToRemove) => {
    try {
      const index = arr.indexOf(elementToRemove)
      if (index > -1) {
        arr.splice(index, 1)
      }
      return arr
    } catch (e) {
      throw Error(e.message)
    }
  }

  return (
    <ModalMessageBox
      openMessageBox={openModal}
      onMessageBoxClose={(value) => setOpenModal(value)}
      message={backOrderMessage}
      itemlist={backOrderItemlist}
    ></ModalMessageBox>
  )
}

export default SnipcartManager
