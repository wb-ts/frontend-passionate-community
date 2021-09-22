const lookupEnvVar = (name) => {
  if (
    typeof window !== 'undefined' &&
    typeof window.FAB_SETTINGS === 'object'
  ) {
    return window.FAB_SETTINGS[name]
  } else {
    return process.env[`${name}`]
  }
}

export default {
  NEXT_CONTENTFUL_SPACE_ID: lookupEnvVar('NEXT_CONTENTFUL_SPACE_ID'),
  NEXT_CONTENTFUL_ENVIRONMENT: lookupEnvVar('NEXT_CONTENTFUL_ENVIRONMENT'),
  NEXT_CONTENTFUL_ACCESS_TOKEN: lookupEnvVar('NEXT_CONTENTFUL_ACCESS_TOKEN'),
}
