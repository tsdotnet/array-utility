# ![alt text](https://avatars1.githubusercontent.com/u/64487547?s=30&amp;v=5 "tsdotnet") tsdotnet / array-utility

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/tsdotnet/array-utility/blob/master/LICENSE)
![npm-publish](https://github.com/tsdotnet/array-utility/workflows/npm-publish/badge.svg)
[![npm version](https://img.shields.io/npm/v/@tsdotnet/array-utility.svg?style=flat-square)](https://www.npmjs.com/package/@tsdotnet/array-utility)

A small collection of useful array functions.

## Docs

[tsdotnet.github.io/array-utility](https://tsdotnet.github.io/array-utility/)

## Usage
```typescript
import * as arrayUtil from '@tsdotnet/array-utility'
```

## Exported

### indexOf

```typescript
/**
 * Checks to see where the provided array contains an item/value.
 * If the array value is null, then -1 is returned.
 * @param array
 * @param item
 * @param {function?} equalityComparer
 * @returns {number}
 */
export function indexOf<T> (
  array: ArrayLike<T>,
  item: T,
  equalityComparer: EqualityComparison<T> = areEqual
): number
```

### contains

```typescript
/**
 * Checks to see if the provided array contains an item.
 * If the array value is null, then false is returned.
 * @param array
 * @param item
 * @param {function?} equalityComparer
 * @returns {boolean}
 */
export function contains<T> (
  array: ArrayLike<T>,
  item: T,
  equalityComparer: EqualityComparison<T> = areEqual
): boolean
```

### replace

```typescript
/**
 * Finds and replaces a value from an array.  Will replaces all instances unless a maximum is specified.
 * @param array
 * @param old
 * @param newValue
 * @param max
 * @returns {number}
 */
export function replace<T> (
  array: ArrayLikeWritable<T>,
  old: T,
  newValue: T,
  max: number = Infinity
): number
```

### updateRange

```typescript
/**
 * Replaces values of an array across a range of indexes.
 * @param array
 * @param value
 * @param start
 * @param stop
 */
export function updateRange<T> (
  array: ArrayLike<T>,
  value: T,
  start: number = 0,
  stop?: number
): void

```

### clearEach

```typescript
/**
 * Clears (sets to null) values of an array across a range of indexes.
 * @param array
 * @param start
 * @param stop
 */
export function clearEach (
  array: ArrayLikeWritable<any>,
  start: number = 0,
  stop?: number
): void
```

### register

```typescript
/**
 * Ensures a value exists within an array.  If not found, adds to the end.
 * @param array
 * @param item
 * @param {function?} equalityComparer
 * @returns {boolean}
 */
export function register<T> (
  array: ArrayLikeWritable<T>,
  item: T,
  equalityComparer: EqualityComparison<T> = areEqual
): boolean
```

### findIndex

```typescript
/**
 * Returns the first index of which the provided predicate returns true.
 * Returns -1 if always false.
 * @param array
 * @param predicate
 * @returns {number}
 */
export function findIndex<T> (
  array: ArrayLike<T>,
  predicate: PredicateWithIndex<T>
): number
```

### forEach

```typescript
/**
 * Allows for using "false" to cause forEach to break.
 * Can also be applied to a structure that indexes like an array, but may not be.
 * @param source
 * @param action
 */
export function forEach<T> (
  source: ArrayLike<T>,
  action: ActionWithIndex<T> | PredicateWithIndex<T>
): void
```

### applyTo

```typescript
/**
 * Is similar to Array.map() but instead of returning a new array, it updates the existing indexes.
 * Can also be applied to a structure that indexes like an array, but may not be.
 * @param target
 * @param fn
 */
export function applyTo<T> (
  target: ArrayLikeWritable<T>,
  fn: SelectorWithIndex<T, T>
): void
```

### removeIndex

```typescript
/**
 * Removes an entry at a specified index.
 * @param array
 * @param index
 * @returns {boolean} True if the value was able to be removed.
 */
export function removeIndex<T> (
  array: T[],
  index: number
): boolean
```

### remove

```typescript
/**
 * Finds and removes a value from an array.  Will remove all instances unless a maximum is specified.
 * @param array
 * @param value
 * @param max
 * @param {function?} equalityComparer
 * @returns {number} The number of times the value was found and removed.
 */
export function remove<T> (
  array: T[],
  value: T,
  max: number                             = Infinity,
  equalityComparer: EqualityComparison<T> = areEqual
): number
```

### repeat

```typescript
/**
 * Simply repeats a value the number of times specified.
 * @param element
 * @param count
 * @returns {T[]}
 */
export function repeat<T> (
  element: T,
  count: number
): T[]
```

### range

```typescript
/**
 * Returns a range of numbers based upon the first value and the step value.
 * @param first
 * @param count
 * @param step
 * @returns {number[]}
 */
export function range (
  first: number,
  count: number,
  step: number = 1
): number[]
```

### rangeUntil

```typescript
/**
 * Returns a range of numbers based upon the first value and the step value excluding any numbers at or beyond the until value.
 * @param first
 * @param until
 * @param step
 * @returns {number[]}
 */
export function rangeUntil (
  first: number,
  until: number,
  step: number = 1
): number[]
```

### distinct

```typescript
/**
 * Returns a unique reduced set of values.
 * @param source
 */
export function distinct (source: string[] | null): string[];
export function distinct (source: number[] | null): number[];
```

### flatten

```typescript
/**
 * Takes any arrays within an array and inserts the values contained within in place of that array.
 * For every count higher than 0 in recurseDepth it will attempt an additional pass.  Passing Infinity will flatten all arrays contained.
 * @param a
 * @param recurseDepth
 * @returns {any[]}
 */
export function flatten (
  a: any[],
  recurseDepth: number = 0
): any[]
```

### init

https://github.com/tsdotnet/array-init

`arrayInit as init`

### copy, copyTo

https://github.com/tsdotnet/array-copy

`arrayCopy as copy`
`arrayCopyTo as copyTo`
