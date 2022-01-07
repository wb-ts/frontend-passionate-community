import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CloseIcon from '@mui/icons-material/Close'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionSummary,
  Box,
  Container,
  Divider,
  Grid,
  Button,
  AccordionDetails,
  Hidden,
  Modal,
  IconButton,
  Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import BannerMessage from '../../components/atoms/BannerMessage'
import CtaButton from '../../components/atoms/CtaButton'
import TextStyle from '../../components/atoms/TextStyle'
import Layout from '../../components/layout'
import HubSpotForm from '../../components/molecules/hubspotform'
import { components, hubspotFormIds, SEOHead } from '../../const'
import { client } from '../../lib/contentful'
import paths from '../../paths/path'

const useStyles = makeStyles((theme) => ({
  accordion: {
    backgroundColor: theme.palette.grey.extraLight,
    boxShadow: 'none',
    '& > *:first-child': {
      borderRadius: '4px',
    },
    '& > *:last-child': {
      borderRadius: '0 0 4px 4px',
    },
    '&.Mui-expanded': {
      '& > *:first-child': {
        borderRadius: '4px 4px 0 0',
      },
    },
    '& .MuiButton-endIcon': {
      marginLeft: 0,
    },
    '& .MuiButton-endIcon svg path': {
      fill: theme.palette.primary.main,
    },
  },
  verticalCenter: {
    height: '100%',
    alignContent: 'center',
    padding: 0,
    '& .MuiAccordionSummary-content': {
      margin: '24px 16px',
      '& .MuiBox-root': {
        marginLeft: 0,
      },
      [theme.breakpoints.up('sm')]: {
        margin: '28px 32px 24px',
      },
    },
    '& .MuiAccordionSummary-expandIcon': {
      marginRight: 0,
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      '& .MuiAccordionSummary-expandIcon': {
        width: '100%',
        backgroundColor: theme.palette.background.main,
        padding: '12px 16px',
        borderRadius: '0 0 4px 4px!important',
      },
      '& .MuiAccordionSummary-expandIcon .MuiIconButton-label': {
        width: '100%',
      },
      '& .MuiAccordionSummary-expandIcon .MuiIconButton-label .MuiBox-root': {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginRight: 0,
      },
    },
  },
  more: {
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '32px',
    letterSpacing: '0.2px',
  },
  '@global': {
    '.MuiAccordionSummary-content .MuiTypography-h5': {
      fontWeight: 'normal',
    },
    '.MuiAccordion-root': {
      backgroundColor: theme.palette.background.main,
    },
    '.MuiAccordionSummary-root': {
      backgroundColor: theme.palette.grey.extraLight,
      minHeight: '120px !important',
    },
    '.MuiGrid-grid-xs-true > p': {
      marginTop: '0px',
    },
    '.MuiAccordionDetails-root': {
      padding: '0 24px 18px',
      [theme.breakpoints.up('sm')]: {
        padding: '18px 32px 24px',
      },
    },
  },
  contactBanner: {
    backgroundColor: theme.palette.background.main,
  },
  gridItem: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
    },
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
      '&:first-of-type': {
        [theme.breakpoints.down('sm')]: {
          paddingBottom: 32,
          marginBottom: 16,
          borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
        },
      },
      '& > div': {
        width: '100%',
      },
    },
  },
  divider: {
    minHeight: 150,
    height: '100%',
  },
  form: {
    '& .MuiTextField-root': {
      marginBottom: theme.spacing(3),
    },
    '& .MuiFormLabel-root': {
      color: 'rgba(0, 0, 0, 0.6)',
    },
  },
  modal: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.grey.dark,
    height: '100vh',
    width: '100vw',
    position: 'absolute',
    padding: theme.spacing(2, 0, 0, 0),
    overflow: 'scroll',
    [theme.breakpoints.up('md')]: {
      width: '60vw',
      maxWidth: 550,
      height: '85vh',
      borderRadius: '16px',
      top: '15%',
      left: '50%',
      transform: 'translate(-50%, -10%)',
      boxShadow: theme.shadows[5],
    },
  },
  closeModalButton: {
    marginRight: 5,
    color: theme.palette.grey.dark,
  },
  ctaBlock: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    '& a, button': {
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
      '&:first-child': {
        marginRight: 16,
        [theme.breakpoints.down('sm')]: {
          marginBottom: 16,
          marginRight: 0,
        },
      },
    },
  },
}))

