/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(5);
var isBuffer = __webpack_require__(38);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function deepMerge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  extend: extend,
  trim: trim
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(37);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_uuid_v4__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_uuid_v4___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_uuid_v4__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



/* harmony default export */ __webpack_exports__["a"] = ({
  attached: function attached() {
    if (!this.hasKey) return;
    this.setMode();
    this.initMap();
    this.addCenterMarker();
    this.populateMarkers(this.data.markers);
  },
  data: function data() {
    return {
      busy: false,
      center: {},
      centerMarker: {},
      dirtyCenter: false,
      dirtyZoom: false,
      hasKey: false,
      map: null,
      markerObjects: [],
      selectedMarker: null,
      selectedMarkerIndex: 0,
      zoomLevel: 4
    };
  },


  methods: {
    generateNewMarker: function generateNewMarker(mode) {
      var markerData = {
        id: __WEBPACK_IMPORTED_MODULE_0_uuid_v4___default()(),
        position: this.center
      };

      if (mode === 'google') {
        markerData.icon = null;
        markerData.label = null;
      }

      if (mode === 'mapbox') {
        markerData.color = null;
      }

      return markerData;
    },
    getMarkerById: function getMarkerById(markerId) {
      return this.markerObjects.filter(function (markerObject) {
        return markerObject.id === markerId;
      })[0];
    },
    getMarkerIndex: function getMarkerIndex() {
      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (!id) return -1;
      return this.data.markers.findIndex(function (marker) {
        return marker.id === id;
      });
    },
    getReplicatorPreviewText: function getReplicatorPreviewText() {
      var _data$center = this.data.center,
          lat = _data$center.lat,
          lng = _data$center.lng;

      return 'Center: Lat: ' + lat + ', Lng: ' + lng;
    },
    populateMarkers: function populateMarkers(markers) {
      var _this = this;

      markers.forEach(function (marker) {
        return _this.addMarker(false, marker);
      });
    },
    removeMarker: function removeMarker(markerId) {
      this.selectedMarker = null;
      this.updateMarker(markerId, null, true);
      var markerObject = this.getMarkerById(markerId);
      this.removeMarkerObjectFromMap(markerObject);
    },
    updateMarker: function updateMarker(markerId, data) {
      var remove = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var markerIndex = this.getMarkerIndex(markerId);
      var markers = this.data.markers;

      markers[markerIndex] = _extends({}, markers[markerIndex], data);

      if (remove) markers.splice(markerIndex, 1);

      this.data = _extends({}, this.data, {
        markers: markers
      });
    }
  }
});

/***/ }),
/* 3 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["default"] = addStylesClient;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__listToStyles__ = __webpack_require__(18);
/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/



var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

function addStylesClient (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = Object(__WEBPACK_IMPORTED_MODULE_0__listToStyles__["a" /* default */])(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = Object(__WEBPACK_IMPORTED_MODULE_0__listToStyles__["a" /* default */])(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(0);
var normalizeHeaderName = __webpack_require__(44);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  // Only Node.JS has a process variable that is of [[Class]] process
  if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(9);
  } else if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(9);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(43)))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var settle = __webpack_require__(45);
