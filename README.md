# inquirer-npm-name [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Extend inquirer to ensure the value provided to the first prompt does not exist as an npm package


## Install

```sh
$ npm install --save inquirer-npm-name
```


## Usage

```js
var inquirerNpmName = require('inquirer-npm-name');

inquirerNpmName('Rainbow');
```

## License

MIT © [Simon Boudrias](http://twitter.com/vaxilart)


[npm-image]: https://badge.fury.io/js/inquirer-npm-name.svg
[npm-url]: https://npmjs.org/package/inquirer-npm-name
[travis-image]: https://travis-ci.org/SBoudrias/inquirer-npm-name.svg?branch=master
[travis-url]: https://travis-ci.org/SBoudrias/inquirer-npm-name
[daviddm-image]: https://david-dm.org/SBoudrias/inquirer-npm-name.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/SBoudrias/inquirer-npm-name
[coveralls-image]: https://coveralls.io/repos/SBoudrias/inquirer-npm-name/badge.svg
[coveralls-url]: https://coveralls.io/r/SBoudrias/inquirer-npm-name
