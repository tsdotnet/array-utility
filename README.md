<a name="banner"><img src="https://cdn.jsdelivr.net/gh/tsdotnet/array-utility@master/assets/banner.svg" alt="@tsdotnet/array-utility: The array toolbox. Find, remove, repeat, range and more."></a>

[![npm version](https://img.shields.io/npm/v/@tsdotnet/array-utility.svg?style=flat-square)](https://www.npmjs.com/package/@tsdotnet/array-utility)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/tsdotnet/array-utility/blob/master/LICENSE)

Everyday array helpers: find, contain, remove, register, repeat, range and more.

## Install

```sh
npm install @tsdotnet/array-utility
```

## Usage

```ts
import { range, remove, distinct } from '@tsdotnet/array-utility';

const ids = range(1, 5);            // [1, 2, 3, 4, 5]
remove(ids, 3);                     // 1 removed; ids is [1, 2, 4, 5]
distinct(['a', 'b', 'a']);          // ['a', 'b']
```

Also `contains`, `findIndex`, `register`, `repeat`, `flatten` and more.

## Use it from

ESM (`import { range, remove, distinct } from '@tsdotnet/array-utility';`) or CommonJS (`const { range, remove, distinct } = require('@tsdotnet/array-utility');`).

<details><summary>In a browser, without a bundler</summary>

```html
<script src="https://cdn.jsdelivr.net/npm/@tsdotnet/array-init@1/dist/umd/array-init.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsdotnet/exceptions@1/dist/umd/exceptions.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsdotnet/array-copy@1/dist/umd/array-copy.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsdotnet/type@1/dist/umd/type.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsdotnet/compare@1/dist/umd/compare.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsdotnet/integer@1/dist/umd/integer.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsdotnet/array-utility@1/dist/umd/array-utility.min.js"></script>
<script>
  const { range, remove, distinct } = tsdotnet.arrayUtility;
</script>
```

</details>

## Docs

[tsdotnet.github.io/array-utility](https://tsdotnet.github.io/array-utility/)
