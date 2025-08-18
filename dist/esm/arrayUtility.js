import { ArgumentOutOfRangeException, ArgumentNullException, ArgumentException } from '@tsdotnet/exceptions';
import init from '@tsdotnet/array-init';
export { default as init } from '@tsdotnet/array-init';
import type from '@tsdotnet/type';
export { default as copy, arrayCopyTo as copyTo } from '@tsdotnet/array-copy';
import integer from '@tsdotnet/integer';
import { areEqual } from '@tsdotnet/compare';

/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
const CBN = 'Cannot be null.', CB0 = 'Cannot be zero.', CBL0 = 'Cannot be less than zero.', VFN = 'Must be a valid finite number';
function indexOf(array, item, equalityComparer = areEqual) {
    const len = array && array.length;
    if (len) {
        if (equalityComparer === areEqual && array instanceof Array && !type.isTrueNaN(item))
            return array.indexOf(item);
        for (let i = 0; i < len; i++) {
            const element = array[i];
            if (element !== undefined && equalityComparer(element, item))
                return i;
        }
    }
    return -1;
}
function contains(array, item, equalityComparer = areEqual) {
    return indexOf(array, item, equalityComparer) !== -1;
}
function replace(array, old, newValue, max = Infinity) {
    if (!array || !array.length || max === 0)
        return 0;
    if (max < 0)
        throw new ArgumentOutOfRangeException('max', max, CBL0);
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
    integer.assertZeroOrGreater(start, 'start');
    if (!stop && stop !== 0)
        stop = array.length;
    integer.assert(stop, 'stop');
    if (stop < start)
        throw new ArgumentOutOfRangeException('stop', stop, 'is less than start');
    for (let i = start; i < stop; i++) {
        array[i] = value;
    }
}
function clearEach(array, start = 0, stop) {
    updateRange(array, null, start, stop);
}
function register(array, item, equalityComparer = areEqual) {
    if (!array)
        throw new ArgumentNullException('array', CBN);
    const len = array.length;
    const ok = !len || !contains(array, item, equalityComparer);
    if (ok)
        array[len] = item;
    return ok;
}
function findIndex(array, predicate) {
    if (!array)
        throw new ArgumentNullException('array', CBN);
    if (!type.isFunction(predicate))
        throw new ArgumentException('predicate', 'Must be a function.');
    const len = array.length;
    if (!type.isNumber(len, true) || len < 0)
        throw new ArgumentException('array', 'Does not have a valid length.');
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
        throw new ArgumentNullException('array', CBN);
    integer.assert(index, 'index');
    if (index < 0)
        throw new ArgumentOutOfRangeException('index', index, CBL0);
    const exists = index < array.length;
    if (exists)
        array.splice(index, 1);
    return exists;
}
function remove(array, value, max = Infinity, equalityComparer = areEqual) {
    if (!array || !array.length || max === 0)
        return 0;
    if (max < 0)
        throw new ArgumentOutOfRangeException('max', max, CBL0);
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
    integer.assert(count, 'count');
    if (count < 0)
        throw new ArgumentOutOfRangeException('count', count, CBL0);
    const result = init(count);
    for (let i = 0; i < count; i++) {
        result[i] = element;
    }
    return result;
}
function range(first, count, step = 1) {
    if (isNaN(first) || !isFinite(first))
        throw new ArgumentOutOfRangeException('first', first, VFN);
    if (isNaN(count) || !isFinite(count))
        throw new ArgumentOutOfRangeException('count', count, VFN);
    if (count < 0)
        throw new ArgumentOutOfRangeException('count', count, CBL0);
    const result = init(count);
    for (let i = 0; i < count; i++) {
        result[i] = first;
        first += step;
    }
    return result;
}
function rangeUntil(first, until, step = 1) {
    if (step === 0)
        throw new ArgumentOutOfRangeException('step', step, CB0);
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

export { applyTo, clearEach, contains, distinct, findIndex, flatten, forEach, indexOf, range, rangeUntil, register, remove, removeIndex, repeat, replace, updateRange };
//# sourceMappingURL=arrayUtility.js.map
