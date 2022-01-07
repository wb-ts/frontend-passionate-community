import googleAnalytics from '@analytics/google-analytics'
import Analytics from 'analytics'

const analytics = Analytics({
  app: 'ascd',
  plugins: [
    googleAnalytics({
      trackingId: process.env.NEXT_PUBLIC_GA_TRACKING_ID
        ? process.env.NEXT_PUBLIC_GA_TRACKING_ID
        : 'UA-12345678-9',
    }),
  ],
})

export default analytics
