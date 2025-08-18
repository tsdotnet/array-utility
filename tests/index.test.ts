import { describe, it, expect } from 'vitest';
import * as ArrayUtility from '../src/arrayUtility.js';

describe('Array Utility', () => {
	it('should export array utility functions', () => {
		expect(ArrayUtility).toBeDefined();
		expect(typeof ArrayUtility.indexOf).toBe('function');
		expect(typeof ArrayUtility.contains).toBe('function');
	});

	it('should have basic functionality', () => {
		const arr = [1, 2, 3];
		expect(ArrayUtility.contains(arr, 2)).toBe(true);
		expect(ArrayUtility.contains(arr, 5)).toBe(false);
		expect(ArrayUtility.indexOf(arr, 2)).toBe(1);
		expect(ArrayUtility.indexOf(arr, 5)).toBe(-1);
	});
});