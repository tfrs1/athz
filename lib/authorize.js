/*
 * athz
 * https://github.com/aleksandar-micic/athz
 *
 * Copyright (c) 2014 Aleksandar Micic
 * Licensed under the MIT license.
 */

'use strict';

var AuthorizationError = require('./error.js').AuthorizationError;

function authorize(allowedRoles) {
  return function(req, res, next) {
    if (!allowedRoles) { return next(); }

    if (!req.user) { throw new AuthorizationError('User not authenticated'); }
    if (!req.user.role && !req.user.roles) { throw new AuthorizationError('User does not have a role'); }

    var userRoles = req.user.roles || [req.user.role];

    var authorized = allowedRoles.some(function(item) {
      return userRoles.some(function(role) {
        return item.role === role;
      });
    });

    if (!authorized) {
      throw new AuthorizationError('User not authorized');
    }

    next();
  };
}

module.exports = authorize;
