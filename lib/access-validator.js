/**
 * This library has business logic to determine if a user will have access to resources
 */

/**
 * Term names defined in piano
 * @TODO Probably need to update or use a new approach so this isnt hardcoded
 */
const PTN = Object.freeze({
  DIGITAL_BASIC_ANNUAL: 'Digital - Basic - Annual',
  STANDARD_SELECT_MONTHLY: 'Standard - Select - Monthly',
  REGISTRATION: 'Registration',
  PAID_SUBSCRIPTIONS_KEYWORDS: ['Basic', 'Select', 'Premium'],
  SELECT_SUBSCRIPTION_KEYWORD: 'Select',
  PREMIUM_SUBSCRIPTION_KEYWORD: 'Premium',
})

/**
 * Determine if a user has access to all the chapters of a book
 * @param {String} memberBook - Membership level for the book defined in the CMS
 * @param {Array} userAccountAccess - A users terms and resources as defined by piano
 * @return {Boolean}
 */
export const hasAccessToBook = (memberBook, userAccountAccess) => {
  let hasAccess = false

  if (memberBook && userAccountAccess) {
    switch (memberBook) {
      case PTN.SELECT_SUBSCRIPTION_KEYWORD:
        hasAccess = hasTermResourceKeyword(
          [PTN.SELECT_SUBSCRIPTION_KEYWORD, PTN.PREMIUM_SUBSCRIPTION_KEYWORD],
          userAccountAccess
        )
        break
      case PTN.PREMIUM_SUBSCRIPTION_KEYWORD:
        hasAccess = hasTermResourceKeyword(
          [PTN.PREMIUM_SUBSCRIPTION_KEYWORD],
          userAccountAccess
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
  userTerms ? hasTermKeyword(PTN.PAID_SUBSCRIPTIONS_KEYWORDS, userTerms) : false

/**
 * Searches a users access list to find if any of the terms match the term keywords
 *
 * @param {Array} termsToFind
 * @param {Array} userAccountAccess - A users terms and resources as defined by piano
 * @returns {Boolean}
 */
const hasTermResourceKeyword = (termsToFind, userAccountAccess) =>
  userAccountAccess.find(
    (item) =>
      termsToFind.find((keyword) => item.term?.name.includes(keyword)) !==
        undefined ||
      termsToFind.find((keyword) => item.resource?.name.includes(keyword)) !==
        undefined
  ) !== undefined

/**
 * Searches a users access list to find if any of the terms match the term keywords
 *
 * @param {Array} termsToFind
 * @param {Array} userTerms - A users terms as defined by piano
 * @returns {Boolean}
 * @deprecated Need to also check resource name
 */
const hasTermKeyword = (termsToFind, userTerms) =>
  userTerms.find(
    (item) =>
      termsToFind.find((keyword) => item.term.name.includes(keyword)) !==
      undefined
  ) !== undefined

/**
 * Will search a users terms to make sure atleast 1 term does NOT match the provided term
 *
 * @param {String} term
 * @param {Array} userTerms - A users terms as defined by piano
 * @returns {Boolean}
 */
const hasTermThatDoesNotMatch = (term, userTerms) =>
  userTerms?.find((item) => term !== item.term.name) !== undefined
