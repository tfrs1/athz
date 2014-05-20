/*
 * athz
 * https://github.com/aleksandar-micic/athz
 *
 * Copyright (c) 2014 Aleksandar Micic
 * Licensed under the MIT license.
 */

'use strict';

function normalizeRoles(roles) {
  if (!roles) { return undefined; }

  if (!Array.isArray(roles)) {
    roles = [roles];
  }

  return roles.map(function(item) {
    if (typeof item === 'string') {
      item = {role: item};
    }
    else {
      // Create a copy
      item = JSON.parse(JSON.stringify(item));
    }

    return item;
  });
}

function flatten(array) {
  return array.reduce(function(result, item) {
    if (Array.isArray(item)) {
      item = flatten(item);
    }

    return result.concat(item);
  }, []);
}


module.exports = exports;
exports.normalizeRoles = normalizeRoles;
exports.flatten = flatten;
