import { describe, it, expect } from 'vitest';
import * as ArrayUtility from '../src/arrayUtility.js';

describe('Array Utility', () => {
	describe('indexOf', () => {
		it('should find index of existing element', () => {
			expect(ArrayUtility.indexOf([1, 2, 3], 2)).toBe(1);
			expect(ArrayUtility.indexOf(['a', 'b', 'c'], 'c')).toBe(2);
		});

		it('should return -1 for non-existing element', () => {
			expect(ArrayUtility.indexOf([1, 2, 3], 5)).toBe(-1);
			expect(ArrayUtility.indexOf(['a', 'b'], 'z')).toBe(-1);
		});

		it('should handle null/empty arrays', () => {
			expect(ArrayUtility.indexOf(null as any, 1)).toBe(-1);
			expect(ArrayUtility.indexOf([], 1)).toBe(-1);
		});

		it('should handle NaN values', () => {
			expect(ArrayUtility.indexOf([1, NaN, 3], NaN)).toBe(1);
		});

		it('should work with custom equality comparer', () => {
			const customComparer = (a: string, b: string) => a.toLowerCase() === b.toLowerCase();
			expect(ArrayUtility.indexOf(['A', 'B', 'C'], 'b', customComparer)).toBe(1);
		});

		it('should handle undefined elements', () => {
			const sparseArray = new Array(5);
			sparseArray[0] = 1;
			sparseArray[2] = 3;
			sparseArray[4] = 5;
			expect(ArrayUtility.indexOf(sparseArray, 3)).toBe(2);
			expect(ArrayUtility.indexOf(sparseArray, undefined)).toBe(-1);
		});
	});

	describe('contains', () => {
		it('should return true for existing elements', () => {
			expect(ArrayUtility.contains([1, 2, 3], 2)).toBe(true);
			expect(ArrayUtility.contains(['a', 'b'], 'b')).toBe(true);
		});

		it('should return false for non-existing elements', () => {
			expect(ArrayUtility.contains([1, 2, 3], 5)).toBe(false);
			expect(ArrayUtility.contains(['a', 'b'], 'z')).toBe(false);
		});

		it('should handle null/empty arrays', () => {
			expect(ArrayUtility.contains(null as any, 1)).toBe(false);
			expect(ArrayUtility.contains([], 1)).toBe(false);
		});

		it('should work with custom equality comparer', () => {
			const customComparer = (a: string, b: string) => a.toLowerCase() === b.toLowerCase();
			expect(ArrayUtility.contains(['A', 'B', 'C'], 'b', customComparer)).toBe(true);
		});
	});

	describe('replace', () => {
		it('should replace all instances by default', () => {
			const arr = [1, 2, 1, 3, 1];
			expect(ArrayUtility.replace(arr, 1, 9)).toBe(3);
			expect(arr).toEqual([9, 2, 9, 3, 9]);
		});

		it('should replace up to max instances', () => {
			const arr = [1, 2, 1, 3, 1];
			expect(ArrayUtility.replace(arr, 1, 9, 2)).toBe(2);
			expect(arr).toEqual([9, 2, 9, 3, 1]);
		});

		it('should return 0 for null/empty arrays', () => {
			expect(ArrayUtility.replace(null as any, 1, 2)).toBe(0);
			expect(ArrayUtility.replace([], 1, 2)).toBe(0);
		});

		it('should return 0 when max is 0', () => {
			const arr = [1, 2, 3];
			expect(ArrayUtility.replace(arr, 1, 9, 0)).toBe(0);
			expect(arr).toEqual([1, 2, 3]);
		});

		it('should throw for negative max', () => {
			const arr = [1, 2, 3];
			expect(() => ArrayUtility.replace(arr, 1, 9, -1)).toThrow('Cannot be less than zero');
		});
	});

	describe('updateRange', () => {
		it('should update values in specified range', () => {
			const arr = [1, 2, 3, 4, 5];
			ArrayUtility.updateRange(arr, 9, 1, 4);
			expect(arr).toEqual([1, 9, 9, 9, 5]);
		});

		it('should handle default parameters', () => {
			const arr = [1, 2, 3];
			ArrayUtility.updateRange(arr, 9);
			expect(arr).toEqual([9, 9, 9]);
		});

		it('should handle null arrays gracefully', () => {
			expect(() => ArrayUtility.updateRange(null as any, 9)).not.toThrow();
		});

		it('should throw for invalid start', () => {
			const arr = [1, 2, 3];
			expect(() => ArrayUtility.updateRange(arr, 9, -1)).toThrow('start');
		});

		it('should throw when stop is less than start', () => {
			const arr = [1, 2, 3];
			expect(() => ArrayUtility.updateRange(arr, 9, 2, 1)).toThrow('is less than start');
		});
	});

	describe('clearEach', () => {
		it('should clear values in specified range', () => {
			const arr = [1, 2, 3, 4, 5];
			ArrayUtility.clearEach(arr, 1, 4);
			expect(arr).toEqual([1, null, null, null, 5]);
		});

		it('should clear entire array by default', () => {
			const arr = [1, 2, 3];
			ArrayUtility.clearEach(arr);
			expect(arr).toEqual([null, null, null]);
		});
	});

	describe('register', () => {
		it('should add new items', () => {
			const arr = [1, 2, 3];
			expect(ArrayUtility.register(arr, 4)).toBe(true);
			expect(arr).toEqual([1, 2, 3, 4]);
		});

		it('should not add existing items', () => {
			const arr = [1, 2, 3];
			expect(ArrayUtility.register(arr, 2)).toBe(false);
			expect(arr).toEqual([1, 2, 3]);
		});

		it('should work with empty arrays', () => {
			const arr: number[] = [];
			expect(ArrayUtility.register(arr, 1)).toBe(true);
			expect(arr).toEqual([1]);
		});

		it('should throw for null arrays', () => {
			expect(() => ArrayUtility.register(null as any, 1)).toThrow('Cannot be null');
		});

		it('should work with custom equality comparer', () => {
			const arr = ['A', 'B'];
			const customComparer = (a: string, b: string) => a.toLowerCase() === b.toLowerCase();
			expect(ArrayUtility.register(arr, 'b', customComparer)).toBe(false);
			expect(ArrayUtility.register(arr, 'c', customComparer)).toBe(true);
		});
	});

	describe('findIndex', () => {
		it('should find index with predicate', () => {
			const arr = [1, 2, 3, 4, 5];
			expect(ArrayUtility.findIndex(arr, x => x > 3)).toBe(3);
		});

		it('should return -1 when predicate never matches', () => {
			const arr = [1, 2, 3];
			expect(ArrayUtility.findIndex(arr, x => x > 5)).toBe(-1);
		});

		it('should work with index parameter', () => {
			const arr = ['a', 'b', 'c'];
			expect(ArrayUtility.findIndex(arr, (x, i) => i === 1)).toBe(1);
		});

		it('should throw for null array', () => {
			expect(() => ArrayUtility.findIndex(null as any, (x: any) => x > 0)).toThrow('Cannot be null');
		});

		it('should throw for non-function predicate', () => {
			expect(() => ArrayUtility.findIndex([1, 2, 3], 'not a function' as any)).toThrow('Must be a function');
		});

		it('should handle sparse arrays', () => {
			const sparseArray = new Array(5);
			sparseArray[0] = 1;
			sparseArray[2] = 3;
			sparseArray[4] = 5;
			expect(ArrayUtility.findIndex(sparseArray, x => x === 3)).toBe(2);
		});

		it('should work with ArrayLike objects', () => {
			const arrayLike = {
				0: 'a',
				1: 'b',
				2: 'c',
				length: 3
			};
			expect(ArrayUtility.findIndex(arrayLike, x => x === 'b')).toBe(1);
			expect(ArrayUtility.findIndex(arrayLike, x => x === 'z')).toBe(-1);
			
			// Test sparse ArrayLike object
			const sparseArrayLike = {
				0: 'first',
				2: 'third',
				length: 5
			};
			expect(ArrayUtility.findIndex(sparseArrayLike, x => x === 'third')).toBe(2);
			expect(ArrayUtility.findIndex(sparseArrayLike, x => x === 'missing')).toBe(-1);
		});
	});

	describe('forEach', () => {
		it('should iterate over all elements', () => {
			const arr = [1, 2, 3];
			const result: number[] = [];
			ArrayUtility.forEach(arr, (x) => { result.push(x); });
			expect(result).toEqual([1, 2, 3]);
		});

		it('should break on false return', () => {
			const arr = [1, 2, 3, 4, 5];
			const result: number[] = [];
			ArrayUtility.forEach(arr, (x) => {
				result.push(x);
				return x < 3;
			});
			expect(result).toEqual([1, 2, 3]);
		});

		it('should handle null/undefined source gracefully', () => {
			expect(() => ArrayUtility.forEach(null as any, () => {})).not.toThrow();
			expect(() => ArrayUtility.forEach(undefined as any, () => {})).not.toThrow();
		});

		it('should skip undefined elements', () => {
			const sparseArray = new Array(5);
			sparseArray[0] = 1;
			sparseArray[2] = 3;
			sparseArray[4] = 5;
			const result: number[] = [];
			ArrayUtility.forEach(sparseArray, (x) => { result.push(x); });
			expect(result).toEqual([1, 3, 5]);
		});
	});

	describe('applyTo', () => {
		it('should apply function to all elements', () => {
			const arr = [1, 2, 3];
			ArrayUtility.applyTo(arr, x => x * 2);
			expect(arr).toEqual([2, 4, 6]);
		});

		it('should work with index parameter', () => {
			const arr = [10, 20, 30];
			ArrayUtility.applyTo(arr, (x, i) => x + i);
			expect(arr).toEqual([10, 21, 32]);
		});

		it('should handle null target gracefully', () => {
			expect(() => ArrayUtility.applyTo(null as any, x => x)).not.toThrow();
		});

		it('should skip undefined elements', () => {
			const sparseArray = new Array(3);
			sparseArray[0] = 1;
			sparseArray[2] = 3;
			ArrayUtility.applyTo(sparseArray, x => x * 2);
			expect(sparseArray[0]).toBe(2);
			expect(sparseArray[1]).toBeUndefined();
			expect(sparseArray[2]).toBe(6);
		});
	});

	describe('removeIndex', () => {
		it('should remove element at specified index', () => {
			const arr = [1, 2, 3, 4];
			expect(ArrayUtility.removeIndex(arr, 1)).toBe(true);
			expect(arr).toEqual([1, 3, 4]);
		});

		it('should return false for out of bounds index', () => {
			const arr = [1, 2, 3];
			expect(ArrayUtility.removeIndex(arr, 5)).toBe(false);
			expect(arr).toEqual([1, 2, 3]);
		});

		it('should throw for null array', () => {
			expect(() => ArrayUtility.removeIndex(null as any, 0)).toThrow('Cannot be null');
		});

		it('should throw for negative index', () => {
			const arr = [1, 2, 3];
			expect(() => ArrayUtility.removeIndex(arr, -1)).toThrow('Cannot be less than zero');
		});
	});

	describe('remove', () => {
		it('should remove all instances by default', () => {
			const arr = [1, 2, 1, 3, 1];
			expect(ArrayUtility.remove(arr, 1)).toBe(3);
			expect(arr).toEqual([2, 3]);
		});

		it('should remove up to max instances', () => {
			const arr = [1, 2, 1, 3, 1];
			expect(ArrayUtility.remove(arr, 1, 2)).toBe(2);
			expect(arr).toEqual([2, 3, 1]);
		});

		it('should return 0 for null/empty arrays', () => {
			expect(ArrayUtility.remove(null as any, 1)).toBe(0);
			expect(ArrayUtility.remove([], 1)).toBe(0);
		});

		it('should work with custom equality comparer', () => {
			const arr = ['A', 'b', 'C'];
			const customComparer = (a: string, b: string) => a.toLowerCase() === b.toLowerCase();
			expect(ArrayUtility.remove(arr, 'B', Infinity, customComparer)).toBe(1);
			expect(arr).toEqual(['A', 'C']);
		});

		it('should throw for negative max', () => {
			const arr = [1, 2, 3];
			expect(() => ArrayUtility.remove(arr, 1, -1)).toThrow('Cannot be less than zero');
		});

		it('should handle infinite max', () => {
			const arr = [1, 1, 1];
			expect(ArrayUtility.remove(arr, 1, Infinity)).toBe(3);
			expect(arr).toEqual([]);
		});
	});

	describe('repeat', () => {
		it('should repeat element specified number of times', () => {
			expect(ArrayUtility.repeat('a', 3)).toEqual(['a', 'a', 'a']);
			expect(ArrayUtility.repeat(42, 2)).toEqual([42, 42]);
		});

		it('should return empty array for count 0', () => {
			expect(ArrayUtility.repeat('x', 0)).toEqual([]);
		});

		it('should throw for negative count', () => {
			expect(() => ArrayUtility.repeat('x', -1)).toThrow('Cannot be less than zero');
		});
	});

	describe('range', () => {
		it('should generate range with default step', () => {
			expect(ArrayUtility.range(1, 3)).toEqual([1, 2, 3]);
		});

		it('should generate range with custom step', () => {
			expect(ArrayUtility.range(0, 3, 2)).toEqual([0, 2, 4]);
		});

		it('should handle negative steps', () => {
			expect(ArrayUtility.range(10, 3, -2)).toEqual([10, 8, 6]);
		});

		it('should return empty array for count 0', () => {
			expect(ArrayUtility.range(5, 0)).toEqual([]);
		});

		it('should throw for invalid first parameter', () => {
			expect(() => ArrayUtility.range(NaN, 3)).toThrow('Must be a valid finite number');
			expect(() => ArrayUtility.range(Infinity, 3)).toThrow('Must be a valid finite number');
		});

		it('should throw for invalid count', () => {
			expect(() => ArrayUtility.range(1, NaN)).toThrow('Must be a valid finite number');
			expect(() => ArrayUtility.range(1, -1)).toThrow('Cannot be less than zero');
		});
	});

	describe('rangeUntil', () => {
		it('should generate range until specified value', () => {
			expect(ArrayUtility.rangeUntil(1, 4)).toEqual([1, 2, 3]);
		});

		it('should work with custom step', () => {
			expect(ArrayUtility.rangeUntil(0, 6, 2)).toEqual([0, 2, 4]);
		});

		it('should work with negative step', () => {
			expect(ArrayUtility.rangeUntil(10, 4, -2)).toEqual([10, 8, 6]);
		});

		it('should throw for step 0', () => {
			expect(() => ArrayUtility.rangeUntil(1, 5, 0)).toThrow('Cannot be zero');
		});
	});

	describe('distinct', () => {
		it('should return unique string values', () => {
			expect(ArrayUtility.distinct(['a', 'b', 'a', 'c', 'b'])).toEqual(['a', 'b', 'c']);
		});

		it('should return unique number values', () => {
			expect(ArrayUtility.distinct([1, 2, 1, 3, 2])).toEqual([1, 2, 3]);
		});

		it('should handle null source', () => {
			expect(ArrayUtility.distinct(null)).toEqual([]);
		});

		it('should handle empty array', () => {
			expect(ArrayUtility.distinct([])).toEqual([]);
		});

		it('should handle mixed types', () => {
			expect(ArrayUtility.distinct([1, 2, 1, 3, 2] as any[])).toEqual([1, 2, 3]);
		});
	});

	describe('flatten', () => {
		it('should flatten one level by default', () => {
			expect(ArrayUtility.flatten([[1, 2], [3, 4], 5])).toEqual([1, 2, 3, 4, 5]);
		});

		it('should flatten recursively with specified depth', () => {
			// With depth 1, it flattens one level deep recursively
			expect(ArrayUtility.flatten([[1, 2], [3, 4]], 1)).toEqual([1, 2, 3, 4]);
			// With depth 0, it only flattens the first level
			expect(ArrayUtility.flatten([1, [2, [3, 4]], 5], 0)).toEqual([1, 2, [3, 4], 5]);
		});

		it('should flatten all levels with Infinity depth', () => {
			expect(ArrayUtility.flatten([1, [2, [3, [4]]]], Infinity)).toEqual([1, 2, 3, 4]);
		});

		it('should handle empty arrays', () => {
			expect(ArrayUtility.flatten([[], [1, 2], []])).toEqual([1, 2]);
		});

		it('should handle non-array elements', () => {
			expect(ArrayUtility.flatten([1, 'string', true])).toEqual([1, 'string', true]);
		});
	});

	describe('exports', () => {
		it('should export init function', () => {
			expect(typeof ArrayUtility.init).toBe('function');
		});

		it('should export copy function', () => {
			expect(typeof ArrayUtility.copy).toBe('function');
		});

		it('should export copyTo function', () => {
			expect(typeof ArrayUtility.copyTo).toBe('function');
		});
	});
});