var buildURL = __webpack_require__(6);
var parseHeaders = __webpack_require__(47);
var isURLSameOrigin = __webpack_require__(48);
var createError = __webpack_require__(10);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(49);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(46);

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  utils.forEach(['url', 'method', 'params', 'data'], function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });

  utils.forEach(['headers', 'auth', 'proxy'], function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  utils.forEach([
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'maxContentLength',
    'validateStatus', 'maxRedirects', 'httpAgent', 'httpsAgent', 'cancelToken',
    'socketPath'
  ], function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  return config;
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(14);


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

Vue.component('cartographer-advanced-box', __webpack_require__(15));
Vue.component('cartographer-control-panel', __webpack_require__(24));
Vue.component('cartographer-marker-editor', __webpack_require__(27));
Vue.component('cartographer-mapbox-markers', __webpack_require__(30));
Vue.component("cartographer-google_maps-fieldtype", __webpack_require__(35));
Vue.component("cartographer-mapbox-fieldtype", __webpack_require__(58));
Vue.component("cartographer-fieldtype", __webpack_require__(61));

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_script__, __vue_template__
var __vue_styles__ = {}
__webpack_require__(16)
__vue_script__ = __webpack_require__(19)
if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
  console.warn("[vue-loader] resources/assets/js/src/components/advanced-box.vue: named exports in *.vue files are ignored.")}
__vue_template__ = __webpack_require__(23)
module.exports = __vue_script__ || {}
if (module.exports.__esModule) module.exports = module.exports.default
var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
if (__vue_template__) {
__vue_options__.template = __vue_template__
}
if (!__vue_options__.computed) __vue_options__.computed = {}
Object.keys(__vue_styles__).forEach(function (key) {
var module = __vue_styles__[key]
__vue_options__.computed[key] = function () { return module }
})
if (false) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  var id = "_v-1cd1e152/advanced-box.vue"
  if (!module.hot.data) {
    hotAPI.createRecord(id, module.exports)
  } else {
    hotAPI.update(id, module.exports, __vue_template__)
  }
})()}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(17);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(4).default
var update = add("3a0e02a6", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./advanced-box.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./advanced-box.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.inline-checkboxes .list-unstyled {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n.inline-checkboxes .list-unstyled li {\n  margin-right: 1rem;\n}\n\n.inline-checkboxes .list-unstyled li label {\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n", ""]);

// exports


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = listToStyles;
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config_google_controls_checkboxes__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_mapbox_controls_checkboxes__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_mapbox_styles_radio__ = __webpack_require__(22);
// <template>
//   <div>
//     <div class="btn-group my-1 mr-1">
//       <a href="#" class="btn btn-default" @click.prevent="toggleOpen">
//         Advanced
//         <i class="icon icon-plus icon-right"></i>
//       </a>
//     </div>
//     <div v-if="isOpen" class="card cartographer-field__advanced-panel">
//       <div v-if="data.mode == 'mapbox'">
//         <div class="mb-1">
//           <label class="block">Custom styles</label>
//           <small class="help-block">
//             Choose from the predefined styles below or copy the link to your custom style set, you can create your own styles using the
//             <a
//               href="https://studio.mapbox.com/styles"
//               target="_blank"
//               rel="noopener"
//             >styles studio</a>.
//           </small>
//           <div class="field-inner my-2">
//             <radio-fieldtype
//               :data.sync="data['map_styles']"
//               :config="mapboxStylesRadioConfig"
//               name="map_styles"
//             ></radio-fieldtype>
//           </div>
//           <input type="text" class="w-full" v-model="data.map_styles">
//         </div>
//         <div class="mt-2 inline-checkboxes">
//           <label class="block">Map controls</label>
//           <small class="help-block">Set which UI controls show on this map</small>
//           <checkboxes-fieldtype
//             :data.sync="data['map_controls']"
//             :config="mapboxControlsCheckboxConfig"
//             name="map_controls"
//           ></checkboxes-fieldtype>
//         </div>
//       </div>
//       <div v-if="data.mode == 'google'">
//         <div class="mb-1">
//           <label class="block">Custom styles</label>
//           <small class="help-block">
//             These can be generated using
//             <a
//               href="https://snazzymaps.com/"
//               target="_blank"
//               rel="noopener"
//             >SnazzyMaps</a>.
//           </small>
//           <textarea
//             v-model="data.map_styles"
//             placeholder="Paste custom styles here."
//             class="w-full"
//             rows="10"
//           ></textarea>
//         </div>
//         <div class="mt-1 inline-checkboxes">
//           <label class="block">Map controls</label>
//           <small class="help-block">Set which UI controls show on this map</small>
//           <checkboxes-fieldtype
//             :data.sync="data['map_controls']"
//             :config="googleControlsCheckboxConfig"
//             :name="controlsFieldname"
//           ></checkboxes-fieldtype>
//         </div>
//       </div>
//     </div>
//   </div>
// </template>
// <script>




/* harmony default export */ __webpack_exports__["default"] = ({
  props: ["data", "name"],

  data: function data() {
    return {
      isOpen: false,
      googleControlsCheckboxConfig: __WEBPACK_IMPORTED_MODULE_0__config_google_controls_checkboxes__["a" /* default */],
      mapboxControlsCheckboxConfig: __WEBPACK_IMPORTED_MODULE_1__config_mapbox_controls_checkboxes__["a" /* default */],
      mapboxStylesRadioConfig: __WEBPACK_IMPORTED_MODULE_2__config_mapbox_styles_radio__["a" /* default */]
    };
  },


  computed: {
    controlsFieldname: function controlsFieldname() {
      return this.name + "_map_controls";
    }
  },

  methods: {
    toggleOpen: function toggleOpen() {
      this.isOpen = !this.isOpen;
    }
  }
});
// </script>
// <style>
// .inline-checkboxes .list-unstyled {
//   display: flex;
//   flex-wrap: wrap;
// }
// .inline-checkboxes .list-unstyled li {
//   margin-right: 1rem;
// }
//
// .inline-checkboxes .list-unstyled li label {
//   user-select: none;
// }
// </style>

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  name: "map_controls",
  options: [{
    value: "fullscreenControl",
    text: "Fullscreen"
  }, {
    value: "mapTypeControl",
    text: "Map Type"
  }, {
    value: "scaleControl",
    text: "Scale"
  }, {
    value: "streetViewControl",
    text: "Street View"
  }, {
    value: "zoomControl",
    text: "Zoom"
  }]
});

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  name: "map_controls",
  options: [{
    value: "fullscreenControl",
    text: "Fullscreen"
  }, {
    value: "navigationControl",
    text: "Navigation"
  }, {
    value: "scaleControl",
    text: "Scale"
  }]
});

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  name: "map_styles",
  inline: true,
  options: [{
    value: "mapbox://styles/mapbox/streets-v11",
    text: "Streets"
  }, {
    value: "mapbox://styles/mapbox/light-v10",
    text: "Light"
  }, {
    value: "mapbox://styles/mapbox/dark-v10",
    text: "Dark"
  }, {
    value: "mapbox://styles/mapbox/outdoors-v11",
    text: "Outdoors"
  }, {
    value: "mapbox://styles/mapbox/satellite-v9",
    text: "Satellite"
  }]
});

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = "\n<div>\n  <div class=\"btn-group my-1 mr-1\">\n    <a href=\"#\" class=\"btn btn-default\" @click.prevent=\"toggleOpen\">\n      Advanced\n      <i class=\"icon icon-plus icon-right\"></i>\n    </a>\n  </div>\n  <div v-if=\"isOpen\" class=\"card cartographer-field__advanced-panel\">\n    <div v-if=\"data.mode == 'mapbox'\">\n      <div class=\"mb-1\">\n        <label class=\"block\">Custom styles</label>\n        <small class=\"help-block\">\n          Choose from the predefined styles below or copy the link to your custom style set, you can create your own styles using the\n          <a\n            href=\"https://studio.mapbox.com/styles\"\n            target=\"_blank\"\n            rel=\"noopener\"\n          >styles studio</a>.\n        </small>\n        <div class=\"field-inner my-2\">\n          <radio-fieldtype\n            :data.sync=\"data['map_styles']\"\n            :config=\"mapboxStylesRadioConfig\"\n            name=\"map_styles\"\n          ></radio-fieldtype>\n        </div>\n        <input type=\"text\" class=\"w-full\" v-model=\"data.map_styles\">\n      </div>\n      <div class=\"mt-2 inline-checkboxes\">\n        <label class=\"block\">Map controls</label>\n        <small class=\"help-block\">Set which UI controls show on this map</small>\n        <checkboxes-fieldtype\n          :data.sync=\"data['map_controls']\"\n          :config=\"mapboxControlsCheckboxConfig\"\n          name=\"map_controls\"\n        ></checkboxes-fieldtype>\n      </div>\n    </div>\n    <div v-if=\"data.mode == 'google'\">\n      <div class=\"mb-1\">\n        <label class=\"block\">Custom styles</label>\n        <small class=\"help-block\">\n          These can be generated using\n          <a\n            href=\"https://snazzymaps.com/\"\n            target=\"_blank\"\n            rel=\"noopener\"\n          >SnazzyMaps</a>.\n        </small>\n        <textarea\n          v-model=\"data.map_styles\"\n          placeholder=\"Paste custom styles here.\"\n          class=\"w-full\"\n          rows=\"10\"\n        ></textarea>\n      </div>\n      <div class=\"mt-1 inline-checkboxes\">\n        <label class=\"block\">Map controls</label>\n        <small class=\"help-block\">Set which UI controls show on this map</small>\n        <checkboxes-fieldtype\n          :data.sync=\"data['map_controls']\"\n          :config=\"googleControlsCheckboxConfig\"\n          :name=\"controlsFieldname\"\n        ></checkboxes-fieldtype>\n      </div>\n    </div>\n  </div>\n</div>\n";

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_script__, __vue_template__
var __vue_styles__ = {}
__vue_script__ = __webpack_require__(25)
if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
  console.warn("[vue-loader] resources/assets/js/src/components/control-panel.vue: named exports in *.vue files are ignored.")}
