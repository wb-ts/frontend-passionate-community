# Summary

Will need to update this readme

## Installation

```bash
npm install
```

## Usage

For development,

```bash
npm run dev
```

For production,

```bash
npm run build:fab
```

then,

```bash
npm run start
```

## Code Linting

We are using ESLint and Prettier for code linting. Please set your code editor to format on save.
For Visual Studio Code, you can simply open your VSCode Preferences -> Settings and set the Format On Save option to true for either your user, workspace or folder.

The configuration files can be found at the root dir: `eslintrc.json` and `.prettierrc`

## UI Library

We are using Material UI. Learn more here https://mui.com/getting-started/learn/.

## Storybook

To launch storybook locally, just run

```bash
npm run storybook
```

## Snipcart setup

1.  Add/Edit environment variables

    - **NEXT_PUBLIC_SNIPCART_ORDER_VALIDATION_BASE_URL** - This needs to point to an exposed url address that snipcart can call for order validation. This url will also need to be added to the snipcart trusted Domain list on the Snipcart site. this is available under the _Store Configurations > Domains & Urls_.

      > _Local Environment_ - To setup an exposed url on your local dev env. You can use [localtunnel](https://theboroer.github.io/localtunnel-www/). Then add the generated url to Snipcart trusted domain list.

          npm install -g localtunnel
          lt --port 3000

      > _Staging Environment_ - The url has already been added to snipcart so the base url just needs to pont to the stage url

      > _Production Environment_ - Snipcart will use the default domain defined in Snipcart so NO URL is needed

    - **NEXT_PUBLIC_SNIPCART_JS_DATA_API_KEY** - Add the secret key from Snipcart

2.  How its works
    > When the items get added to the cart an order validation url gets included. This url is then used by Snipcart to call our api endpoint defined in the pages/api directory. The endpoint then process a the rquet and returns a JSON to validate the item exists on our site.

## Run a script at build time

Adding this a reference for future use.

---

Finally, override your next.config.js to run this script as part of the build process.

```
module.exports = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      require('./scripts/generate-sitemap');
    }

    return config;
  }
};
```
