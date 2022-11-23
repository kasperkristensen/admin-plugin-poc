# Admin Plugin POC

## Introduction

A repo exploring the possibility of a plugin architecture for the Admin UI.

## Installation

1. Clone the repo
2. Run `yarn` to install dependencies
3. Run `yarn build` to build the project
4. Navigate to `packages/medusa-plugin-admin` and run `yarn link`.
5. Navigate to your Medusa project and run `yarn link medusa-plugin-admin`.
6. Add the plugin to your `medusa-config.js` file:

   ```js
   // ...

   plugins: [
       {
       resolve: "medusa-plugin-admin",
       options: {
           serve: true
       },
       },
   ],

   // ...
   ```

7. Run `yarn start` in your Medusa project, and go to http://localhost:9000/app.
