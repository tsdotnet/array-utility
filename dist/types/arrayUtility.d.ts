/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
import { ActionWithIndex, PredicateWithIndex, SelectorWithIndex } from '@tsdotnet/common-interfaces';
import init from '@tsdotnet/array-init';
import copy, { arrayCopyTo as copyTo } from '@tsdotnet/array-copy';
import { EqualityComparison } from '@tsdotnet/compare';
export { init, copy, copyTo };
export interface ArrayLikeWritable<T> {
    length: number;
    [n: number]: T;
}
export declare function indexOf<T>(array: ArrayLike<T>, item: T, equalityComparer?: EqualityComparison<T>): number;
export declare function contains<T>(array: ArrayLike<T>, item: T, equalityComparer?: EqualityComparison<T>): boolean;
export declare function replace<T>(array: ArrayLikeWritable<T>, old: T, newValue: T, max?: number): number;
export declare function updateRange<T>(array: ArrayLike<T>, value: T, start?: number, stop?: number): void;
export declare function clearEach(array: ArrayLikeWritable<any>, start?: number, stop?: number): void;
export declare function register<T>(array: ArrayLikeWritable<T>, item: T, equalityComparer?: EqualityComparison<T>): boolean;
export declare function findIndex<T>(array: ArrayLike<T>, predicate: PredicateWithIndex<T>): number;
export declare function forEach<T>(source: ArrayLike<T>, action: ActionWithIndex<T> | PredicateWithIndex<T>): void;
export declare function applyTo<T>(target: ArrayLikeWritable<T>, fn: SelectorWithIndex<T, T>): void;
export declare function removeIndex<T>(array: T[], index: number): boolean;
export declare function remove<T>(array: T[], value: T, max?: number, equalityComparer?: EqualityComparison<T>): number;
export declare function repeat<T>(element: T, count: number): T[];
export declare function range(first: number, count: number, step?: number): number[];
export declare function rangeUntil(first: number, until: number, step?: number): number[];
export declare function distinct(source: string[] | null): string[];
export declare function distinct(source: number[] | null): number[];
export declare function flatten(a: any[], recurseDepth?: number): any[];
