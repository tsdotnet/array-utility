(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@tsdotnet/exceptions'), require('@tsdotnet/array-init'), require('@tsdotnet/type'), require('@tsdotnet/array-copy'), require('@tsdotnet/integer'), require('@tsdotnet/compare')) :
    typeof define === 'function' && define.amd ? define(['exports', '@tsdotnet/exceptions', '@tsdotnet/array-init', '@tsdotnet/type', '@tsdotnet/array-copy', '@tsdotnet/integer', '@tsdotnet/compare'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.tsdotnet = global.tsdotnet || {}, global.tsdotnet.arrayUtility = global.tsdotnet.arrayUtility || {}), global.tsdotnet.exceptions, global.tsdotnet.arrayInit, global.tsdotnet.type, global.tsdotnet.arrayCopy, global.tsdotnet.integer, global.tsdotnet.compare));
})(this, (function (exports, exceptions, init, type, arrayCopy, integer, compare) { 'use strict';

    function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

    var init__default = /*#__PURE__*/_interopDefault(init);
    var type__default = /*#__PURE__*/_interopDefault(type);
    var arrayCopy__default = /*#__PURE__*/_interopDefault(arrayCopy);
    var integer__default = /*#__PURE__*/_interopDefault(integer);

    /*!
     * @author electricessence / https://github.com/electricessence/
     * @license MIT
     */
    const CBN = 'Cannot be null.', CB0 = 'Cannot be zero.', CBL0 = 'Cannot be less than zero.', VFN = 'Must be a valid finite number';
    function indexOf(array, item, equalityComparer = compare.areEqual) {
        const len = array && array.length;
        if (len) {
            if (equalityComparer === compare.areEqual && array instanceof Array && !type__default.default.isTrueNaN(item))
                return array.indexOf(item);
            for (let i = 0; i < len; i++) {
                const element = array[i];
                if (element !== undefined && equalityComparer(element, item))
                    return i;
            }
        }
        return -1;
    }
    function contains(array, item, equalityComparer = compare.areEqual) {
        return indexOf(array, item, equalityComparer) !== -1;
    }
    function replace(array, old, newValue, max = Infinity) {
        if (!array || !array.length || max === 0)
            return 0;
        if (max < 0)
            throw new exceptions.ArgumentOutOfRangeException('max', max, CBL0);
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
        integer__default.default.assertZeroOrGreater(start, 'start');
        if (!stop && stop !== 0)
            stop = array.length;
        integer__default.default.assert(stop, 'stop');
        if (stop < start)
            throw new exceptions.ArgumentOutOfRangeException('stop', stop, 'is less than start');
        for (let i = start; i < stop; i++) {
            array[i] = value;
        }
    }
    function clearEach(array, start = 0, stop) {
        updateRange(array, null, start, stop);
    }
    function register(array, item, equalityComparer = compare.areEqual) {
        if (!array)
            throw new exceptions.ArgumentNullException('array', CBN);
        const len = array.length;
        const ok = !len || !contains(array, item, equalityComparer);
        if (ok)
            array[len] = item;
        return ok;
    }
    function findIndex(array, predicate) {
        if (!array)
            throw new exceptions.ArgumentNullException('array', CBN);
        if (!type__default.default.isFunction(predicate))
            throw new exceptions.ArgumentException('predicate', 'Must be a function.');
        const len = array.length;
        if (!type__default.default.isNumber(len, true) || len < 0)
            throw new exceptions.ArgumentException('array', 'Does not have a valid length.');
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
            throw new exceptions.ArgumentNullException('array', CBN);
        integer__default.default.assert(index, 'index');
        if (index < 0)
            throw new exceptions.ArgumentOutOfRangeException('index', index, CBL0);
        const exists = index < array.length;
        if (exists)
            array.splice(index, 1);
        return exists;
    }
    function remove(array, value, max = Infinity, equalityComparer = compare.areEqual) {
        if (!array || !array.length || max === 0)
            return 0;
        if (max < 0)
            throw new exceptions.ArgumentOutOfRangeException('max', max, CBL0);
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
        integer__default.default.assert(count, 'count');
        if (count < 0)
            throw new exceptions.ArgumentOutOfRangeException('count', count, CBL0);
        const result = init__default.default(count);
        for (let i = 0; i < count; i++) {
            result[i] = element;
        }
        return result;
    }
    function range(first, count, step = 1) {
        if (isNaN(first) || !isFinite(first))
            throw new exceptions.ArgumentOutOfRangeException('first', first, VFN);
        if (isNaN(count) || !isFinite(count))
            throw new exceptions.ArgumentOutOfRangeException('count', count, VFN);
        if (count < 0)
            throw new exceptions.ArgumentOutOfRangeException('count', count, CBL0);
        const result = init__default.default(count);
        for (let i = 0; i < count; i++) {
            result[i] = first;
            first += step;
        }
        return result;
    }
    function rangeUntil(first, until, step = 1) {
        if (step === 0)
            throw new exceptions.ArgumentOutOfRangeException('step', step, CB0);
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

    Object.defineProperty(exports, "init", {
        enumerable: true,
        get: function () { return init__default.default; }
    });
    Object.defineProperty(exports, "copy", {
        enumerable: true,
        get: function () { return arrayCopy__default.default; }
    });
    Object.defineProperty(exports, "copyTo", {
        enumerable: true,
        get: function () { return arrayCopy.arrayCopyTo; }
    });
    exports.applyTo = applyTo;
    exports.clearEach = clearEach;
    exports.contains = contains;
    exports.distinct = distinct;
    exports.findIndex = findIndex;
    exports.flatten = flatten;
    exports.forEach = forEach;
    exports.indexOf = indexOf;
    exports.range = range;
    exports.rangeUntil = rangeUntil;
    exports.register = register;
    exports.remove = remove;
    exports.removeIndex = removeIndex;
    exports.repeat = repeat;
    exports.replace = replace;
    exports.updateRange = updateRange;

}));
//# sourceMappingURL=array-utility.js.map
