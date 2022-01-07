import React from 'react'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import { Tooltip } from '@mui/material'
import { constSnipcart } from '../../const'
import { encodeSnipcartOrderValidationUrl } from '../../lib/utils'

export default function SnipcartButton({
  snipcart,
  className,
  onclick = null,
}) {
  const description = documentToPlainTextString(snipcart.dataItemDescription)
  const preorderText =
    'Pre-order today and we will ship your book on or around '
  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }
  const releaseDate = snipcart.productReleaseDate
    ? !isNaN(Date.parse(snipcart.productReleaseDate))
      ? snipcart.productReleaseDate
      : ''
    : ''
  return (
    <Tooltip
      title={
        snipcart.dataItemCustom4Value
          ? releaseDate
            ? preorderText +
              new Date(
                Date.parse(snipcart.productReleaseDate)
              ).toLocaleDateString('en-US', dateOptions)
            : ''
          : ''
      }
    >
      <button
        className={`snipcart-add-item ${className}`}
        data-item-id={snipcart.dataItemId}
        data-item-price={snipcart.dataItemPrice}
        data-item-file-guid={snipcart.digitalFileGuid}
        data-item-taxable={snipcart.dataItemCustom5Value !== 'workshop'}
        data-item-weight={
          snipcart.dataItemCustom5Value === 'workshop'
            ? 0
            : snipcart.dataItemPrice
        }
        data-item-custom1-name='TaxJarCategory'
        data-item-custom1-value={snipcart.dataItemCustom1Value}
        data-item-custom1-type='hidden'
        data-item-custom1-required='false'
        data-item-custom2-name='RoyaltyFlag'
        data-item-custom2-value={snipcart.dataItemCustom2Value}
        data-item-custom2-type='hidden'
        data-item-custom2-required='false'
        data-cart-custom2-options='true|false'
        data-item-custom3-name='Authors'
        data-item-custom3-value={snipcart.dataItemCustom3Value}
        data-item-custom3-type='hidden'
        data-item-custom3-required='false'
        data-item-custom4-name='PreOrder'
        data-item-custom4-value={snipcart.dataItemCustom4Value}
        data-item-custom4-type='hidden'
        data-item-custom4-required='false'
        data-cart-custom4-options='true|false'
        data-item-custom5-name='ProductType'
        data-item-custom5-value={snipcart.dataItemCustom5Value}
        data-item-custom5-type='hidden'
        data-item-custom5-required='false'
        data-item-custom6-name='ProductSlug'
        data-item-custom6-value={snipcart.dataItemCustom6Value}
        data-item-custom6-type='hidden'
        data-item-custom6-required='false'
        data-item-custom7-name='ProductDate'
        data-item-custom7-value={snipcart.dataItemCustom7Value}
        data-item-custom7-type='hidden'
        data-item-custom7-required='false'
        data-item-url={encodeSnipcartOrderValidationUrl(
          snipcart.dataItemId,
          snipcart.dataItemPrice,
          snipcart.digitalFileGuid,
          snipcart.dataItemCustom5Value
        )}
        data-item-description={
          snipcart
            ? description.substring(0, description.indexOf('.') + 1)
            : false
        }
        data-item-image={snipcart.dataItemImage}
        data-item-name={snipcart.dataItemName}
        data-item-quantity={snipcart.dataItemQuantity}
        onClick={() => (onclick ? onclick() : void 0)}
      >
        {snipcart.label.indexOf(constSnipcart.BTN_LABEL_PREORDER) === -1
          ? snipcart.label
          : '\u26A0 ' + snipcart.label}
      </button>
    </Tooltip>
  )
}
