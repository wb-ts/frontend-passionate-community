const shareConfig = {
  follow: {
    action: 'Follow us:', // call to action (STRING)
    action_enable: false, // show/hide call to action (true, false)
    action_pos: 'bottom', // position of call to action (left, top, right)
    alignment: 'center', // alignment of buttons (left, center, right)
    color: 'white', // set the color of buttons (social, white)
    enabled: true, // show/hide buttons (true, false)
    networks: [
      // which networks to include (see FOLLOW NETWORKS)
      'linkedin',
      'facebook',
      'twitter',
      'instagram',
      'youtube',
      'pinterest',
    ],
    padding: 8, // padding within buttons (INTEGER)
    profiles: {
      // social profile links for buttons
      facebook: 'ascd.org',
      twitter: 'ASCD',
      linkedin: 'company/ascd',
      instagram: 'officialascd/',
      youtube: 'user/officialascd',
      pinterest: 'officialascd/',
    },
    radius: 20, // the corner radius on each button (INTEGER)
    size: 32, // the size of each button (INTEGER)
    spacing: 12, // the spacing between buttons (INTEGER)
  },
  share: {
    alignment: 'center', // alignment of buttons (left, center, right)
    color: 'white', // set the color of buttons (social, white)
    enabled: true, // show/hide buttons (true, false)
    font_size: 16, // font size for the buttons
    labels: 'cta', // button labels (cta, counts, null)
    language: 'en', // which language to use (see LANGUAGES)
    networks: [
      // which networks to include (see SHARING NETWORKS)
      'facebook',
      'twitter',
      'linkedin',
      'instagram',
      'youtube',
      'pinterest',
      'email',
    ],
    padding: 12, // padding within buttons (INTEGER)
    radius: 4, // the corner radius on each button (INTEGER)
    show_total: true,
    size: 40, // the size of each button (INTEGER)
    // // OPTIONAL PARAMETERS
    // url: 'https://www.sharethis.com', // (defaults to current url)
    // image: 'https://bit.ly/2CMhCMC',  // (defaults to og:image or twitter:image)
    // description: 'custom text',       // (defaults to og:description or twitter:description)
    // title: 'custom title',            // (defaults to og:title or twitter:title)
    // message: 'custom email text',     // (only for email sharing)
    // subject: 'custom email subject',  // (only for email sharing)
    // username: 'custom twitter handle' // (only for twitter sharing)
  },
}

export default shareConfig
