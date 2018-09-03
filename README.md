![](https://raw.githubusercontent.com/prichodko/create-react-app/STRV/thumbnail.gif)

### Production ready React framework that Just Works™ until you need it.

---

- [Purpose](#purpose)
- [Setup](#setup)
- [What is inside](#what-is-inside)
- [Documentation](#documentation)
- [Customizing webpack config](#customizing-webpack-config)
- [Customizing Babel config](#customizing-babel-config)
- [Upgrading react-scripts](#upgrading-react-scripts)
- [Contributing](#contributing)

---

## Purpose
`@strv/react-scripts` is a fork of [facebook/create-react-app](https://github.com/facebook/create-react-app), with [Next.js](https://github.com/zeit/next.js)-like custom configuration available and other goodies depending on our team's needs.

Having a single toolbox allows us to focus on building and not wasting time on configuration. New features and bug fixes are available with simple a `yarn upgrade @strv/react-scripts` command and not doing it manually. Easy maintenance is especially important with increasing number of projects.

### Why [facebook/create-react-app](https://github.com/facebook/create-react-app)?
It's stable, maintained and battle-tested framework with awesome DX running inside of [hundred thousands](https://npm-stat.com/charts.html?package=react-scripts&from=2018-08-01&to=2018-08-31) of React apps.

### Why fork?
It allows us to receive new features or bug fixes coming from the huge community, taking away the burden of maintainig custom setup. Having a custom fork allows us to include features according to our needs by default and potentially releasing bug fixes quicker if necessary.

At the same time, it's awesome that other people from the community can benefit from our contributions ([#4964](https://github.com/facebook/create-react-app/pull/4964), [#4852](https://github.com/facebook/create-react-app/pull/4852), [#4932](https://github.com/facebook/create-react-app/pull/4932)...) back to the [facebook/create-react-app](https://github.com/facebook/create-react-app).

## Setup
When starting a new project, it's highly recommended to do so with [create-strv-app](https://github.com/prichodko/create-strv-app), where (not only) `@strv/react-scripts` is already included.

But if you need to install it separately:
```bash
yarn add @strv/react-scripts react react-dom
```

and add scripts to your `package.json`:
```bash
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "analyze": "react-scripts analyze"
    "test": "react-scripts test --env=jsdom"
  }
}
```

If you are already using [facebook/create-react-app](https://github.com/facebook/create-react-app) it should be a drop-in replacement.

## What is inside
STRV `react-scripts` is packed with latest tech to achieve awesome DX and build highly performant apps:

- webpack 4
- Babel 7
- `analyze` command
- Flow Just Works™
- *Soon: TypeScript Just Works™*

### Available commands

To start a development server:
```bash
react-scripts start
```

To build the app for production:
```bash
react-scripts build
```

To analyze production build with [Bundle Analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer):
```bash
react-scripts analyze
```

To run tests:
```bash
react-scripts test
```

## Documentation
See an official [documentation](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Customizing webpack config
In order to extend `webpack` config, create a `app.config.js` file at the root of your app and define `webpack` transform function.

Example of modified `webpack` config file:

```js
// app.config.js is not transformed by Babel. So you can only use javascript features supported by your version of Node.js.

module.exports = {
  webpack: (config, { dev }) => {
    if (dev) {
      // modify config used for development
    } else {
      config.resolve.alias = {
        ...config.resolve.alias,
        react: 'preact-compat',
        'react-dom': 'preact-compat'
      }
    }

    return config // return the modified config
  },
  devServer: config => {
    // modify config used for webpack-dev-server
    return config
  }
}
```
> You usually shouldn't need to modify configuration, maybe it's something what should be included by default?

## Customizing Babel config
In order to extend [internal](https://github.com/prichodko/create-react-app/blob/STRV/packages/babel-preset-react-app/create.js#L41) Babel config, simply specify a `.babelrc` / `.babelrc.js` / `babel.config.js` at the root of your app. This file is optional, but when it exists, it's considered as the _source of truth_. This is the reason why you have to include `@strv/react-scripts/babel` at the top.

This is designed so that you are not surprised by modifications made to the babel configurations.

Example of extended Babel config file:

```json
{
  "presets": [
    "@strv/react-scripts/babel"
  ],
  "plugins": [
    "babel-plugin-styled-components"
  ]
}
```

`@strv/react-scripts` Babel preset currently includes:
- `@babel/preset-env`
- `@babel/preset-react`
- `@babel/plugin-transform-destructuring`
- `@babel/plugin-proposal-class-properties`
- `@babel/plugin-proposal-object-rest-spread`
- `@babel/plugin-transform-runtime`
- `@babel/plugin-transform-regenerator`
- `babel-plugin-transform-react-remove-prop-types`
- `@babel/plugin-syntax-dynamic-import`
- `babel-plugin-macros`

> To see configuration in detail you can inspect the [preset](https://github.com/prichodko/create-react-app/blob/STRV/packages/babel-preset-react-app/create.js#L41) by yourself.

## Upgrading react-scripts
`@strv/react-scripts` has a [Backstroke](https://backstroke.co/) app set up. So whenever there is a new release of [facebook/create-react-app](https://github.com/facebook/create-react-app) a pull request on this repo will be created. Our scripts are based on `next` branch.

To incroporate `upstream` changes, please follow these steps:

1. Merge the pull request. There **shouldn't** be any conflicts.
2. Pull your changes locally.
3. **Rebase** our modifications on top of theirs and resolve potential conflicts. This will make sure that our changes are always on top and compatible.
```bash
git checkout STRV
git rebase next
```
4. Publish the new version
```bash
yarn publish
```
  or
```bash
npm publish
```
5. Force push new changes to the remote
```bash
git push origin -f STRV
```

### Troubleshooting
Since we are force pushing, your `git pull` could fail. Run these commands to get the latest changes:
```bash
git checkout STRV
git fetch origin
git reset --hard origin/STRV
```

## Contributing
If you have any ideas what could be included by default, open an issue.

## Acknowledgements
We are thankful for tremendous work of almost 500 contributors done on [facebook/create-react-app](https://github.com/facebook/create-react-app/graphs/contributors). 


## Maintainers
- Pavel Prichodko ([@prchdk](https://twitter.com/prchdk)) - [STRV](https://www.strv.com)