__vue_template__ = __webpack_require__(26)
module.exports = __vue_script__ || {}
if (module.exports.__esModule) module.exports = module.exports.default
var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
if (__vue_template__) {
__vue_options__.template = __vue_template__
}
if (!__vue_options__.computed) __vue_options__.computed = {}
Object.keys(__vue_styles__).forEach(function (key) {
var module = __vue_styles__[key]
__vue_options__.computed[key] = function () { return module }
})
if (false) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  var id = "_v-f5159f5c/control-panel.vue"
  if (!module.hot.data) {
    hotAPI.createRecord(id, module.exports)
  } else {
    hotAPI.update(id, module.exports, __vue_template__)
  }
})()}

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
// <template>
//   <div>
//     <div class="cartographer-field__controls flex justify-between items-center">
//       <div class="cartograher-field__marker-controls">
//         <div v-if="dirtyCenter || dirtyZoom" class="btn-group my-1 mr-1">
//           <a
//             v-if="dirtyCenter"
//             href="#"
//             class="btn btn-primary"
//             @click.prevent="setCenter"
//           >Set center</a>
//           <a
//             v-if="dirtyZoom"
//             href="#"
//             class="btn btn-primary"
//             @click.prevent="setZoomLevel"
//           >Set zoom level ({{ zoomLevel }})</a>
//         </div>
//         <div v-if="!selectedMarker" class="btn-group my-1 mr-2">
//           <a href="#" class="btn btn-default" @click.prevent="addMarker">
//             Marker
//             <i class="icon icon-plus icon-right"></i>
//           </a>
//         </div>
//         <div v-if="selectedMarker" class="btn-group my-1 mr-2">
//           <a href="#" class="btn btn-white" @click.prevent="toggleMarkerEditorOpen">
//             <i class="icon icon-pencil icon-left"></i>
//             Edit
//           </a>
//           <a href="#" class="btn btn-danger" @click.prevent="removeMarker">Remove</a>
//         </div>
//       </div>
//       <div v-if="data.search_enabled" class="controls flex items-center lg:w-auto">
//         <div v-if="busy" class="loading loading-basic">
//           <span class="icon icon-circular-graph animation-spin"></span>
//         </div>
//         <input
//           type="text"
//           class="filter-control search w-full"
//           placeholder="Search for a location"
//           :disabled="busy"
//           @keyup.13="requestGeocoder"
//         >
//       </div>
//     </div>
//     <cartographer-marker-editor
//       :data.sync="data"
//       :is-open="selectedMarker && markerEditorOpen"
//       :marker-index="selectedMarkerIndex"
//       @marker-attribute-changed="markerAttributeChanged"
//       v-if="selectedMarkerIndex >= 0"
//     ></cartographer-marker-editor>
//   </div>
// </template>
// <script>
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ["busy", "center", "data", "dirtyCenter", "dirtyZoom", "selectedMarker", "selectedMarkerIndex", "zoomLevel"],

  data: function data() {
    return {
      markerEditorOpen: false
    };
  },


  methods: {
    addMarker: function addMarker() {
      this.$emit("add-marker");
    },
    markerAttributeChanged: function markerAttributeChanged(attr, val) {
      this.$emit("marker-attribute-changed", attr, val);
    },
    removeMarker: function removeMarker() {
      this.$emit("remove-marker", this.selectedMarker);
    },
    requestGeocoder: function requestGeocoder(e) {
      this.$emit("request-geocoder", e.target.value);
    },
    setCenter: function setCenter() {
      this.$emit("set-center");
      this.dirtyCenter = false;
      this.data.center = this.center;
    },
    setZoomLevel: function setZoomLevel() {
      this.$emit("set-zoom-level");
      this.dirtyZoom = false;
      this.data.zoom_level = this.zoomLevel;
    },
    toggleMarkerEditorOpen: function toggleMarkerEditorOpen() {
      if (this.selectedMarkerIndex < 0) {
        return this.markerEditorOpen = false;
      }
      this.markerEditorOpen = !this.markerEditorOpen;
    }
  }
});
// </script>

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = "\n<div>\n  <div class=\"cartographer-field__controls flex justify-between items-center\">\n    <div class=\"cartograher-field__marker-controls\">\n      <div v-if=\"dirtyCenter || dirtyZoom\" class=\"btn-group my-1 mr-1\">\n        <a\n          v-if=\"dirtyCenter\"\n          href=\"#\"\n          class=\"btn btn-primary\"\n          @click.prevent=\"setCenter\"\n        >Set center</a>\n        <a\n          v-if=\"dirtyZoom\"\n          href=\"#\"\n          class=\"btn btn-primary\"\n          @click.prevent=\"setZoomLevel\"\n        >Set zoom level ({{ zoomLevel }})</a>\n      </div>\n      <div v-if=\"!selectedMarker\" class=\"btn-group my-1 mr-2\">\n        <a href=\"#\" class=\"btn btn-default\" @click.prevent=\"addMarker\">\n          Marker\n          <i class=\"icon icon-plus icon-right\"></i>\n        </a>\n      </div>\n      <div v-if=\"selectedMarker\" class=\"btn-group my-1 mr-2\">\n        <a href=\"#\" class=\"btn btn-white\" @click.prevent=\"toggleMarkerEditorOpen\">\n          <i class=\"icon icon-pencil icon-left\"></i>\n          Edit\n        </a>\n        <a href=\"#\" class=\"btn btn-danger\" @click.prevent=\"removeMarker\">Remove</a>\n      </div>\n    </div>\n    <div v-if=\"data.search_enabled\" class=\"controls flex items-center lg:w-auto\">\n      <div v-if=\"busy\" class=\"loading loading-basic\">\n        <span class=\"icon icon-circular-graph animation-spin\"></span>\n      </div>\n      <input\n        type=\"text\"\n        class=\"filter-control search w-full\"\n        placeholder=\"Search for a location\"\n        :disabled=\"busy\"\n        @keyup.13=\"requestGeocoder\"\n      >\n    </div>\n  </div>\n  <cartographer-marker-editor\n    :data.sync=\"data\"\n    :is-open=\"selectedMarker && markerEditorOpen\"\n    :marker-index=\"selectedMarkerIndex\"\n    @marker-attribute-changed=\"markerAttributeChanged\"\n    v-if=\"selectedMarkerIndex >= 0\"\n  ></cartographer-marker-editor>\n</div>\n";

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_script__, __vue_template__
var __vue_styles__ = {}
__vue_script__ = __webpack_require__(28)
if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
  console.warn("[vue-loader] resources/assets/js/src/components/marker-editor.vue: named exports in *.vue files are ignored.")}
