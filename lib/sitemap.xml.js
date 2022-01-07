import fs from 'fs'
import { client } from './contentful'

const Sitemap = ({ title, content }) => {
  return (
    <div>
      <h1>{title}</h1>
      <h3>{content}</h3>
    </div>
  )
}

async function getContentTypeEntries(contentType) {
  let offset = 0
  let items = []
  const MAX_LIMIT = 50
  let processedEntries = null

  offset = 0
  items = []
  processedEntries = null
  while (processedEntries !== 0) {
    const entries = await client.getEntries({
      content_type: contentType,
      skip: offset,
      limit: contentType == 'book' ? 1 : MAX_LIMIT,
      select:
        contentType == 'book' ? 'fields.slug,fields.chapters' : 'fields.slug',
      include: 1,
    })

    processedEntries = entries.items.length

    if (processedEntries > 0) {
      offset += processedEntries
      items.push(...entries.items)
    }
  }

  return items
}

export async function getServerSideProps({ res }) {
  if (process.env.NEXT_PUBLIC_BASE_PATH !== 'ascd.org')
    return {
      props: {
        title: 'No Sitemap',
        content: 'Sitemap only for live site',
      },
    }

  const baseUrl = {
    'localhost:3000': 'http://localhost:3000',
    'dev.ksvc.ascd.org': 'https://dev.ksvc.ascd.org',
    'stage.ksvc.ascd.org': 'https://stage.ksvc.ascd.org',
    'ascd.org': 'https://www.ascd.org',
  }[process.env.NEXT_PUBLIC_BASE_PATH]

  const ignoreList = [
    '.DS_Store',
    '_app.js',
    '_document.js',
    '_error.js',
    'sitemap.xml.js',
    '404.js',
    '500.js',
    '[...slug].js',
    'api',
    'user',
  ]

  /** Directories that contain other pages ie /all or /write */
  const withOtherPages = ['affiliates', 'el', 'people']

  const ignoreListSubPages = ['[slug].js', 'index.js', 'articles']

  const staticPages = fs
    .readdirSync('pages')
    .filter((staticPage) => {
      return !ignoreList.includes(staticPage)
    })
    .map((staticPagePath) => {
      return `${baseUrl}/${staticPagePath}`
    })

  const internalStaticPages = withOtherPages
    .map((subRootDir) => {
      return fs
        .readdirSync(`pages/${subRootDir}`)
        .filter((staticPage) => {
          return !ignoreListSubPages.includes(staticPage)
        })
        .map((subpath) => {
          return `${baseUrl}/${subRootDir}/${subpath}`
        })
    })
    .flat()

  const publications = await getContentTypeEntries('pubissue')
  const books = await getContentTypeEntries('book')
  const articles = await getContentTypeEntries('article')
  const blogs = await getContentTypeEntries('blog')
  const pages = await getContentTypeEntries('page')
  const podcasts = await getContentTypeEntries('book')
  const videos = await getContentTypeEntries('video')
  const webinars = await getContentTypeEntries('webinar')
  const events = await getContentTypeEntries('event')
  const profiles = await getContentTypeEntries('profile')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
        .map((url) => {
          return `
            <url>
              <loc>${url.replace('.js', '').replace('/index', '/')}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `
        })
        .join('')}

      ${internalStaticPages
        .map((url) => {
          return `
            <url>
              <loc>${url.replace('.js', '').replace('/index', '/')}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `
        })
        .join('')}

      ${books
        .map((book) => {
          if (book.fields.chapters && book.fields.chapters.length > 0) {
            const chapters = book.fields.chapters
              .filter((chapter) => chapter.fields && chapter.fields.slug)
              .map((chapter) => {
                return `
                  <url>
                    <loc>${baseUrl}/books/${book.fields.slug}?chapter=${
                  chapter.fields.slug
                }</loc>
                    <lastmod>${new Date().toISOString()}</lastmod>
                    <changefreq>monthly</changefreq>
                    <priority>1.0</priority>
                  </url>
                `
              })
            chapters.unshift(`
              <url>
                <loc>${baseUrl}/books/${book.fields.slug}</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
                <changefreq>monthly</changefreq>
                <priority>1.0</priority>
              </url>
            `)
            return chapters
          } else {
            return `
              <url>
                <loc>${baseUrl}/books/${book.fields.slug}</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
                <changefreq>monthly</changefreq>
                <priority>1.0</priority>
              </url>
            `
          }
        })
        .join('')}

        ${publications
          .map((publication) => {
            return `
              <url>
                <loc>${baseUrl}/el/${publication.fields.slug}</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
                <changefreq>monthly</changefreq>
                <priority>1.0</priority>
              </url>
            `
          })
          .join('')}

        

        ${articles
          .map((article) => {
            return `
                <url>
                  <loc>${baseUrl}/el/articles/${article.fields.slug}</loc>
                  <lastmod>${new Date().toISOString()}</lastmod>
                  <changefreq>monthly</changefreq>
                  <priority>1.0</priority>
                </url>
              `
          })
          .join('')}

        ${blogs
          .map((blog) => {
            return `
                <url>
                  <loc>${baseUrl}/blogs/${blog.fields.slug}</loc>
                  <lastmod>${new Date().toISOString()}</lastmod>
                  <changefreq>monthly</changefreq>
                  <priority>1.0</priority>
                </url>
              `
          })
          .join('')}

        ${pages
          .map((page) => {
            return `
                <url>
                  <loc>${baseUrl}/${page.fields.slug}</loc>
                  <lastmod>${new Date().toISOString()}</lastmod>
                  <changefreq>monthly</changefreq>
                  <priority>1.0</priority>
                </url>
              `
          })
          .join('')}

        ${podcasts
          .map((podcast) => {
            return `
                <url>
                  <loc>${baseUrl}/podcasts/${podcast.fields.slug}</loc>
                  <lastmod>${new Date().toISOString()}</lastmod>
                  <changefreq>monthly</changefreq>
                  <priority>1.0</priority>
                </url>
              `
          })
          .join('')}

        ${videos
          .map((video) => {
            return `
                <url>
                  <loc>${baseUrl}/videos/${video.fields.slug}</loc>
                  <lastmod>${new Date().toISOString()}</lastmod>
                  <changefreq>monthly</changefreq>
                  <priority>1.0</priority>
                </url>
              `
          })
          .join('')}

        ${webinars
          .map((webinar) => {
            return `
                <url>
                  <loc>${baseUrl}/webinars/${webinar.fields.slug}</loc>
                  <lastmod>${new Date().toISOString()}</lastmod>
                  <changefreq>monthly</changefreq>
                  <priority>1.0</priority>
                </url>
              `
          })
          .join('')}

        ${events
          .map((event) => {
            return `
                <url>
                  <loc>${baseUrl}/events/${event.fields.slug}</loc>
                  <lastmod>${new Date().toISOString()}</lastmod>
                  <changefreq>monthly</changefreq>
                  <priority>1.0</priority>
                </url>
              `
          })
          .join('')}

        ${profiles
          .map((profile) => {
            return `
                <url>
                  <loc>${baseUrl}/people/${profile.fields.slug}</loc>
                  <lastmod>${new Date().toISOString()}</lastmod>
                  <changefreq>monthly</changefreq>
                  <priority>1.0</priority>
                </url>
              `
          })
          .join('')}
        
    </urlset>
  `

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default Sitemap
