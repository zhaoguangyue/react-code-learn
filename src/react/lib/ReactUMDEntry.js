/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

 

var _assign = require('object-assign');

var React = require('./React');

// `version` will be added here by the React module.
var ReactUMDEntry = _assign(React, {
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
    ReactCurrentOwner: require('./ReactCurrentOwner')
  }
});


module.exports = ReactUMDEntry;