__vue_template__ = __webpack_require__(29)
module.exports = __vue_script__ || {}
if (module.exports.__esModule) module.exports = module.exports.default
var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
if (__vue_template__) {
__vue_options__.template = __vue_template__
}
if (!__vue_options__.computed) __vue_options__.computed = {}
Object.keys(__vue_styles__).forEach(function (key) {
var module = __vue_styles__[key]
__vue_options__.computed[key] = function () { return module }
})
if (false) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  var id = "_v-2d94431e/marker-editor.vue"
  if (!module.hot.data) {
    hotAPI.createRecord(id, module.exports)
  } else {
    hotAPI.update(id, module.exports, __vue_template__)
  }
})()}

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
// <template>
//   <div v-if="isOpen" class="my-2 card cartographer-field__marker-edit-box">
//     <label class="block uppercase">Edit marker</label>
//     <div v-if="data.mode == 'google'" class="w-full my-1">
//       <div class="field-inner">
//         <label class="block">Icon</label>
//         <div class="help-block">Paste the url of the marker icon image</div>
//         <input
//           @change="setAttribute($event, 'icon')"
//           :value="data.markers[markerIndex].icon"
//           type="text"
//           class="form-control type-text"
//         >
//       </div>
//     </div>
//     <div v-if="data.mode == 'google'" class="w-1/4 my-1">
//       <div class="field-inner">
//         <label class="block">Label</label>
//         <div class="help-block">Set a marker label</div>
//         <input
//           @input="setAttribute($event, 'label')"
//           :value="data.markers[markerIndex].label"
//           type="text"
//           class="form-control type-text"
//         >
//       </div>
//     </div>
//     <div v-if="data.mode == 'mapbox'" class="w-1/4 my-1">
//       <div class="field-inner">
//         <label class="block">Color</label>
//         <div class="help-block">Set the marker color. e.g. `#ffee00`.</div>
//         <input
//           @input="setAttribute($event, 'label')"
//           :value="data.markers[markerIndex].color"
//           type="text"
//           class="form-control type-text"
//         >
//       </div>
//     </div>
//   </div>
// </template>
//
// <script>
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ["data", "isOpen", "markerIndex"],

  methods: {
    setAttribute: function setAttribute(e, attr) {
      var val = e.target.value;
      this.data.markers[this.markerIndex][attr] = val;
      this.$emit("marker-attribute-changed", attr, val);
    }
  }
});
// </script>

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = "\n<div v-if=\"isOpen\" class=\"my-2 card cartographer-field__marker-edit-box\">\n  <label class=\"block uppercase\">Edit marker</label>\n  <div v-if=\"data.mode == 'google'\" class=\"w-full my-1\">\n    <div class=\"field-inner\">\n      <label class=\"block\">Icon</label>\n      <div class=\"help-block\">Paste the url of the marker icon image</div>\n      <input\n        @change=\"setAttribute($event, 'icon')\"\n        :value=\"data.markers[markerIndex].icon\"\n        type=\"text\"\n        class=\"form-control type-text\"\n      >\n    </div>\n  </div>\n  <div v-if=\"data.mode == 'google'\" class=\"w-1/4 my-1\">\n    <div class=\"field-inner\">\n      <label class=\"block\">Label</label>\n      <div class=\"help-block\">Set a marker label</div>\n      <input\n        @input=\"setAttribute($event, 'label')\"\n        :value=\"data.markers[markerIndex].label\"\n        type=\"text\"\n        class=\"form-control type-text\"\n      >\n    </div>\n  </div>\n  <div v-if=\"data.mode == 'mapbox'\" class=\"w-1/4 my-1\">\n    <div class=\"field-inner\">\n      <label class=\"block\">Color</label>\n      <div class=\"help-block\">Set the marker color. e.g. `#ffee00`.</div>\n      <input\n        @input=\"setAttribute($event, 'label')\"\n        :value=\"data.markers[markerIndex].color\"\n        type=\"text\"\n        class=\"form-control type-text\"\n      >\n    </div>\n  </div>\n</div>\n";

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_script__, __vue_template__
var __vue_styles__ = {}
__webpack_require__(31)
__vue_script__ = __webpack_require__(33)
if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
  console.warn("[vue-loader] resources/assets/js/src/components/mapbox-markers-table.vue: named exports in *.vue files are ignored.")}
