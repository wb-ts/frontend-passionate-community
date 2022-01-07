import { defaultTheme, overrides } from '.'

/**
 * After the defaultTheme is created, we
 * make another theme that will also hold our
 * component overrides, which is handled seperately
 */
const theme = {
  ...defaultTheme,
  components: overrides,
}

export default theme
