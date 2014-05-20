/*
 * athz
 * https://github.com/aleksandar-micic/athz
 *
 * Copyright (c) 2014 Aleksandar Micic
 * Licensed under the MIT license.
 */

'use strict';

var util = require('./util.js'),
    authorize = require('./authorize.js'),
    error = require('./error.js');

function main() {
  var args = util.flatten([].slice.call(arguments)),
      roles = util.normalizeRoles(args);

  console.log(roles);
  return authorize(roles);
}

module.exports = exports = main;
exports.if = main;
exports.can = main;
exports.if.user = main;
exports.if.user.can = main;
exports.AuthorizationError = error.AuthorizationError;