__vue_template__ = __webpack_require__(34)
module.exports = __vue_script__ || {}
if (module.exports.__esModule) module.exports = module.exports.default
var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
if (__vue_template__) {
__vue_options__.template = __vue_template__
}
if (!__vue_options__.computed) __vue_options__.computed = {}
Object.keys(__vue_styles__).forEach(function (key) {
var module = __vue_styles__[key]
__vue_options__.computed[key] = function () { return module }
})
if (false) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  var id = "_v-ad547c64/mapbox-markers-table.vue"
  if (!module.hot.data) {
    hotAPI.createRecord(id, module.exports)
  } else {
    hotAPI.update(id, module.exports, __vue_template__)
  }
})()}

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(32);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(4).default
var update = add("4f84cc9e", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./mapbox-markers-table.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./mapbox-markers-table.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.cartographer__mapbox-markers {\n  max-width: 750px;\n}\n\n.cartographer__mapbox-marker-table {\n  margin: 10px 0;\n}\n\n.cartographer__mapbox-marker-table tbody tr:hover {\n  background-color: #f1f5f9;\n}\n", ""]);

// exports


/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
// <template>
//   <div class="card my-3 cartographer__mapbox-markers">
//     <label class="block">Markers</label>
//     <table class="cartographer__mapbox-marker-table">
//       <thead>
//         <th>Marker ID</th>
//         <th>Position</th>
//         <th>Color</th>
//         <th>Actions</th>
//       </thead>
//       <tbody>
//         <tr v-for="marker in data.markers">
//           <td>{{ marker.id.split('-')[0] }}</td>
//           <td>
//             <div class="flex items-center my-1">
//               <label class="block mr-2">Lat:</label>
//               <input
//                 @change="updateMarkerPosition($event, marker.id, 'lat')"
//                 :value="data.markers[getMarkerIndex(marker.id)].position.lat"
//                 type="number"
//                 class="flex-grow"
//               >
//             </div>
//             <div class="flex items-center my-1">
//               <label class="block mr-2">Lng:</label>
//               <input
//                 @change="updateMarkerPosition($event, marker.id, 'lng')"
//                 :value="data.markers[getMarkerIndex(marker.id)].position.lng"
//                 type="number"
//                 class="flex-grow"
//               >
//             </div>
//           </td>
//           <td>
//             <input
//               @change="setMarkerColor($event, marker.id)"
//               :value="data.markers[getMarkerIndex(marker.id)].color"
//               placeholder="#3FB1CE"
//               type="text"
//             >
//           </td>
//           <td>
//             <a href="#" @click.prevent="removeMarker(marker.id)">Remove</a>
//           </td>
//         </tr>
//       </tbody>
//     </table>
//   </div>
// </template>
// <script>
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ["data", "getMarkerIndex"],

  methods: {
    removeMarker: function removeMarker(markerId) {
      this.$emit("remove-marker", markerId);
    },
    updateMarkerPosition: function updateMarkerPosition(e, markerId, coord) {
      var unChanged = coord === "lat" ? "lng" : "lat";
      var unChangedCoord = this.data.markers[this.getMarkerIndex(markerId)].position[unChanged];
      var position = [e.target.value];
      position.splice(unChanged === "lat" ? 1 : 0, 0, unChangedCoord);
      this.$emit("marker-position-changed", markerId, position);
    },
    setMarkerColor: function setMarkerColor(e, markerId) {
      var color = e.target.value;
      this.$emit("marker-color-changed", markerId, color);
    }
  }
});
// </script>
// <style>
// .cartographer__mapbox-markers {
//   max-width: 750px;
// }
//
// .cartographer__mapbox-marker-table {
//   margin: 10px 0;
// }
//
// .cartographer__mapbox-marker-table tbody tr:hover {
//   background-color: #f1f5f9;
// }
// </style>

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"card my-3 cartographer__mapbox-markers\">\n  <label class=\"block\">Markers</label>\n  <table class=\"cartographer__mapbox-marker-table\">\n    <thead>\n      <th>Marker ID</th>\n      <th>Position</th>\n      <th>Color</th>\n      <th>Actions</th>\n    </thead>\n    <tbody>\n      <tr v-for=\"marker in data.markers\">\n        <td>{{ marker.id.split('-')[0] }}</td>\n        <td>\n          <div class=\"flex items-center my-1\">\n            <label class=\"block mr-2\">Lat:</label>\n            <input\n              @change=\"updateMarkerPosition($event, marker.id, 'lat')\"\n              :value=\"data.markers[getMarkerIndex(marker.id)].position.lat\"\n              type=\"number\"\n              class=\"flex-grow\"\n            >\n          </div>\n          <div class=\"flex items-center my-1\">\n            <label class=\"block mr-2\">Lng:</label>\n            <input\n              @change=\"updateMarkerPosition($event, marker.id, 'lng')\"\n              :value=\"data.markers[getMarkerIndex(marker.id)].position.lng\"\n              type=\"number\"\n              class=\"flex-grow\"\n            >\n          </div>\n        </td>\n        <td>\n          <input\n            @change=\"setMarkerColor($event, marker.id)\"\n            :value=\"data.markers[getMarkerIndex(marker.id)].color\"\n            placeholder=\"#3FB1CE\"\n            type=\"text\"\n          >\n        </td>\n        <td>\n          <a href=\"#\" @click.prevent=\"removeMarker(marker.id)\">Remove</a>\n        </td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n";

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_script__, __vue_template__
var __vue_styles__ = {}
__vue_script__ = __webpack_require__(36)
if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
  console.warn("[vue-loader] resources/assets/js/src/Fieldtypes/GoogleMapsFieldtype.vue: named exports in *.vue files are ignored.")}
__vue_template__ = __webpack_require__(57)
module.exports = __vue_script__ || {}
if (module.exports.__esModule) module.exports = module.exports.default
var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
if (__vue_template__) {
__vue_options__.template = __vue_template__
}
if (!__vue_options__.computed) __vue_options__.computed = {}
Object.keys(__vue_styles__).forEach(function (key) {
var module = __vue_styles__[key]
__vue_options__.computed[key] = function () { return module }
})
if (false) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  var id = "_v-3843408b/GoogleMapsFieldtype.vue"
  if (!module.hot.data) {
    hotAPI.createRecord(id, module.exports)
  } else {
    hotAPI.update(id, module.exports, __vue_template__)
  }
})()}

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Mixins_Cartographer__ = __webpack_require__(2);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// <template>
//   <div>
//     <section class="cartographer-field" v-if="hasKey">
//       <cartographer-control-panel
//         :busy="busy"
//         :center="center"
//         :data.sync="data"
//         :dirty-center.sync="dirtyCenter"
//         :dirty-zoom.sync="dirtyZoom"
//         :selected-marker="selectedMarker"
//         :selected-marker-index="selectedMarkerIndex"
//         :zoom-level="zoomLevel"
//         @add-marker="addMarker"
//         @marker-attribute-changed="setMarkerAttribute"
//         @remove-marker="removeMarker"
//         @request-geocoder="requestGeocodedLocation"
//         @set-center="setCenter"
//       ></cartographer-control-panel>
//       <div class="cartographer-field__map" v-el:map-container></div>
//       <cartographer-advanced-box :data.sync="data" :name="name"></cartographer-advanced-box>
//     </section>
//     <small v-else class="help-block my-1">
//       <p>
//         Please enter your Google Maps API key in the
//         <a
//           href="/admin/addons/cartographer/settings"
//         >addon settings</a>.
//       </p>
//     </small>
//   </div>
// </template>
//
// <script>




