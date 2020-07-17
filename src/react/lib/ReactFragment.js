/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

 

var _prodInvariant = require('./reactProdInvariant');

var ReactChildren = require('./ReactChildren');
var ReactElement = require('./ReactElement');

var emptyFunction = require('fbjs/lib/emptyFunction');
var invariant = require('fbjs/lib/invariant');
var warning = require('fbjs/lib/warning');

/**
 * We used to allow keyed objects to serve as a collection of ReactElements,
 * or nested sets. This allowed us a way to explicitly key a set or fragment of
 * components. This is now being replaced with an opaque data structure.
 * The upgrade path is to call React.addons.createFragment({ key: value }) to
 * create a keyed fragment. The resulting data structure is an array.
 */

var numericPropertyRegex = /^\d+$/;

var warnedAboutNumeric = false;

var ReactFragment = {
  /**
   * Wrap a keyed object in an opaque proxy that warns you if you access any
   * of its properties.
   * See https://facebook.github.io/react/docs/create-fragment.html
   */
  create: function (object) {
    if (typeof object !== 'object' || !object || Array.isArray(object)) {
      return object;
    }
    if (ReactElement.isValidElement(object)) {
      return object;
    }


    var result = [];

    for (var key in object) {
      ReactChildren.mapIntoWithKeyPrefixInternal(object[key], result, key, emptyFunction.thatReturnsArgument);
    }

    return result;
  }
};

module.exports = ReactFragment;