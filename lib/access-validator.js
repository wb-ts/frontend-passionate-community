/* eslint-disable no-unused-vars */
/**
 * This library has business logic to determine if a user will have access to resources
 */

import { PIANO_TERM_NAMES as PTN } from '@/const/piano-term-names'

/**
 * Determine if a user has access to all the chapters of a book
 * @param {String} memberBook - Membership level for the book defined in the CMS
 * @param {Array} userTerms - A users terms as defined by piano
 * @return {Boolean}
 */
export const hasAccessToBook = (memberBook, userTerms) => {
  let hasAccess = false

  if (memberBook && userTerms) {
    switch (memberBook) {
      case PTN.SELECT_SUBSCRIPTION_KEYWORD:
        hasAccess = hasTermKeyword(
          [PTN.SELECT_SUBSCRIPTION_KEYWORD, PTN.PREMIUM_SUBSCRIPTION_KEYWORD],
          userTerms
        )
        break
      case PTN.PREMIUM_SUBSCRIPTION_KEYWORD:
        hasAccess = hasTermKeyword(
          [PTN.PREMIUM_SUBSCRIPTION_KEYWORD],
          userTerms
        )
        break
    }
  }

  return hasAccess
}

/**
 * Determine if a user has access to member discounts on books
 * If the user has only fremium access they do not qualify
 * @param {Array} userTerms - A users terms as defined by piano
 * @return {Boolean}
 */
export const hasMemberBookPrice = (userTerms) =>
  hasTermThatDoesNotMatch([PTN.REGISTRATION], userTerms)

/**
 * Determine if a user has atleast 1 paid membership term
 * @param {Array} userTerms - A users terms as defined by piano
 * @return {Boolean}
 */
export const validatePaidMembership = (userTerms) =>
  hasTermKeyword(PTN.PAID_SUBSCRIPTIONS_KEYWORDS, userTerms)

/**
 * Searches a users access list to find if any of the terms match the term keywords
 *
 * @param {Array} termsToFind
 * @param {Array} userTerms - A users terms as defined by piano
 * @returns {Boolean}
 */
const hasTermKeyword = (termsToFind, userTerms) =>
  userTerms.find(
    (item) =>
      termsToFind.find((keyword) => item.term.name.includes(keyword)) !==
      undefined
  ) !== undefined

/**
 * Searches a users access list to find if any of the terms match
 *
 * @param {Array} termsToFind
 * @param {Array} userTerms - A users terms as defined by piano
 * @returns {Boolean}
 */
const hasTerm = (termsToFind, userTerms) =>
  userTerms.find((item) => termsToFind.includes(item.term.name)) || false

/**
 * Will search a users terms to make sure atleast 1 term does NOT match the provided term
 *
 * @param {String} term
 * @param {Array} userTerms - A users terms as defined by piano
 * @returns {Boolean}
 */
const hasTermThatDoesNotMatch = (term, userTerms) =>
  userTerms.find((item) => term !== item.term.name) || false
