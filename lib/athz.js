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
    AuthorizationError = require('./error.js').AuthorizationError;

function main() {
  var args = util.flatten([].slice.call(arguments)),
      roles = util.normalizeRoles(args);

  return authorize(roles);
}

function any(req, res, next) {
  if (req.user) {
    return next();
  }

  throw new AuthorizationError('User not authenticated');
}

module.exports = exports = main;
exports.if = main;
exports.can = main;
exports.if.user = main;
exports.if.user.can = main;
exports.any = any;

exports.AuthorizationError = AuthorizationError;
