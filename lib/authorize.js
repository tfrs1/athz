/*
 * athz
 * https://github.com/aleksandar-micic/athz
 *
 * Copyright (c) 2014 Aleksandar Micic
 * Licensed under the MIT license.
 */

'use strict';

var AuthorizationError = require('./error.js').AuthorizationError;

function authorize(roles) {
  return function(req, res, next) {
    if (!roles) { return next(); }

    if (!req.user) { throw new AuthorizationError('User not authenticated'); }
    if (!req.user.role && !req.user.roles) { throw new AuthorizationError('User does not have a role'); }

    var ur = req.user.roles || req.user.role,
      authorized = false;

    if (Array.isArray(ur)) {
      authorized = roles.some(function(item) {
        return ur.some(function(role) {
          return item.role === role;
        });
      });
    }
    else {
      authorized = roles.some(function(item) {
        return item.role === ur;
      });
    }

    if (!authorized) {
      throw new AuthorizationError('User not authorized');
    }

    next();
  };
}

module.exports = authorize;