/* harmony default export */ __webpack_exports__["default"] = ({
  props: ["data", "config", "name"],

  mixins: [__WEBPACK_IMPORTED_MODULE_1__Mixins_Cartographer__["a" /* default */]],

  created: function created() {
    this.hasKey = !!this.data.api_key;
  },


  watch: {
    "data.map_styles": function dataMap_styles(val) {
      this.setMapStyles(val);
    },

    "data.map_controls": function dataMap_controls(val) {
      this.setMapControls(val);
    }
  },

  methods: {
    addMarker: function addMarker() {
      var _this = this;

      var isNew = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var markerData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (isNew) {
        markerData = this.generateNewMarker();
      }

      if (isNew) this.data.markers.push(markerData);

      var _markerData = markerData,
          id = _markerData.id,
          label = _markerData.label,
          position = _markerData.position,
          icon = _markerData.icon;


      var newMarker = new google.maps.Marker({
        animation: google.maps.Animation.DROP,
        draggable: true,
        map: this.map,
        position: position,
        icon: icon,
        id: id,
        label: label
      });

      ["drag", "dragend"].forEach(function (eventType) {
        newMarker.addListener(eventType, function (event) {
          return _this.handleMarkerDragged(event, id);
        });
      });

      newMarker.addListener("click", function () {
        return _this.toggleSelectedMarker(id);
      });

      this.markerObjects.push(newMarker);
    },
    addCenterMarker: function addCenterMarker() {
      var _this2 = this;

      this.centerMarker = new google.maps.Marker({
        draggable: true,
        map: this.map,
        position: this.map.getCenter(),
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          strokeColor: "red"
        }
      });

      ["drag", "dragend"].forEach(function (eventType) {
        _this2.centerMarker.addListener(eventType, function (event) {
          _this2.dirtyCenter = false;
          _this2.handleMarkerDragged(event, "center", true);
        });
      });
    },
    handleMarkerDragged: function handleMarkerDragged(event, markerId) {
      var isCenter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var _ref = [event.latLng.lat(), event.latLng.lng()],
          lat = _ref[0],
          lng = _ref[1];

      if (isCenter) {
        this.data = _extends({}, this.data, {
          center: { lat: lat, lng: lng }
        });
      } else {
        this.updateMarker(markerId, { position: { lat: lat, lng: lng } });
      }
    },
    initMap: function initMap() {
      var _this3 = this;

      var mapOptions = {
        center: this.data.center,
        disableDefaultUI: true,
        mapTypeId: this.data.map_type_id,
        zoom: this.data.zoom_level
      };

      this.data.map_controls.forEach(function (control) {
        return mapOptions[control] = true;
      });

      this.map = new google.maps.Map(this.$els.mapContainer, mapOptions);

      if (this.data.map_styles) {
        try {
          var styles = JSON.parse(this.data.map_styles);
          this.setMapStyles(styles);
        } catch (e) {
          console.error("Failed to set initial styles: " + e);
        }
      }

      this.center = this.map.getCenter().toJSON();

      this.map.addListener("maptypeid_changed", function () {
        _this3.data.map_type_id = _this3.map.getMapTypeId();
      });

      this.map.addListener("dragend", function () {
        _this3.dirtyCenter = true;
        _this3.center = _this3.map.getCenter().toJSON();
      });
      this.map.addListener("zoom_changed", function () {
        _this3.zoomLevel = _this3.map.getZoom();
        _this3.dirtyZoom = true;
      });
    },
    removeMarkerObjectFromMap: function removeMarkerObjectFromMap(markerObject) {
      markerObject.setMap(null);
    },
    requestGeocodedLocation: function requestGeocodedLocation(query) {
      var _this4 = this;

      this.busy = true;

      var encodedQuery = encodeURI(query);
      var endpointURI = "https://maps.googleapis.com/maps/api/geocode/json?address=" + encodedQuery + "&key=" + this.data.api_key;

      __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(endpointURI).then(function (response) {
        if (response.data.status !== "OK") {
          return swal({
            type: "error",
            title: "Location Search Failed",
            text: response.data.error_message || response.data.status,
            confirmButtonText: "OK",
            showCancelButton: false
          });
        }
        var result = response.data.results[0];
        var _result$geometry$loca = result.geometry.location,
            lat = _result$geometry$loca.lat,
            lng = _result$geometry$loca.lng;

        _this4.center = { lat: lat, lng: lng };
        _this4.map.panTo(_this4.center);
        _this4.map.setZoom(14);
        _this4.dirtyCenter = true;
      }).catch(function (e) {
        return console.error(e);
      }).finally(function () {
        _this4.busy = false;
      });
    },
    setCenter: function setCenter() {
      this.centerMarker.setPosition(this.map.getCenter());
    },
    setMarkerAttribute: function setMarkerAttribute(attr, val) {
      var marker = this.getMarkerById(this.selectedMarker);
      switch (attr) {
        case "icon":
          marker.setIcon(val);
          break;
        case "label":
          marker.setLabel(val ? String(val) : "");
          break;
        default:
          break;
      }
    },
    setMapControls: function setMapControls(data) {
      var controls = {
        fullscreenControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        zoomControl: false
      };
      data.forEach(function (control) {
        return controls[control] = true;
      });
      this.map.setOptions(controls);
    },
    setMapStyles: function setMapStyles(stylesRaw) {
      if (!stylesRaw) return this.map.setOptions({ styles: [] });
      try {
        var styles = JSON.parse(stylesRaw);
        this.map.setOptions({ styles: styles });
      } catch (e) {
        console.error("Failed to parse map styles: " + e);
      }
    },
    setMode: function setMode() {
      this.data.mode = "google";
    },
    toggleSelectedMarker: function toggleSelectedMarker(markerId) {
      var _this5 = this;

      this.selectedMarker = this.selectedMarker === markerId ? null : markerId;
      this.selectedMarkerIndex = this.getMarkerIndex(this.selectedMarker);
      this.markerObjects.forEach(function (markerObject) {
        if (markerObject.id === _this5.selectedMarker) {
          markerObject.setAnimation(google.maps.Animation.BOUNCE);
        } else {
          markerObject.setAnimation(null);
        }
      });
    }
  }
});
// </script>

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var bind = __webpack_require__(5);
var Axios = __webpack_require__(39);
var mergeConfig = __webpack_require__(11);
var defaults = __webpack_require__(8);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(12);
axios.CancelToken = __webpack_require__(52);
axios.isCancel = __webpack_require__(7);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(53);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),
/* 38 */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

module.exports = function isBuffer (obj) {
  return obj != null && obj.constructor != null &&
    typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var buildURL = __webpack_require__(6);
var InterceptorManager = __webpack_require__(40);
var dispatchRequest = __webpack_require__(41);
var mergeConfig = __webpack_require__(11);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);
  config.method = config.method ? config.method.toLowerCase() : 'get';

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var transformData = __webpack_require__(42);
var isCancel = __webpack_require__(7);
var defaults = __webpack_require__(8);
var isAbsoluteURL = __webpack_require__(50);
var combineURLs = __webpack_require__(51);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),
/* 43 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(10);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(12);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(55);
var bytesToUuid = __webpack_require__(56);

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),
/* 55 */
/***/ (function(module, exports) {

// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto
// implementation. Also, find the complete implementation of crypto on IE11.
var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
                      (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));

if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}


/***/ }),
/* 56 */
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([bth[buf[i++]], bth[buf[i++]], 
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]]]).join('');
}

module.exports = bytesToUuid;


