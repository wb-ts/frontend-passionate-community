import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import createEmotionServer from '@emotion/server/create-instance'
import { ServerStyleSheets, createGenerateClassName } from '@mui/styles'
import createEmotionCache from '../createEmotionCache'
import { theme } from '../styles/mui'

export default class MyDocument extends Document {
  render() {
    return (
      <Html
        xmlns='http://www.w3.org/1999/xhtml'
        lang='en'
        prefix='og: http://ogp.me/ns#'
      >
        <Head>
          {/* PWA primary color */}
          <meta name='theme-color' content={theme.palette.primary.main} />

          {/* @TODO - add in fab build variables. */}

          {/* {process.env.ALGOLIA_CSS_ENDPOINT ? (
            <script
              src={process.env.ALGOLIA_CSS_ENDPOINT}
              rel='stylesheet'
              type='text/css'
            ></script>
          ) : null} */}

          {/* Hubspot */}
          <script
            charset='utf-8'
            type='text/javascript'
            src='//js.hsforms.net/forms/v2.js'
          ></script>

          {/* JQuery Script */}
          <script
            src='https://code.jquery.com/jquery-3.6.0.min.js'
            integrity='sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4='
            crossOrigin='anonymous'
          ></script>

          {/* Piano Script */}
          <script
            src={process.env.NEXT_PUBLIC_PIANO_JS_ENDPOINT}
            async={false}
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              tp = window.tp || [];
              tp.push(["setAid", "${process.env.NEXT_PUBLIC_PIANO_APP_ID}"]);
              tp.push(["setEndpoint", "${process.env.NEXT_PUBLIC_PIANO_API_BASE_URL}"]);
              tp.push(["setUseTinypassAccounts", false ]);
              tp.push(["setUsePianoIdUserProvider", true ]);
              tp.push(["init", function() {
                  tp.experience.init();
                  tp.pianoId.init({
                    displayMode: 'modal',
                });
              }]);`,
            }}
          />

          {/* Snipcart Script */}
          <link rel='preconnect' href='https://app.snipcart.com' />
          <link rel='preconnect' href='https://cdn.snipcart.com' />
          <link
            rel='stylesheet'
            href='https://cdn.snipcart.com/themes/v3.2.0/default/snipcart.css'
          />
          <script
            async
            src='https://cdn.snipcart.com/themes/v3.2.0/default/snipcart.js'
          ></script>
          <script
            type='text/javascript'
            dangerouslySetInnerHTML={{
              __html: `
                adroll_adv_id = "F6PWEMRB7RGWPFZ226C4MO";
                adroll_pix_id = "YFWTWQ23ZZALDFG75UNB5Z";
                adroll_version = "2.0";

                (function(w, d, e, o, a) {
                    w.__adroll_loaded = true
                    w.adroll = w.adroll || []
                    w.adroll.f = [ 'setProperties', 'identify', 'track' ]
                    var roundtripUrl = "https://s.adroll.com/j/" + adroll_adv_id
                            + "/roundtrip.js"
                    for (a = 0; a < w.adroll.f.length; a++) {
                        w.adroll[w.adroll.f[a]] = w.adroll[w.adroll.f[a]] || (function(n) {
                            return function() {
                                w.adroll.push([ n, arguments ])
                            }
                        })(w.adroll.f[a])
                    }

                    e = d.createElement('script')
                    o = d.getElementsByTagName('script')[0]
                    e.async = 1
                    e.src = roundtripUrl
                    o.parentNode.insertBefore(e, o)
                })(window, document)
                adroll.track("pageView")

                `,
            }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '914910645227747');
                fbq('track', 'PageView');
              `,
            }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function () {
                  /**
                   * String.prototype.replaceAll() polyfill
                   * https://gomakethings.com/how-to-replace-a-section-of-a-string-with-another-one-with-vanilla-js/
                   * @author Chris Ferdinandi
                   * @license MIT
                   */
                  if (!String.prototype.replaceAll) {
                    String.prototype.replaceAll = function(str, newStr){

                      // If a regex pattern
                      if (Object.prototype.toString.call(str).toLowerCase() === '[object regexp]') {
                        return this.replace(str, newStr);
                      }

                      // If a string
                      return this.replace(new RegExp(str, 'g'), newStr);

                    };
                  }
                })();
                `,
            }}
          />
          <noscript
            dangerouslySetInnerHTML={{
              __html: `
            <img
              height='1'
              width='1'
              style='display:none'
              src='https://www.facebook.com/tr?id={914910645227747}&ev=PageView&noscript=1'
            />
          `,
            }}
          />
        </Head>
        <body>
          {/* <script
            type='text/javascript'
            id='hs-script-loader'
            async
            defer
            src='//js.hs-scripts.com/8020079.js'
          ></script> */}

          <script
            type='text/javascript'
            dangerouslySetInnerHTML={{
              __html: `
              _linkedin_partner_id = "3361793"; window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || []; window._linkedin_data_partner_ids.push(_linkedin_partner_id);
              `,
            }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            (function(){var s = document.getElementsByTagName("script")[0]; var b = document.createElement("script"); b.type = "text/javascript";b.async = true; b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js"; s.parentNode.insertBefore(b, s);})();
            `,
            }}
          />
          <noscript
            dangerouslySetInnerHTML={{
              __html: `
            {' '}
            <img
              height='1'
              width='1'
              style='display:none;'
              alt=''
              src='https://px.ads.linkedin.com/collect/?pid=3361793&fmt=gif'
            />{' '}
          `,
            }}
          />
          <Main />
          <NextScript />
        </body>
        <div
          hidden
          id='snipcart'
          data-api-key={process.env.NEXT_PUBLIC_SNIPCART_JS_DATA_API_KEY}
          data-config-modal-style='side'
        >
          <cart-summary section='items'>
            <div className='root'>
              <cart-summary-items-list class='snipcart-cart-summary__items'></cart-summary-items-list>
              <div className='tax-exempt-container'>
                <a
                  className='tax-exempt'
                  href='https://www.ascd.org/faq?#does-ascd-charge-sales-tax'
                  target='_blank'
                  rel='noreferrer'
                >
                  Important Tax Exempt Info
                </a>
                <h1 className='tax-exempt'>To process a transaction with a Purchase Order please send to member@ascd.org</h1>
              </div>
            </div>
          </cart-summary>
          <billing section='bottom'>
            <fieldset
              id='snipcart-job-title-field'
              className='snipcart-form__set'
            >
              <div className='snipcart-form__field'>
                <hr className='snipcart-form__separator'></hr>
                <br></br>
                <snipcart-label class='snipcart__font--tiny' for='roleCategory'>
                  Title/Role
                </snipcart-label>
                <snipcart-select
                  name='roleCategory'
                  class='snipcart-form__select  snipcart__font--secondary snipcart__font--bold'
                  required
                >
                  <option value=''></option>
                  <option value='Department Head'>Department Head</option>
                  <option value='Professional Development Director'>
                    Professional Development Director
                  </option>
                  <option value='Curriculum Director'>
                    Curriculum Director
                  </option>
                  <option value='Para-Professional'>Para-Professional</option>
                  <option value='Counselor'>Counselor</option>
                  <option value='Teacher'>Teacher</option>
                  <option value='Superintendent'>Superintendent</option>
                  <option value='Student'>Student</option>
                  <option value='Principal'>Principal</option>
                  <option value='Coach'>Coach</option>
                  <option value='Admin'>Admin</option>
                </snipcart-select>
                <br></br>
                <snipcart-label class='snipcart__font--tiny' for='schoolName'>
                  School
                </snipcart-label>
                <snipcart-input name='schoolName' required></snipcart-input>
                <br></br>
                <snipcart-label class='snipcart__font--tiny' for='districtName'>
                  District (if applicable)
                </snipcart-label>
                <snipcart-input name='districtName'></snipcart-input>
                <br></br>
                <snipcart-label class='snipcart__font--tiny' for='stateCountry'>
                  State/Country
                </snipcart-label>
                <snipcart-input name='stateCountry' required></snipcart-input>
                <br></br>
              </div>
            </fieldset>
          </billing>
        </div>
      </Html>
    )
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const generateClassName = createGenerateClassName({
    productionPrefix: 'ascd',
  })

  const sheets = new ServerStyleSheets()

  const originalRenderPage = ctx.renderPage

  // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache()
  const { extractCriticalToChunks } = createEmotionServer(cache)

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) =>
        sheets.collect(<App emotionCache={cache} {...props} />),
    })

  const initialProps = await Document.getInitialProps(ctx)
  // This is important. It prevents emotion to render invalid HTML.
  const emotionStyles = extractCriticalToChunks(initialProps.html)
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ))

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
      ...emotionStyleTags,
    ],
  }
}
