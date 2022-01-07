import React, { useState, useEffect } from 'react'
import { useReactiveVar } from '@apollo/client'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import { hasMemberBookPriceVar } from '../../lib/apollo-client/cache'
import { fetchProductPricesByProductNumbers } from '../../lib/contentful'
import useProductInventory from '../../lib/hooks/useProductInventory'
import useUserAccount from '../../lib/hooks/useUserAccount'
import {
  getSnipcartClient,
  encodeSnipcartOrderValidationUrl,
} from '../../lib/utils'
import ModalMessageBox from '../organisms/ModalMessageBox'

/**
 * Snipcart is a third party app service that we are using for buying items such as books.
 * This is used to manage the interaction with the snipcart and the userAccountUser account information.
 * There is nothing to display on the site, this component is just used to update snipcart state.
 *
 *
 * @return {Component}
 */
const SnipcartManager = React.memo(() => {
  const hasMemberBookPrice = useReactiveVar(hasMemberBookPriceVar)
  const { userAccountUser } = useUserAccount()
  const [snipcartClient, setSnipcartClient] = useState(getSnipcartClient())
  const [currentPianoId, setCurrentPianoId] = useState()
  const [openModal, setOpenModal] = useState(false)
  const [backOrderItemlist, setbackOrderItemlist] = useState([])
  const { productInventory, lazyLoadProductInventory } = useProductInventory()

  const backOrderMessage =
    'A book placed in your cart is on backorder. Place your order now and we will ship it to you as soon as we receive fresh copies to our warehouse (typically within a couple weeks). '

  // Get Snipcart client
  useEffect(() => {
    if (!snipcartClient) {
      document.addEventListener('snipcart.ready', () => {
        setSnipcartClient(window.Snipcart)
      })
    }
  }, [])

  // Use Snipcart item event callback to set an array of back order product numbers to
  // the cart's metadata (i.e., key back-order-items)

  useEffect(() => {
    if (snipcartClient) {
      //Snipcart item.added
      snipcartClient.events.on('item.added', (item) => {
        lazyLoadProductInventory(item?.id)
      })
      //Snipcart item.updated
      snipcartClient.events.on('item.updated', (item) => {
        lazyLoadProductInventory(item?.id)
      })
      //Snipcart item.removed
      snipcartClient.events.on('item.removed', (item) => {
        let backOrderItems = []
        const cartMetadata = snipcartClient?.store?.getState()?.cart?.metadata
        if (cartMetadata && cartMetadata['back-order-items']) {
          backOrderItems = cartMetadata['back-order-items']
          setCartMetadata(
            !cartMetadata['piano-id-uid'] ? null : cartMetadata['piano-id-uid'],
            updatedArray(backOrderItems, item.id)
          )
        }
      })
    }
  }, [snipcartClient])

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

  // Set the piano id if userAccountUser id changes
  useEffect(() => {
    if (userAccountUser?.uid !== currentPianoId) {
      setCurrentPianoId(userAccountUser?.uid)
    }
  }, [userAccountUser])

  // Update Piano userAccountUser id if it doenst match current snipcart info
  useEffect(() => {
    if (snipcartClient) {
      const metadata = snipcartClient?.store?.getState()?.cart?.metadata
      if (
        (!metadata && !currentPianoId) ||
        (metadata && metadata['piano-id-uid'] !== currentPianoId)
      ) {
        // Use function setCartMetadata to set values of its keys
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
  }, [hasMemberBookPrice])

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
        const bookPrices = []

        response.items.forEach((product) => {
          const newPrice = hasMemberBookPrice
            ? product.fields.priceMember
            : product.fields.priceNonMember
          const item = cartItemsInfo.find(
            (item) => item.productNumber === product.fields.productNumber
          )
          if (newPrice !== item?.price) {
            bookPrices.push({
              uniqueId: item?.uniqueId,
              price: hasMemberBookPrice
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
        console.warn(
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
    }
    snipcartClient.api.cart
      .update({
        metadata: {
          'piano-id-uid': id,
          'back-order-items': backOrderItems,
        },
      })
      .catch((e) => {
        throw Error(
          `Unable to add back order items to snipcart. | ${e.message}`
        )
      })
  }

  useEffect(() => {
    if (productInventory) {
      processInventoryCheck(productInventory)
    }
  }, [productInventory])

  const processInventoryCheck = (productInventory) => {
    let backOrderItems = []
    const cart = snipcartClient?.store?.getState()?.cart
    const item = cart?.items?.items?.find(
      (item) => item.id === productInventory.id
    )
    const cartMetadata = cart?.metadata

    if (
      Number.parseInt(item?.quantity) >
      Number.parseInt(productInventory.stock || 0)
    ) {
      if (!cartMetadata) {
        backOrderItems = [...backOrderItems, item.id]
        setCartMetadata(!currentPianoId ? null : currentPianoId, backOrderItems)
        setbackOrderItemlist(getProductNames(backOrderItems, cart?.items))
        setOpenModal(true)
      } else if (!cartMetadata['back-order-items']) {
        backOrderItems = [...backOrderItems, item.id]
        setCartMetadata(
          !cartMetadata['piano-id-uid'] ? null : cartMetadata['piano-id-uid'],
          backOrderItems
        )
        setbackOrderItemlist(getProductNames(backOrderItems, cart?.items))
        setOpenModal(true)
      } else if (!cartMetadata['back-order-items'].includes(item.id)) {
        backOrderItems = [...cartMetadata['back-order-items'], item.id]
        setCartMetadata(
          !cartMetadata['piano-id-uid'] ? null : cartMetadata['piano-id-uid'],
          backOrderItems
        )
        setbackOrderItemlist(getProductNames(backOrderItems, cart?.items))
        setOpenModal(true)
      }
    } else {
      if (cartMetadata && cartMetadata['back-order-items'] && item) {
        backOrderItems = cartMetadata['back-order-items']
        setCartMetadata(
          !cartMetadata['piano-id-uid'] ? null : cartMetadata['piano-id-uid'],
          updatedArray(backOrderItems, item.id)
        )
      } else if (cartMetadata && item) {
        setCartMetadata(
          !cartMetadata['piano-id-uid'] ? null : cartMetadata['piano-id-uid'],
          updatedArray(backOrderItems, item.id)
        )
      }
    }
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
      style={{ zIndex: 1800 }}
    ></ModalMessageBox>
  )
})

export default SnipcartManager

/**
 * add items to cart.
 */
export const addItemsToCart = async (items) => {
  //make product items from items based on the interface product definition
  //https://docs.snipcart.com/v3/sdk/reference#core-models-ProductDefinition
  //it also matches with SnipcartButton props
  const productItems = items.map((item) => {
    const description = documentToPlainTextString(item.dataItemDescription)
    const productItem = {
      id: item.dataItemId,
      price: item.dataItemPrice,
      fileGuid: item.digitalFileGuid,
      weight: item.dataItemPrice,
      customFields: [
        {
          name: 'TaxJarCategory',
          value: item.dataItemCustom1Value,
          type: 'hidden',
          required: 'false',
        },
        {
          name: 'RoyaltyFlag',
          value: item.dataItemCustom2Value,
          type: 'hidden',
          required: 'false',
          options: 'true|false',
        },
        {
          name: 'Authors',
          value: item?.dataItemCustom3Value?.join(),
          type: 'hidden',
          required: 'false',
        },
        {
          name: 'PreOrder',
          value: item.dataItemCustom4Value,
          type: 'hidden',
          required: 'false',
          options: 'true|false',
        },
        {
          name: 'ProductType',
          value: item.dataItemCustom5Value,
          type: 'hidden',
          required: 'false',
        },
        {
          name: 'ProductSlug',
          value: item.dataItemCustom6Value,
          type: 'hidden',
          required: 'false',
        },
        {
          name: 'ProductDate',
          value: item.dataItemCustom7Value,
          type: 'hidden',
          required: 'false',
        },
      ],
      url: encodeSnipcartOrderValidationUrl(
        item.dataItemId,
        item.dataItemPrice,
        item.digitalFileGuid,
        item.dataItemCustom5Value
      ),
      description: item
        ? description.substring(0, description.indexOf('.') + 1)
        : false,
      image: item.dataItemImage,
      name: item.dataItemName,
      quantity: item.dataItemQuantity,
    }
    return productItem
  })
  try {
    const snipcartClient = getSnipcartClient()
    //get the current items in the cart
    const currentItems = snipcartClient.store.getState().cart.items.items
    for (const productItem of productItems) {
      //check new item exists in the current cart
      const existingItem = currentItems.find(
        (currentItem) => currentItem.id === productItem.id
      )
      if (existingItem) {
        //if the new item exists in the cart, increase the quantity only
        const result = await snipcartClient.api.cart.items.update({
          ...existingItem,
          quantity: existingItem.quantity + productItem.quantity,
        })
      } else {
        //if the new item does not exist, add the new item
        const result = await snipcartClient.api.cart.items.add(productItem)
      }
    }
    //open the cart modal
    snipcartClient.api.theme.cart.open()
  } catch (error) {
    console.log('error ', error)
  }
}