export default function Page({ page }) {
  const classes = useStyles()
  const router = useRouter()

  const [expanded, setExpanded] = useState(null)
  const [openModal, setOpenModal] = useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const list = [
    {
      key: 1,
      title: 'Write for EL Magazine',
      subtitle:
        'Contribute to our flagship magazine written by practitioners for practitioners',
      description: (
        <>
          <TextStyle variant='h5'>What we look for</TextStyle>
          <TextStyle variant='body2'>
            Educational Leadership® magazine is primarily written by
            practitioners for practitioners. We look for high-quality, original
            submissions that shed light on our monthly themes. We also consider
            articles on other subjects for Special Topics.
          </TextStyle>
          <Box my={5}>
            <TextStyle variant='h5'>Articles should:</TextStyle>
            <TextStyle variant='body2'>
              <ul>
                <li>Contain fresh information</li>
                <li>Be research-based</li>
                <li>Give practical guidance to improve practice</li>
              </ul>
            </TextStyle>
          </Box>
          <CtaButton
            variant='outlined'
            color='primary'
            label='View Full Guidelines'
            href={'/guidelines-for-el'}
          />
        </>
      ),
      ctaLink: 'https://elmagazine.submittable.com/submit',
    },
    {
      key: 2,
      title: 'Write an Online Article or Blog Post',
      subtitle: 'Share your helpful tips and strategies with educators',
      description: (
        <>
          <TextStyle variant='h5'>What we look for</TextStyle>
          <TextStyle variant='body2'>
            We look for articles and blog posts that are timely and topical,
            addressing current issues and problems of practice in the field in a
            concise, conversational manner. Pieces should be solution-oriented
            and grounded in authentic educational practice and evidence.
          </TextStyle>
          <Box my={5}>
            <TextStyle variant='h5'>
              Here are some examples of the types of online content we publish:{' '}
            </TextStyle>

            <TextStyle variant='body2'>
              <ul>
                <li>
                  Best practice pieces on instructional or leadership strategies
                  that offer immediate takeaways for readers.{' '}
                </li>
                <li>
                  Articles focused on specific problems of practice in a school
                  community (whether at the classroom or leadership level) and
                  proposed or attempted solutions.{' '}
                </li>
                <li>
                  Pieces highlighting or responding to recent developments,
                  controversies, or research findings in the field.{' '}
                </li>
                <li>
                  Articles responding to current events and their implications
                  for schools and educators.{' '}
                </li>
                <li>
                  Personal stories on professional challenges or successes.{' '}
                </li>
                <li>
                  Articles for school leaders (including teacher leaders)
                  highlighting ideas and approaches to systemwide change and
                  impact.{' '}
                </li>
                <li>
                  Articles focused on ideas and improvements in educator
                  professional development.{' '}
                </li>
              </ul>
            </TextStyle>
          </Box>
          <CtaButton
            variant='outlined'
            color='primary'
            href='/write-for-ascd-online'
            label='View Full Guidelines'
          />
        </>
      ),
      ctaLink: '/write-for-ascd-online',
    },
    {
      key: 3,
      title: 'Write a Book for ASCD',
      subtitle: 'Join our list of esteemed, diverse writers',
      description: (
        <>
          <TextStyle variant='body2'>
            Do you aspire to be a published author? Would you like to share your
            expertise and ideas, and innovative thinking with other educators
            around the world? The ASCD community of passionate thinkers and
            life-changing educators is your place. We welcome writers with new
            ideas, fresh voices, and diverse experiences and backgrounds.
          </TextStyle>
          <Box my={5}>
            <TextStyle variant='h5'>What we look for</TextStyle>

            <TextStyle variant='body2'>
              <ul>
                <li>
                  <strong>Original:</strong> The text reflects new ideas,
                  diverse perspectives, worldwide viewpoints, and fresh
                  information. It does not state the obvious, parrot
                  conventional wisdom, or rely too heavily on others&apos;
                  ideas.
                </li>
                <li>
                  <strong>Evidence-based:</strong> Assertions in the text are
                  supported by evidence and research, as necessary. References
                  are up-to-date, and sources reflect current thought in the
                  field.
                </li>
                <li>
                  <strong>Practical and actionable:</strong> The text provides
                  guidance and strategies that educators can use to improve
                  practice.
                </li>
                <li>
                  <strong>Specific:</strong> The author avoids generalities and
                  includes concrete examples, illustrations, and anecdotes.
                </li>
                <li>
                  <strong>Conversational:</strong> The text is engaging,
                  unpretentious, and free of jargon.
                </li>
              </ul>
            </TextStyle>
          </Box>
          <CtaButton
            variant='outlined'
            color='primary'
            href='/publish-a-book'
            label='View Full Guidelines'
          />
        </>
      ),
      ctaLink: 'https://mc04.manuscriptcentral.com/ascdproducts',
    },
  ]

  const _renderContent = (content) => {
    return (
      content &&
      content.map((item, key) => {
        const contentType = item.sys.contentType?.sys.id

        if (contentType == 'componentBanner') {
          return (
            <>
              <Box
                pl={[0, 0, 3, 0]}
                pb={[1, 3]}
                maxWidth={['100%', '1024px']}
                margin='auto'
              >
                {components(item, Math.floor(Math.random() * 10 + 1))}
                {item?.fields?.title === 'About Us' && (
                  <Typography textAlign='right' variant='caption'>
                    <Box textAlign='right'>Illustration: Ryan Johnson</Box>
                  </Typography>
                )}
              </Box>
            </>
          )
        } else {
          return (
            <Container maxWidth='lg' className={classes.contentContainer}>
              <Box mt={[5, 10]} key={key}>
                {components(item, Math.floor(Math.random() * 10 + 1))}
              </Box>
            </Container>
          )
        }
      })
    )
  }

  const _renderWriteForUsContent = () => {
    return (
      <Box mt={0} mb={[6, 10]} id='writeForAccordion'>
        <Divider />
        <Box my={[5, 6, 8]} textAlign='center'>
          <Box mb={3}>
            <TextStyle variant='h2'>
              Write for a wide variety of publications
            </TextStyle>
          </Box>
          <TextStyle variant='subtitle1'>
            Writers from diverse backgrounds are encouraged to submit articles
            and book proposals for publication consideration.
          </TextStyle>
        </Box>
        <Grid container spacing={2}>
          {list.map((item) => (
            <Grid item xs={12} key={item.key}>
              <Accordion
                className={classes.accordion}
                onChange={handleChange(`panel${item.key}`)}
                expanded={expanded == `panel${item.key}`}
              >
                <AccordionSummary
                  expandIcon={
                    <Box mr={4}>
                      {expanded == `panel${item.key}` ? (
                        <Button
                          endIcon={<ExpandLess />}
                          style={{ marginRight: 10 }}
                        >
                          <Typography className={classes.more}>Less</Typography>
                        </Button>
                      ) : (
                        <Button
                          endIcon={<ExpandMore />}
                          style={{ marginRight: 10 }}
                        >
                          <Typography className={classes.more}>More</Typography>
                        </Button>
                      )}
                      <CtaButton
                        variant='contained'
                        color='primary'
                        width='114'
                        height='42'
                        label='Submit'
                        href={item.ctaLink}
                        target='_blank'
                      />
                    </Box>
                  }
                  aria-controls={`panel${item.key}-content`}
                  id={`panel${item.key}-header`}
                  className={classes.verticalCenter}
                  IconButtonProps={{
                    disableRipple: true,
                    style: {
                      transform: 'none',
                      transition: 'none',
                      borderRadius: 0,
                    },
                  }}
                >
                  <Box>
                    <TextStyle variant='h4'>{item.title}</TextStyle>
                    <TextStyle variant='subtitle1'>{item.subtitle}</TextStyle>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Box>{item.description}</Box>
                </AccordionDetails>
              </Accordion>
            </Grid>
          ))}
        </Grid>
        <Box
          mt={6}
          mb={11}
          alignItems='center'
          display='flex'
          justifyContent='center'
        >
          <BannerMessage variant='special'>
            <TextStyle variant='body2'>
              Interested in presenting at ASCD conferences?
              <Link href={'https://events.ascd.org/proposals'}>
                <a>
                  <Typography color='black' variant='large-link'>
                    {' Click for more details'}
                  </Typography>
                </a>
              </Link>
            </TextStyle>
          </BannerMessage>
        </Box>
      </Box>
    )
  }

  const _renderActivateContent = (title) => {
    return (
      <Box className={classes.contactBanner} py={4} px={[1, 0]} width='100vw'>
        <Container maxWidth='lg'>
          <Grid container>
            <Grid
              item
              xs={12}
              sm={5}
              className={classes.gridItem}
              container
              alignItems='center'
            >
              <Box mb={2}>
                <TextStyle variant='h2'>{title}</TextStyle>
              </Box>
              <TextStyle variant='subtitle2'>
                If you have specific questions or want more information, we’re
                just an email or phone call away.
              </TextStyle>
            </Grid>
            <Grid item xs={false} sm={2} container justifyContent='center'>
              <Hidden smDown>
                <Divider
                  orientation='vertical'
                  flexItem
                  className={classes.divider}
                />
              </Hidden>
            </Grid>
            <Grid
              item
              xs={12}
              sm={5}
              className={classes.gridItem}
              container
              alignItems='center'
            >
              <Box>
                <Box mt={1}>
                  <TextStyle variant='subtitle1'>
                    1-800-933-2723 or 1-703-578-9600
                  </TextStyle>
                </Box>
                <Box mt={1}>
                  <TextStyle variant='subtitle1'>
                    <Link href='mailto:programteam@ascd.org'>
                      <a>
                        <Typography variant='medium-link'>
                          {'programteam@ascd.org'}
                        </Typography>
                      </a>
                    </Link>
                  </TextStyle>
                </Box>
              </Box>
              {page?.fields.slug == 'activate' && (
                <Box mt={5} display='flex' className={classes.ctaBlock}>
                  <CtaButton
                    variant='contained'
                    color='primary'
                    width='100%'
                    size='large'
                    label='Contact Us'
                    href={paths.contact}
                  />
                  <CtaButton
                    variant='outlined'
                    color='primary'
                    width='100%'
                    size='large'
                    label='FAQ'
                    href={paths.faq({ slug: 'ACTIVATE' })}
                  />
                </Box>
              )}
              {page?.fields.slug == 'services' && (
                <Box mt={5} display='flex' className={classes.ctaBlock}>
                  <CtaButton
                    variant='contained'
                    color='primary'
                    width='100%'
                    size='large'
                    label='Contact Us'
                    onclick={() => setOpenModal(true)}
                  />
                  <CtaButton
                    variant='outlined'
                    color='primary'
                    width='100%'
                    size='large'
                    label='FAQ'
                    href={paths.faq({ slug: 'Professional Learning Services' })}
                  />
                </Box>
              )}
            </Grid>
          </Grid>
        </Container>
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          aria-labelledby='simple-modal-title'
          aria-describedby='simple-modal-description'
        >
          <Box className={classes.modal}>
            <Box
              display='flex'
              alignItems='center'
              justifyContent='flex-end'
              mb={2}
              pl={2}
              pr={2}
            >
              <IconButton
                aria-label='Close modal button'
                className={classes.closeModalButton}
                size='large'
              >
                <CloseIcon size='small' onClick={() => setOpenModal(false)} />
              </IconButton>
            </Box>
            <Box textAlign='center'>
              <TextStyle variant='h3'>Let&apos;s Talk</TextStyle>
            </Box>
            {_renderContactForm()}
          </Box>
        </Modal>
      </Box>
    )
  }

  const _renderContactForm = () => (
    <Box pt={0} pb={10} px={[2, 10]}>
      <HubSpotForm formId={hubspotFormIds.CONTACT_FORM} />
    </Box>
  )

  const _renderActivateHubSpotForm = () => {
    let hbspt = undefined
    if (typeof window !== 'undefined' && typeof window.hbspt !== 'undefined') {
      hbspt = window.hbspt

      if (hbspt) {
        hbspt.forms.create({
          target: '[id="activateform"]',
          region: 'na1',
          portalId: '8020079',
          formId: '9d7a7496-8391-406c-a4c3-8e93db114c8b',
        })
      }
    }

    return (
      <Box id='free-trial'>
        <Divider />
        <Box py={[5, 10]} px={[1, 1, 3]}>
          <Grid
            container
            spacing={1}
            style={{ justifyContent: 'space-evenly' }}
          >
            <Grid item xs={12} sm={6} style={{ maxWidth: 325 }}>
              <Box mb={[3, 0]}>
                <TextStyle variant='h2'>Start your free trial today</TextStyle>
                <Box mt={3}>
                  <Button
                    variant='outlined'
                    color='primary'
                    size='large'
                    onClick={() => {
                      window.location.href =
                        'https://library.ascd.org/m/23462641544790ff/original/ASCD-Activate-Brochure.pdf'
                    }}
                    startIcon={
                      <CloudDownloadIcon
                        color='primary'
                        style={{ marginRight: 8 }}
                      />
                    }
                  >
                    Download Brochure
                  </Button>
                </Box>
                <Box mt={6}>
                  <Box display='flex'>
                    <CheckCircleIcon style={{ color: '#00A77E' }} />
                    <Box ml={1}>
                      <TextStyle variant='body2'>
                        24-hour on-demand professional development
                      </TextStyle>
                    </Box>
                  </Box>
                  <Box display='flex' mt={2}>
                    <CheckCircleIcon style={{ color: '#00A77E' }} />
                    <Box ml={1}>
                      <TextStyle variant='body2'>
                        All digital: videos, courses, books, articles, webinars,
                        and more
                      </TextStyle>
                    </Box>
                  </Box>
                  <Box display='flex' mt={2}>
                    <CheckCircleIcon style={{ color: '#00A77E' }} />
                    <Box ml={1}>
                      <TextStyle variant='body2'>
                        Comprehensive and robust, covers all subjects
                      </TextStyle>
                    </Box>
                  </Box>
                  <Box display='flex' mt={2}>
                    <CheckCircleIcon style={{ color: '#00A77E' }} />
                    <Box ml={1}>
                      <TextStyle variant='body2'>
                        Evidence and research-based content
                      </TextStyle>
                    </Box>
                  </Box>
                  <Box display='flex' mt={2}>
                    <CheckCircleIcon style={{ color: '#00A77E' }} />
                    <Box ml={1}>
                      <TextStyle variant='body2'>
                        Great for teams that need customizable learning plans
                      </TextStyle>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box pl={[0, 0, 5]}>
                <HubSpotForm formId={hubspotFormIds.ACTIVATE_FORM} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    )
  }

  return (
    page && (
      <Layout
        grey={page.fields.slug == 'activate' || page.fields.slug == 'services'}
      >
        <SEOHead seo={page?.fields?.seo ? page.fields.seo : page} />
        <Box mt={[0, 0, 5]} mb={[6, 10]}>
          {_renderContent(page?.fields?.content)}
        </Box>
        <Container maxWidth='lg'>
          {page.fields.slug == 'write-for-ascd' && _renderWriteForUsContent()}
          {page.fields.slug == 'activate' && _renderActivateHubSpotForm()}
        </Container>
        {page.fields.slug == 'activate' &&
          _renderActivateContent('Want to know more about ASCD Activate?')}
        {page.fields.slug == 'services' && _renderActivateContent("Let's Talk")}
        {page.fields.slug == 'contact' && _renderContactForm()}
      </Layout>
    )
  )
}

export async function getStaticPaths() {
  const data = await client.getEntries({
    content_type: 'page',
    limit: process.env.NEXT_STATIC_BUILD_LIMIT || 200,
  })

  return {
    paths: data.items.reduce(
      (acc, item) =>
        item?.fields?.slug && item?.fields?.slug !== 'workshops'
          ? [...acc, { params: { slug: item.fields.slug.split('/') } }]
          : acc,
      []
    ),
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const data = await client.getEntries({
    content_type: 'page',
    'fields.slug': params.slug.join('/'),
    include: 3,
  })
  if (!data || !data.items || data.items.length == 0) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      page: data?.items[0] || null,
    },
    revalidate: 20,
  }
}
