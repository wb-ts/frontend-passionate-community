export default {
  about: '/about',

  contact: '/contact',

  events: '/events',

  podcasts: '/podcasts',

  videos: '/videos',

  webinars: '/webinars',

  // EL.
  el({ slug }) {
    return `/el/${slug}`
  },

  // Profile.
  authors: '/authors',
  author({ slug }) {
    return `/people/${slug}`
  },
  profile({ slug }) {
    return `/people/${slug}`
  },

  //Activate
  activate: '/activate',

  //Communities
  communities: 'communities',

  //Services
  services: 'services',

  //Subscribe
  subscribe: '/memberships',

  //Subscribe
  membershipDetails: '/membership-details',

  // EL Articles.
  article({ slug }) {
    return `/el/articles/${slug}`
    // return {
    //   href: `/el/articles/${slug}`,
    //   as: `/el/articles/${slug}`,
    // }
  },

  // Blogs.
  blog({ slug }) {
    return `/blogs/${slug}`
  },

  // Workshops.
  workshop({ slug }) {
    if (slug) {
      return `/workshops/${slug}`
    } else {
      return '/workshops'
    }
  },

  // FAQs.
  faq({ slug }) {
    return `/faq?service=${slug}`
  },

  // Podcasts.
  podcast({ slug }) {
    return `/podcasts/${slug}`
  },

  // Videos.
  video({ slug }) {
    return `/videos/${slug}`
  },

  // Webinars.
  webinar({ slug }) {
    return `/webinars/${slug}`
  },

  // Events.
  event({ slug }) {
    return `/events/${slug}`
  },

  // Search.
  search({
    query = '',
    types = [],
    topics = [],
    grades = [],
    subjects = [],
    roles = [],
    bookFilters = [],
    authors = [],
    featured = [],
    sortBy = [],
  }) {
    const baseUrl = `/search?`

    let tail = ''
    if (query) {
      tail += `query=${query}`
    }
    types.forEach((type, key) => {
      tail += `refinementList[type][${key}]=${type}&`
    })

    topics.forEach((topic, key) => {
      tail += `refinementList[topic][${key}]=${topic}&`
    })

    grades.forEach((grade, key) => {
      tail += `refinementList[grade][${key}]=${grade}&`
    })

    subjects.forEach((subject, key) => {
      tail += `refinementList[subject][${key}]=${subject}&`
    })

    roles.forEach((role, key) => {
      tail += `refinementList[role][${key}]=${role}&`
    })

    bookFilters.forEach((filter, key) => {
      tail += `refinementList[bookFilters][${key}]=${filter}&`
    })

    authors.forEach((author, key) => {
      tail += `refinementList[author][${key}]=${author}&`
    })
    featured.forEach((featured, key) => {
      tail += `refinementList[featured][${key}]=${featured}&`
    })
    sortBy.forEach((sort) => {
      tail += `&sortBy=${sort}`
    })

    return baseUrl + encodeURI(tail)
  },

  // Books
  book({ slug, variant = null }) {
    if (variant) return `/books/${slug}?variant=${variant}`
    return `/books/${slug}`
  },

  // Collection
  collection({ slug }) {
    return `/collections/${slug}`
  },
}