/***/ }),
/* 57 */
/***/ (function(module, exports) {

module.exports = "\n<div>\n  <section class=\"cartographer-field\" v-if=\"hasKey\">\n    <cartographer-control-panel\n      :busy=\"busy\"\n      :center=\"center\"\n      :data.sync=\"data\"\n      :dirty-center.sync=\"dirtyCenter\"\n      :dirty-zoom.sync=\"dirtyZoom\"\n      :selected-marker=\"selectedMarker\"\n      :selected-marker-index=\"selectedMarkerIndex\"\n      :zoom-level=\"zoomLevel\"\n      @add-marker=\"addMarker\"\n      @marker-attribute-changed=\"setMarkerAttribute\"\n      @remove-marker=\"removeMarker\"\n      @request-geocoder=\"requestGeocodedLocation\"\n      @set-center=\"setCenter\"\n    ></cartographer-control-panel>\n    <div class=\"cartographer-field__map\" v-el:map-container></div>\n    <cartographer-advanced-box :data.sync=\"data\" :name=\"name\"></cartographer-advanced-box>\n  </section>\n  <small v-else class=\"help-block my-1\">\n    <p>\n      Please enter your Google Maps API key in the\n      <a\n        href=\"/admin/addons/cartographer/settings\"\n      >addon settings</a>.\n    </p>\n  </small>\n</div>\n";

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_script__, __vue_template__
var __vue_styles__ = {}
__vue_script__ = __webpack_require__(59)
if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
  console.warn("[vue-loader] resources/assets/js/src/Fieldtypes/MapboxFieldtype.vue: named exports in *.vue files are ignored.")}
__vue_template__ = __webpack_require__(60)
module.exports = __vue_script__ || {}
if (module.exports.__esModule) module.exports = module.exports.default
var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
if (__vue_template__) {
__vue_options__.template = __vue_template__
}
if (!__vue_options__.computed) __vue_options__.computed = {}
Object.keys(__vue_styles__).forEach(function (key) {
var module = __vue_styles__[key]
__vue_options__.computed[key] = function () { return module }
})
if (false) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  var id = "_v-131e8fec/MapboxFieldtype.vue"
  if (!module.hot.data) {
    hotAPI.createRecord(id, module.exports)
  } else {
    hotAPI.update(id, module.exports, __vue_template__)
  }
})()}

/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Mixins_Cartographer__ = __webpack_require__(2);
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// <template>
//   <div>
//     <section class="cartographer-field" v-if="hasKey">
//       <cartographer-control-panel
//         :busy="busy"
//         :center="center"
//         :data.sync="data"
//         :dirty-center.sync="dirtyCenter"
//         :dirty-zoom.sync="dirtyZoom"
//         :zoom-level="zoomLevel"
//         @add-marker="addMarker"
//         @request-geocoder="requestGeocodedLocation"
//         @set-center="setCenter"
//       ></cartographer-control-panel>
//       <div class="cartographer-field__map" v-el:map-container></div>
//       <cartographer-advanced-box :data.sync="data" :name="name"></cartographer-advanced-box>
//       <cartographer-mapbox-markers
//         v-if="data.markers.length"
//         :data.sync="data"
//         :get-marker-index="getMarkerIndex"
//         :marker-objects="markerObjects"
//         @marker-color-changed="updateMarkerColor"
//         @marker-position-changed="updateMarkerPosition"
//         @remove-marker="removeMarker"
//       ></cartographer-mapbox-markers>
//     </section>
//     <small v-else class="help-block my-1">
//       <p>
//         Please enter your Mapbox access token in the
//         <a
//           href="/admin/addons/cartographer/settings"
//         >addon settings</a>.
//       </p>
//     </small>
//   </div>
// </template>
//
// <script>




/* harmony default export */ __webpack_exports__["default"] = ({
  props: ["data", "config", "name"],

  mixins: [__WEBPACK_IMPORTED_MODULE_1__Mixins_Cartographer__["a" /* default */]],

  created: function created() {
    this.hasKey = !!this.data.access_token;
  },
  data: function data() {
    return {
      fullscreenControl: new mapboxgl.FullscreenControl(),
      navigationControl: new mapboxgl.NavigationControl(),
      scaleControl: new mapboxgl.ScaleControl()
    };
  },


  watch: {
    "data.map_styles": function dataMap_styles(val) {
      this.setMapStyles(val);
    },

    "data.map_controls": function dataMap_controls(val) {
      this.setMapControls(val);
    }
  },

  methods: {
    addMarker: function addMarker() {
      var _this = this;

      var isNew = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var markerData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (isNew) {
        markerData = this.generateNewMarker("mapbox");
      }

      if (isNew) this.data.markers.push(markerData);

      var _markerData = markerData,
          id = _markerData.id,
          position = _markerData.position,
          color = _markerData.color;
      var lat = position.lat,
          lng = position.lng;

      var newMarker = new mapboxgl.Marker({
        color: color,
        draggable: true
      });
      newMarker.id = id;
      newMarker.setLngLat([lng, lat]).addTo(this.map);

      ["drag", "dragend"].forEach(function (eventType) {
        newMarker.on(eventType, function () {
          _this.handleMarkerDragged(id);
        });
      });

      this.markerObjects.push(newMarker);
    },
    addCenterMarker: function addCenterMarker() {
      var _this2 = this;

      this.centerMarker = new mapboxgl.Marker({
        draggable: true,
        color: "#FFEE00"
      });

      var _data$center = this.data.center,
          lat = _data$center.lat,
          lng = _data$center.lng;


      this.centerMarker.setLngLat([lng, lat]).addTo(this.map);

      ["drag", "dragend"].forEach(function (eventType) {
        _this2.centerMarker.on(eventType, function () {
          _this2.dirtyCenter = false;
          _this2.handleMarkerDragged("center", true);
        });
      });
    },
    handleMarkerDragged: function handleMarkerDragged(markerId) {
      var isCenter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (isCenter) {
        var _centerMarker$getLngL = this.centerMarker.getLngLat(),
            lat = _centerMarker$getLngL.lat,
            lng = _centerMarker$getLngL.lng;

        this.data = _extends({}, this.data, {
          center: { lat: lat, lng: lng }
        });
      } else {
        var _getMarkerById$getLng = this.getMarkerById(markerId).getLngLat(),
            _lat = _getMarkerById$getLng.lat,
            _lng = _getMarkerById$getLng.lng;

        this.updateMarker(markerId, { position: { lat: _lat, lng: _lng } });
      }
    },
    initMap: function initMap() {
      var _this3 = this;

      this.center = this.data.center;

      mapboxgl.accessToken = this.data.access_token;
      var _data$center2 = this.data.center,
          lng = _data$center2.lng,
          lat = _data$center2.lat;

      this.map = new mapboxgl.Map({
        container: this.$els.mapContainer,
        style: this.data.map_styles,
        center: [lng, lat],
        zoom: this.data.zoom_level
      });

      this.data.map_controls.forEach(function (control) {
        if (_this3[control]) {
          _this3.map.addControl(_this3[control]);
        }
      });

      this.map.on("zoomend", function (e) {
        _this3.dirtyZoom = true;
        _this3.zoomLevel = Math.round(_this3.map.getZoom() * 100) / 100;
      });

      this.map.on("dragend", function () {
        _this3.dirtyCenter = true;

        var _map$getCenter = _this3.map.getCenter(),
            lat = _map$getCenter.lat,
            lng = _map$getCenter.lng;

        _this3.center = { lat: lat, lng: lng };
      });

      mapboxgl.Marker.prototype.id = "";
    },
    removeMarkerObjectFromMap: function removeMarkerObjectFromMap(markerObject) {
      markerObject.remove();
    },
    requestGeocodedLocation: function requestGeocodedLocation(query) {
      var _this4 = this;

      this.busy = true;

      var encodedQuery = encodeURI(query);
      var endpointURI = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodedQuery + ".json?limit=1&&access_token=" + this.data.access_token;

      __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(endpointURI).then(function (response) {
        var result = response.data.features[0];

        var _result$center = _slicedToArray(result.center, 2),
            lng = _result$center[0],
            lat = _result$center[1];

        _this4.center = { lng: lng, lat: lat };
        _this4.dirtyCenter = true;

        setTimeout(function () {
          _this4.map.flyTo({
            center: [lng, lat],
            zoom: 13
          });
        }, 200);
      }).catch(function (e) {
        return console.error(e);
      }).finally(function () {
        _this4.busy = false;
      });
    },
    setCenter: function setCenter() {
      var _center = this.center,
          lat = _center.lat,
          lng = _center.lng;

      this.centerMarker.setLngLat([lng, lat]);
    },
    setMapControls: function setMapControls(data) {
      // Currently no way to remove existing controls from the map - calling removeControl() errors
      // if an instance isn't on the map nad there is no way to 'get' the current controls
      // https://github.com/mapbox/mapbox-gl-js/issues/7682
      return;
    },
    setMapStyles: function setMapStyles(styles) {
      this.map.setStyle(styles, { diff: false });
    },
    setMode: function setMode() {
      this.data.mode = "mapbox";
    },
    updateMarkerColor: function updateMarkerColor(markerId, color) {
      var markerIndex = this.getMarkerIndex(markerId);
      this.data.markers[markerIndex].color = color;
    },
    updateMarkerPosition: function updateMarkerPosition(markerId, lngLat) {
      var marker = this.getMarkerById(markerId);
      marker.setLngLat(lngLat);
    }
  }
});
// </script>

