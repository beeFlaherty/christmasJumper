<div align="center">
  <img src="https://i.imgur.com/fzqYaLE.png" alt="FE boilerplate - Core logo" height="200" />
</div>

---

<p align="center"><strong>FE boilerplate - Core</strong></p>

---

# AmazeRealise FE boilerplate

> This is the core FE boilerplate used by AR developer to build web pages and apps.

Its main purpose is to define a basic skeleton structure to build on top. It will provide the needed tools and configurations to
build a simple website or an web app. It follows the internal coomon rules and best practices of building for the web.

## Readme file

This is the main boilerplate file but each individual project should replace this one with `_README.md`
and tailor it based on your project needs.

## Features

- Enable [ES2015 features](https://babeljs.io/docs/learn-es2015/) using [Babel](https://babeljs.io)
- Bundled JS code using [webpack](https://webpack.js.org/).
- CSS [Autoprefixing](https://github.com/postcss/autoprefixer), [PostCSS](http://postcss.org/)
- Map compiled CSS/JS to source stylesheets/js with source maps
- [browserslist](http://browserl.ist/) support for babel and friends
- Linting done with [eslint](https://eslint.org/) and [stylelint](https://stylelint.io/)
- And many more.

## Installing / Getting started

In order to get started make sure you have Node (8 or later preferably) and Git installed on your machine.

```shell
git archive --remote=git@gitlab.com:amazerealise-fe-group/fe-boilerplate.git master | tar xf -
```

This will create a tar archive that contains the contents of the latest master branch, and extract it in the currect directory.

```shell
npm i
```

This will install the npm modules preparing the folder for dev.

```shell
npm run start
```

This will run the local dev environment and will start the local webpack dev server.

## Developing

### Built With

- [Node.js](https://nodejs.org/en/) used for tooling
- [Sass](https://sass-lang.com/) for CSS
- [Handlebars.js](https://handlebarsjs.com/) for HTML templating
- [Jest](https://jestjs.io/) for testing our code

### Building

To build the production version of the project just run:

```shell
npm run build
```

This will run `webpack` with `--mode=production` flag passed. It will then generate all compiled assets in the `build` folder.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [link to tags on this repository](/tags).

## Configuration

### Environment Variables

You can specify env variables by placing the following files in your project root:

```
.env                # loaded in all cases
.env.[mode]         # only loaded in specified mode
.env.local          # loaded in all cases, ignored by git
.env.[mode].local   # only loaded in specified mode, ignored by git
```

An env file simply contains key=value pairs of environment variables:

```
FOO=bar
APP_SECRET=1337
```

For more detailed env parsing rules, please refer to the documentation of [dotenv](https://github.com/motdotla/dotenv#rules).

They are loaded in the order above. That means that `.env.[mode].local` for example overrides the ones above it and so on.

The default env variables that are used across the porject are in `.env.development` file in root. It has defaults for dev settings,
and other required variables used in various scripts and tooling. Refer to the file for more details and update the file with your project specific values.

For developer specific settings like `AR_CORE_OPEN_BROWSER` you should create a `.env.local` in the root and change the setting there. It will be ignored in git and will keep the settings specific to each individual.

## Tests

Test are run using Jest via:

```shell
npm run test
```

This will run the entire test suite in watch mode.

To run coverage reports run Jest coverage via:

```shell
npm run test:coverage
```

## Style guide

The style guide is defined in the docs so please consult them for more information.

## Templating

We use Handlebars for HTML templating and have implemented our own custom solution to compile our output html files.

We use JSON as our default data format and require a new file for every page in the project. This is a sample page file structure:

```
{
  "title": "Page 1",
  "template": "page",
  "path": "/test/another-folder",
  "introText": "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
}
```

### Fields
`title` - this is intended for use in page headings and meta tags. If this property is not specified, this will revert to `Untitled` instead.

`template` - the specified handlebars template used for the page. If this property is not specified, the default template will be used instead (currently the `homepage` template).

`path` - by default, this tool will save the output html files into the same structure as the source file; to override this, you can specify a valid directory path here instead.

Each page requires the `title` and `template` property, otherwise they will revert to default values (set in the `config` file). However, the `path` is completely optional. Other than these, the JSON structure is entirely up to the requirements of the project; an example of this is the custom `introText` property.

As previously mentioned, there is a configuration file specifically for templating, found in `lib/generatePages/config.js`. For the most part, you won't need to change anything in this file, but you can add more to it if applicable.


### Build

To compile your output build files, you can run:

```shell
npm run html -- --exec
```

## FAQ

### Example: `import foo from './foo.js';` If you use dev tools debugger you cannot watch or execute foo because it is not defined.

This is because Webpack renames variable bindings in ES6 imports when it replaces them. More info here https://github.com/webpack/webpack/issues/3957

## Contribute

See the [contributing docs](CONTRIBUTING.md).

## Licensing

[ISC](https://opensource.org/licenses/ISC) © AmazeRealise
