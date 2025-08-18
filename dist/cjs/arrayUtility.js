"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
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
function indexOf(array, item, equalityComparer = compare_1.areEqual) {
    const len = array && array.length;
    if (len) {
        if (equalityComparer === compare_1.areEqual && array instanceof Array && !type_1.default.isTrueNaN(item))
            return array.indexOf(item);
        for (let i = 0; i < len; i++) {
            const element = array[i];
            if (element !== undefined && equalityComparer(element, item))
                return i;
        }
    }
    return -1;
}
function contains(array, item, equalityComparer = compare_1.areEqual) {
    return indexOf(array, item, equalityComparer) !== -1;
}
function replace(array, old, newValue, max = Infinity) {
    if (!array || !array.length || max === 0)
        return 0;
    if (max < 0)
        throw new exceptions_1.ArgumentOutOfRangeException('max', max, CBL0);
    if (!max)
        max = Infinity;
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
function clearEach(array, start = 0, stop) {
    updateRange(array, null, start, stop);
}
function register(array, item, equalityComparer = compare_1.areEqual) {
    if (!array)
        throw new exceptions_1.ArgumentNullException('array', CBN);
    const len = array.length;
    const ok = !len || !contains(array, item, equalityComparer);
    if (ok)
        array[len] = item;
    return ok;
}
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
            const element = array[i];
            if (i in array && element !== undefined && predicate(element, i))
                return i;
        }
    }
    return -1;
}
function forEach(source, action) {
    if (source && action != null) {
        for (let i = 0; i < source.length; i++) {
            const element = source[i];
            if (element !== undefined && action(element, i) === false)
                break;
        }
    }
}
function applyTo(target, fn) {
    if (target && fn != null) {
        for (let i = 0; i < target.length; i++) {
            const element = target[i];
            if (element !== undefined)
                target[i] = fn(element, i);
        }
    }
}
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
function remove(array, value, max = Infinity, equalityComparer = compare_1.areEqual) {
    if (!array || !array.length || max === 0)
        return 0;
    if (max < 0)
        throw new exceptions_1.ArgumentOutOfRangeException('max', max, CBL0);
    let count = 0;
    if (!max || !isFinite(max)) {
        for (let i = array.length - 1; i >= 0; i--) {
            const element = array[i];
            if (element !== undefined && equalityComparer(element, value)) {
                array.splice(i, 1);
                ++count;
            }
        }
    }
    else {
        const found = [];
        for (let i = 0, len = array.length; i < len; i++) {
            const element = array[i];
            if (element !== undefined && equalityComparer(element, value)) {
                found.push(i);
                ++count;
                if (count === max)
                    break;
            }
        }
        for (let i = found.length - 1; i >= 0; i--) {
            const index = found[i];
            if (index !== undefined)
                array.splice(index, 1);
        }
    }
    return count;
}
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
function rangeUntil(first, until, step = 1) {
    if (step === 0)
        throw new exceptions_1.ArgumentOutOfRangeException('step', step, CB0);
    return range(first, (until - first) / step, step);
}
function distinct(source) {
    if (!source)
        return [];
    const seen = {};
    return source.filter((e) => !(e in seen) && (seen[e] = true));
}
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
//# sourceMappingURL=arrayUtility.js.map