/***/ }),
/* 60 */
/***/ (function(module, exports) {

module.exports = "\n<div>\n  <section class=\"cartographer-field\" v-if=\"hasKey\">\n    <cartographer-control-panel\n      :busy=\"busy\"\n      :center=\"center\"\n      :data.sync=\"data\"\n      :dirty-center.sync=\"dirtyCenter\"\n      :dirty-zoom.sync=\"dirtyZoom\"\n      :zoom-level=\"zoomLevel\"\n      @add-marker=\"addMarker\"\n      @request-geocoder=\"requestGeocodedLocation\"\n      @set-center=\"setCenter\"\n    ></cartographer-control-panel>\n    <div class=\"cartographer-field__map\" v-el:map-container></div>\n    <cartographer-advanced-box :data.sync=\"data\" :name=\"name\"></cartographer-advanced-box>\n    <cartographer-mapbox-markers\n      v-if=\"data.markers.length\"\n      :data.sync=\"data\"\n      :get-marker-index=\"getMarkerIndex\"\n      :marker-objects=\"markerObjects\"\n      @marker-color-changed=\"updateMarkerColor\"\n      @marker-position-changed=\"updateMarkerPosition\"\n      @remove-marker=\"removeMarker\"\n    ></cartographer-mapbox-markers>\n  </section>\n  <small v-else class=\"help-block my-1\">\n    <p>\n      Please enter your Mapbox access token in the\n      <a\n        href=\"/admin/addons/cartographer/settings\"\n      >addon settings</a>.\n    </p>\n  </small>\n</div>\n";

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_script__, __vue_template__
var __vue_styles__ = {}
__vue_script__ = __webpack_require__(62)
if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
  console.warn("[vue-loader] resources/assets/js/src/Fieldtypes/CartographerFieldtype.vue: named exports in *.vue files are ignored.")}
__vue_template__ = __webpack_require__(63)
module.exports = __vue_script__ || {}
if (module.exports.__esModule) module.exports = module.exports.default
var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
if (__vue_template__) {
__vue_options__.template = __vue_template__
}
if (!__vue_options__.computed) __vue_options__.computed = {}
Object.keys(__vue_styles__).forEach(function (key) {
var module = __vue_styles__[key]
__vue_options__.computed[key] = function () { return module }
})
if (false) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  var id = "_v-403ebf22/CartographerFieldtype.vue"
  if (!module.hot.data) {
    hotAPI.createRecord(id, module.exports)
  } else {
    hotAPI.update(id, module.exports, __vue_template__)
  }
})()}

/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Mixins_Cartographer__ = __webpack_require__(2);
// <template>
//   <div>
//     <component v-bind:is="mapsComponent" :data.sync="data" :name="name" :config="config"></component>
//   </div>
// </template>
//
// <script>




/* harmony default export */ __webpack_exports__["default"] = ({
  props: ["data", "config", "name"],

  mixins: [Fieldtype, __WEBPACK_IMPORTED_MODULE_1__Mixins_Cartographer__["a" /* default */]],

  data: function data() {
    return {
      mapsComponent: "google"
    };
  },
  created: function created() {
    var cartographerComponent = void 0;
    switch (this.config.mode) {
      case "mapbox":
        cartographerComponent = "mapbox";
        break;
      case "google":
      default:
        cartographerComponent = "google_maps";
        break;
    }
    this.mapsComponent = "cartographer-" + cartographerComponent + "-fieldtype";
  }
});
// </script>

/***/ }),
/* 63 */
/***/ (function(module, exports) {

module.exports = "\n<div>\n  <component v-bind:is=\"mapsComponent\" :data.sync=\"data\" :name=\"name\" :config=\"config\"></component>\n</div>\n";

/***/ })
/******/ ]);