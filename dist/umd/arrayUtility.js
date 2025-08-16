/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@tsdotnet/exceptions", "@tsdotnet/array-init", "@tsdotnet/type", "@tsdotnet/array-copy", "@tsdotnet/integer", "@tsdotnet/compare"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.copyTo = exports.copy = exports.init = void 0;
    exports.indexOf = indexOf;
    exports.contains = contains;
    exports.replace = replace;
    exports.updateRange = updateRange;
    exports.clearEach = clearEach;
    exports.register = register;
    exports.findIndex = findIndex;
    exports.forEach = forEach;
    exports.applyTo = applyTo;
    exports.removeIndex = removeIndex;
    exports.remove = remove;
    exports.repeat = repeat;
    exports.range = range;
    exports.rangeUntil = rangeUntil;
    exports.distinct = distinct;
    exports.flatten = flatten;
    const tslib_1 = require("tslib");
    const exceptions_1 = require("@tsdotnet/exceptions");
    const array_init_1 = tslib_1.__importDefault(require("@tsdotnet/array-init"));
    exports.init = array_init_1.default;
    const type_1 = tslib_1.__importDefault(require("@tsdotnet/type"));
    const array_copy_1 = tslib_1.__importStar(require("@tsdotnet/array-copy"));
    exports.copy = array_copy_1.default;
    Object.defineProperty(exports, "copyTo", { enumerable: true, get: function () { return array_copy_1.arrayCopyTo; } });
    const integer_1 = tslib_1.__importDefault(require("@tsdotnet/integer"));
    const compare_1 = require("@tsdotnet/compare");
    const CBN = 'Cannot be null.', CB0 = 'Cannot be zero.', CBL0 = 'Cannot be less than zero.', VFN = 'Must be a valid finite number';
    /**
     * Checks to see where the provided array contains an item/value.
     * If the array value is null, then -1 is returned.
     * @param array
     * @param item
     * @param {function?} equalityComparer
     * @returns {number}
     */
    function indexOf(array, item, equalityComparer = compare_1.areEqual) {
        const len = array && array.length;
        if (len) {
            // NaN NEVER evaluates its equality so be careful.
            if (equalityComparer === compare_1.areEqual && array instanceof Array && !type_1.default.isTrueNaN(item))
                return array.indexOf(item);
            for (let i = 0; i < len; i++) {
                // 'areEqual' includes NaN==NaN evaluation.
                if (equalityComparer(array[i], item))
                    return i;
            }
        }
        return -1;
    }
    /**
     * Checks to see if the provided array contains an item.
     * If the array value is null, then false is returned.
     * @param array
     * @param item
     * @param {function?} equalityComparer
     * @returns {boolean}
     */
    function contains(array, item, equalityComparer = compare_1.areEqual) {
        return indexOf(array, item, equalityComparer) !== -1;
    }
    /**
     * Finds and replaces a value from an array.  Will replaces all instances unless a maximum is specified.
     * @param array
     * @param old
     * @param newValue
     * @param max
     * @returns {number}
     */
    function replace(array, old, newValue, max = Infinity) {
        if (!array || !array.length || max === 0)
            return 0;
        if (max < 0)
            throw new exceptions_1.ArgumentOutOfRangeException('max', max, CBL0);
        if (!max)
            max = Infinity; // just in case.
        let count = 0;
        for (let i = 0, len = array.length; i < len; i++) {
            if (array[i] === old) {
                array[i] = newValue;
                ++count;
                if (count === max)
                    break;
            }
        }
        return count;
    }
    /**
     * Replaces values of an array across a range of indexes.
     * @param array
     * @param value
     * @param start
     * @param stop
     */
    function updateRange(array, value, start = 0, stop) {
        if (!array)
            return;
        integer_1.default.assertZeroOrGreater(start, 'start');
        if (!stop && stop !== 0)
            stop = array.length;
        integer_1.default.assert(stop, 'stop');
        if (stop < start)
            throw new exceptions_1.ArgumentOutOfRangeException('stop', stop, 'is less than start');
        for (let i = start; i < stop; i++) {
            array[i] = value;
        }
    }
    /**
     * Clears (sets to null) values of an array across a range of indexes.
     * @param array
     * @param start
     * @param stop
     */
    function clearEach(array, start = 0, stop) {
        updateRange(array, null, start, stop);
    }
    /**
     * Ensures a value exists within an array.  If not found, adds to the end.
     * @param array
     * @param item
     * @param {function?} equalityComparer
     * @returns {boolean}
     */
    function register(array, item, equalityComparer = compare_1.areEqual) {
        if (!array)
            throw new exceptions_1.ArgumentNullException('array', CBN);
        const len = array.length; // avoid querying .length more than once. *
        const ok = !len || !contains(array, item, equalityComparer);
        if (ok)
            array[len] = item; // * push would query length again.
        return ok;
    }
    /**
     * Returns the first index of which the provided predicate returns true.
     * Returns -1 if always false.
     * @param array
     * @param predicate
     * @returns {number}
     */
    function findIndex(array, predicate) {
        if (!array)
            throw new exceptions_1.ArgumentNullException('array', CBN);
        if (!type_1.default.isFunction(predicate))
            throw new exceptions_1.ArgumentException('predicate', 'Must be a function.');
        const len = array.length;
        if (!type_1.default.isNumber(len, true) || len < 0)
            throw new exceptions_1.ArgumentException('array', 'Does not have a valid length.');
        if (array instanceof Array) {
            for (let i = 0; i < len; i++) {
                if (predicate(array[i], i))
                    return i;
            }
        }
        else {
            for (let i = 0; i < len; i++) {
                if (i in array && predicate(array[i], i))
                    return i;
            }
        }
        return -1;
    }
    /**
     * Allows for using "false" to cause forEach to break.
     * Can also be applied to a structure that indexes like an array, but may not be.
     * @param source
     * @param action
     */
    function forEach(source, action) {
        if (source && action != null) {
            // Don't cache the length since it is possible that the underlying array changed.
            for (let i = 0; i < source.length; i++) {
                // noinspection PointlessBooleanExpressionJS
                if (action(source[i], i) === false)
                    break;
            }
        }
    }
    /**
     * Is similar to Array.map() but instead of returning a new array, it updates the existing indexes.
     * Can also be applied to a structure that indexes like an array, but may not be.
     * @param target
     * @param fn
     */
    function applyTo(target, fn) {
        if (target && fn != null) {
            for (let i = 0; i < target.length; i++) {
                target[i] = fn(target[i], i);
            }
        }
    }
    /**
     * Removes an entry at a specified index.
     * @param array
     * @param index
     * @returns {boolean} True if the value was able to be removed.
     */
    function removeIndex(array, index) {
        if (!array)
            throw new exceptions_1.ArgumentNullException('array', CBN);
        integer_1.default.assert(index, 'index');
        if (index < 0)
            throw new exceptions_1.ArgumentOutOfRangeException('index', index, CBL0);
        const exists = index < array.length;
        if (exists)
            array.splice(index, 1);
        return exists;
    }
    /**
     * Finds and removes a value from an array.  Will remove all instances unless a maximum is specified.
     * @param array
     * @param value
     * @param max
     * @param {function?} equalityComparer
     * @returns {number} The number of times the value was found and removed.
     */
    function remove(array, value, max = Infinity, equalityComparer = compare_1.areEqual) {
        if (!array || !array.length || max === 0)
            return 0;
        if (max < 0)
            throw new exceptions_1.ArgumentOutOfRangeException('max', max, CBL0);
        let count = 0;
        if (!max || !isFinite(max)) {
            // Don't track the indexes and remove in reverse.
            for (let i = array.length - 1; i >= 0; i--) {
                if (equalityComparer(array[i], value)) {
                    array.splice(i, 1);
                    ++count;
                }
            }
        }
        else {
            // Since the user will expect it to happen in forward order...
            const found = []; // indexes;
            for (let i = 0, len = array.length; i < len; i++) {
                if (equalityComparer(array[i], value)) {
                    found.push(i);
                    ++count;
                    if (count === max)
                        break;
                }
            }
            for (let i = found.length - 1; i >= 0; i--) {
                array.splice(found[i], 1);
            }
        }
        return count;
    }
    /**
     * Simply repeats a value the number of times specified.
     * @param element
     * @param count
     * @returns {T[]}
     */
    function repeat(element, count) {
        integer_1.default.assert(count, 'count');
        if (count < 0)
            throw new exceptions_1.ArgumentOutOfRangeException('count', count, CBL0);
        const result = (0, array_init_1.default)(count);
        for (let i = 0; i < count; i++) {
            result[i] = element;
        }
        return result;
    }
    /**
     * Returns a range of numbers based upon the first value and the step value.
     * @param first
     * @param count
     * @param step
     * @returns {number[]}
     */
    function range(first, count, step = 1) {
        if (isNaN(first) || !isFinite(first))
            throw new exceptions_1.ArgumentOutOfRangeException('first', first, VFN);
        if (isNaN(count) || !isFinite(count))
            throw new exceptions_1.ArgumentOutOfRangeException('count', count, VFN);
        if (count < 0)
            throw new exceptions_1.ArgumentOutOfRangeException('count', count, CBL0);
        const result = (0, array_init_1.default)(count);
        for (let i = 0; i < count; i++) {
            result[i] = first;
            first += step;
        }
        return result;
    }
    /**
     * Returns a range of numbers based upon the first value and the step value excluding any numbers at or beyond the until value.
     * @param first
     * @param until
     * @param step
     * @returns {number[]}
     */
    function rangeUntil(first, until, step = 1) {
        if (step === 0)
            throw new exceptions_1.ArgumentOutOfRangeException('step', step, CB0);
        return range(first, (until - first) / step, step);
    }
    function distinct(source) {
        if (!source)
            return []; // Allowing for null facilitates regex filtering.
        const seen = {};
        return source.filter((e) => !(e in seen) && (seen[e] = true));
    }
    /**
     * Takes any arrays within an array and inserts the values contained within in place of that array.
     * For every count higher than 0 in recurseDepth it will attempt an additional pass.  Passing Infinity will flatten all arrays contained.
     * @param a
     * @param recurseDepth
     * @returns {any[]}
     */
    function flatten(a, recurseDepth = 0) {
        const result = [];
        for (let x of a) {
            if (x instanceof Array) {
                if (recurseDepth > 0)
                    x = flatten(x, recurseDepth - 1);
                for (const e of x)
                    result.push(e);
            }
            else
                result.push(x);
        }
        return result;
    }
});
//# sourceMappingURL=arrayUtility.js.map