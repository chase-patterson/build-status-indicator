A [server](https://github.com/chase-patterson/build-status-indicator-server) instance must be running for most functionality.

Install dependencies:
```
yarn install
```

Run development build locally:
```
yarn start
```

Test:
```
yarn test
```

# Testing

Component tests are located under `src/components/`_**`ComponentName`**_`/`_**`ComponentName`**_`.test.js`

Using [jest-fetch-mock](https://www.npmjs.com/package/jest-fetch-mock) to mock calls to fetch.
